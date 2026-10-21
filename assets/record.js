/* antefilm — copy citation buttons and compare-page attention switch. */
(function () {
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.dataset.copy);
      if (!src) return;
      var text = src.textContent;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      } else { fallback(text); done(); }
    });
  });
  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-att]'));
  if (tabs.length) {
    var select = function (key) {
      tabs.forEach(function (t) { t.setAttribute('aria-pressed', String(t.dataset.att === key)); });
      document.querySelectorAll('[data-att-panel]').forEach(function (p) { p.hidden = p.dataset.attPanel !== key; });
      try { history.replaceState(null, '', '#' + key); } catch (e) {}
    };
    tabs.forEach(function (t) { t.addEventListener('click', function () { select(t.dataset.att); }); });
    var start = (location.hash || '').replace('#', '');
    select(tabs.some(function (t) { return t.dataset.att === start; }) ? start : tabs[0].dataset.att);
  }
})();
