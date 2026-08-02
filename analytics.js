/* =====================================================================
   ReclaimGuard Legal analytics + consent
   ---------------------------------------------------------------------
   Loads Google Analytics 4 + Google Ads with Google Consent Mode v2.
   Cookies stay DISABLED until the visitor clicks "Accept" (GDPR / EU).

   >>> SETUP: replace the three placeholder values below. <<<
     1. GA4_MEASUREMENT_ID  - GA4 Admin > Data Streams > Web  (looks like G-XXXXXXXXXX)
     2. GOOGLE_ADS_ID       - Google Ads > Tools > Conversions (looks like AW-XXXXXXXXXX)
     3. LEAD_CONVERSION_LABEL - the label shown next to the conversion ID
                                in the Google Ads conversion "tag setup"
                                (the part after the slash: AW-123.../THIS_PART)
   Until all three are filled in, no tags fire (safe to deploy as-is).
   ===================================================================== */
(function () {
  'use strict';

  // ---- CONFIG (replace these) ----------------------------------------
  var GA4_MEASUREMENT_ID    = 'G-P2X60KB60Z';
  var GOOGLE_ADS_ID         = 'AW-18360624527';
  var LEAD_CONVERSION_LABEL   = 'NCyXCLTNitkcEI_Lg7NE'; // "Page view conversion"
  var LEAD_CONVERSION_LABEL_2 = 'vy2sCJ6ttdkcEI_Lg7NE'; // "Sign-up conversion"
  var CLARITY_ID              = 'xvn0yf7djo';            // Microsoft Clarity (loads only after consent)
  // --------------------------------------------------------------------

  function configured(v) { return v && v.indexOf('XXXX') === -1; }
  var GA4_ON = configured(GA4_MEASUREMENT_ID);
  var ADS_ON = configured(GOOGLE_ADS_ID);

  // gtag stub (queues calls until the library loads)
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // 1) Consent Mode v2 defaults.
  //    Grant by default globally (regions with no legal consent requirement,
  //    e.g. the US), but DENY by default in the EEA, UK and Switzerland until
  //    the visitor opts in. This keeps measurement strong outside the EEA
  //    while staying GDPR-compliant inside it.
  var CONSENT_REQUIRED_REGIONS = [
    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
    'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO',
    'GB','CH'
  ];
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: CONSENT_REQUIRED_REGIONS,
    wait_for_update: 500
  });

  // Honour a previously stored choice on subsequent page loads.
  var stored = localStorage.getItem('cookieConsent');
  if (stored === 'granted') { updateConsent('granted'); loadClarity(); }
  else if (stored === 'denied') { updateConsent('denied'); }

  // Microsoft Clarity (heatmaps + session recording). Privacy-sensitive, so
  // it loads ONLY once the visitor has granted consent (never before).
  function loadClarity() {
    if (!CLARITY_ID || window.__clarityLoaded) return;
    window.__clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  // 2) Load the gtag library + configure the tags (only if IDs are set).
  if (GA4_ON || ADS_ON) {
    var loaderId = GA4_ON ? GA4_MEASUREMENT_ID : GOOGLE_ADS_ID;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(loaderId);
    document.head.appendChild(s);

    gtag('js', new Date());
    if (GA4_ON) { gtag('config', GA4_MEASUREMENT_ID); }
    if (ADS_ON) { gtag('config', GOOGLE_ADS_ID); }
  }

  function updateConsent(state) {
    gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state
    });
  }

  // 3) Public helper: fire the Google Ads "lead" conversion.
  //    Called from the /thank-you page after a successful form submission.
  window.trackLeadConversion = function () {
    if (!ADS_ON) return;
    var targets = [];
    if (configured(LEAD_CONVERSION_LABEL))   targets.push(GOOGLE_ADS_ID + '/' + LEAD_CONVERSION_LABEL);
    if (configured(LEAD_CONVERSION_LABEL_2)) targets.push(GOOGLE_ADS_ID + '/' + LEAD_CONVERSION_LABEL_2);
    if (targets.length) {
      gtag('event', 'conversion', {
        send_to: targets,
        value: 1.0,
        currency: 'GBP'
      });
    }
  };

  // 4) Consent banner -------------------------------------------------
  var isDE = (document.documentElement.lang || '').toLowerCase().indexOf('de') === 0;
  var TXT = isDE ? {
    msg: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Werbung zu messen. Sie können ablehnen oder zustimmen.',
    learn: 'Mehr erfahren',
    accept: 'Zustimmen',
    reject: 'Ablehnen'
  } : {
    msg: 'We use cookies to improve your experience and measure our advertising. You can accept or reject non-essential cookies.',
    learn: 'Learn more',
    accept: 'Accept',
    reject: 'Reject'
  };

  function privacyHref() {
    // Blog posts live in /blog and /blog/de; link up to the root privacy page.
    var p = location.pathname.replace(/\\/g, '/');
    if (p.indexOf('/blog/de/') !== -1) return '../../privacy.html';
    if (p.indexOf('/blog/') !== -1) return '../privacy.html';
    return 'privacy.html';
  }

  function showBanner() {
    if (localStorage.getItem('cookieConsent')) { return; } // already decided
    var bar = document.createElement('div');
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.style.cssText =
      'position:fixed;bottom:0;left:0;right:0;background:#1a1a2e;color:#fff;' +
      'padding:18px 20px;z-index:99999;box-shadow:0 -4px 12px rgba(0,0,0,.3);' +
      'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px;' +
      'font-size:14px;line-height:1.5;';
    bar.innerHTML =
      '<p style="margin:0;max-width:640px;flex:1 1 320px;">' + TXT.msg +
      ' <a href="' + privacyHref() + '" style="color:#4d94ff;text-decoration:underline;">' + TXT.learn + '</a></p>' +
      '<div style="display:flex;gap:10px;flex:0 0 auto;">' +
      '<button id="rgRejectCookies" style="background:transparent;color:#fff;border:1px solid #6b6b8a;' +
      'padding:10px 22px;border-radius:6px;cursor:pointer;font-weight:600;">' + TXT.reject + '</button>' +
      '<button id="rgAcceptCookies" style="background:#1B4FD8;color:#fff;border:none;' +
      'padding:10px 26px;border-radius:6px;cursor:pointer;font-weight:600;">' + TXT.accept + '</button>' +
      '</div>';
    document.body.appendChild(bar);

    // Lift the floating WhatsApp pill (desktop) and the sticky CTA bar
    // (mobile) above the banner so neither is hidden behind it.
    function liftUI(h) {
      var wa = document.getElementById('rgWhatsApp');
      if (wa) wa.style.bottom = (h == null) ? '24px' : (h + 16) + 'px';
      var cta = document.getElementById('rgCtaBar');
      if (cta) cta.style.bottom = (h == null) ? '' : h + 'px';
    }
    liftUI(bar.offsetHeight);
    function dismiss() { liftUI(null); bar.remove(); }

    document.getElementById('rgAcceptCookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'granted');
      updateConsent('granted');
      loadClarity();
      dismiss();
    });
    document.getElementById('rgRejectCookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'denied');
      updateConsent('denied'); // withdraw consent (matters where the default is granted)
      dismiss();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(showBanner, 800); });
  } else {
    setTimeout(showBanner, 800);
  }

  // 5) Micro-conversion click tracking --------------------------------
  //    Fires GA4 events on phone / email / WhatsApp clicks anywhere on
  //    the site. Mark these as "key events" in GA4, then import them into
  //    Google Ads as SECONDARY conversions (keep the form submit Primary).
  //    Consent Mode still governs whether the hit is sent.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    var evt = null;
    if (href.indexOf('tel:') === 0)         evt = 'phone_call_click';
    else if (href.indexOf('mailto:') === 0) evt = 'email_click';
    else if (/wa\.me\/|whatsapp\.com/.test(href)) evt = 'whatsapp_click';
    if (evt) {
      gtag('event', evt, {
        link_url: a.getAttribute('href'),
        page_location: location.href
      });
    }
  }, true);
})();

