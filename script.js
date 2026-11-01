/* ==========================================================================
   Polat Dekorasyon — Interactive UX & WhatsApp Quote Builder
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle & Logo Scroll-to-Top
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  document.querySelectorAll('.js-scroll-top').forEach((logoLink) => {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (mainNav && menuToggle) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Header Scroll Elevation
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 24) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 4. Service Card CTA -> Pre-select Service Chip in Quote Form
  const serviceCheckboxes = document.querySelectorAll('input[name="hizmet"]');

  const syncChipClasses = () => {
    serviceCheckboxes.forEach((cb) => {
      const chip = cb.closest('.chip');
      if (chip) {
        chip.classList.toggle('selected', cb.checked);
      }
    });
  };

  serviceCheckboxes.forEach((cb) => {
    cb.addEventListener('change', syncChipClasses);
  });
  syncChipClasses();

  document.querySelectorAll('.service-cta[data-service]').forEach((cta) => {
    cta.addEventListener('click', () => {
      const targetService = cta.getAttribute('data-service');
      serviceCheckboxes.forEach((cb) => {
        if (cb.value === targetService) {
          cb.checked = true;
        }
      });
      syncChipClasses();
    });
  });

  // Highlight WhatsApp Quote Box when jumping via "Hızlı Teklif Al"
  const quoteBox = document.getElementById('hizli-teklif');
  document.querySelectorAll('a[href="#hizli-teklif"]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (mainNav && menuToggle) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      if (quoteBox) {
        quoteBox.classList.remove('quote-highlight');
        setTimeout(() => {
          quoteBox.classList.add('quote-highlight');
          setTimeout(() => quoteBox.classList.remove('quote-highlight'), 1600);
        }, 420);
      }
    });
  });

  // 5. WhatsApp Quote Builder Submission
  const quoteForm = document.getElementById('whatsappQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedServices = Array.from(
        quoteForm.querySelectorAll('input[name="hizmet"]:checked')
      ).map((cb) => cb.value);

      const name = (document.getElementById('customerName')?.value || '').trim();
      const area = (document.getElementById('customerArea')?.value || 'İskenderun').trim();
      const note = (document.getElementById('customerNote')?.value || '').trim();

      const lines = [
        'Merhaba Kadir Usta, Polat Dekorasyon web sitenizden ulaşıyorum.',
        ''
      ];

      if (name) {
        lines.push(`*İsim:* ${name}`);
      }
      lines.push(`*Bölge:* ${area}`);

      if (selectedServices.length > 0) {
        lines.push(`*Yapılacak İşler:* ${selectedServices.join(', ')}`);
      } else {
        lines.push('*Yapılacak İşler:* Genel Tadilat / İnşaat İşi');
      }

      if (note) {
        lines.push(`*Not:* ${note}`);
      }

      lines.push('');
      lines.push('Keşif ve fiyat bilgisi için dönüş yapabilir misiniz?');

      const encodedText = encodeURIComponent(lines.join('\n'));
      const whatsappUrl = `https://wa.me/905330870063?text=${encodedText}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 6. HD Poster Lightbox Modal
  const posterModal = document.getElementById('posterModal');
  const openPosterBtn = document.getElementById('openPosterModal');
  const openPosterActionBtn = document.getElementById('openPosterModalBtn');
  const closePosterBtn = document.getElementById('closePosterBtn');
  const closePosterBackdrop = document.getElementById('closePosterBackdrop');

  const openModal = () => {
    if (!posterModal) return;
    posterModal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!posterModal) return;
    posterModal.hidden = true;
    document.body.style.overflow = '';
  };

  if (openPosterBtn) openPosterBtn.addEventListener('click', openModal);
  if (openPosterActionBtn) openPosterActionBtn.addEventListener('click', openModal);
  if (closePosterBtn) closePosterBtn.addEventListener('click', closeModal);
  if (closePosterBackdrop) closePosterBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && posterModal && !posterModal.hidden) {
      closeModal();
    }
  });
});
