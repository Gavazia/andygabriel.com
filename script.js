const langButton = document.querySelector('.lang-toggle');
const langCurrent = document.querySelector('.lang-current');
const langAlt = document.querySelector('.lang-alt');
const translatable = document.querySelectorAll('[data-es][data-fr]');
const year = document.getElementById('year');

let lang = 'es';

function setLanguage(nextLang) {
  lang = nextLang;
  document.documentElement.lang = lang;

  translatable.forEach((el) => {
    const nextText = el.dataset[lang];
    if (nextText) el.textContent = nextText;
  });

  langCurrent.textContent = lang.toUpperCase();
  langAlt.textContent = lang === 'es' ? 'FR' : 'ES';

  document.title = lang === 'es'
    ? 'Andy Gabriel — Movimiento, creación y tecnología'
    : 'Andy Gabriel — Mouvement, création et technologie';

  localStorage.setItem('andy-site-language', lang);
}

langButton?.addEventListener('click', () => {
  setLanguage(lang === 'es' ? 'fr' : 'es');
});

const storedLang = localStorage.getItem('andy-site-language');
if (storedLang === 'fr' || storedLang === 'es') {
  setLanguage(storedLang);
} else if (navigator.language?.toLowerCase().startsWith('fr')) {
  setLanguage('fr');
}

if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(el);
});