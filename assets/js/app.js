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

  function conditionBadge(cond) {
    var c = TONE[cond] ? cond : 'unknown';
    var span = el('span', 'badge badge-' + TONE[c]);
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
    var titles = { map: 'app.name', houses: 'nav.houses', add: 'map.addHere', stats: 'stats.title' };
    $('#topbarTitle').textContent = t(titles[name] || 'app.name');

    if (name === 'map') { ensureMainMap(); mainMap.render(); refreshMarkers(); }
    if (name === 'houses') renderHouseList();
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

  function ensureMainMap() {
    if (mainMap) return mainMap;
    var start = Store.settings.lastCenter || { lat: 39.5, lng: -8.0 };
    mainMap = new MiniMap($('#map'), {
      center: start,
      zoom: Store.settings.lastCenter ? 16 : 5,
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
    var c = Store.settings.lastCenter || { lat: 39.5, lng: -8.0 };
    pickMap = new MiniMap($('#pickMap'), {
      center: c,
      zoom: Store.settings.lastCenter ? 17 : 5,
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
    box.appendChild(conditionChoices(wiz.condition, function (c) { wiz.condition = c; renderWizCondition(); }));
  }

  function conditionChoices(current, onPick) {
    var f = frag();
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
      b.addEventListener('click', function () { onPick(c); });
      f.appendChild(b);
    });
    return f;
  }

  function renderNameSuggestions() {
    var box = $('#wizNameSuggestions');
    box.innerHTML = '';
    var used = {};
    Store.data.houses.forEach(function (h) { if (h.tree) used[h.tree] = true; });
    var base = Object.keys(used).slice(0, 4);
    var n = Store.data.houses.length + 1;
    var suggestions = [t('nav.houses') + ' ' + n];
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
        Photos.remove(pid);
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

    var badges = el('div', 'badge-row');
    badges.appendChild(conditionBadge(h.condition));
    box.appendChild(badges);

    /* main actions */
    var actions = el('div', 'stack');
    actions.appendChild(bigAction('house.addBird', '🐦', function () { openBirdForm(h.id); }));
    actions.appendChild(bigAction('house.addMaint', '🧰', function () { openMaintForm(h.id); }));
    box.appendChild(actions);

    /* facts */
    var facts = el('section', 'section');
    facts.appendChild(el('h3', 'section-title', t('house.details')));
    var panel = el('dl', 'panel');
    var last = Store.lastMaintenance(h.id);
    [
      [t('house.tree'), h.tree || '—'],
      [t('house.placed'), fmtDate(h.placedOn)],
      [t('house.lastCheck'), last ? fmtDate(last.date) : t('house.never')]
    ].forEach(function (pair) {
      var row = el('div', 'kv');
      row.appendChild(el('dt', null, pair[0]));
      row.appendChild(el('dd', null, pair[1]));
      panel.appendChild(row);
    });
    facts.appendChild(panel);
    if (h.notes) {
      var np = el('div', 'panel');
      np.style.marginTop = '10px';
      np.appendChild(el('p', null, h.notes));
      facts.appendChild(np);
    }
    box.appendChild(facts);

    /* photos */
    var ps = el('section', 'section');
    ps.appendChild(el('h3', 'section-title', t('house.photos')));
    var strip = el('div', 'photo-strip');
    h.photos.forEach(function (pid) {
      strip.appendChild(photoThumb(pid, function () {
        confirmAsk(t('common.remove') + '?', t('common.remove')).then(function (ok) {
          if (!ok) return;
          Store.updateHouse(h.id, { photos: h.photos.filter(function (x) { return x !== pid; }) });
          Photos.remove(pid);
          refreshScreen();
        });
      }));
    });
    ps.appendChild(strip);
    var addLabel = el('label', 'btn btn-big btn-photo');
    addLabel.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9Zm3 5.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/></svg>';
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

    /* birds */
    var bs = el('section', 'section');
    bs.appendChild(el('h3', 'section-title', t('house.birds')));
    var sights = Store.sightingsFor(h.id);
    if (!sights.length) bs.appendChild(el('p', 'muted', t('house.noBirds')));
    else {
      var tl = el('div', 'timeline');
      var currentYear = null;
      sights.forEach(function (s) {
        if (s.year !== currentYear) {
          currentYear = s.year;
          var yh = el('h4', 'section-title', String(currentYear));
          yh.style.margin = '10px 0 0';
          tl.appendChild(yh);
        }
        tl.appendChild(sightingItem(s, h.id));
      });
      bs.appendChild(tl);
    }
    box.appendChild(bs);

    /* maintenance */
    var ms = el('section', 'section');
    ms.appendChild(el('h3', 'section-title', t('house.maintenance')));
    var jobs = Store.maintenanceFor(h.id);
    if (!jobs.length) ms.appendChild(el('p', 'muted', t('house.noMaint')));
    else {
      var mtl = el('div', 'timeline');
      jobs.forEach(function (m) { mtl.appendChild(maintItem(m, h.id)); });
      ms.appendChild(mtl);
    }
    box.appendChild(ms);

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

  function buildBirdForm(houseId, d) {
    var box = frag();

    box.appendChild(el('h3', 'q', t('bird.which')));
    var grid = el('div', 'species-grid');
    I18N.SPECIES.forEach(function (sp) {
      var b = el('button', 'species-btn');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(d.species === sp.id));
      b.innerHTML = birdIconHTML(sp.id, 44);
      b.appendChild(el('span', null, I18N.speciesName(sp.id)));
      b.addEventListener('click', function () { d.species = sp.id; refreshScreen(); });
      grid.appendChild(b);
    });
    box.appendChild(grid);

    if (d.species === 'other') {
      var lbl = el('h3', 'q-sub', t('bird.otherName'));
      box.appendChild(lbl);
      var inp = el('input', 'input');
      inp.type = 'text'; inp.value = d.otherName;
      inp.addEventListener('input', function () { d.otherName = this.value; });
      box.appendChild(inp);
    }

    box.appendChild(el('h3', 'q-sub', t('bird.month')));
    var months = el('div', 'month-grid');
    for (var m = 1; m <= 12; m++) {
      (function (mm) {
        var b = el('button', 'month-btn', monthShort(mm));
        b.type = 'button';
        b.setAttribute('aria-pressed', String(d.month === mm));
        b.setAttribute('aria-label', monthName(mm));
        b.addEventListener('click', function () { d.month = mm; refreshScreen(); });
        months.appendChild(b);
      })(m);
    }
    box.appendChild(months);

    box.appendChild(el('h3', 'q-sub', t('bird.year')));
    box.appendChild(yearPicker(d.year, function (y) { d.year = y; refreshScreen(); }));

    box.appendChild(el('h3', 'q-sub', t('bird.status')));
    var st = el('div', 'choice-grid');
    ['nesting', 'visiting', 'roosting'].forEach(function (s) {
      var b = el('button', 'choice');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(d.status === s));
      b.appendChild(el('span', 'choice-icon', STATUS_EMOJI[s]));
      var txt = el('span');
      txt.appendChild(document.createTextNode(t('bird.' + s)));
      txt.appendChild(el('span', 'choice-sub', t('bird.' + s + '.sub')));
      b.appendChild(txt);
      b.appendChild(el('span', 'tick', '✓'));
      b.addEventListener('click', function () { d.status = s; refreshScreen(); });
      st.appendChild(b);
    });
    box.appendChild(st);

    box.appendChild(el('h3', 'q-sub', t('common.notes') + ' (' + t('common.optional') + ')'));
    var notes = el('textarea', 'textarea');
    notes.value = d.notes;
    notes.addEventListener('input', function () { d.notes = this.value; });
    box.appendChild(notes);

    var save = el('button', 'btn btn-big btn-primary', t('bird.saveIt'));
    save.type = 'button';
    save.style.marginTop = '20px';
    save.addEventListener('click', function () {
      if (!d.species) { toast(t('bird.pickSpecies')); return; }
      Store.addSighting({
        houseId: houseId, species: d.species, otherName: d.otherName,
        year: d.year, month: d.month, status: d.status, notes: d.notes
      });
      popScreen();
      toast(t('toast.saved'));
      setTimeout(refreshScreen, 30);
    });
    box.appendChild(save);
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
    minus.addEventListener('click', function () { onChange(Math.max(1950, value - 1)); });
    plus.addEventListener('click', function () { onChange(Math.min(thisYear, value + 1)); });
    if (value >= thisYear) plus.disabled = true;
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
      b.addEventListener('click', function () { d.kind = k; refreshScreen(); });
      kinds.appendChild(b);
    });
    box.appendChild(kinds);

    box.appendChild(el('h3', 'q-sub', t('maint.when')));
    var date = el('input', 'input');
    date.type = 'date'; date.value = d.date; date.max = Store.todayISO();
    date.addEventListener('change', function () { d.date = this.value; });
    box.appendChild(date);

    box.appendChild(el('h3', 'q-sub', t('maint.newCondition')));
    var conds = el('div', 'choice-grid');
    conds.appendChild(conditionChoices(d.condition, function (c) { d.condition = c; refreshScreen(); }));
    box.appendChild(conds);

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
      toast(t('toast.saved'));
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
    var cg = el('div', 'choice-grid');
    cg.appendChild(conditionChoices(d.condition, function (c) {
      d.condition = c;
      $$('.choice', cg).forEach(function (b, i) { b.setAttribute('aria-pressed', String(Store.CONDITIONS[i] === c)); });
    }));
    box.appendChild(cg);

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
      toast(t('toast.saved'));
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
          toast(t('toast.saved'));
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
    det.appendChild(table);
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
    ['help.s1', 'help.s2', 'help.s3', 'help.s4', 'help.s5'].forEach(function (k, i) {
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
    [['en', 'English', '🇬🇧'], ['pt', 'Português', '🇵🇹']].forEach(function (L) {
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
            if (Store.settings.lang) setLanguage(Store.settings.lang);
            refreshMarkers();
            renderHouseList();
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

  function setLanguage(l) {
    I18N.set(l);
    Store.settings.lang = l;
    Store.save();
    I18N.applyTo(document);
    $('#btnLayer').querySelector('span').textContent =
      (Store.settings.layer === 'satellite') ? t('map.streets') : t('map.satellite');
    var titles = { map: 'app.name', houses: 'nav.houses', add: 'map.addHere', stats: 'stats.title' };
    $('#topbarTitle').textContent = t(titles[currentView] || 'app.name');
    if (currentView === 'houses') renderHouseList();
    if (currentView === 'stats') renderStats();
    if (currentView === 'add') setWizStep(wiz ? wiz.step : 1);
    refreshMarkers();
  }

  $$('[data-setlang]').forEach(function (b) {
    b.addEventListener('click', function () {
      setLanguage(b.dataset.setlang);
      $('#langGate').hidden = true;
    });
  });

  function boot() {
    Store.load();

    var saved = Store.settings.lang;
    if (!saved) {
      var nav = (navigator.language || 'en').toLowerCase();
      I18N.set(nav.indexOf('pt') === 0 ? 'pt' : 'en');
      $('#langGate').hidden = false;
    } else {
      I18N.set(saved);
    }
    I18N.applyTo(document);
    $('#wizDate').value = Store.todayISO();
    $('#btnLayer').querySelector('span').textContent =
      (Store.settings.layer === 'satellite') ? t('map.streets') : t('map.satellite');

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
