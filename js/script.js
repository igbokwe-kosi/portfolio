/* ==============================================
   PORTFOLIO — KOSISO IGBOKWE
   script.js
============================================== */

/* ===== CUSTOM CURSOR ===== */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let fx = mx, fy = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();

  const hoverTargets = 'a, button, .pill, .stat-card, .project-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ===== CURRENT YEAR ===== */
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ===== STICKY NAV ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('nav-toggle');
const navList   = document.getElementById('nav-list');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen);
  navList.classList.toggle('nav-list--open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navList.classList.remove('nav-list--open');
    document.body.style.overflow = '';
  });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== TYPEWRITER ===== */
const typedEl = document.getElementById('typed-text');
const roles   = [
  'full-stack apps.',
  'React interfaces.',
  'restful APIs.',
  'beautiful UIs.',
  'the future.',
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeWriter() {
  const current = roles[roleIndex];
  const displayed = isDeleting
    ? current.slice(0, charIndex - 1)
    : current.slice(0, charIndex + 1);

  typedEl.textContent = displayed;
  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  let delay = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    roleIndex   = (roleIndex + 1) % roles.length;
    delay       = 400;
  }

  setTimeout(typeWriter, delay);
}

/* Start after hero entrance animations settle */
setTimeout(typeWriter, 1500);

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    revealObserver.unobserve(entry.target);
  });
}, {
  root:       null,
  threshold:  0.12,
  rootMargin: '0px 0px -60px 0px',
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
