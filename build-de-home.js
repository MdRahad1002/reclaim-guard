const fs = require('fs');
const { JSDOM } = require('jsdom');
const ROOT = __dirname; // run: node build-de-home.js  (regenerates /de and /es after homepage changes)

// One config per translated static homepage.
const LANGS = [
  { lang: 'de', langs: ['de-DE', 'de'], locale: 'de_DE', path: '/de', file: 'index-de.html' },
  { lang: 'es', langs: ['es-ES', 'es'], locale: 'es_ES', path: '/es', file: 'index-es.html' },
];

// hreflang set shared by every homepage variant.
const HREFLANGS = [
  ['en-GB', 'https://www.reclaim-guard.com/'],
  ['de', 'https://www.reclaim-guard.com/de'],
  ['es', 'https://www.reclaim-guard.com/es'],
  ['x-default', 'https://www.reclaim-guard.com/'],
];

const baseHtml = fs.readFileSync(ROOT + '/index.html', 'utf8');
const i18nCode = fs.readFileSync(ROOT + '/i18n.js', 'utf8');

function build(cfg) {
  // Run only i18n during prerender: drop analytics.js + script.js, and inline
  // i18n.js so jsdom executes it with no network needed.
  let html = baseHtml
    .replace('<script src="analytics.js"></script>', '')
    .replace('<script src="script.js"></script>', '')
    .replace('<script src="i18n.js"></script>', '<script id="__prerender_i18n">' + i18nCode + '</script>');

  const dom = new JSDOM(html, {
    url: 'https://www.reclaim-guard.com' + cfg.path,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.__PRERENDER__ = true; // i18n skips runtime-only wiring during snapshot
      try { Object.defineProperty(window.navigator, 'language', { value: cfg.langs[0], configurable: true }); } catch (e) {}
      try { Object.defineProperty(window.navigator, 'languages', { value: cfg.langs, configurable: true }); } catch (e) {}
      window.fetch = function () { return Promise.reject(new Error('blocked')); };
      window.scrollTo = function () {};
    }
  });

  return new Promise(function (resolve) {
    setTimeout(function () {
      const doc = dom.window.document;
      const title = doc.title || '';
      const h1 = (doc.querySelector('.hero-title') || {}).textContent || '';

      // Remove the inline prerender copy of i18n (we re-link the external file).
      const pre = doc.getElementById('__prerender_i18n');
      if (pre) pre.remove();

      doc.documentElement.setAttribute('lang', cfg.lang);
      const canon = doc.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute('href', 'https://www.reclaim-guard.com' + cfg.path);
      const setC = function (sel, v) { const el = doc.querySelector(sel); if (el) el.setAttribute('content', v); };
      setC('meta[property="og:url"]', 'https://www.reclaim-guard.com' + cfg.path);
      setC('meta[property="og:locale"]', cfg.locale);

      if (!doc.querySelector('link[hreflang]')) {
        HREFLANGS.forEach(function (p) {
          const l = doc.createElement('link');
          l.setAttribute('rel', 'alternate'); l.setAttribute('hreflang', p[0]); l.setAttribute('href', p[1]);
          doc.head.appendChild(l);
        });
      }

      let out = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
      out = out.replace('</head>', '    <script src="/analytics.js"></script>\n</head>');
      out = out.replace('</body>', '    <script src="/i18n.js"></script>\n    <script src="/script.js"></script>\n</body>');
      out = out.replace(/(src|href)="(?!https?:|\/|#|mailto:|tel:|data:)/g, '$1="/');
      out = out.replace(/href="\/blog\.html"/g, 'href="/blog"')
               .replace(/href="\/privacy\.html"/g, 'href="/privacy"')
               .replace(/href="\/terms\.html"/g, 'href="/terms"');

      fs.writeFileSync(ROOT + '/' + cfg.file, out, 'utf8');
      console.log('[' + cfg.lang + '] TITLE :', title);
      console.log('[' + cfg.lang + '] H1    :', h1);
      console.log('[' + cfg.lang + '] bytes :', out.length);
      dom.window.close();
      resolve();
    }, 1500);
  });
}

(async function () {
  for (const cfg of LANGS) { await build(cfg); }
})();
