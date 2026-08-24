/* =========================================================
   photos.js — pictures of the trees.
   Shrunk down, then kept in this browser (IndexedDB).
   ========================================================= */
(function (global) {
  'use strict';

  var DB_NAME = 'birdhouse-photos';
  var STORE = 'photos';
  var MAX_SIDE = 1400;
  var QUALITY = 0.72;

  var dbPromise = null;
  var urlCache = {};
  var useFallback = false;      /* localStorage data-URLs when IndexedDB is blocked */

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!global.indexedDB) { reject(new Error('no indexeddb')); return; }
      var req = global.indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error('idb error')); };
      req.onblocked = function () { reject(new Error('idb blocked')); };
    }).catch(function (e) { useFallback = true; throw e; });
    return dbPromise;
  }

  function tx(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode);
        var store = t.objectStore(STORE);
        var out = fn(store);
        t.oncomplete = function () {
          var isRequest = out && typeof out === 'object' && 'result' in out;
          resolve(isRequest ? out.result : out);
        };
        t.onerror = function () { reject(t.error); };
        t.onabort = function () { reject(t.error || new Error('aborted')); };
      });
    });
  }

  /* ---------------- shrinking ---------------- */

  function loadImage(file) {
    if (global.createImageBitmap) {
      return global.createImageBitmap(file, { imageOrientation: 'from-image' })
        .catch(function () { return loadViaTag(file); });
    }
    return loadViaTag(file);
  }

  function loadViaTag(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('bad image')); };
      img.src = url;
    });
  }

  function shrink(file) {
    return loadImage(file).then(function (img) {
      var w = img.width, h = img.height;
      var scale = Math.min(1, MAX_SIDE / Math.max(w, h));
      var cw = Math.max(1, Math.round(w * scale));
      var ch = Math.max(1, Math.round(h * scale));
      var canvas = document.createElement('canvas');
      canvas.width = cw; canvas.height = ch;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, cw, ch);
      if (img.close) img.close();
      return new Promise(function (resolve) {
        if (canvas.toBlob) canvas.toBlob(function (b) { resolve(b || file); }, 'image/jpeg', QUALITY);
        else resolve(dataURLtoBlob(canvas.toDataURL('image/jpeg', QUALITY)));
      });
    });
  }

  function dataURLtoBlob(dataURL) {
    var parts = dataURL.split(',');
    var mime = /:(.*?);/.exec(parts[0])[1];
    var bin = atob(parts[1]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  function blobToDataURL(blob) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(fr.result); };
      fr.onerror = function () { reject(fr.error); };
      fr.readAsDataURL(blob);
    });
  }

  /* ---------------- the fallback shelf ---------------- */

  function lsKey(id) { return 'birdhouses.photo.' + id; }

  function fbPut(id, blob) {
    return blobToDataURL(blob).then(function (url) {
      global.localStorage.setItem(lsKey(id), url);
      return id;
    });
  }
  function fbGet(id) {
    var v = global.localStorage.getItem(lsKey(id));
    return Promise.resolve(v ? { id: id, url: v } : null);
  }

  /* ---------------- public ---------------- */

  function add(file) {
    var id = (global.Store && global.Store.uid) ? global.Store.uid() : String(Date.now());
    return shrink(file).then(function (blob) {
      if (useFallback) return fbPut(id, blob);
      return tx('readwrite', function (s) { s.put({ id: id, blob: blob, createdAt: Date.now() }); })
        .then(function () { return id; })
        .catch(function () { useFallback = true; return fbPut(id, blob); });
    });
  }

  /* Returns a URL usable in <img src>, or null when the photo is gone. */
  function url(id) {
    if (!id) return Promise.resolve(null);
    if (urlCache[id]) return Promise.resolve(urlCache[id]);
    var get = useFallback
      ? fbGet(id)
      : tx('readonly', function (s) { return s.get(id); }).catch(function () { useFallback = true; return fbGet(id); });
    return get.then(function (rec) {
      if (!rec) return null;
      var u = rec.url ? rec.url : URL.createObjectURL(rec.blob);
      urlCache[id] = u;
      return u;
    }).catch(function () { return null; });
  }

  function remove(id) {
    if (!id) return Promise.resolve();
    if (urlCache[id]) {
      if (urlCache[id].indexOf('blob:') === 0) URL.revokeObjectURL(urlCache[id]);
      delete urlCache[id];
    }
    try { global.localStorage.removeItem(lsKey(id)); } catch (e) { /* ignore */ }
    if (useFallback) return Promise.resolve();
    return tx('readwrite', function (s) { s.delete(id); }).catch(function () {});
  }

  function removeMany(ids) {
    return Promise.all((ids || []).map(remove));
  }

  function count() {
    if (useFallback) {
      var n = 0;
      for (var i = 0; i < global.localStorage.length; i++) {
        if (String(global.localStorage.key(i)).indexOf('birdhouses.photo.') === 0) n++;
      }
      return Promise.resolve(n);
    }
    return tx('readonly', function (s) { return s.count(); }).catch(function () { return 0; });
  }

  /* Every photo as { id: dataURL } — used by the backup file. */
  function exportAll(ids) {
    var wanted = ids || [];
    return Promise.all(wanted.map(function (id) {
      var get = useFallback ? fbGet(id) : tx('readonly', function (s) { return s.get(id); }).catch(function () { return null; });
      return get.then(function (rec) {
        if (!rec) return null;
        if (rec.url) return { id: id, data: rec.url };
        return blobToDataURL(rec.blob).then(function (d) { return { id: id, data: d }; });
      }).catch(function () { return null; });
    })).then(function (list) {
      var out = {};
      list.forEach(function (e) { if (e) out[e.id] = e.data; });
      return out;
    });
  }

  function importAll(map) {
    var ids = Object.keys(map || {});
    return ids.reduce(function (chain, id) {
      return chain.then(function () {
        var blob;
        try { blob = dataURLtoBlob(map[id]); } catch (e) { return; }
        if (useFallback) { try { global.localStorage.setItem(lsKey(id), map[id]); } catch (e) {} return; }
        return tx('readwrite', function (s) { s.put({ id: id, blob: blob, createdAt: Date.now() }); })
          .catch(function () {});
      });
    }, Promise.resolve());
  }

  function clear() {
    Object.keys(urlCache).forEach(function (id) {
      if (urlCache[id].indexOf('blob:') === 0) URL.revokeObjectURL(urlCache[id]);
      delete urlCache[id];
    });
    try {
      var keys = [];
      for (var i = 0; i < global.localStorage.length; i++) {
        var k = global.localStorage.key(i);
        if (String(k).indexOf('birdhouses.photo.') === 0) keys.push(k);
      }
      keys.forEach(function (k) { global.localStorage.removeItem(k); });
    } catch (e) { /* ignore */ }
    if (useFallback) return Promise.resolve();
    return tx('readwrite', function (s) { s.clear(); }).catch(function () {});
  }

  /* Photos can be left behind if the app is closed part-way through adding a
     bird house. This drops anything no longer pointed at by a record. */
  function pruneOrphans(keepIds) {
    var keep = {};
    (keepIds || []).forEach(function (id) { keep[id] = true; });
    if (useFallback) {
      try {
        var stale = [];
        for (var i = 0; i < global.localStorage.length; i++) {
          var k = String(global.localStorage.key(i));
          if (k.indexOf('birdhouses.photo.') === 0 && !keep[k.slice(17)]) stale.push(k);
        }
        stale.forEach(function (k) { global.localStorage.removeItem(k); });
      } catch (e) { /* ignore */ }
      return Promise.resolve(0);
    }
    return tx('readonly', function (s) { return s.getAllKeys(); }).then(function (keys) {
      var stale = (keys || []).filter(function (id) { return !keep[id]; });
      if (!stale.length) return 0;
      return Promise.all(stale.map(remove)).then(function () { return stale.length; });
    }).catch(function () { return 0; });
  }

  global.Photos = {
    add: add, url: url, remove: remove, removeMany: removeMany,
    count: count, exportAll: exportAll, importAll: importAll, clear: clear,
    pruneOrphans: pruneOrphans
  };
})(window);
