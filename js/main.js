/* ================================================================
   PÄIVÄRINTEEN LAMMASTILA — main.js
   ================================================================ */

// ---- NAV SCROLL ----
const nav = document.getElementById('main-nav');
function onScroll() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- HAMBURGER ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

// Close on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) closeMobileMenu();
});

// ---- LANGUAGE SWITCHER ----
const html = document.documentElement;
const langBtns = document.querySelectorAll('.lang-btn');

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    html.setAttribute('data-lang', lang);
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    document.title = {
      fi: 'Päivärinteen Lammastila – Suomenlampaan kasvattaja Sumiaisissa',
      sv: 'Päivärinteen Fårfarm – Uppfödare av finsk lantras i Sumiainen',
      en: 'Päivärinteen Sheep Farm – Finnish Landrace Breeders in Sumiainen'
    }[lang] || document.title;
    closeMobileMenu();
  });
});

// ---- REVEAL ON SCROLL ----
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
