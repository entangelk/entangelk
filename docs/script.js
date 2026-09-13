function setLang(lang) {
  if (lang !== 'en' && lang !== 'ko') lang = 'en';
  document.documentElement.lang = lang;
  ['en', 'ko'].forEach(function (value) {
    var button = document.getElementById('btn-' + value);
    if (!button) return;
    button.classList.toggle('active', value === lang);
    button.setAttribute('aria-pressed', String(value === lang));
  });
  try { localStorage.setItem('pf-lang', lang); } catch (e) {}
  var url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  try { history.replaceState(null, '', url); } catch (e) {}
  // Keep the chosen language on local navigation, even without storage access.
  document.querySelectorAll('a[href]').forEach(function (link) {
    var target = new URL(link.getAttribute('href'), window.location.href);
    if (target.origin === url.origin && /\.html$/.test(target.pathname)) {
      target.searchParams.set('lang', lang);
      link.setAttribute('href', target.pathname.split('/').pop() + target.search + target.hash);
    }
  });
}
(function () {
  var saved;
  try { saved = localStorage.getItem('pf-lang'); } catch (e) {}
  var preferred = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  setLang(new URLSearchParams(window.location.search).get('lang') || saved || preferred);
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (element) {
    element.classList.add('ready');
    observer.observe(element);
  });
})();
document.addEventListener('play', function (event) {
  if (event.target.tagName !== 'VIDEO') return;
  document.querySelectorAll('video').forEach(function (video) {
    if (video !== event.target) video.pause();
  });
}, true);
document.querySelectorAll('.intro-details').forEach(function (details) {
  details.addEventListener('toggle', function () {
    if (!details.open) details.querySelectorAll('video').forEach(function (video) { video.pause(); });
  });
});

// A direct link to supporting evidence should open every containing disclosure.
function revealLinkedEvidence() {
  var id;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (e) { return; }
  var target = document.getElementById(id);
  if (!target) return;
  var parent = target.parentElement;
  var opened = false;
  while (parent) {
    if (parent.tagName === 'DETAILS' && !parent.open) {
      parent.open = true;
      opened = true;
    }
    parent = parent.parentElement;
  }
  if (opened) target.scrollIntoView();
}
window.addEventListener('hashchange', revealLinkedEvidence);
revealLinkedEvidence();

// Print and PDF carry the whole record. A closed <details> is not rendered when
// printing, so the print stylesheet alone cannot reveal the evidence: open it for
// the print pass, wake lazy images, and restore the reader's view afterwards.
var openedForPrint = [];
window.addEventListener('beforeprint', function () {
  document.querySelectorAll('details.evidence-details').forEach(function (details) {
    if (!details.open) {
      details.open = true;
      openedForPrint.push(details);
    }
  });
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
});
window.addEventListener('afterprint', function () {
  openedForPrint.forEach(function (details) { details.open = false; });
  openedForPrint = [];
});

// Printing cannot wait for the network, and a lazy image that is folded away or
// hidden on screen is never fetched. Once the page has settled, fetch the images
// a print pass will need so a later PDF export is complete.
function warmPrintImages() {
  setTimeout(function () {
    document.querySelectorAll('.evidence-details img[loading="lazy"], img.print-only[loading="lazy"]').forEach(function (img) {
      img.loading = 'eager';
    });
  }, 1500);
}
if (document.readyState === 'complete') warmPrintImages();
else window.addEventListener('load', warmPrintImages);
