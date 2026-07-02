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
const LEAD_WEBHOOK_URL = 'https://hook.us1.make.com/gwn281os8gwrcmrld9fsdc1j1xi8yox2';

async function handleSubmit(e) {
  if (e) e.preventDefault();

  const form = (e && e.target && e.target.tagName === 'FORM') ? e.target : document.querySelector('form');
  if (!form) return;
  const btn = form.querySelector('.btn-submit') || document.querySelector('.btn-submit');

  // Coleta todos os campos nomeados do formulário
  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.nome || !data.whatsapp || !data.email) {
    alert('Por favor, preencha nome, WhatsApp e e-mail para continuar.');
    return;
  }

  const payload = {
    ...data,
    origem: window.location.href,
    enviado_em: new Date().toISOString(),
  };

  const btnTextOriginal = btn ? btn.textContent : '';
  if (btn) {
    btn.disabled    = true;
    btn.textContent = 'Enviando…';
  }

  try {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);

    form.reset();
    if (btn) {
      btn.textContent      = 'Enviado! Entraremos em contato em breve ✓';
      btn.style.background = '#2E7D6E';
      btn.style.color      = '#F2DFB5';
    }
  } catch (err) {
    if (btn) {
      btn.disabled    = false;
      btn.textContent = btnTextOriginal || 'Quero meu diagnóstico →';
    }
    alert('Não foi possível enviar agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.');
  }
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
