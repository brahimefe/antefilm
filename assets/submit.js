/* antefilm — record submission form. Builds an entry in the records.js format. */
(function () {
  var EDITOR = 'efeibrahimefe@googlemail.com';
  var LOCAL = document.body.hasAttribute('data-local-tool');
  var ATT = [
    ['construction', 'I. Construction', 'What is built as problem, what is left as given'],
    ['address', 'II. Address', 'Who stands in for the species'],
    ['exclusion', 'III. Exclusion', 'Which carriers of the same keyword stay off-record'],
    ['prescription', 'IV. Prescription', 'What the framing proposes as future-reality']
  ];

  var host = document.getElementById('attention-fields');
  ATT.forEach(function (a) {
    var k = a[0];
    var fs = document.createElement('fieldset');
    fs.innerHTML =
      '<legend>' + a[1] + '</legend><p style="margin:4px 0 0;color:var(--graphite);font-style:italic">' + a[2] + '</p>' +
      '<div class="two">' +
      '<div><label for="' + k + '-camera">Camera record</label><textarea id="' + k + '-camera"></textarea></div>' +
      '<div><label for="' + k + '-ground">Ground record</label><textarea id="' + k + '-ground" class="ground-in"></textarea></div>' +
      '</div>' +
      '<label for="' + k + '-scene">Scene marker (optional)</label><input id="' + k + '-scene" placeholder="01:12 — opening sequence">' +
      '<label for="' + k + '-sources">Sources, one per line: reference | link</label><textarea id="' + k + '-sources"></textarea>' +
      '<label for="' + k + '-note">Selection note: the strongest alternative considered, and why it was not filed</label><textarea id="' + k + '-note"></textarea>';
    host.appendChild(fs);
  });

  if (LOCAL) {
    document.querySelectorAll('[data-public-only]').forEach(function (el) { el.hidden = true; });
    var t = document.querySelector('[data-local-title]');
    if (t) t.textContent = 'Add a record (local tool).';
  }

  function v(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function q(s) { return JSON.stringify(s); }
  function sources(id) {
    return v(id).split('\n').map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var p = l.split('|');
      return '{ text: ' + q(p[0].trim()) + ', url: ' + q((p[1] || '').trim()) + ' }';
    });
  }
  function today() {
    var d = new Date();
    return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
  }

  function build() {
    var I = '    ';
    var out = ['  {',
      I + 'slug: ' + q(v('f-slug')) + ',',
      I + 'recNum: 0, // editor assigns',
      I + 'year: ' + (parseInt(v('f-year'), 10) || 0) + ',',
      I + 'title: ' + q(v('f-title')) + ',',
      I + 'director: ' + q(v('f-director')) + ',',
      I + 'runtime: ' + q(v('f-runtime')) + ',',
      I + 'gross: ' + q(v('f-gross')) + ',',
      I + 'grossNum: ' + (parseInt(v('f-grossnum'), 10) || 0) + ',',
      I + 'studio: ' + q(v('f-studio')) + ',',
      I + 'filed: ' + q(today()) + ',',
      I + 'revised: ' + q(today()) + ',',
      I + 'imagination: ' + q(v('f-imagination')) + ',',
      I + 'status: "open",',
      I + 'draft: true,',
      I + 'threshold: { inCorpus: true, rank: null, note: "" },',
      I + 'beckert: { imaginaryType: "", payoffStructure: "" },',
      ''];
    ATT.forEach(function (a) {
      var k = a[0];
      out.push(I + k + ': {');
      out.push(I + '  camera: ' + q(v(k + '-camera')) + ',');
      out.push(I + '  scene: ' + (v(k + '-scene') ? q(v(k + '-scene')) : 'null') + ',');
      out.push(I + '  ground: ' + q(v(k + '-ground')) + ',');
      out.push(I + '  sources: [' + sources(k + '-sources').join(', ') + '],');
      out.push(I + '  selectionNote: ' + q(v(k + '-note')));
      out.push(I + '},');
    });
    out.push(I + 'circulation: {');
    [['productionSupport', 'c-production'], ['scriptInvolvement', 'c-script'], ['distributionChannels', 'c-distribution'],
     ['authorityInfrastructure', 'c-authority'], ['onTheSameChannels', 'c-onsame'], ['offTheSameChannels', 'c-offsame']]
      .forEach(function (p) { out.push(I + '  ' + p[0] + ': ' + q(v(p[1])) + ','); });
    out.push(I + '  sources: [' + sources('c-sources').join(', ') + ']');
    out.push(I + '},');
    out.push(I + 'gloss: ' + q(v('f-gloss')));
    out.push('  },');
    return out.join('\n');
  }

  var status = document.getElementById('form-status');
  document.getElementById('make-code').addEventListener('click', function () {
    if (!v('f-title') || !v('f-slug')) { status.textContent = 'Add the title and the short web name first.'; return; }
    var pre = document.getElementById('code-out');
    pre.textContent = build();
    pre.hidden = false;
    status.textContent = LOCAL ? 'Copy this entry into data/records.js, inside the RECORDS list, then run node tools/build.js.' : 'This is the entry the editor will receive.';
  });

  document.getElementById('record-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!v('f-name') || !v('f-email')) { status.textContent = 'Add your name and email so the editor can reply.'; return; }
    if (!v('f-title') || !v('f-slug')) { status.textContent = 'Add the film title and the short web name.'; return; }
    var body = 'Antefilm submission: ' + v('f-title') + '\n\nContributor: ' + v('f-name') + ' <' + v('f-email') + '>' +
      (v('f-affiliation') ? ', ' + v('f-affiliation') : '') + '\n\n' + build();
    window.location.href = 'mailto:' + EDITOR + '?subject=' + encodeURIComponent('Antefilm submission: ' + v('f-title')) +
      '&body=' + encodeURIComponent(body);
    status.textContent = 'Your email app should open with the submission ready to send. If it does not, write to ' + EDITOR + '.';
  });
})();
