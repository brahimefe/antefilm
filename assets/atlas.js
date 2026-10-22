/* antefilm — atlas interactions: filter by imaginary type, select a film, switch to table view. */
(function () {
  var DATA = window.ATLAS || [];
  var TYPES = window.ATLAS_TYPES || {};
  var PAYOFF = window.ATLAS_PAYOFF || {};
  var byId = {};
  DATA.forEach(function (d) { byId[d.id] = d; });

  var cells = Array.prototype.slice.call(document.querySelectorAll('.cell'));
  var panel = document.getElementById('atlas-panel');
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var viewBtns = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('#atlas-table tbody tr'));
  var current = 'all';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function applyFilter(type) {
    current = type;
    filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === type)); });
    cells.forEach(function (c) { c.classList.toggle('dim', type !== 'all' && c.dataset.type !== type); });
    rows.forEach(function (r) { r.hidden = type !== 'all' && r.dataset.type !== type; });
  }

  /* film card: opens on top of the clicked cell */
  var openCell = null;
  if (panel) {
    document.body.appendChild(panel);           /* positioned against the page, not clipped by the ledger */
    panel.classList.add('film-pop');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
  }

  function close(returnFocus) {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    cells.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-expanded', 'false'); });
    if (returnFocus && openCell) openCell.focus();
    openCell = null;
  }

  function place(cell) {
    var narrow = window.matchMedia('(max-width: 640px)').matches;
    panel.classList.toggle('sheet', narrow);
    panel.style.left = panel.style.top = '';
    if (narrow) return;                          /* phones: card rises from the bottom of the screen */
    var r = cell.getBoundingClientRect();
    var w = panel.offsetWidth, h = panel.offsetHeight, gap = 10, pad = 12;
    var vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var below = r.bottom + gap + h <= vh - pad || r.top - gap - h < pad;
    var top = below ? r.bottom + gap : r.top - gap - h;
    var left = Math.min(Math.max(r.left + r.width / 2 - w / 2, pad), vw - w - pad);
    panel.classList.toggle('above', !below);
    panel.style.setProperty('--arrow-x', Math.min(Math.max(r.left + r.width / 2 - left, 18), w - 18) + 'px');
    panel.style.left = (left + window.scrollX) + 'px';
    panel.style.top = (top + window.scrollY) + 'px';
  }

  function show(id, cell) {
    var d = byId[id];
    if (!d || !panel) return;
    if (openCell === cell && !panel.hidden) { close(true); return; }
    cells.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-expanded', 'false'); });
    cell.classList.add('active');
    cell.setAttribute('aria-expanded', 'true');
    openCell = cell;
    var t = TYPES[d.imaginaryType] || { label: d.imaginaryType, def: '' };
    var html =
      '<button class="pop-close" type="button" aria-label="Close">×</button>' +
      '<p class="pop-rank">' + d.year + ' · number ' + d.rank + ' worldwide</p>' +
      '<h2 id="pop-title">' + esc(d.title) + '</h2>' +
      '<p class="pop-facts">USD ' + d.grossM.toLocaleString('en-US') + ' million · ' + esc(d.distributor) + '</p>' +
      '<div class="pop-ending t-' + esc(d.imaginaryType) + '">' +
        '<span class="swatch t-' + esc(d.imaginaryType) + '" aria-hidden="true"></span>' +
        '<div><b>' + esc(t.label) + '</b><span>' + esc(t.def || '') + '</span></div>' +
      '</div>' +
      (d.payoffStructure && d.payoffStructure !== 'n/a' ? '<p class="pop-line"><b>Who gains:</b> ' + esc(PAYOFF[d.payoffStructure] || d.payoffStructure) + '</p>' : '') +
      (d.note ? '<p class="pop-line">' + esc(d.note) + '</p>' : '') +
      (d.record
        ? '<a class="pop-record" href="' + esc(d.record.href) + '">Read the record: <i>' + esc(d.record.imagination) + '</i></a>'
        : '<p class="pop-none">No full record yet. <a href="submit.html">Propose one</a></p>');
    panel.innerHTML = html;
    panel.setAttribute('aria-labelledby', 'pop-title');
    panel.hidden = false;
    place(cell);
    panel.querySelector('.pop-close').addEventListener('click', function () { close(true); });
    panel.querySelector('.pop-close').focus({ preventScroll: true });
  }

  cells.forEach(function (c) {
    c.setAttribute('aria-haspopup', 'dialog');
    c.setAttribute('aria-expanded', 'false');
    c.addEventListener('click', function (e) { e.stopPropagation(); show(c.dataset.id, c); });
  });
  document.addEventListener('click', function (e) { if (panel && !panel.hidden && !panel.contains(e.target)) close(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(true); });
  window.addEventListener('resize', function () { if (openCell && !panel.hidden) place(openCell); });
  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.dataset.filter === current && b.dataset.filter !== 'all' ? 'all' : b.dataset.filter); });
  });
  viewBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var view = b.dataset.view;
      viewBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      document.getElementById('atlas-ledger').hidden = view !== 'ledger';
      document.getElementById('atlas-table').hidden = view !== 'table';
    });
  });

  /* signal mode: only integrative endings in colour, or all six types */
  var toggle = document.getElementById('colour-toggle');
  var ledger = document.getElementById('atlas-ledger');
  if (toggle && ledger) {
    toggle.addEventListener('click', function () {
      var all = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', String(all));
      ledger.classList.toggle('zen-mode', !all);
      toggle.textContent = all ? 'Show integrative only' : 'Show all six types';
    });
  }

  /* sortable table */
  var table = document.getElementById('atlas-table');
  if (table) {
    var tbody = table.querySelector('tbody');
    table.querySelectorAll('th button').forEach(function (btn, idx) {
      var dir = 1;
      btn.addEventListener('click', function () {
        var list = Array.prototype.slice.call(tbody.rows);
        var numeric = btn.dataset.numeric === 'true';
        list.sort(function (a, b) {
          var x = a.cells[idx].dataset.sort || a.cells[idx].textContent;
          var y = b.cells[idx].dataset.sort || b.cells[idx].textContent;
          if (numeric) return (parseFloat(x) - parseFloat(y)) * dir;
          return x.localeCompare(y) * dir;
        });
        dir = -dir;
        list.forEach(function (r) { tbody.appendChild(r); });
        table.querySelectorAll('th').forEach(function (th) { th.removeAttribute('aria-sort'); });
        btn.parentElement.setAttribute('aria-sort', dir === -1 ? 'ascending' : 'descending');
      });
    });
  }
})();
