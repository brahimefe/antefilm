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

  function show(id, cell) {
    var d = byId[id];
    if (!d || !panel) return;
    cells.forEach(function (c) { c.classList.remove('active'); });
    if (cell) cell.classList.add('active');
    var t = TYPES[d.imaginaryType] || { label: d.imaginaryType };
    var html = '<h2>' + esc(d.title) + '</h2>' +
      '<p class="facts">' + d.year + ', rank ' + d.rank + ' worldwide<br>USD ' + d.grossM.toLocaleString('en-US') + 'M, ' + esc(d.distributor) + '</p>' +
      '<dl><dt>Imaginary type</dt><dd><span class="chip"><span class="swatch t-' + esc(d.imaginaryType) + '"></span>' + esc(t.label) + '</span></dd>' +
      '<dt>Payoff structure</dt><dd>' + esc(PAYOFF[d.payoffStructure] || d.payoffStructure || '—') + '</dd>' +
      (d.note ? '<dt>Coding note</dt><dd>' + esc(d.note) + '</dd>' : '') + '</dl>';
    if (d.record) {
      html += '<p style="margin:16px 0 0"><a href="' + esc(d.record.href) + '">Read record ' + esc(d.record.num) + ': ' + esc(d.record.imagination) + '</a></p>';
    } else {
      html += '<p class="empty" style="margin-top:16px">No full record yet. <a href="submit.html">Propose one</a>.</p>';
    }
    panel.innerHTML = html;
    panel.hidden = false;
  }

  cells.forEach(function (c) {
    c.addEventListener('click', function () { show(c.dataset.id, c); });
  });
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
