/* =========================================================
   app.js — screens, forms and numbers.
   ========================================================= */
(function () {
  'use strict';

  var t = I18N.t;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function frag() { return document.createDocumentFragment(); }

  /* ---------------- small helpers ---------------- */

  var toastTimer = null;
  function toast(msg) {
    var box = $('#toast');
    box.textContent = msg;
    box.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { box.hidden = true; }, 2800);
  }

  /* localStorage on a full phone fails without a word; this is that word */
  function toastSaved() {
    toast(Store.saveFailed ? t('toast.storageFull') : t('toast.saved'));
  }

  function confirmAsk(text, yesLabel) {
    return new Promise(function (resolve) {
      var box = $('#confirm');
      $('#confirmText').textContent = text;
      $('#confirmYes').textContent = yesLabel || t('common.delete');
      $('#confirmNo').textContent = t('common.cancel');
      box.hidden = false;
      function done(v) {
        box.hidden = true;
        $('#confirmYes').removeEventListener('click', yes);
        $('#confirmNo').removeEventListener('click', no);
        resolve(v);
      }
      function yes() { done(true); }
      function no() { done(false); }
      $('#confirmYes').addEventListener('click', yes);
      $('#confirmNo').addEventListener('click', no);
    });
  }

  function showPhoto(id) {
    Photos.url(id).then(function (u) {
      if (!u) return;
      $('#lightboxImg').src = u;
      $('#lightbox').hidden = false;
    });
  }
  $('#lightboxClose').addEventListener('click', function () { $('#lightbox').hidden = true; });
  $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') $('#lightbox').hidden = true; });

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(I18N.locale(), { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function monthName(m) { return t('month.' + m); }
  function monthShort(m) { return t('mon.' + m); }

  /* ---------------- icons ---------------- */

  var TONE = { good: 'good', repair: 'warning', broken: 'critical', unknown: 'unknown' };
  var CONDITION_ICON = {
    good: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z"/></svg>',
    repair: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6.5 17.5 10 14 6.5 17.5 3a5 5 0 0 0-6.4 6.1L3 17.2 6.8 21l8.1-8.1A5 5 0 0 0 21 6.5Z"/></svg>',
    broken: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 1 21h22L12 2Zm1 14h-2v2h2v-2Zm0-7h-2v5h2V9Z"/></svg>',
    unknown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 16.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm1.7-6.1c-.7.5-.8.7-.8 1.2v.3h-1.8v-.5c0-1.2.4-1.8 1.4-2.5.7-.5.9-.8.9-1.3 0-.6-.5-1-1.3-1s-1.4.5-1.5 1.3H8.8C8.9 7.8 10.2 6.7 12 6.7c1.9 0 3.2 1 3.2 2.5 0 1-.4 1.6-1.5 2.4Z"/></svg>'
  };
  var CONDITION_LABEL = { good: 'cond.good', repair: 'cond.repair', broken: 'cond.broken', unknown: 'cond.unknown' };

  function conditionBadge(cond, big) {
    var c = TONE[cond] ? cond : 'unknown';
    var span = el('span', 'badge badge-' + TONE[c] + (big ? ' badge-lg' : ''));
    span.innerHTML = CONDITION_ICON[c];
    span.appendChild(document.createTextNode(t(CONDITION_LABEL[c])));
    return span;
  }

  /* a small side-view bird, coloured per species */
  function birdIconHTML(speciesId, size) {
    var def = I18N.speciesDef(speciesId);
    size = size || 46;
    if (!def || def.e) {
      return '<span class="emoji" aria-hidden="true" style="font-size:' + Math.round(size * 0.8) + 'px;line-height:1">' +
        (def ? def.e : '🐦') + '</span>';
    }
    var body = def.c[0], head = def.c[1], cheek = def.c[2];
    return '<svg viewBox="0 0 48 48" width="' + size + '" height="' + size + '" aria-hidden="true">' +
      '<path d="M10 26 1 19 4 33Z" fill="' + body + '"/>' +
      '<ellipse cx="22" cy="28" rx="14" ry="10" fill="' + body + '"/>' +
      '<ellipse cx="21" cy="30" rx="8.5" ry="5" fill="rgba(0,0,0,.14)"/>' +
      '<circle cx="34" cy="18" r="9.4" fill="' + head + '"/>' +
      '<circle cx="31.5" cy="21" r="4.2" fill="' + cheek + '"/>' +
      '<path d="M42.5 17.2 48 20l-5.5 2.6Z" fill="#e0952f"/>' +
      '<circle cx="36" cy="15.6" r="1.7" fill="#15171a"/>' +
      '<path d="M18 37.5v5M27 37.5v5" stroke="#e0952f" stroke-width="2.4" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* marks one button in a group as the chosen one, without redrawing
     the screen — redrawing would throw the reader back to the top */
  function pressOnly(container, chosen) {
    $$('[aria-pressed]', container).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === chosen));
    });
  }

  var CAMERA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9Zm3 5.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/></svg>';
  var ALBUM_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 17V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Zm-9.6-3.7 1.9 2.5 2.8-3.5 3.4 4.4H8.1l3.3-3.4ZM3 7v12a2 2 0 0 0 2 2h12v-2H5V7H3Z"/></svg>';

  function pinSVG() {
    return '<svg viewBox="0 0 32 44" aria-hidden="true">' +
      '<path class="pin-body" d="M16 0C7.7 0 1 6.7 1 15c0 11 15 29 15 29s15-18 15-29c0-8.3-6.7-15-15-15Z"/>' +
      '<circle class="pin-hole" cx="16" cy="15" r="5.6"/></svg>';
  }

  /* ---------------- screen stack ---------------- */

  var stack = [];

  function pushScreen(entry) {
    stack.push(entry);
    try { history.pushState({ birdScreen: stack.length }, ''); } catch (e) { /* ignore */ }
    drawScreen();
  }
  function popScreen() {
    if (!stack.length) return;
    try { history.back(); } catch (e) { closeTop(); }
  }
  function closeTop() {
    stack.pop();
    if (!stack.length) { $('#screen').hidden = true; document.body.style.overflow = ''; }
    else drawScreen();
  }
  /* closes every open screen at once, and rewinds history by the same amount
     so the phone's own Back button stays in step */
  function closeAllScreens() {
    var n = stack.length;
    if (!n) return;
    stack.length = 0;
    $('#screen').hidden = true;
    try { history.go(-n); } catch (e) { /* ignore */ }
  }
  function refreshScreen() { if (stack.length) drawScreen(); }
  function drawScreen() {
    var top = stack[stack.length - 1];
    $('#screenTitle').textContent = typeof top.title === 'function' ? top.title() : top.title;
    var body = $('#screenBody');
    body.innerHTML = '';
    body.appendChild(top.build());
    $('#screen').hidden = false;
    $('#screen').scrollTop = 0;
    I18N.applyTo(body);
  }
  $('#screenBack').addEventListener('click', popScreen);
  window.addEventListener('popstate', function () { if (stack.length) closeTop(); });

  /* ---------------- views / tabs ---------------- */

  var currentView = 'map';
  function showView(name) {
    currentView = name;
    $$('.view').forEach(function (v) { v.classList.toggle('is-active', v.id === 'view-' + name); });
    $$('#tabbar .tab').forEach(function (b) {
      if (b.dataset.view === name) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    var titles = { map: 'app.name', houses: 'nav.houses', add: 'map.addHere',
      gallery: 'gallery.title', stats: 'stats.title' };
    $('#topbarTitle').textContent = t(titles[name] || 'app.name');

    if (name === 'map') { ensureMainMap(); mainMap.render(); refreshMarkers(); }
    if (name === 'houses') renderHouseList();
    if (name === 'gallery') renderGallery();
    if (name === 'stats') renderStats();
    if (name === 'add') startWizard();
    window.scrollTo(0, 0);
  }
  $$('#tabbar .tab').forEach(function (b) {
    b.addEventListener('click', function () { showView(b.dataset.view); });
  });

  /* =========================================================
     MAP
     ========================================================= */

  var mainMap = null, meMarker = null;

  /* until the first bird house is placed, the map opens over Germany */
  var GERMANY = { lat: 51.16, lng: 10.45 };
  var GERMANY_ZOOM = 6;

  function ensureMainMap() {
    if (mainMap) return mainMap;
    var start = Store.settings.lastCenter || GERMANY;
    mainMap = new MiniMap($('#map'), {
      center: start,
      zoom: Store.settings.lastCenter ? 16 : GERMANY_ZOOM,
      layer: Store.settings.layer || 'streets',
      onMove: function (c) {
        Store.settings.lastCenter = c;
      }
    });
    $('#mapAttribution').innerHTML = mainMap.attribution();
    if (Store.data.houses.length) {
      mainMap.fitPoints(Store.data.houses.map(function (h) { return { lat: h.lat, lng: h.lng }; }), 17);
    }
    return mainMap;
  }

  function refreshMarkers() {
    if (!mainMap) return;
    mainMap.clearMarkers();
    meMarker = null;
    Store.data.houses.forEach(function (h) {
      var b = el('button', 'pin is-' + TONE[h.condition]);
      b.type = 'button';
      b.innerHTML = pinSVG();
      var lab = el('span', 'pin-label', h.name || '—');
      b.appendChild(lab);
      b.setAttribute('aria-label', h.name || '');
      b.addEventListener('click', function (e) { e.stopPropagation(); openHouse(h.id); });
      mainMap.addMarker({ el: b, lat: h.lat, lng: h.lng });
    });
    $('#mapEmpty').hidden = Store.data.houses.length > 0;
  }

  function addMeMarker(map, pos) {
    if (meMarker) { meMarker.el.remove(); map.markers = map.markers.filter(function (m) { return m !== meMarker; }); }
    var d = el('div', 'pin is-me');
    d.appendChild(el('div', 'dot-me'));
    meMarker = map.addMarker({ el: d, lat: pos.lat, lng: pos.lng });
  }

  function locateInto(map, btn) {
    var old = btn ? btn.innerHTML : null;
    toast(t('map.locating'));
    map.locate().then(function (pos) {
      map.setView({ lat: pos.lat, lng: pos.lng }, Math.max(map.getZoom(), 17));
      if (map === mainMap) addMeMarker(map, pos);
    }).catch(function () {
      toast(t('map.locateFail'));
    }).then(function () { if (btn && old) btn.innerHTML = old; });
  }

  $('#btnLocate').addEventListener('click', function () { locateInto(ensureMainMap(), null); });
  $('#btnFit').addEventListener('click', function () {
    var pts = Store.data.houses.map(function (h) { return { lat: h.lat, lng: h.lng }; });
    if (!pts.length) { toast(t('map.emptyTitle')); return; }
    ensureMainMap().fitPoints(pts, 17);
  });
  $('#btnLayer').addEventListener('click', function () {
    var next = (Store.settings.layer === 'satellite') ? 'streets' : 'satellite';
    Store.settings.layer = next; Store.save();
    [mainMap, pickMap].forEach(function (m) { if (m) m.setLayer(next); });
    $('#btnLayer').querySelector('span').textContent = next === 'satellite' ? t('map.streets') : t('map.satellite');
    if (mainMap) $('#mapAttribution').innerHTML = mainMap.attribution();
    if (pickMap) $('#pickAttribution').innerHTML = pickMap.attribution();
  });
  $('#btnAddFromMap').addEventListener('click', function () {
    wizStartCenter = mainMap ? mainMap.getCenter() : null;
    wizStartZoom = mainMap ? Math.max(mainMap.getZoom(), 17) : null;
    showView('add');
  });

  /* =========================================================
     HOUSE LIST
     ========================================================= */

  function houseThumb(h) {
    var box = el('div', 'card-thumb');
    if (h.photos && h.photos.length) {
      var img = el('img');
      img.alt = '';
      Photos.url(h.photos[0]).then(function (u) { if (u) img.src = u; else box.textContent = '🌳'; });
      box.appendChild(img);
    } else {
      box.textContent = '🌳';
    }
    return box;
  }

  function houseCard(h) {
    var card = el('button', 'card');
    card.type = 'button';
    card.appendChild(houseThumb(h));

    var body = el('div', 'card-body');
    body.appendChild(el('h3', 'card-title', h.name || '—'));

    var sights = Store.sightingsFor(h.id);
    var thisYear = new Date().getFullYear();
    var names = {};
    sights.filter(function (s) { return s.year === thisYear; })
      .forEach(function (s) { names[s.otherName || I18N.speciesName(s.species)] = true; });
    var list = Object.keys(names);

    var meta = el('p', 'card-meta');
    if (list.length) {
      meta.appendChild(document.createTextNode(thisYear + ': '));
      meta.appendChild(el('strong', null, list.slice(0, 2).join(', ') + (list.length > 2 ? ' +' + (list.length - 2) : '')));
    } else {
      meta.textContent = h.tree || t('house.noBirds');
    }
    body.appendChild(meta);

    var row = el('div', 'badge-row');
    row.appendChild(conditionBadge(h.condition));
    body.appendChild(row);

    card.appendChild(body);
    card.addEventListener('click', function () { openHouse(h.id); });
    return card;
  }

  function renderHouseList() {
    var box = $('#houseList');
    box.innerHTML = '';
    var list = Store.data.houses.slice();
    var mode = $('#sortBy').value;
    if (mode === 'recent') list.sort(function (a, b) { return b.createdAt - a.createdAt; });
    else if (mode === 'condition') {
      var rank = { broken: 0, repair: 1, unknown: 2, good: 3 };
      list.sort(function (a, b) { return (rank[a.condition] - rank[b.condition]) || a.name.localeCompare(b.name); });
    } else list.sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', I18N.locale()); });

    if (!list.length) {
      var e = el('div', 'empty');
      e.appendChild(el('span', 'empty-emoji', '🏠'));
      e.appendChild(el('p', null, t('list.empty')));
      e.appendChild(el('p', 'muted', t('list.emptyHint')));
      box.appendChild(e);
      return;
    }
    list.forEach(function (h) { box.appendChild(houseCard(h)); });
  }
  $('#sortBy').addEventListener('change', renderHouseList);

  /* =========================================================
     ADD WIZARD
     ========================================================= */

  var wiz = null, pickMap = null, wizStartCenter = null, wizStartZoom = null;

  function blankWiz() {
    return { step: 1, photos: [], name: '', tree: '', condition: 'good', date: Store.todayISO(), houseId: null };
  }

  function startWizard() {
    if (!wiz || wiz.step === 4) wiz = blankWiz();
    ensurePickMap();
    if (wizStartCenter) { pickMap.setView(wizStartCenter, wizStartZoom || 17); wizStartCenter = null; }
    renderWizCondition();
    renderWizPhotos();
    renderNameSuggestions();
    $('#wizName').value = wiz.name;
    $('#wizTree').value = wiz.tree;
    $('#wizDate').value = wiz.date;
    setWizStep(wiz.step);
  }

  function ensurePickMap() {
    if (pickMap) { pickMap.render(); return pickMap; }
    var c = Store.settings.lastCenter || GERMANY;
    pickMap = new MiniMap($('#pickMap'), {
      center: c,
      zoom: Store.settings.lastCenter ? 17 : GERMANY_ZOOM,
      layer: Store.settings.layer || 'streets'
    });
    $('#pickAttribution').innerHTML = pickMap.attribution();
    return pickMap;
  }

  function setWizStep(n) {
    wiz.step = n;
    $$('.wiz-step').forEach(function (s) { s.hidden = (+s.dataset.step !== n); });
    $$('#wizSteps .dot').forEach(function (d, i) { d.classList.toggle('is-on', i < n); });
    $('#wizNav').hidden = (n === 4);
    $('#wizBack').hidden = (n === 1);
    $('#wizNav').classList.toggle('no-back', n === 1);
    $('#wizNext').textContent = n === 3 ? t('common.save') : t('common.next');
    if (n === 1 && pickMap) pickMap.render();
    if (n === 2) $('#wizNext').textContent = wiz.photos.length ? t('common.next') : t('common.skip');
  }

  function renderWizCondition() {
    var box = $('#wizCondition');
    box.innerHTML = '';
    box.appendChild(conditionChoices(wiz.condition, function (c) { wiz.condition = c; }));
  }

  function conditionChoices(current, onPick) {
    var grid = el('div', 'choice-grid');
    Store.CONDITIONS.forEach(function (c) {
      var b = el('button', 'choice');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(c === current));
      var dot = el('span', 'dot-status');
      dot.style.background = 'var(--' + (TONE[c] === 'unknown' ? 'unknown' : TONE[c]) + ')';
      b.appendChild(dot);
      var txt = el('span');
      txt.appendChild(document.createTextNode(t(CONDITION_LABEL[c])));
      txt.appendChild(el('span', 'choice-sub', t(CONDITION_LABEL[c] + '.sub')));
      b.appendChild(txt);
      b.appendChild(el('span', 'tick', '✓'));
      b.addEventListener('click', function () { pressOnly(grid, b); onPick(c); });
      grid.appendChild(b);
    });
    return grid;
  }

  function renderNameSuggestions() {
    var box = $('#wizNameSuggestions');
    box.innerHTML = '';
    var used = {};
    Store.data.houses.forEach(function (h) { if (h.tree) used[h.tree] = true; });
    var base = Object.keys(used).slice(0, 4);
    var n = Store.data.houses.length + 1;
    var suggestions = [t('wiz.suggest', { n: n })];
    base.forEach(function (b) { suggestions.push(b + ' ' + n); });
    suggestions.slice(0, 4).forEach(function (s) {
      var c = el('button', 'chip', s);
      c.type = 'button';
      c.addEventListener('click', function () { $('#wizName').value = s; wiz.name = s; });
      box.appendChild(c);
    });
  }

  function renderWizPhotos() {
    var box = $('#wizPhotos');
    box.innerHTML = '';
    wiz.photos.forEach(function (pid) {
      box.appendChild(photoThumb(pid, function () {
        wiz.photos = wiz.photos.filter(function (x) { return x !== pid; });
        Store.removeFromGallery(pid);
        Photos.remove(pid);
        updateGalleryBadge();
        renderWizPhotos();
        setWizStep(wiz.step);
      }));
    });
  }

  function photoThumb(pid, onDelete) {
    var wrap = el('div', 'photo-thumb');
    var img = el('img');
    img.alt = '';
    Photos.url(pid).then(function (u) { if (u) img.src = u; });
    wrap.appendChild(img);
    img.addEventListener('click', function () { showPhoto(pid); });
    if (onDelete) {
      var del = el('button', 'photo-del', '✕');
      del.type = 'button';
      del.setAttribute('aria-label', t('common.remove'));
      del.addEventListener('click', function (e) { e.stopPropagation(); onDelete(); });
      wrap.appendChild(del);
    }
    return wrap;
  }

  function handlePhotoInput(input, onAdded) {
    var files = Array.prototype.slice.call(input.files || []);
    input.value = '';
    if (!files.length) return;
    files.reduce(function (chain, f) {
      return chain.then(function () {
        return Photos.add(f).then(function (id) { onAdded(id); })
          .catch(function () { toast(t('toast.photoFail')); });
      });
    }, Promise.resolve()).then(function () { toast(t('toast.photoAdded')); });
  }

  $('#wizPhotoInput').addEventListener('change', function () {
    handlePhotoInput(this, function (id) { wiz.photos.push(id); renderWizPhotos(); setWizStep(wiz.step); });
  });
  $('#wizName').addEventListener('input', function () { wiz.name = this.value; });
  $('#wizTree').addEventListener('input', function () { wiz.tree = this.value; });
  $('#wizDate').addEventListener('change', function () { wiz.date = this.value; });

  $('#btnPickLocate').addEventListener('click', function () { locateInto(ensurePickMap(), null); });
  $('#btnPickLocate2').addEventListener('click', function () { locateInto(ensurePickMap(), null); });

  $('#wizBack').addEventListener('click', function () { if (wiz.step > 1) setWizStep(wiz.step - 1); });
  $('#wizNext').addEventListener('click', function () {
    if (wiz.step === 1) {
      var c = ensurePickMap().getCenter();
      wiz.lat = c.lat; wiz.lng = c.lng;
      Store.settings.lastCenter = c; Store.save();
      setWizStep(2);
      return;
    }
    if (wiz.step === 2) { setWizStep(3); return; }
    if (wiz.step === 3) {
      var name = $('#wizName').value.trim();
      if (!name) { toast(t('wiz.needName')); $('#wizName').focus(); return; }
      var h = Store.addHouse({
        name: name, lat: wiz.lat, lng: wiz.lng, tree: $('#wizTree').value,
        condition: wiz.condition, placedOn: $('#wizDate').value, photos: wiz.photos
      });
      wiz.houseId = h.id;
      Store.detachFromGallery(wiz.photos);
      updateGalleryBadge();
      if (Store.saveFailed) toast(t('toast.storageFull'));
      $('#wizDoneName').textContent = t('wiz.savedAs', { name: h.name });
      setWizStep(4);
      refreshMarkers();
      if (mainMap) mainMap.setView({ lat: h.lat, lng: h.lng }, Math.max(mainMap.getZoom(), 17));
    }
  });
  $('#btnDoneSeeHouse').addEventListener('click', function () {
    var id = wiz.houseId;
    wiz = blankWiz();
    showView('map');
    openHouse(id);
  });
  $('#btnDoneAnother').addEventListener('click', function () { wiz = blankWiz(); startWizard(); });

  /* =========================================================
     PHOTOS — a shelf for pictures taken before it is decided
     which bird house they belong to.
     ========================================================= */

  function updateGalleryBadge() {
    var badge = $('#galleryBadge');
    if (!badge) return;
    var n = Store.data.gallery.length;
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.hidden = !n;
    /* read out as "Fotos — noch 2 Fotos ohne Nistkasten", not as "Fotos 2" */
    var tab = $('#tabbar .tab[data-view="gallery"]');
    if (!tab) return;
    if (n) {
      tab.setAttribute('aria-label', t('nav.gallery') + ' — ' +
        (n === 1 ? t('gallery.waitCount1') : t('gallery.waitCount', { n: n })));
    } else {
      tab.removeAttribute('aria-label');
    }
  }

  function photoCountLabel(n) {
    return n === 1 ? t('gallery.photoCount1') : t('gallery.photoCount', { n: n });
  }

  /* one button opens the camera, the other the pictures already on the phone */
  function photoPickButton(labelKey, iconSVG, useCamera, onAdded) {
    var lab = el('label', 'btn btn-big btn-photo' + (useCamera ? ' btn-primary' : ''));
    lab.innerHTML = iconSVG;
    lab.appendChild(el('span', null, t(labelKey)));
    var input = el('input');
    input.type = 'file';
    input.accept = 'image/*';
    if (useCamera) input.capture = 'environment';
    input.multiple = true;
    input.hidden = true;
    input.addEventListener('change', function () { handlePhotoInput(this, onAdded); });
    lab.appendChild(input);
    return lab;
  }

  function onGalleryPhoto(photoId) {
    Store.addToGallery(photoId);
    renderGallery();
  }

  function renderGallery() {
    var box = $('#galleryBody');
    box.innerHTML = '';
    updateGalleryBadge();

    box.appendChild(el('p', 'q-help gal-intro', t('gallery.intro')));

    var actions = el('div', 'gal-actions');
    actions.appendChild(photoPickButton('gallery.take', CAMERA_SVG, true, onGalleryPhoto));
    actions.appendChild(photoPickButton('gallery.pick', ALBUM_SVG, false, onGalleryPhoto));
    box.appendChild(actions);

    /* ---- still waiting for a bird house ---- */
    var waiting = Store.gallery();
    if (waiting.length) {
      var ws = el('section', 'section');
      ws.appendChild(el('h3', 'section-title', t('gallery.waiting')));
      ws.appendChild(el('p', 'muted', t('gallery.waitingHint')));
      var list = el('div', 'gal-list');
      waiting.forEach(function (g) { list.appendChild(galleryCard(g.id)); });
      ws.appendChild(list);
      box.appendChild(ws);
    }

    /* ---- already with a bird house, grouped by bird house ---- */
    var withPhotos = Store.data.houses.filter(function (h) { return h.photos && h.photos.length; });

    if (!waiting.length && withPhotos.length) {
      var done = el('p', 'all-sorted', t('gallery.allSorted'));
      box.appendChild(done);
    }

    if (withPhotos.length) {
      withPhotos.sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', I18N.locale()); });
      var as = el('section', 'section');
      as.appendChild(el('h3', 'section-title', t('gallery.assigned')));
      as.appendChild(el('p', 'muted', t('gallery.tapPhoto')));
      withPhotos.forEach(function (h) { as.appendChild(housePhotoGroup(h)); });
      box.appendChild(as);
    }

    if (!waiting.length && !withPhotos.length) {
      var e = el('div', 'empty');
      e.appendChild(el('span', 'empty-emoji', '📷'));
      e.appendChild(el('p', null, t('gallery.empty')));
      box.appendChild(e);
    }
  }

  /* one waiting photo, big, with its own two buttons underneath */
  function galleryCard(pid) {
    var card = el('div', 'gal-card');
    var img = el('img', 'gal-photo');
    img.alt = '';
    Photos.url(pid).then(function (u) { if (u) img.src = u; });
    img.addEventListener('click', function () { showPhoto(pid); });
    card.appendChild(img);

    var assign = el('button', 'btn btn-big btn-primary', t('gallery.assign'));
    assign.type = 'button';
    assign.addEventListener('click', function () { openAssignPhoto(pid); });
    card.appendChild(assign);

    var del = el('button', 'btn', t('gallery.deletePhoto'));
    del.type = 'button';
    del.addEventListener('click', function () {
      confirmAsk(t('gallery.confirmDelete')).then(function (ok) {
        if (!ok) return;
        Store.removeFromGallery(pid);
        Photos.remove(pid);
        renderGallery();
        toast(t('toast.deleted'));
      });
    });
    card.appendChild(del);
    return card;
  }

  function housePhotoGroup(h) {
    var wrap = el('div', 'gal-house');
    var head = el('button', 'gal-house-head');
    head.type = 'button';
    head.appendChild(el('span', 'gal-house-name', h.name || '—'));
    head.appendChild(el('span', 'gal-house-count', photoCountLabel(h.photos.length)));
    var chev = el('span', 'gal-chev', '›');
    chev.setAttribute('aria-hidden', 'true');
    head.appendChild(chev);
    head.addEventListener('click', function () { openHouse(h.id); });
    wrap.appendChild(head);

    var strip = el('div', 'photo-strip');
    h.photos.forEach(function (pid) { strip.appendChild(photoThumb(pid, null)); });
    wrap.appendChild(strip);
    return wrap;
  }

  /* ---------------- which bird house is this photo of? ---------------- */

  function openAssignPhoto(pid) {
    pushScreen({ title: t('gallery.assignTitle'), build: function () { return buildAssignPhoto(pid); } });
  }

  function buildAssignPhoto(pid) {
    var box = frag();

    var hero = el('img', 'hero-photo');
    hero.alt = '';
    Photos.url(pid).then(function (u) { if (u) hero.src = u; });
    hero.addEventListener('click', function () { showPhoto(pid); });
    box.appendChild(hero);

    var houses = Store.data.houses.slice().sort(function (a, b) {
      return (a.name || '').localeCompare(b.name || '', I18N.locale());
    });

    if (houses.length) {
      var q = el('h3', 'q', t('gallery.assignHint'));
      q.style.marginTop = '18px';
      box.appendChild(q);
      var list = el('div', 'card-list');
      houses.forEach(function (h) {
        var card = el('button', 'card');
        card.type = 'button';
        card.appendChild(houseThumb(h));
        var body = el('div', 'card-body');
        body.appendChild(el('h3', 'card-title', h.name || '—'));
        body.appendChild(el('p', 'card-meta', h.tree || photoCountLabel((h.photos || []).length)));
        card.appendChild(body);
        card.addEventListener('click', function () {
          Store.assignPhoto(pid, h.id);
          popScreen();
          toast(Store.saveFailed ? t('toast.storageFull') : t('gallery.addedTo', { name: h.name }));
          renderGallery();
          renderHouseList();
        });
        list.appendChild(card);
      });
      box.appendChild(list);
    } else {
      var none = el('p', 'q-help', t('gallery.noHouses'));
      none.style.marginTop = '18px';
      box.appendChild(none);
    }

    /* the tree in the photo may not be written down at all yet */
    var stackEl = el('div', 'stack');
    var nb = el('button', 'btn btn-big' + (houses.length ? '' : ' btn-primary'), t('gallery.newHouse'));
    nb.type = 'button';
    nb.addEventListener('click', function () { startWizardWithPhoto(pid); });
    stackEl.appendChild(nb);
    box.appendChild(stackEl);

    return box;
  }

  /* The photo stays on the shelf until the bird house is really saved, so
     a wizard broken off half way never loses it. */
  function startWizardWithPhoto(pid) {
    closeAllScreens();
    wiz = blankWiz();
    wiz.photos = [pid];
    showView('add');
  }

  /* =========================================================
     HOUSE DETAIL
     ========================================================= */

  function openHouse(id) {
    pushScreen({
      title: function () { var h = Store.house(id); return h ? h.name : ''; },
      build: function () { return buildHouseScreen(id); }
    });
  }

  function buildHouseScreen(id) {
    var h = Store.house(id);
    var box = frag();
    if (!h) { box.appendChild(el('p', null, '—')); return box; }

    /* hero photo */
    if (h.photos.length) {
      var hero = el('img', 'hero-photo');
      hero.alt = '';
      Photos.url(h.photos[0]).then(function (u) { if (u) hero.src = u; });
      hero.addEventListener('click', function () { showPhoto(h.photos[0]); });
      box.appendChild(hero);
    }

    /* ---------- 1. how the box is doing, and what has been done to it ---------- */
    var care = sectionCard('care', '🔧', t('house.careSection'));
    var statusLine = el('div', 'status-line');
    statusLine.appendChild(conditionBadge(h.condition, true));
    care.body.appendChild(statusLine);
    /* needing attention while the box itself is fine means: not seen to for a year */
    var cond = TONE[h.condition] ? h.condition : 'unknown';
    var overdue = Store.needsAttention(h) && cond !== 'repair' && cond !== 'broken';
    /* "nothing to do" next to "not cleaned for over a year" would contradict
       itself, so an overdue good box is told only the one thing that matters */
    if (!(overdue && cond === 'good')) {
      care.body.appendChild(el('p', 'status-what', t('care.' + cond)));
    }
    if (overdue) care.body.appendChild(el('p', 'care-note', t('care.overdue')));

    var last = Store.lastMaintenance(h.id);
    var careFacts = el('dl', 'kv-list');
    kvRow(careFacts, t('house.lastCheck'), last ? fmtDate(last.date) : t('house.never'));
    care.body.appendChild(careFacts);

    var careAct = el('div', 'stack');
    careAct.appendChild(bigAction('house.addMaint', '🧰', function () { openMaintForm(h.id); }));
    care.body.appendChild(careAct);

    var jobs = Store.maintenanceFor(h.id);
    if (jobs.length) {
      care.body.appendChild(el('h4', 'sub-title', t('house.maintHistory')));
      var mtl = el('div', 'timeline');
      jobs.forEach(function (m) { mtl.appendChild(maintItem(m, h.id)); });
      care.body.appendChild(mtl);
    } else {
      var noMaint = el('p', 'muted', t('house.noMaint'));
      noMaint.style.margin = '16px 0 0';
      care.body.appendChild(noMaint);
    }
    box.appendChild(care.el);

    /* ---------- 2. the birds living in it ---------- */
    var birds = sectionCard('birds', '🐦', t('house.birdSection'));
    var sights = Store.sightingsFor(h.id);
    var thisYear = new Date().getFullYear();
    var seen = {};
    sights.forEach(function (s) {
      if (s.year === thisYear) seen[s.otherName || I18N.speciesName(s.species)] = true;
    });
    var seenNames = Object.keys(seen);
    if (seenNames.length) {
      birds.body.appendChild(el('p', 'status-what', t('house.thisYearBirds', { names: seenNames.join(', ') })));
    } else if (!sights.length) {
      birds.body.appendChild(el('p', 'muted', t('house.noBirds')));
    }

    var birdAct = el('div', 'stack');
    birdAct.appendChild(bigAction('house.addBird', '🐦', function () { openBirdForm(h.id); }));
    birds.body.appendChild(birdAct);

    if (sights.length) {
      birds.body.appendChild(el('h4', 'sub-title', t('house.birds')));
      var tl = el('div', 'timeline');
      var currentYear = null;
      sights.forEach(function (s) {
        if (s.year !== currentYear) {
          currentYear = s.year;
          var yh = el('h5', 'sub-title', String(currentYear));
          yh.style.margin = '14px 0 6px';
          tl.appendChild(yh);
        }
        tl.appendChild(sightingItem(s, h.id));
      });
      birds.body.appendChild(tl);
    }
    box.appendChild(birds.el);

    /* ---------- 3. photos of the tree ---------- */
    var ps = el('section', 'section');
    ps.appendChild(el('h3', 'section-title', t('house.photos')));
    var strip = el('div', 'photo-strip');
    h.photos.forEach(function (pid) {
      strip.appendChild(photoThumb(pid, function () {
        confirmAsk(t('gallery.confirmDelete'), t('common.delete')).then(function (ok) {
          if (!ok) return;
          var cur = Store.house(h.id);
          Store.updateHouse(h.id, { photos: cur.photos.filter(function (x) { return x !== pid; }) });
          Photos.remove(pid);
          refreshScreen();
        });
      }));
    });
    ps.appendChild(strip);
    var addLabel = el('label', 'btn btn-big btn-photo');
    addLabel.innerHTML = CAMERA_SVG;
    addLabel.appendChild(el('span', null, t('house.addPhoto')));
    var addInput = el('input');
    addInput.type = 'file'; addInput.accept = 'image/*'; addInput.capture = 'environment';
    addInput.multiple = true; addInput.hidden = true;
    addInput.addEventListener('change', function () {
      handlePhotoInput(this, function (pid) {
        var cur = Store.house(h.id);
        Store.updateHouse(h.id, { photos: cur.photos.concat([pid]) });
        refreshScreen();
      });
    });
    addLabel.appendChild(addInput);
    ps.appendChild(addLabel);
    box.appendChild(ps);

    /* ---------- 4. the plain facts ---------- */
    var facts = el('section', 'section');
    facts.appendChild(el('h3', 'section-title', t('house.details')));
    var panel = el('dl', 'panel');
    kvRow(panel, t('house.tree'), h.tree || '—');
    kvRow(panel, t('house.placed'), fmtDate(h.placedOn));
    facts.appendChild(panel);
    if (h.notes) {
      var np = el('div', 'panel');
      np.style.marginTop = '10px';
      np.appendChild(el('p', null, h.notes));
      facts.appendChild(np);
    }
    box.appendChild(facts);

    /* footer actions */
    var foot = el('section', 'section');
    var stackEl = el('div', 'stack');
    var mapBtn = el('button', 'btn btn-big', t('house.showOnMap'));
    mapBtn.type = 'button';
    mapBtn.addEventListener('click', function () {
      closeAllScreens();
      showView('map');
      ensureMainMap().setView({ lat: h.lat, lng: h.lng }, 18);
    });
    stackEl.appendChild(mapBtn);

    var editBtn = el('button', 'btn btn-big', t('house.editHouse'));
    editBtn.type = 'button';
    editBtn.addEventListener('click', function () { openEditHouse(h.id); });
    stackEl.appendChild(editBtn);

    var delBtn = el('button', 'btn btn-big btn-danger', t('house.deleteHouse'));
    delBtn.type = 'button';
    delBtn.addEventListener('click', function () {
      confirmAsk(t('house.confirmDelete', { name: h.name })).then(function (ok) {
        if (!ok) return;
        var photoIds = Store.removeHouse(h.id);
        Photos.removeMany(photoIds);
        closeAllScreens();
        refreshMarkers();
        renderHouseList();
        toast(t('toast.deleted'));
      });
    });
    stackEl.appendChild(delBtn);
    foot.appendChild(stackEl);
    box.appendChild(foot);

    return box;
  }

  /* One subject, in its own bordered card with a coloured heading: the
     condition of the box and the birds in it are two different things. */
  function sectionCard(kind, emoji, title) {
    var sec = el('section', 'section-card section-card-' + kind);
    var head = el('div', 'section-head');
    var em = el('span', 'section-emoji', emoji);
    em.setAttribute('aria-hidden', 'true');
    head.appendChild(em);
    head.appendChild(el('h3', null, title));
    sec.appendChild(head);
    var body = el('div', 'section-body');
    sec.appendChild(body);
    return { el: sec, body: body };
  }

  function kvRow(parent, key, value) {
    var row = el('div', 'kv');
    row.appendChild(el('dt', null, key));
    row.appendChild(el('dd', null, value));
    parent.appendChild(row);
    return row;
  }

  function bigAction(key, emoji, onClick) {
    var b = el('button', 'btn btn-big btn-primary');
    b.type = 'button';
    b.appendChild(el('span', null, emoji));
    b.appendChild(el('span', null, t(key)));
    b.addEventListener('click', onClick);
    return b;
  }

  var STATUS_EMOJI = { nesting: '🥚', visiting: '👀', roosting: '🌙' };

  function sightingItem(s, houseId) {
    var item = el('div', 'tl-item');
    var ic = el('div', 'tl-icon');
    ic.innerHTML = birdIconHTML(s.species, 34);
    item.appendChild(ic);
    var body = el('div', 'tl-body');
    body.appendChild(el('p', 'tl-title', s.otherName || I18N.speciesName(s.species)));
    body.appendChild(el('p', 'tl-when', monthName(s.month) + ' ' + s.year + ' · ' +
      (STATUS_EMOJI[s.status] || '') + ' ' + t('bird.' + s.status)));
    if (s.notes) body.appendChild(el('p', 'tl-note', s.notes));
    item.appendChild(body);
    var del = el('button', 'tl-del', '✕');
    del.type = 'button';
    del.setAttribute('aria-label', t('common.delete'));
    del.addEventListener('click', function () {
      confirmAsk(t('common.delete') + '?').then(function (ok) {
        if (!ok) return;
        Store.removeSighting(s.id); refreshScreen(); toast(t('toast.deleted'));
      });
    });
    item.appendChild(del);
    return item;
  }

  var MAINT_EMOJI = { cleaned: '🧽', repaired: '🔧', replaced: '🆕', checked: '👀' };

  function maintItem(m) {
    var item = el('div', 'tl-item');
    var ic = el('div', 'tl-icon', MAINT_EMOJI[m.kind] || '🧰');
    item.appendChild(ic);
    var body = el('div', 'tl-body');
    body.appendChild(el('p', 'tl-title', t('maint.' + m.kind)));
    body.appendChild(el('p', 'tl-when', fmtDate(m.date)));
    if (m.notes) body.appendChild(el('p', 'tl-note', m.notes));
    item.appendChild(body);
    var del = el('button', 'tl-del', '✕');
    del.type = 'button';
    del.setAttribute('aria-label', t('common.delete'));
    del.addEventListener('click', function () {
      confirmAsk(t('common.delete') + '?').then(function (ok) {
        if (!ok) return;
        Store.removeMaintenance(m.id); refreshScreen(); toast(t('toast.deleted'));
      });
    });
    item.appendChild(del);
    return item;
  }

  /* =========================================================
     BIRD SIGHTING FORM
     ========================================================= */

  function openBirdForm(houseId) {
    var now = new Date();
    var draft = { species: null, otherName: '', month: now.getMonth() + 1, year: now.getFullYear(), status: 'nesting', notes: '' };
    pushScreen({ title: t('bird.title'), build: function () { return buildBirdForm(houseId, draft); } });
  }

  /* Which birds this person has already written down, anywhere. Their own
     birds come back year after year, so these belong at the very top. */
  function recentSpecies(limit) {
    var seen = {}, out = [];
    Store.data.sightings.slice()
      .sort(function (a, b) { return (b.createdAt || 0) - (a.createdAt || 0); })
      .forEach(function (s) {
        var def = I18N.speciesDef(s.species);
        if (!def || def.id === 'other' || seen[def.id]) return;
        seen[def.id] = true;
        out.push(def);
      });
    return out.slice(0, limit || 8);
  }

  function buildBirdForm(houseId, d) {
    var box = el('div');

    /* ---------- which bird ---------- */

    box.appendChild(el('h3', 'q', t('bird.which')));

    /* the chosen bird stays in sight at the top, so it is never a guess */
    var chosen = el('div', 'chosen-bird');
    box.appendChild(chosen);

    function drawChosen() {
      chosen.innerHTML = '';
      chosen.hidden = !d.species;
      if (!d.species) return;
      var ic = el('span');
      ic.innerHTML = birdIconHTML(d.species, 40);
      chosen.appendChild(ic);
      var txt = el('span');
      txt.appendChild(el('span', 'chosen-label', t('bird.chosen')));
      txt.appendChild(el('span', 'chosen-name', I18N.speciesName(d.species)));
      chosen.appendChild(txt);
    }

    function pick(id) {
      d.species = id;
      $$('.species-btn', box).forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.sp === id));
      });
      if (id !== 'other') d.otherName = '';
      otherField.hidden = (id !== 'other');
      otherInput.value = d.otherName;
      drawChosen();
    }

    function speciesButton(sp, wide) {
      var b = el('button', 'species-btn' + (wide ? ' species-btn-wide' : ''));
      b.type = 'button';
      b.dataset.sp = sp.id;
      b.setAttribute('aria-pressed', String(d.species === sp.id));
      b.innerHTML = birdIconHTML(sp.id, 44);
      b.appendChild(el('span', null, I18N.speciesName(sp.id)));
      b.addEventListener('click', function () { pick(sp.id); });
      return b;
    }

    function speciesGrid(list) {
      var g = el('div', 'species-grid');
      list.forEach(function (sp) { g.appendChild(speciesButton(sp)); });
      return g;
    }

    /* ---------- searching by name ---------- */

    var searchWrap = el('div', 'search-wrap');
    var search = el('input', 'input');
    search.type = 'search';
    search.autocomplete = 'off';
    search.placeholder = t('bird.searchPh');
    search.setAttribute('aria-label', t('bird.search'));
    searchWrap.appendChild(search);
    var clearBtn = el('button', 'search-clear', '✕');
    clearBtn.type = 'button';
    clearBtn.hidden = true;
    clearBtn.setAttribute('aria-label', t('bird.clearSearch'));
    searchWrap.appendChild(clearBtn);
    box.appendChild(searchWrap);

    var results = el('div');
    results.hidden = true;
    box.appendChild(results);

    /* ---------- the birds, in groups ---------- */

    var groups = el('div');
    box.appendChild(groups);

    /* a group that is simply there, no opening needed */
    function plainGroup(titleText, list) {
      var sec = el('section', 'species-group species-group-plain');
      sec.style.borderTop = '0';
      sec.appendChild(el('h4', 'section-title', titleText));
      sec.appendChild(speciesGrid(list));
      return sec;
    }

    /* a group that is folded away until it is tapped */
    function foldedGroup(titleText, list) {
      var det = el('details', 'species-group');
      var sum = el('summary');
      sum.appendChild(el('span', null, titleText));
      sum.appendChild(el('span', 'grp-count', t('bird.moreCount', { n: list.length })));
      det.appendChild(sum);
      det.appendChild(speciesGrid(list));
      return det;
    }

    var already = recentSpecies(8);
    if (already.length) groups.appendChild(plainGroup(t('grp.recent'), already));
    groups.appendChild(plainGroup(t('grp.common'), I18N.speciesInGroup('common')));
    ['nest', 'specht', 'garden', 'big', 'water', 'other'].forEach(function (g) {
      var list = I18N.speciesInGroup(g);
      if (list.length) groups.appendChild(foldedGroup(t('grp.' + g), list));
    });

    /* "another bird" is always on show, whatever is being searched for */
    var otherDef = I18N.speciesDef('other');
    var otherGrid = el('div', 'species-grid');
    otherGrid.style.marginTop = '14px';
    otherGrid.appendChild(speciesButton(otherDef, true));
    box.appendChild(otherGrid);

    function runSearch() {
      var q = search.value.trim();
      clearBtn.hidden = !q;
      if (!q) {
        results.hidden = true;
        results.innerHTML = '';
        groups.hidden = false;
        return;
      }
      groups.hidden = true;
      results.hidden = false;
      results.innerHTML = '';
      var found = I18N.speciesSearch(q);
      if (found.length) results.appendChild(speciesGrid(found));
      else results.appendChild(el('p', 'no-match', t('bird.noMatch')));
    }
    search.addEventListener('input', runSearch);
    clearBtn.addEventListener('click', function () { search.value = ''; runSearch(); search.focus(); });

    /* ---------- the name, when it was not on the list ---------- */

    var otherField = el('div');
    otherField.hidden = true;
    otherField.appendChild(el('h3', 'q-sub', t('bird.otherName')));
    var otherInput = el('input', 'input');
    otherInput.type = 'text';
    otherInput.value = d.otherName;
    otherInput.addEventListener('input', function () { d.otherName = this.value; });
    otherField.appendChild(otherInput);
    box.appendChild(otherField);

    drawChosen();
    if (d.species) pick(d.species);

    /* ---------- when ---------- */

    box.appendChild(el('h3', 'q-sub', t('bird.month')));
    var months = el('div', 'month-grid');
    for (var m = 1; m <= 12; m++) {
      (function (mm) {
        var b = el('button', 'month-btn', monthShort(mm));
        b.type = 'button';
        b.setAttribute('aria-pressed', String(d.month === mm));
        b.setAttribute('aria-label', monthName(mm));
        b.addEventListener('click', function () { d.month = mm; pressOnly(months, b); });
        months.appendChild(b);
      })(m);
    }
    box.appendChild(months);

    box.appendChild(el('h3', 'q-sub', t('bird.year')));
    box.appendChild(yearPicker(d.year, function (y) { d.year = y; }));

    /* ---------- what it was doing ---------- */

    box.appendChild(el('h3', 'q-sub', t('bird.status')));
    var st = el('div', 'choice-grid');
    ['nesting', 'visiting', 'roosting'].forEach(function (sKey) {
      var b = el('button', 'choice');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(d.status === sKey));
      b.appendChild(el('span', 'choice-icon', STATUS_EMOJI[sKey]));
      var txt = el('span');
      txt.appendChild(document.createTextNode(t('bird.' + sKey)));
      txt.appendChild(el('span', 'choice-sub', t('bird.' + sKey + '.sub')));
      b.appendChild(txt);
      b.appendChild(el('span', 'tick', '✓'));
      b.addEventListener('click', function () { d.status = sKey; pressOnly(st, b); });
      st.appendChild(b);
    });
    box.appendChild(st);

    box.appendChild(el('h3', 'q-sub', t('common.notes') + ' (' + t('common.optional') + ')'));
    var notes = el('textarea', 'textarea');
    notes.value = d.notes;
    notes.addEventListener('input', function () { d.notes = this.value; });
    box.appendChild(notes);

    /* ---------- save, always within reach ---------- */

    var saveBar = el('div', 'sticky-save');
    var save = el('button', 'btn btn-big btn-primary', t('bird.saveIt'));
    save.type = 'button';
    save.addEventListener('click', function () {
      if (!d.species) {
        toast(t('bird.pickSpecies'));
        chosen.scrollIntoView({ block: 'center' });
        return;
      }
      Store.addSighting({
        houseId: houseId, species: d.species, otherName: d.otherName,
        year: d.year, month: d.month, status: d.status, notes: d.notes
      });
      popScreen();
      toastSaved();
      setTimeout(refreshScreen, 30);
    });
    saveBar.appendChild(save);
    box.appendChild(saveBar);

    return box;
  }

  function yearPicker(value, onChange) {
    var wrap = el('div', 'year-picker');
    var minus = el('button', 'step-btn', '−');
    minus.type = 'button'; minus.setAttribute('aria-label', '-1');
    var yr = el('div', 'yr', String(value));
    var plus = el('button', 'step-btn', '+');
    plus.type = 'button'; plus.setAttribute('aria-label', '+1');
    var thisYear = new Date().getFullYear();
    var current = value;

    function set(v) {
      current = Math.min(thisYear, Math.max(1950, v));
      yr.textContent = String(current);
      minus.disabled = current <= 1950;
      plus.disabled = current >= thisYear;
      onChange(current);
    }
    minus.addEventListener('click', function () { set(current - 1); });
    plus.addEventListener('click', function () { set(current + 1); });
    minus.disabled = current <= 1950;
    plus.disabled = current >= thisYear;

    wrap.appendChild(minus); wrap.appendChild(yr); wrap.appendChild(plus);
    return wrap;
  }

  /* =========================================================
     MAINTENANCE FORM
     ========================================================= */

  function openMaintForm(houseId) {
    var h = Store.house(houseId);
    var draft = { kind: 'cleaned', date: Store.todayISO(), condition: h ? h.condition : 'good', notes: '' };
    pushScreen({ title: t('maint.title'), build: function () { return buildMaintForm(houseId, draft); } });
  }

  function buildMaintForm(houseId, d) {
    var box = frag();
    box.appendChild(el('h3', 'q', t('maint.what')));
    var kinds = el('div', 'choice-grid');
    ['cleaned', 'repaired', 'replaced', 'checked'].forEach(function (k) {
      var b = el('button', 'choice');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(d.kind === k));
      b.appendChild(el('span', 'choice-icon', MAINT_EMOJI[k]));
      b.appendChild(el('span', null, t('maint.' + k)));
      b.appendChild(el('span', 'tick', '✓'));
      b.addEventListener('click', function () { d.kind = k; pressOnly(kinds, b); });
      kinds.appendChild(b);
    });
    box.appendChild(kinds);

    box.appendChild(el('h3', 'q-sub', t('maint.when')));
    var date = el('input', 'input');
    date.type = 'date'; date.value = d.date; date.max = Store.todayISO();
    date.addEventListener('change', function () { d.date = this.value; });
    box.appendChild(date);

    box.appendChild(el('h3', 'q-sub', t('maint.newCondition')));
    box.appendChild(conditionChoices(d.condition, function (c) { d.condition = c; }));

    box.appendChild(el('h3', 'q-sub', t('common.notes') + ' (' + t('common.optional') + ')'));
    var notes = el('textarea', 'textarea');
    notes.value = d.notes;
    notes.addEventListener('input', function () { d.notes = this.value; });
    box.appendChild(notes);

    var save = el('button', 'btn btn-big btn-primary', t('maint.saveIt'));
    save.type = 'button';
    save.style.marginTop = '20px';
    save.addEventListener('click', function () {
      Store.addMaintenance({ houseId: houseId, kind: d.kind, date: d.date, condition: d.condition, notes: d.notes });
      popScreen();
      toastSaved();
      refreshMarkers();
      setTimeout(refreshScreen, 30);
    });
    box.appendChild(save);
    return box;
  }

  /* =========================================================
     EDIT HOUSE
     ========================================================= */

  function openEditHouse(id) {
    var h = Store.house(id);
    if (!h) return;
    /* the draft lives out here, so nipping into "Where is it?" and coming
       back does not throw away what was typed */
    var draft = { name: h.name, tree: h.tree, condition: h.condition, placedOn: h.placedOn, notes: h.notes };
    pushScreen({ title: t('house.editTitle'), build: function () { return buildEditHouse(id, draft); } });
  }

  function buildEditHouse(id, d) {
    var h = Store.house(id);
    var box = frag();
    if (!h) return box;

    function field(labelKey, node) {
      var f = el('div', 'field');
      f.appendChild(el('span', 'label-sm', t(labelKey)));
      f.appendChild(node);
      return f;
    }

    var name = el('input', 'input input-big');
    name.type = 'text'; name.value = d.name;
    name.addEventListener('input', function () { d.name = this.value; });
    box.appendChild(field('house.name', name));

    var tree = el('input', 'input');
    tree.type = 'text'; tree.value = d.tree;
    tree.addEventListener('input', function () { d.tree = this.value; });
    box.appendChild(field('house.tree', tree));

    var placed = el('input', 'input');
    placed.type = 'date'; placed.value = d.placedOn;
    placed.addEventListener('change', function () { d.placedOn = this.value; });
    box.appendChild(field('house.placed', placed));

    box.appendChild(el('h3', 'q-sub', t('house.condition')));
    box.appendChild(conditionChoices(d.condition, function (c) { d.condition = c; }));

    box.appendChild(el('h3', 'q-sub', t('common.notes')));
    var notes = el('textarea', 'textarea');
    notes.value = d.notes;
    notes.addEventListener('input', function () { d.notes = this.value; });
    box.appendChild(notes);

    var stackEl = el('div', 'stack');
    var save = el('button', 'btn btn-big btn-primary', t('common.save'));
    save.type = 'button';
    save.addEventListener('click', function () {
      if (!d.name.trim()) { toast(t('wiz.needName')); return; }
      Store.updateHouse(id, { name: d.name.trim(), tree: d.tree.trim(), condition: d.condition, placedOn: d.placedOn, notes: d.notes.trim() });
      refreshMarkers();
      renderHouseList();
      popScreen();
      toastSaved();
      setTimeout(refreshScreen, 30);
    });
    stackEl.appendChild(save);

    var move = el('button', 'btn btn-big', t('house.moveTitle'));
    move.type = 'button';
    move.addEventListener('click', function () { openMoveHouse(id); });
    stackEl.appendChild(move);
    box.appendChild(stackEl);
    return box;
  }

  var moveMap = null;
  function openMoveHouse(id) {
    pushScreen({
      title: t('house.moveTitle'),
      build: function () {
        var h = Store.house(id);
        var box = frag();
        box.appendChild(el('p', 'q-help', t('house.moveHint')));
        var wrap = el('div', 'picker-wrap');
        wrap.style.height = '55dvh';
        var mapEl = el('div', 'map');
        wrap.appendChild(mapEl);
        var pin = el('div', 'pick-pin');
        pin.innerHTML = '<svg viewBox="0 0 32 44"><path d="M16 0C7.7 0 1 6.7 1 15c0 11 15 29 15 29s15-18 15-29c0-8.3-6.7-15-15-15Z"/><circle cx="16" cy="15" r="6"/></svg>';
        wrap.appendChild(pin);
        box.appendChild(wrap);

        setTimeout(function () {
          moveMap = new MiniMap(mapEl, {
            center: { lat: h.lat, lng: h.lng }, zoom: 18,
            layer: Store.settings.layer || 'streets'
          });
        }, 0);

        var save = el('button', 'btn btn-big btn-primary', t('common.save'));
        save.type = 'button';
        save.style.marginTop = '16px';
        save.addEventListener('click', function () {
          if (!moveMap) return;
          var c = moveMap.getCenter();
          Store.updateHouse(id, { lat: c.lat, lng: c.lng });
          refreshMarkers();
          popScreen();
          toastSaved();
        });
        box.appendChild(save);
        return box;
      }
    });
  }

  /* =========================================================
     NUMBERS (statistics)
     ========================================================= */

  var statsYear = new Date().getFullYear();

  function renderStats() {
    var box = $('#statsBody');
    box.innerHTML = '';

    if (!Store.data.houses.length) {
      var e = el('div', 'empty');
      e.appendChild(el('span', 'empty-emoji', '📊'));
      e.appendChild(el('p', null, t('stats.empty')));
      box.appendChild(e);
      return;
    }

    var s = Store.stats(statsYear);

    /* year picker */
    var chips = el('div', 'chip-row');
    var opts = Store.years().slice(0, 6);
    opts.forEach(function (y) {
      var c = el('button', 'chip', String(y));
      c.type = 'button';
      if (statsYear === y) { c.style.borderColor = 'var(--brand)'; c.style.color = 'var(--brand-text)'; c.style.fontWeight = '800'; }
      c.addEventListener('click', function () { statsYear = y; renderStats(); });
      chips.appendChild(c);
    });
    var all = el('button', 'chip', t('stats.allYears'));
    all.type = 'button';
    if (statsYear === 'all') { all.style.borderColor = 'var(--brand)'; all.style.color = 'var(--brand-text)'; all.style.fontWeight = '800'; }
    all.addEventListener('click', function () { statsYear = 'all'; renderStats(); });
    chips.appendChild(all);
    box.appendChild(chips);

    /* headline tiles */
    var tiles = el('div', 'tiles');
    tiles.style.marginTop = '14px';
    [
      [s.totalHouses, 'stats.totalHouses'],
      [s.housesWithBirds, 'stats.withBirds'],
      [s.attention.length, 'stats.needAttention'],
      [s.cleanedThisYear, 'stats.cleanedYear']
    ].forEach(function (pair) {
      var tl = el('div', 'tile');
      tl.appendChild(el('div', 'tile-num', String(pair[0])));
      tl.appendChild(el('div', 'tile-label', t(pair[1])));
      tiles.appendChild(tl);
    });
    box.appendChild(tiles);

    /* condition — status colours, always with an icon + label beside them */
    var cs = el('section', 'section');
    cs.appendChild(el('h3', 'section-title', t('stats.byCondition')));
    var cbars = el('div', 'bars');
    Store.CONDITIONS.forEach(function (c) {
      var n = s.byCondition[c] || 0;
      var row = el('div', 'bar-row');
      var nameCell = el('div', 'bar-name');
      var badge = conditionBadge(c);
      nameCell.appendChild(badge);
      row.appendChild(nameCell);
      row.appendChild(el('div', 'bar-val', String(n)));
      var track = el('div', 'bar-track');
      var fill = el('div', 'bar-fill f-' + TONE[c]);
      fill.style.width = (s.totalHouses ? (n / s.totalHouses * 100) : 0) + '%';
      track.appendChild(fill);
      row.appendChild(track);
      cbars.appendChild(row);
    });
    cs.appendChild(cbars);
    box.appendChild(cs);

    /* most common birds */
    var sp = el('section', 'section');
    sp.appendChild(el('h3', 'section-title', t('stats.topSpecies')));
    sp.appendChild(el('p', 'muted', t('stats.topSpeciesSub')));
    if (!s.species.length) {
      sp.appendChild(el('p', 'muted', t('stats.noSightings')));
    } else {
      var maxHouses = s.species[0].houses || 1;
      var sbars = el('div', 'bars');
      s.species.slice(0, 8).forEach(function (e2) {
        var row = el('div', 'bar-row');
        var nameCell = el('div', 'bar-name');
        var ic = el('span');
        ic.innerHTML = birdIconHTML(e2.species, 24);
        nameCell.appendChild(ic);
        nameCell.appendChild(el('span', null, e2.label || I18N.speciesName(e2.species)));
        row.appendChild(nameCell);
        row.appendChild(el('div', 'bar-val', String(e2.houses)));
        var track = el('div', 'bar-track');
        var fill = el('div', 'bar-fill');
        fill.style.width = (e2.houses / maxHouses * 100) + '%';
        track.appendChild(fill);
        row.appendChild(track);
        sbars.appendChild(row);
      });
      sp.appendChild(sbars);
      sp.appendChild(speciesTable(s.species));
    }
    box.appendChild(sp);

    /* when birds were seen */
    var mv = el('section', 'section');
    mv.appendChild(el('h3', 'section-title', t('stats.byMonth')));
    mv.appendChild(el('p', 'muted', t('stats.byMonthSub')));
    var maxM = Math.max.apply(null, s.byMonth.concat([1]));
    var cols = el('div', 'months');
    s.byMonth.forEach(function (n, i) {
      var col = el('div', 'month-col');
      var bar = el('div', 'month-bar' + (n ? '' : ' is-zero'));
      bar.style.height = (n ? Math.max(6, n / maxM * 100) : 2) + '%';
      bar.title = monthName(i + 1) + ': ' + n;
      col.appendChild(bar);
      cols.appendChild(col);
    });
    mv.appendChild(cols);
    var vals = el('div', 'month-vals');
    s.byMonth.forEach(function (n) { vals.appendChild(el('div', 'month-val', n ? String(n) : '')); });
    mv.appendChild(vals);
    var lbls = el('div', 'month-lbls');
    for (var mi = 1; mi <= 12; mi++) lbls.appendChild(el('div', 'month-lbl', monthShort(mi)));
    mv.appendChild(lbls);
    box.appendChild(mv);

    /* houses to look at */
    var at = el('section', 'section');
    at.appendChild(el('h3', 'section-title', t('stats.attention')));
    at.appendChild(el('p', 'muted', t('stats.attentionSub')));
    if (!s.attention.length) at.appendChild(el('p', 'muted', t('stats.allGood')));
    else {
      var list = el('div', 'card-list');
      s.attention.forEach(function (h) { list.appendChild(houseCard(h)); });
      at.appendChild(list);
    }
    box.appendChild(at);

    /* totals */
    var tot = el('div', 'tiles');
    tot.style.marginTop = '26px';
    [[s.totalSightings, 'stats.totalSightings'], [s.speciesCount, 'stats.speciesCount']].forEach(function (pair) {
      var tl = el('div', 'tile');
      tl.appendChild(el('div', 'tile-num', String(pair[0])));
      tl.appendChild(el('div', 'tile-label', t(pair[1])));
      tot.appendChild(tl);
    });
    box.appendChild(tot);
  }

  function speciesTable(species) {
    var det = el('details', 'table-toggle');
    det.appendChild(el('summary', null, t('stats.showTable')));
    var table = el('table', 'data-table');
    var thead = el('thead');
    var hr = el('tr');
    [t('stats.species'), t('stats.houses'), t('stats.count')].forEach(function (h) { hr.appendChild(el('th', null, h)); });
    thead.appendChild(hr);
    table.appendChild(thead);
    var tb = el('tbody');
    species.forEach(function (e2) {
      var tr = el('tr');
      tr.appendChild(el('td', null, e2.label || I18N.speciesName(e2.species)));
      tr.appendChild(el('td', null, String(e2.houses)));
      tr.appendChild(el('td', null, String(e2.count)));
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    var scroller = el('div', 'table-scroll');
    scroller.appendChild(table);
    det.appendChild(scroller);
    return det;
  }

  /* =========================================================
     SETTINGS & HELP
     ========================================================= */

  $('#btnSettings').addEventListener('click', function () {
    pushScreen({ title: t('settings.title'), build: buildSettings });
  });
  $('#btnHelp').addEventListener('click', function () {
    pushScreen({ title: t('help.title'), build: buildHelp });
  });

  function buildHelp() {
    var box = frag();
    ['help.s1', 'help.s2', 'help.s6', 'help.s3', 'help.s4', 'help.s5'].forEach(function (k, i) {
      var row = el('div', 'help-step');
      row.appendChild(el('div', 'help-num', String(i + 1)));
      row.appendChild(el('p', null, t(k)));
      box.appendChild(row);
    });
    var tip = el('div', 'panel');
    tip.appendChild(el('p', null, t('help.tip')));
    box.appendChild(tip);
    return box;
  }

  function buildSettings() {
    var box = frag();

    /* language */
    box.appendChild(el('h3', 'section-title', t('settings.language')));
    var langs = el('div', 'choice-grid');
    [['de', 'Deutsch', '🇩🇪'], ['en', 'English', '🇬🇧'], ['pt', 'Português', '🇵🇹']].forEach(function (L) {
      var b = el('button', 'choice');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(I18N.lang === L[0]));
      b.appendChild(el('span', 'choice-icon', L[2]));
      b.appendChild(el('span', null, L[1]));
      b.appendChild(el('span', 'tick', '✓'));
      b.addEventListener('click', function () { setLanguage(L[0]); refreshScreen(); });
      langs.appendChild(b);
    });
    box.appendChild(langs);

    /* text size — the single thing most often missing for older eyes */
    var ts = el('section', 'section');
    ts.appendChild(el('h3', 'section-title', t('settings.textSize')));
    ts.appendChild(el('p', 'muted', t('settings.textSizeDesc')));
    var sizes = el('div', 'choice-grid');
    [['normal', 'settings.textNormal', '1rem'], ['big', 'settings.textBig', '1.5rem']].forEach(function (S) {
      var b = el('button', 'choice');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(currentTextSize() === S[0]));
      var a = el('span', 'choice-icon', 'A');
      a.style.fontSize = S[2];
      a.style.fontWeight = '800';
      a.style.textAlign = 'center';
      b.appendChild(a);
      b.appendChild(el('span', null, t(S[1])));
      b.appendChild(el('span', 'tick', '✓'));
      b.addEventListener('click', function () { setTextSize(S[0]); pressOnly(sizes, b); });
      sizes.appendChild(b);
    });
    ts.appendChild(sizes);
    box.appendChild(ts);

    /* backup */
    var bk = el('section', 'section');
    bk.appendChild(el('h3', 'section-title', t('settings.backup')));
    bk.appendChild(el('p', 'muted', t('settings.backupDesc')));
    var save = el('button', 'btn btn-big btn-primary', t('settings.saveBackup'));
    save.type = 'button';
    save.addEventListener('click', exportBackup);
    bk.appendChild(save);

    bk.appendChild(el('h3', 'q-sub', t('settings.restore')));
    bk.appendChild(el('p', 'muted', t('settings.restoreDesc')));
    var restoreLabel = el('label', 'btn btn-big');
    restoreLabel.appendChild(el('span', null, t('settings.restoreBtn')));
    var fin = el('input');
    fin.type = 'file'; fin.accept = 'application/json,.json'; fin.hidden = true;
    fin.addEventListener('change', function () { importBackup(this); });
    restoreLabel.appendChild(fin);
    bk.appendChild(restoreLabel);
    box.appendChild(bk);

    /* what is stored */
    var st = el('section', 'section');
    var panel = el('dl', 'panel');
    function kv(k, v) {
      var row = el('div', 'kv');
      row.appendChild(el('dt', null, k));
      var dd = el('dd', null, v);
      row.appendChild(dd);
      panel.appendChild(row);
      return dd;
    }
    kv(t('stats.totalHouses'), String(Store.data.houses.length));
    kv(t('stats.totalSightings'), String(Store.data.sightings.length));
    kv(t('house.maintenance'), String(Store.data.maintenance.length));
    var photoCell = kv(t('settings.photos'), '…');
    Photos.count().then(function (n) { photoCell.textContent = String(n); });
    st.appendChild(panel);
    box.appendChild(st);

    /* install + about */
    var ab = el('section', 'section');
    ab.appendChild(el('h3', 'section-title', t('settings.install')));
    ab.appendChild(el('p', 'muted', t('settings.installText')));
    ab.appendChild(el('h3', 'q-sub', t('settings.about')));
    ab.appendChild(el('p', 'muted', t('settings.aboutText')));
    box.appendChild(ab);

    /* danger */
    var dz = el('section', 'section');
    var clear = el('button', 'btn btn-big btn-danger', t('settings.clearAll'));
    clear.type = 'button';
    clear.addEventListener('click', function () {
      confirmAsk(t('settings.clearWarn')).then(function (ok) {
        if (!ok) return;
        Store.clearAll();
        Photos.clear();
        refreshMarkers();
        renderHouseList();
        updateGalleryBadge();
        closeAllScreens();
        toast(t('toast.cleared'));
      });
    });
    dz.appendChild(clear);
    box.appendChild(dz);

    return box;
  }

  function allPhotoIds() {
    var ids = [];
    Store.data.houses.forEach(function (h) { ids = ids.concat(h.photos || []); });
    ids = ids.concat(Store.galleryIds());
    /* a photo taken in a wizard that is still open belongs to nobody yet */
    if (wiz && wiz.photos) ids = ids.concat(wiz.photos);
    return ids;
  }

  function exportBackup() {
    Photos.exportAll(allPhotoIds()).then(function (photos) {
      var payload = {
        app: 'my-bird-houses', version: 1,
        exportedAt: new Date().toISOString(),
        data: Store.exportData(),
        photos: photos
      };
      var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'bird-houses-' + Store.todayISO() + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      toast(t('toast.exported'));
    });
  }

  function importBackup(input) {
    var file = (input.files || [])[0];
    input.value = '';
    if (!file) return;
    var fr = new FileReader();
    fr.onload = function () {
      var payload;
      try { payload = JSON.parse(fr.result); } catch (e) { toast(t('toast.restoreFail')); return; }
      if (!payload || !payload.data) { toast(t('toast.restoreFail')); return; }
      confirmAsk(t('settings.restoreConfirm'), t('common.save')).then(function (ok) {
        if (!ok) return;
        try { Store.importData(payload.data); } catch (e) { toast(t('toast.restoreFail')); return; }
        Photos.clear()
          .then(function () { return Photos.importAll(payload.photos || {}); })
          .then(function () {
            setTextSize(currentTextSize());
            setLanguage(Store.settings.lang || 'de');
            refreshMarkers();
            renderHouseList();
            updateGalleryBadge();
            closeAllScreens();
            toast(t('toast.restored'));
          });
      });
    };
    fr.onerror = function () { toast(t('toast.restoreFail')); };
    fr.readAsText(file);
  }

  /* =========================================================
     LANGUAGE + BOOT
     ========================================================= */

  function currentTextSize() {
    return Store.settings.textSize === 'big' ? 'big' : 'normal';
  }

  function setTextSize(v) {
    Store.settings.textSize = (v === 'big') ? 'big' : 'normal';
    Store.save();
    document.documentElement.setAttribute('data-text', Store.settings.textSize);
  }

  function setLanguage(l) {
    I18N.set(l);
    Store.settings.lang = l;
    Store.save();
    I18N.applyTo(document);
    $('#btnLayer').querySelector('span').textContent =
      (Store.settings.layer === 'satellite') ? t('map.streets') : t('map.satellite');
    var titles = { map: 'app.name', houses: 'nav.houses', add: 'map.addHere',
      gallery: 'gallery.title', stats: 'stats.title' };
    $('#topbarTitle').textContent = t(titles[currentView] || 'app.name');
    updateGalleryBadge();
    if (currentView === 'houses') renderHouseList();
    if (currentView === 'gallery') renderGallery();
    if (currentView === 'stats') renderStats();
    if (currentView === 'add') setWizStep(wiz ? wiz.step : 1);
    refreshMarkers();
  }

  function boot() {
    Store.load();

    /* German is this app's own language. It starts in German every time,
       with no question asked first; Settings can change it. */
    I18N.set(Store.settings.lang || 'de');
    document.documentElement.setAttribute('data-text', currentTextSize());
    I18N.applyTo(document);
    $('#wizDate').value = Store.todayISO();
    $('#btnLayer').querySelector('span').textContent =
      (Store.settings.layer === 'satellite') ? t('map.streets') : t('map.satellite');

    updateGalleryBadge();
    showView('map');

    /* tidy away photos left behind by an interrupted "add a bird house" */
    setTimeout(function () { Photos.pruneOrphans(allPhotoIds()); }, 4000);

    if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
      navigator.serviceWorker.register('./sw.js').catch(function () { /* fine without it */ });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
