/* ==========================================================================
   Ordex Digital — site scripts
   No backend, no database. WhatsApp is the conversion layer.
   Change WHATSAPP_NUMBER in one place to update every link on the site.
   ========================================================================== */

const ORDEX = (() => {
  const WHATSAPP_NUMBER = '923033696969';   // 0303 3696969 in international format
  const DISPLAY_NUMBER  = '0303 3696969';

  const waLink = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || 'Hello Ordex Digital, I would like to discuss a project.')}`;

  /* Any element with data-wa="message" becomes a WhatsApp link */
  const wireWhatsApp = () => {
    document.querySelectorAll('[data-wa]').forEach((el) => {
      el.setAttribute('href', waLink(el.getAttribute('data-wa')));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-wa-number]').forEach((el) => {
      el.textContent = DISPLAY_NUMBER;
    });
  };

  /* Sticky nav + mobile drawer + current page highlight */
  const wireNav = () => {
    const nav = document.querySelector('.nav');
    const drawer = document.querySelector('.drawer');
    const burger = document.querySelector('.burger');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (burger && drawer) {
      const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        drawer.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      };
      burger.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
      drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
      window.addEventListener('resize', () => { if (window.innerWidth >= 1000) setOpen(false); });
    }

    const page = (document.body.dataset.page || '').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach((a) => {
      if (a.dataset.nav === page) a.classList.add('is-active');
    });
  };

  /* One quiet reveal as sections enter the viewport */
  const wireReveal = () => {
    const items = document.querySelectorAll('.reveal, .step');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach((el) => el.classList.add('is-in', 'is-lit'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => el.classList.add('is-in', 'is-lit'), i * 70);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  };

  /* Project category filters */
  const wireFilters = () => {
    const buttons = document.querySelectorAll('.filter');
    const cards = document.querySelectorAll('[data-category]');
    const empty = document.querySelector('#filterEmpty');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.filter;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        let visible = 0;
        cards.forEach((card) => {
          const match = value === 'all' || card.dataset.category.split(' ').includes(value);
          card.style.display = match ? '' : 'none';
          if (match) visible++;
        });
        if (empty) empty.hidden = visible !== 0;
      });
    });
  };

  /* Inquiry form: builds a formatted WhatsApp message, no backend needed */
  const wireInquiryForm = () => {
    const form = document.querySelector('#inquiryForm');
    if (!form) return;
    const error = form.querySelector('.form-error');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const get = (name) => (form.elements[name]?.value || '').trim();
      const name = get('name');
      const service = get('service');
      const details = get('details');

      if (!name || !service || !details) {
        if (error) {
          error.textContent = 'Add your name, the service you need, and a few lines about the project.';
          error.classList.add('is-shown');
        }
        return;
      }
      if (error) error.classList.remove('is-shown');

      const message =
        `Hello Ordex Digital,\n\n` +
        `My Name: ${name}\n` +
        `Company Name: ${get('company') || '—'}\n` +
        `Phone Number: ${get('phone') || '—'}\n\n` +
        `Service I am Interested In:\n${service}\n\n` +
        `Project Details:\n${details}\n\n` +
        `I would like to discuss this project with you.`;

      window.open(waLink(message), '_blank', 'noopener');
    });
  };

  /* Current year in the footer */
  const wireYear = () => {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    wireWhatsApp();
    wireNav();
    wireReveal();
    wireFilters();
    wireInquiryForm();
    wireYear();
  });

  return { waLink, WHATSAPP_NUMBER, DISPLAY_NUMBER };
})();
