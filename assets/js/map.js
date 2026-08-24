/* =========================================================
   map.js — a small slippy map, written from scratch so the
   app never depends on an outside library being reachable.
   Web-Mercator tiles, drag to pan, pinch / wheel to zoom.
   ========================================================= */
(function (global) {
  'use strict';

  var TILE = 256;
  var MAX_LAT = 85.0511287798;

  var LAYERS = {
    streets: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 19,
      attribution: 'Imagery © Esri, Maxar, Earthstar Geographics'
    }
  };

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function lngToX(lng, z) { return (lng + 180) / 360 * TILE * Math.pow(2, z); }
  function latToY(lat, z) {
    var s = Math.sin(clamp(lat, -MAX_LAT, MAX_LAT) * Math.PI / 180);
    return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * TILE * Math.pow(2, z);
  }
  function xToLng(x, z) { return x / (TILE * Math.pow(2, z)) * 360 - 180; }
  function yToLat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / (TILE * Math.pow(2, z));
    return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  /* metres between two points — used for "show all" padding */
  function distance(a, b) {
    var R = 6371000, toRad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toRad, dLng = (b.lng - a.lng) * toRad;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(a.lat * toRad) * Math.cos(b.lat * toRad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  }

  function MiniMap(el, opts) {
    opts = opts || {};
    this.el = el;
    this.center = opts.center || { lat: 39.5, lng: -8.0 };
    this.zoom = opts.zoom == null ? 6 : opts.zoom;
    this.minZoom = opts.minZoom == null ? 2 : opts.minZoom;
    this.layerName = opts.layer || 'streets';
    this.onTap = opts.onTap || null;
    this.onMove = opts.onMove || null;
    this.interactive = opts.interactive !== false;

    this.layers = {};        /* tileZoom -> { el, tiles } */
    this.markers = [];
    this._raf = 0;
    this._pointers = {};
    this._built = false;

    this._build();
  }

  MiniMap.prototype._build = function () {
    var self = this;
    this.el.classList.add('map');

    this.markersEl = document.createElement('div');
    this.markersEl.className = 'map-markers';

    this.el.appendChild(this.markersEl);
    this._built = true;

    if (this.interactive) this._bindGestures();
    this.render();

    if (global.ResizeObserver) {
      this._ro = new ResizeObserver(function () { self.render(); });
      this._ro.observe(this.el);
    } else {
      global.addEventListener('resize', function () { self.render(); });
    }
  };

  MiniMap.prototype.layerDef = function () { return LAYERS[this.layerName] || LAYERS.streets; };
  MiniMap.prototype.attribution = function () { return this.layerDef().attribution; };

  MiniMap.prototype.setLayer = function (name) {
    if (!LAYERS[name] || name === this.layerName) return;
    this.layerName = name;
    Object.keys(this.layers).forEach(function (z) {
      this.layers[z].el.remove();
      delete this.layers[z];
    }, this);
    this.render();
  };

  MiniMap.prototype.setView = function (center, zoom) {
    if (center) this.center = { lat: clamp(center.lat, -MAX_LAT, MAX_LAT), lng: center.lng };
    if (zoom != null) this.zoom = clamp(zoom, this.minZoom, this.layerDef().maxZoom);
    this.render();
  };

  MiniMap.prototype.getCenter = function () { return { lat: this.center.lat, lng: this.center.lng }; };
  MiniMap.prototype.getZoom = function () { return this.zoom; };

  MiniMap.prototype.fitPoints = function (points, maxZ) {
    if (!points.length) return;
    if (points.length === 1) { this.setView(points[0], maxZ || 17); return; }
    var minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    points.forEach(function (p) {
      minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat);
      minLng = Math.min(minLng, p.lng); maxLng = Math.max(maxLng, p.lng);
    });
    var center = { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 };
    var W = this.el.clientWidth || 320, H = this.el.clientHeight || 320;
    var best = this.minZoom;
    for (var z = this.layerDef().maxZoom; z >= this.minZoom; z--) {
      var w = Math.abs(lngToX(maxLng, z) - lngToX(minLng, z));
      var h = Math.abs(latToY(minLat, z) - latToY(maxLat, z));
      if (w < W - 80 && h < H - 120) { best = z; break; }
    }
    this.setView(center, Math.min(best, maxZ || 18));
  };

  /* ---------------- rendering ---------------- */

  MiniMap.prototype.render = function () {
    var self = this;
    if (this._raf) return;
    this._raf = global.requestAnimationFrame(function () {
      self._raf = 0;
      self._draw();
    });
  };

  MiniMap.prototype._draw = function () {
    if (!this._built) return;
    var W = this.el.clientWidth, H = this.el.clientHeight;
    if (!W || !H) return;

    var def = this.layerDef();
    this.zoom = clamp(this.zoom, this.minZoom, def.maxZoom);
    var tz = clamp(Math.round(this.zoom), this.minZoom, def.maxZoom);
    var scale = Math.pow(2, this.zoom - tz);

    var cx = lngToX(this.center.lng, tz);
    var cy = latToY(this.center.lat, tz);

    var layer = this._ensureLayer(tz, cx, cy);
    layer.used = Date.now();

    /* which tiles cover the screen */
    var halfW = W / (2 * scale), halfH = H / (2 * scale);
    var x0 = Math.floor((cx - halfW) / TILE), x1 = Math.floor((cx + halfW) / TILE);
    var y0 = Math.floor((cy - halfH) / TILE), y1 = Math.floor((cy + halfH) / TILE);
    var n = Math.pow(2, tz);
    var seen = {};

    for (var ty = Math.max(0, y0); ty <= Math.min(n - 1, y1); ty++) {
      for (var tx = x0; tx <= x1; tx++) {
        var key = tx + '/' + ty;
        seen[key] = true;
        if (layer.tiles[key]) continue;
        var wrapped = ((tx % n) + n) % n;
        var img = document.createElement('img');
        img.className = 'map-tile';
        img.alt = '';
        img.decoding = 'async';
        img.loading = 'eager';
        img.style.left = (tx * TILE - layer.origin.x) + 'px';
        img.style.top = (ty * TILE - layer.origin.y) + 'px';
        img.src = def.url.replace('{z}', tz).replace('{x}', wrapped).replace('{y}', ty);
        img.addEventListener('error', function () { this.style.visibility = 'hidden'; });
        layer.el.appendChild(img);
        layer.tiles[key] = img;
      }
    }
    /* drop tiles that scrolled away */
    Object.keys(layer.tiles).forEach(function (key) {
      if (!seen[key]) { layer.tiles[key].remove(); delete layer.tiles[key]; }
    });

    /* position every live layer at its own zoom, so changing zoom never flashes white */
    var now = Date.now();
    Object.keys(this.layers).forEach(function (zKey) {
      var z = +zKey, L = this.layers[zKey];
      var s = Math.pow(2, this.zoom - z);
      var lx = lngToX(this.center.lng, z) - L.origin.x;
      var ly = latToY(this.center.lat, z) - L.origin.y;
      L.el.style.transform = 'translate3d(' + (W / 2) + 'px,' + (H / 2) + 'px,0) scale(' + s + ') translate3d(' + (-lx) + 'px,' + (-ly) + 'px,0)';
      L.el.style.zIndex = z === tz ? 2 : 1;
      if (z !== tz && now - L.used > 450) { L.el.remove(); delete this.layers[zKey]; }
    }, this);

    /* markers keep their size, so they sit outside the scaled layer */
    this.markers.forEach(function (m) {
      var mx = (lngToX(m.lng, tz) - cx) * scale + W / 2;
      var my = (latToY(m.lat, tz) - cy) * scale + H / 2;
      var off = mx < -60 || my < -80 || mx > W + 60 || my > H + 80;
      m.el.style.display = off ? 'none' : '';
      if (!off) { m.el.style.left = mx + 'px'; m.el.style.top = my + 'px'; }
    });

    if (this.onMove) this.onMove(this.getCenter(), this.zoom);
  };

  /* Tiles are placed relative to this origin, never at their absolute world
     pixel, which past zoom ~16 is larger than the browser can lay out. */
  MiniMap.prototype._ensureLayer = function (z, cx, cy) {
    var L = this.layers[z];
    if (L && Math.abs(cx - L.origin.x) > 1e6) { L.el.remove(); delete this.layers[z]; L = null; }
    if (!L) {
      var el = document.createElement('div');
      el.className = 'map-layer';
      this.el.insertBefore(el, this.markersEl);
      L = this.layers[z] = {
        el: el, tiles: {}, used: Date.now(),
        origin: { x: Math.floor(cx / TILE) * TILE, y: Math.floor(cy / TILE) * TILE }
      };
    }
    return L;
  };

  /* ---------------- markers ---------------- */

  MiniMap.prototype.clearMarkers = function () {
    this.markers.forEach(function (m) { m.el.remove(); });
    this.markers = [];
  };

  MiniMap.prototype.addMarker = function (m) {
    this.markersEl.appendChild(m.el);
    this.markers.push(m);
    this.render();
    return m;
  };

  /* ---------------- gestures ---------------- */

  MiniMap.prototype._screenToLatLng = function (px, py) {
    var W = this.el.clientWidth, H = this.el.clientHeight;
    var tz = clamp(Math.round(this.zoom), this.minZoom, this.layerDef().maxZoom);
    var scale = Math.pow(2, this.zoom - tz);
    var x = lngToX(this.center.lng, tz) + (px - W / 2) / scale;
    var y = latToY(this.center.lat, tz) + (py - H / 2) / scale;
    return { lat: yToLat(y, tz), lng: xToLng(x, tz) };
  };

  MiniMap.prototype.zoomAround = function (newZoom, px, py) {
    var def = this.layerDef();
    newZoom = clamp(newZoom, this.minZoom, def.maxZoom);
    var W = this.el.clientWidth, H = this.el.clientHeight;
    var anchor = this._screenToLatLng(px, py);
    this.zoom = newZoom;
    var tz = clamp(Math.round(this.zoom), this.minZoom, def.maxZoom);
    var scale = Math.pow(2, this.zoom - tz);
    var ax = lngToX(anchor.lng, tz), ay = latToY(anchor.lat, tz);
    var cx = ax - (px - W / 2) / scale;
    var cy = ay - (py - H / 2) / scale;
    this.center = { lat: clamp(yToLat(cy, tz), -MAX_LAT, MAX_LAT), lng: xToLng(cx, tz) };
    this.render();
  };

  MiniMap.prototype._bindGestures = function () {
    var self = this;
    var el = this.el;
    var last = null, moved = 0, downAt = 0, pinch = null;

    function pointsArray() {
      return Object.keys(self._pointers).map(function (k) { return self._pointers[k]; });
    }
    function rel(e) {
      var r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      el.setPointerCapture(e.pointerId);
      self._pointers[e.pointerId] = rel(e);
      var pts = pointsArray();
      if (pts.length === 1) { last = pts[0]; moved = 0; downAt = Date.now(); }
      else if (pts.length === 2) {
        pinch = {
          dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
          zoom: self.zoom
        };
      }
    });

    el.addEventListener('pointermove', function (e) {
      if (!self._pointers[e.pointerId]) return;
      self._pointers[e.pointerId] = rel(e);
      var pts = pointsArray();

      if (pts.length === 1 && last) {
        var p = pts[0];
        var dx = p.x - last.x, dy = p.y - last.y;
        moved += Math.abs(dx) + Math.abs(dy);
        last = p;
        var tz = clamp(Math.round(self.zoom), self.minZoom, self.layerDef().maxZoom);
        var scale = Math.pow(2, self.zoom - tz);
        var cx = lngToX(self.center.lng, tz) - dx / scale;
        var cy = latToY(self.center.lat, tz) - dy / scale;
        self.center = { lat: clamp(yToLat(cy, tz), -MAX_LAT, MAX_LAT), lng: xToLng(cx, tz) };
        self.render();
      } else if (pts.length === 2 && pinch) {
        var d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (d > 8 && pinch.dist > 8) {
          var mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
          self.zoomAround(pinch.zoom + Math.log(d / pinch.dist) / Math.LN2, mid.x, mid.y);
          moved += 20;
        }
      }
    });

    function up(e) {
      if (!self._pointers[e.pointerId]) return;
      var p = self._pointers[e.pointerId];
      delete self._pointers[e.pointerId];
      var remaining = pointsArray();
      if (remaining.length < 2) pinch = null;
      if (remaining.length === 1) { last = remaining[0]; moved = 999; }
      if (remaining.length === 0) {
        if (moved < 12 && Date.now() - downAt < 500 && self.onTap) {
          self.onTap(self._screenToLatLng(p.x, p.y));
        }
        last = null;
      }
    }
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    el.addEventListener('wheel', function (e) {
      e.preventDefault();
      var p = rel(e);
      var step = e.deltaMode === 1 ? e.deltaY * 0.05 : e.deltaY * 0.0025;
      self.zoomAround(self.zoom - step, p.x, p.y);
    }, { passive: false });

    el.addEventListener('dblclick', function (e) {
      e.preventDefault();
      var p = rel(e);
      self.zoomAround(Math.round(self.zoom) + 1, p.x, p.y);
    });

    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  };

  MiniMap.prototype.locate = function () {
    return new Promise(function (resolve, reject) {
      if (!navigator.geolocation) { reject(new Error('no geolocation')); return; }
      navigator.geolocation.getCurrentPosition(
        function (pos) { resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }); },
        function (err) { reject(err); },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
      );
    });
  };

  global.MiniMap = MiniMap;
  global.MiniMap.LAYERS = LAYERS;
  global.MiniMap.distance = distance;
})(window);
