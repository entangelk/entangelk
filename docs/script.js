function setLang(lang) {
  document.documentElement.lang = lang;
  var en = document.getElementById('btn-en');
  var ko = document.getElementById('btn-ko');
  if (en) en.classList.toggle('active', lang === 'en');
  if (ko) ko.classList.toggle('active', lang === 'ko');
  try { localStorage.setItem('pf-lang', lang); } catch (e) {}
  var url = new URL(window.location);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);
}
(function () {
  var params = new URLSearchParams(window.location.search);
  var saved;
  try { saved = localStorage.getItem('pf-lang'); } catch (e) {}
  var nav = (navigator.language || 'en').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
  var lang = params.get('lang') || saved || nav;
  if (lang !== 'en' && lang !== 'ko') lang = 'en';
  setLang(lang);
})();

/* only one intro video plays at a time (play does not bubble -> capture) */
document.addEventListener('play', function (e) {
  var t = e.target;
  if (!t || t.tagName !== 'VIDEO') return;
  var vids = document.querySelectorAll('.introvid video');
  for (var i = 0; i < vids.length; i++) {
    if (vids[i] !== t) vids[i].pause();
  }
}, true);
