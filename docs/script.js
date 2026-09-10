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
