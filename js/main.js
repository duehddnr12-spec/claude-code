// ATELIER BLANC — site interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Respect reduced-motion for background videos ---------- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('#heroVideo, #filmVideo').forEach(v => {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.classList.toggle('active', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 40);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Product gallery ---------- */
  const galleryMain = document.getElementById('galleryMain');
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-src');
      galleryMain.style.opacity = 0;
      setTimeout(() => {
        galleryMain.src = src;
        galleryMain.classList.remove('img-fallback');
        galleryMain.style.opacity = 1;
      }, 200);
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* ---------- Color swatches ---------- */
  const swatches = document.querySelectorAll('.swatch');
  const colorLabel = document.getElementById('colorLabel');
  swatches.forEach(sw => {
    sw.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      colorLabel.textContent = sw.getAttribute('data-color');
    });
  });

  /* ---------- Size selector ---------- */
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---------- Quantity selector ---------- */
  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  let qty = 1;
  qtyMinus.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  qtyPlus.addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    qtyValue.textContent = qty;
  });

  /* ---------- Add to cart (demo) ---------- */
  const addToCart = document.getElementById('addToCart');
  const cartCount = document.getElementById('cartCount');
  const addFeedback = document.getElementById('addFeedback');
  let cartTotal = 0;
  addToCart.addEventListener('click', () => {
    cartTotal += qty;
    cartCount.textContent = cartTotal;
    const size = document.querySelector('.size-btn.active').textContent;
    const color = colorLabel.textContent;
    addFeedback.textContent = `장바구니에 담았습니다 — ${color} / ${size} × ${qty}`;
    clearTimeout(addToCart._t);
    addToCart._t = setTimeout(() => { addFeedback.textContent = ''; }, 3500);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Size guide modal ---------- */
  const sizeModalOverlay = document.getElementById('sizeModalOverlay');
  document.getElementById('sizeGuideBtn').addEventListener('click', () => {
    sizeModalOverlay.classList.add('open');
  });
  document.getElementById('sizeModalClose').addEventListener('click', () => {
    sizeModalOverlay.classList.remove('open');
  });
  sizeModalOverlay.addEventListener('click', (e) => {
    if (e.target === sizeModalOverlay) sizeModalOverlay.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') sizeModalOverlay.classList.remove('open');
  });

  /* ---------- Newsletter form (demo) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterFeedback = document.getElementById('newsletterFeedback');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    newsletterFeedback.textContent = `감사합니다! ${email} 주소로 10% 할인 코드를 보내드렸습니다.`;
    newsletterForm.reset();
  });

});
