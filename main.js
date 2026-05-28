/* =====================================================
   PORTFOLIO PROFISSIONAL — main.js
   ===================================================== */

'use strict';

// ─── ANO NO FOOTER ───────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── NAVBAR SCROLL ───────────────────────────────────
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 48) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // estado inicial

// ─── MENU HAMBURGER ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Fecha ao clicar num link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// Fecha com tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    hamburger.focus();
  }
});

// ─── REVEAL AO SCROLL ────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Stagger entre irmãos com a classe .reveal no mesmo pai
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll(':scope > .reveal, .reveal')
      ).filter(el => el.parentElement === entry.target.parentElement);
      const idx = siblings.indexOf(entry.target);

      // Delay proporcional à posição (máx. 400 ms)
      const delay = Math.min(idx * 85, 400);
      entry.target.style.transitionDelay = delay + 'ms';
      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.09, rootMargin: '0px 0px -55px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ─── NAV LINK ATIVO NO SCROLL ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));

// ─── FORMULÁRIO DE CONTATO ───────────────────────────
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação simples
    const fields = contactForm.querySelectorAll('[required]');
    let valid = true;
    fields.forEach(f => {
      f.style.borderColor = '';
      if (!f.value.trim()) {
        f.style.borderColor = '#f87171';
        valid = false;
      }
    });
    if (!valid) return;

    // Simula envio
    const original = submitBtn.textContent;
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.textContent = '✓ Mensagem enviada!';
      submitBtn.style.opacity = '1';
      submitBtn.style.background = '#4ADE80';
      submitBtn.style.color = '#05070D';

      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3500);
    }, 1400);
  });

  // Remove borda de erro ao digitar
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
}

// ─── SMOOTH SCROLL (fallback para Safari antigo) ─────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
