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
  var GA4_MEASUREMENT_ID    = 'G-XXXXXXXXXX';
  var GOOGLE_ADS_ID         = 'AW-18360624527';
  var LEAD_CONVERSION_LABEL = 'XXXXXXXXXXXXXXXXXX';
  // --------------------------------------------------------------------

  function configured(v) { return v && v.indexOf('XXXX') === -1; }
  var GA4_ON = configured(GA4_MEASUREMENT_ID);
  var ADS_ON = configured(GOOGLE_ADS_ID);

  // gtag stub (queues calls until the library loads)
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // 1) Consent Mode v2 defaults: everything denied until the user opts in.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  // Honour a previously stored "granted" choice on subsequent page loads.
  var stored = localStorage.getItem('cookieConsent');
  if (stored === 'granted') { updateConsent('granted'); }

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
    if (ADS_ON && configured(LEAD_CONVERSION_LABEL)) {
      gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_ID + '/' + LEAD_CONVERSION_LABEL
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

    document.getElementById('rgAcceptCookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'granted');
      updateConsent('granted');
      bar.remove();
    });
    document.getElementById('rgRejectCookies').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'denied');
      bar.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(showBanner, 800); });
  } else {
    setTimeout(showBanner, 800);
  }
})();
