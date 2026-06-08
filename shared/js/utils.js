/* ============================================================
   GRID SOLUÇÕES WEB — Shared JS Utils
   Animações de scroll, efeito de nav e helpers reutilizáveis.
   ============================================================ */

'use strict';

/* ── Scroll Reveal (Intersection Observer) ── */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  const targets = document.querySelectorAll('.fade-up, .fade-in');
  targets.forEach((el) => observer.observe(el));
})();

/* ── Nav Scroll Effect ── */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(250,246,238,0.97)';
      nav.style.boxShadow = '0 1px 20px rgba(44,24,16,0.08)';
    } else {
      nav.style.background = 'rgba(250,246,238,0.92)';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
})();

/* ── Form Submit Handler ── */
function handleSubmit(e) {
  if (e) e.preventDefault();

  const nameInput  = document.querySelector('input[name="nome"], input[type="text"]');
  const phoneInput = document.querySelector('input[name="whatsapp"], input[type="tel"]');
  const emailInput = document.querySelector('input[name="email"], input[type="email"]');
  const btn        = document.querySelector('.btn-submit');

  if (!nameInput?.value || !phoneInput?.value || !emailInput?.value) {
    alert('Por favor, preencha nome, WhatsApp e e-mail para continuar.');
    return;
  }

  if (btn) {
    btn.textContent  = 'Enviado! Entraremos em contato em breve ✓';
    btn.style.background = '#2E7D6E';
    btn.style.color  = '#F2DFB5';
    btn.disabled     = true;
  }

  // TODO: Fase 2 — integrar com webhook/API
}

/* ── Smooth Anchor Scroll ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── Utilitário: formatar telefone brasileiro ── */
function formatPhone(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length <= 11) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    v = v.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  input.value = v;
}

document.querySelectorAll('input[type="tel"]').forEach((el) => {
  el.addEventListener('input', () => formatPhone(el));
});