/* Floating WhatsApp click-to-chat button (all pages). Clicks are captured
   by the delegated tracker above and sent to GA4 as `whatsapp_click`. */
(function () {
  var WA_NUMBER = '447466901590'; // +44 7466 901590
  function inject() {
    if (document.getElementById('rgWhatsApp') || !document.body) return;
    var isDE = (document.documentElement.lang || '').toLowerCase().indexOf('de') === 0;
    var msg  = isDE
      ? 'Hallo, ich moechte eine kostenlose Beratung zur Rueckholung von Geld, das ich durch einen Betrug verloren habe.'
      : "Hi, I'd like a free consultation about recovering money I lost to a scam.";
    var label = isDE ? 'Auf WhatsApp chatten' : 'Chat on WhatsApp';
    var a = document.createElement('a');
    a.id = 'rgWhatsApp';
    a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', label);
    a.title = label;
    a.style.cssText =
      'position:fixed;right:24px;bottom:24px;z-index:998;' +
      'display:inline-flex;align-items:center;gap:9px;' +
      'padding:12px 20px 12px 15px;border-radius:50px;background:#25D366;color:#fff;' +
      'font:700 15px/1 Inter,system-ui,sans-serif;text-decoration:none;white-space:nowrap;' +
      'box-shadow:0 6px 18px rgba(37,211,102,.45);transition:transform .2s ease;';
    a.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.447h.006c6.585 0 11.946-5.359 11.949-11.893a11.821 11.821 0 00-3.481-8.453z"/></svg>' +
      '<span>' + (isDE ? 'Schreiben Sie uns' : 'Chat with us') + '</span>';
    a.addEventListener('mouseenter', function () { a.style.transform = 'scale(1.05)'; });
    a.addEventListener('mouseleave', function () { a.style.transform = 'scale(1)'; });
    document.body.appendChild(a);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else { inject(); }
})();

/* Sticky mobile CTA bar: Call / WhatsApp / Free Review. Shows on phones
   (<=768px), where most ad clicks land; hides the floating WhatsApp circle
   there so they don't overlap. All taps flow through the click tracker above. */
(function () {
  var PHONE = '+447735029656';
  var WA    = '447466901590';
  function injectBar() {
    if (document.getElementById('rgCtaBar') || !document.body) return;
    var isDE = (document.documentElement.lang || '').toLowerCase().indexOf('de') === 0;
    var L = isDE
      ? { call: 'Anrufen', wa: 'WhatsApp', form: 'Gratis-Prüfung' }
      : { call: 'Call',    wa: 'WhatsApp', form: 'Free Review' };
    var waMsg = encodeURIComponent(isDE
      ? 'Hallo, ich moechte eine kostenlose Beratung zur Rueckholung von Geld, das ich durch einen Betrug verloren habe.'
      : "Hi, I'd like a free consultation about recovering money I lost to a scam.");

    var st = document.createElement('style');
    st.textContent =
      '#rgCtaBar{display:none;}' +
      '#rgCtaBar a{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;' +
      'padding:15px 6px;font:700 14px/1 Inter,system-ui,sans-serif;text-decoration:none;color:#fff;' +
      'white-space:nowrap;}' +
      '#rgCtaBar a svg{width:17px;height:17px;flex:0 0 auto;}' +
      '#rgCtaBar .rg-call{background:#0f172a;}' +
      '#rgCtaBar .rg-wa{background:#25D366;}' +
      '#rgCtaBar .rg-form{background:#1B4FD8;}' +
      '@media(max-width:768px){' +
        '#rgCtaBar{position:fixed;left:0;right:0;bottom:0;z-index:9998;display:flex;' +
        'box-shadow:0 -2px 12px rgba(0,0,0,.22);}' +
        '#rgWhatsApp{display:none!important;}' +
        'body{padding-bottom:52px;}' +
      '}';
    document.head.appendChild(st);

    var callIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    var waIcon   = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>';
    var formIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';

    var bar = document.createElement('div');
    bar.id = 'rgCtaBar';
    bar.innerHTML =
      '<a class="rg-call" href="tel:' + PHONE + '">' + callIcon + L.call + '</a>' +
      '<a class="rg-wa" href="https://wa.me/' + WA + '?text=' + waMsg + '" target="_blank" rel="noopener">' + waIcon + L.wa + '</a>' +
      '<a class="rg-form" href="#" id="rgCtaForm">' + formIcon + L.form + '</a>';
    document.body.appendChild(bar);

    document.getElementById('rgCtaForm').addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('contactForm') || document.getElementById('contact');
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      else { location.href = '/#contact'; }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBar);
  } else { injectBar(); }
})();

/* Umami self-hosted analytics (cookieless, GDPR-friendly loads without consent). */
(function () {
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://analytics.reclaim-guard.com/script.js';
  s.setAttribute('data-website-id', '062bb6c5-b63f-4fa3-83eb-720ad69b5794');
  (document.head || document.documentElement).appendChild(s);
})();
