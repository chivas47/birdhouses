/* =========================================================
   store.js — all the bird house information.
   Kept in this browser only (localStorage). Photos live in
   photos.js (IndexedDB), referenced here by id.
   ========================================================= */
(function (global) {
  'use strict';

  var KEY = 'birdhouses.v1';
  var CONDITIONS = ['good', 'repair', 'broken', 'unknown'];

  var empty = function () {
    return {
      version: 1,
      houses: [],
      sightings: [],
      maintenance: [],
      settings: { lang: null, textSize: 'normal', layer: 'streets', lastCenter: null }
    };
  };

  var data = empty();

  function uid() {
    if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
  }

  function load() {
    try {
      var raw = global.localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        data = Object.assign(empty(), parsed);
        data.settings = Object.assign(empty().settings, parsed.settings || {});
      }
    } catch (e) { data = empty(); }
    return data;
  }

  var saveFailed = false;
  function save() {
    try {
      global.localStorage.setItem(KEY, JSON.stringify(data));
      saveFailed = false;
      return true;
    } catch (e) {
      saveFailed = true;
      return false;
    }
  }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------------- houses ---------------- */

  function addHouse(o) {
    var h = {
      id: uid(),
      name: (o.name || '').trim(),
      lat: +o.lat,
      lng: +o.lng,
      tree: (o.tree || '').trim(),
      condition: CONDITIONS.indexOf(o.condition) >= 0 ? o.condition : 'unknown',
      placedOn: o.placedOn || todayISO(),
      notes: (o.notes || '').trim(),
      photos: (o.photos || []).slice(),
      createdAt: Date.now()
    };
    data.houses.push(h);
    save();
    return h;
  }

  function house(id) {
    for (var i = 0; i < data.houses.length; i++) if (data.houses[i].id === id) return data.houses[i];
    return null;
  }

  function updateHouse(id, patch) {
    var h = house(id);
    if (!h) return null;
    Object.keys(patch).forEach(function (k) { h[k] = patch[k]; });
    save();
    return h;
  }

  function removeHouse(id) {
    var h = house(id);
    var photoIds = h ? h.photos.slice() : [];
    data.sightings.filter(function (s) { return s.houseId === id && s.photo; })
      .forEach(function (s) { photoIds.push(s.photo); });
    data.maintenance.filter(function (m) { return m.houseId === id && m.photo; })
      .forEach(function (m) { photoIds.push(m.photo); });

    data.houses = data.houses.filter(function (x) { return x.id !== id; });
    data.sightings = data.sightings.filter(function (x) { return x.houseId !== id; });
    data.maintenance = data.maintenance.filter(function (x) { return x.houseId !== id; });
    save();
    return photoIds;
  }

  /* ---------------- bird sightings ---------------- */

  function addSighting(o) {
    var s = {
      id: uid(),
      houseId: o.houseId,
      species: o.species,
      otherName: (o.otherName || '').trim(),
      year: +o.year,
      month: +o.month,               /* 1..12 */
      status: o.status || 'nesting', /* nesting | visiting | roosting */
      notes: (o.notes || '').trim(),
      createdAt: Date.now()
    };
    data.sightings.push(s);
    save();
    return s;
  }

  function removeSighting(id) {
    data.sightings = data.sightings.filter(function (x) { return x.id !== id; });
    save();
  }

  function sightingsFor(houseId) {
    return data.sightings
      .filter(function (s) { return s.houseId === houseId; })
      .sort(function (a, b) { return (b.year - a.year) || (b.month - a.month) || (b.createdAt - a.createdAt); });
  }

  /* ---------------- maintenance ---------------- */

  function addMaintenance(o) {
    var m = {
      id: uid(),
      houseId: o.houseId,
      kind: o.kind || 'checked',   /* cleaned | repaired | replaced | checked */
      date: o.date || todayISO(),
      notes: (o.notes || '').trim(),
      createdAt: Date.now()
    };
    data.maintenance.push(m);
    if (o.condition && CONDITIONS.indexOf(o.condition) >= 0) {
      updateHouse(o.houseId, { condition: o.condition });
    }
    save();
    return m;
  }

  function removeMaintenance(id) {
    data.maintenance = data.maintenance.filter(function (x) { return x.id !== id; });
    save();
  }

  function maintenanceFor(houseId) {
    return data.maintenance
      .filter(function (m) { return m.houseId === houseId; })
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : b.createdAt - a.createdAt; });
  }

  function lastMaintenance(houseId) {
    var list = maintenanceFor(houseId);
    return list.length ? list[0] : null;
  }

  /* ---------------- numbers ---------------- */

  function years() {
    var set = {};
    data.sightings.forEach(function (s) { set[s.year] = true; });
    var out = Object.keys(set).map(Number).sort(function (a, b) { return b - a; });
    var now = new Date().getFullYear();
    if (out.indexOf(now) < 0) out.unshift(now);
    return out;
  }

  var YEAR_MS = 365 * 24 * 60 * 60 * 1000;

  function needsAttention(h) {
    if (h.condition === 'broken' || h.condition === 'repair') return true;
    var last = lastMaintenance(h.id);
    var since = last ? Date.parse(last.date) : Date.parse(h.placedOn || '') || h.createdAt;
    if (!since) return false;
    return (Date.now() - since) > YEAR_MS;
  }

  function stats(year) {
    var thisYear = new Date().getFullYear();
    var sights = year === 'all' ? data.sightings
      : data.sightings.filter(function (s) { return s.year === year; });

    var byCondition = { good: 0, repair: 0, broken: 0, unknown: 0 };
    data.houses.forEach(function (h) {
      byCondition[h.condition] = (byCondition[h.condition] || 0) + 1;
    });

    var speciesMap = {};
    var byMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
    var housesUsed = {};
    sights.forEach(function (s) {
      var key = s.species === 'other' && s.otherName ? 'other:' + s.otherName : s.species;
      if (!speciesMap[key]) speciesMap[key] = { key: key, species: s.species, label: s.otherName || '', count: 0, houses: {} };
      speciesMap[key].count++;
      speciesMap[key].houses[s.houseId] = true;
      if (s.month >= 1 && s.month <= 12) byMonth[s.month - 1]++;
      housesUsed[s.houseId] = true;
    });

    var species = Object.keys(speciesMap).map(function (k) {
      var e = speciesMap[k];
      return { key: k, species: e.species, label: e.label, count: e.count, houses: Object.keys(e.houses).length };
    }).sort(function (a, b) { return (b.houses - a.houses) || (b.count - a.count); });

    var cleanedYear = {};
    data.maintenance.forEach(function (m) {
      if ((m.kind === 'cleaned' || m.kind === 'replaced') && String(m.date).slice(0, 4) === String(thisYear)) {
        cleanedYear[m.houseId] = true;
      }
    });

    var attention = data.houses.filter(needsAttention);

    return {
      totalHouses: data.houses.length,
      byCondition: byCondition,
      housesWithBirds: Object.keys(housesUsed).length,
      cleanedThisYear: Object.keys(cleanedYear).length,
      species: species,
      byMonth: byMonth,
      totalSightings: sights.length,
      speciesCount: species.length,
      attention: attention
    };
  }

  /* ---------------- backup ---------------- */

  function exportData() { return JSON.parse(JSON.stringify(data)); }

  function importData(obj) {
    if (!obj || !Array.isArray(obj.houses)) throw new Error('bad file');
    data = Object.assign(empty(), {
      version: 1,
      houses: obj.houses || [],
      sightings: obj.sightings || [],
      maintenance: obj.maintenance || [],
      settings: Object.assign(empty().settings, obj.settings || {})
    });
    save();
  }

  function clearAll() { data = empty(); save(); }

  global.Store = {
    CONDITIONS: CONDITIONS,
    get data() { return data; },
    get settings() { return data.settings; },
    get saveFailed() { return saveFailed; },
    uid: uid, load: load, save: save, todayISO: todayISO,
    addHouse: addHouse, house: house, updateHouse: updateHouse, removeHouse: removeHouse,
    addSighting: addSighting, removeSighting: removeSighting, sightingsFor: sightingsFor,
    addMaintenance: addMaintenance, removeMaintenance: removeMaintenance,
    maintenanceFor: maintenanceFor, lastMaintenance: lastMaintenance,
    needsAttention: needsAttention, years: years, stats: stats,
    exportData: exportData, importData: importData, clearAll: clearAll
  };
})(window);
