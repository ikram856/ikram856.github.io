// ── Typed text ──
const phrases = [
  'Ingénieure en Cybersécurité',
  'Sécurité Réseau & Systèmes',
  'CTF Player & Pentest',
  'Étudiante FSTG Marrakech'
];
let pi = 0, ci = 0, del = false;
const el = document.querySelector('.typed-text');

function type() {
  const cur = phrases[pi];
  el.textContent = del ? cur.substring(0, ci--) : cur.substring(0, ci++);
  if (!del && ci === cur.length + 1) { setTimeout(() => { del = true; type(); }, 2200); return; }
  if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 45 : 95);
}
type();

// ── Nav scroll shrink ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile nav toggle ──
document.getElementById('nav-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObs.observe(s));

// ── Fade-in on scroll ──
document.querySelectorAll('.card, .skill-card, .about-card, .contact-item, .about-text, .stat').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

// ── Contact form ──
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
  btn.style.background = 'var(--green)';
  btn.style.borderColor = 'var(--green)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
});
