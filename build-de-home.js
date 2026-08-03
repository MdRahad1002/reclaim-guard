const fs = require('fs');
const { JSDOM } = require('jsdom');
const ROOT = __dirname; // run: node build-de-home.js  (regenerates /de after homepage changes)

let html = fs.readFileSync(ROOT + '/index.html', 'utf8');
const i18nCode = fs.readFileSync(ROOT + '/i18n.js', 'utf8');

// Run only i18n during prerender: drop analytics.js + script.js, and inline
// i18n.js so jsdom executes it with no network needed.
html = html.replace('<script src="analytics.js"></script>', '');
html = html.replace('<script src="script.js"></script>', '');
html = html.replace('<script src="i18n.js"></script>', '<script id="__prerender_i18n">' + i18nCode + '</script>');

const dom = new JSDOM(html, {
  url: 'https://www.reclaim-guard.com/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  beforeParse(window) {
    try { Object.defineProperty(window.navigator, 'language', { value: 'de-DE', configurable: true }); } catch (e) {}
    try { Object.defineProperty(window.navigator, 'languages', { value: ['de-DE', 'de'], configurable: true }); } catch (e) {}
    window.fetch = function () { return Promise.reject(new Error('blocked')); };
    window.scrollTo = function () {};
  }
});

setTimeout(function () {
  const doc = dom.window.document;
  const title = doc.title || '';
  const h1 = (doc.querySelector('.hero-title') || {}).textContent || '';

  // Remove the inline prerender copy of i18n (we re-link the external file).
  const pre = doc.getElementById('__prerender_i18n');
  if (pre) pre.remove();

  doc.documentElement.setAttribute('lang', 'de');
  const canon = doc.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute('href', 'https://www.reclaim-guard.com/de');
  const setC = function (sel, v) { const el = doc.querySelector(sel); if (el) el.setAttribute('content', v); };
  setC('meta[property="og:url"]', 'https://www.reclaim-guard.com/de');
  setC('meta[property="og:locale"]', 'de_DE');

  if (!doc.querySelector('link[hreflang]')) {
    [['en-GB', 'https://www.reclaim-guard.com/'], ['de', 'https://www.reclaim-guard.com/de'], ['x-default', 'https://www.reclaim-guard.com/']]
      .forEach(function (p) { const l = doc.createElement('link'); l.setAttribute('rel', 'alternate'); l.setAttribute('hreflang', p[0]); l.setAttribute('href', p[1]); doc.head.appendChild(l); });
  }

  let out = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  out = out.replace('</head>', '    <script src="/analytics.js"></script>\n</head>');
  out = out.replace('</body>', '    <script src="/i18n.js"></script>\n    <script src="/script.js"></script>\n</body>');
  out = out.replace(/(src|href)="(?!https?:|\/|#|mailto:|tel:|data:)/g, '$1="/');
  out = out.replace(/href="\/blog\.html"/g, 'href="/blog"')
           .replace(/href="\/privacy\.html"/g, 'href="/privacy"')
           .replace(/href="\/terms\.html"/g, 'href="/terms"');

  fs.writeFileSync(ROOT + '/index-de.html', out, 'utf8');
  console.log('TITLE :', title);
  console.log('H1    :', h1);
  console.log('bytes :', out.length);
  dom.window.close();
}, 1500);
