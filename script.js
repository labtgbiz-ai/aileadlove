// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

// ===== LAZY IFRAME LOADING (portfolio section) =====
const iframeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const iframe = e.target;
      const dataSrc = iframe.getAttribute('data-src');
      if (dataSrc && iframe.src !== dataSrc) {
        iframe.src = dataSrc;
        iframe.removeAttribute('data-src');
      }
      iframeObserver.unobserve(iframe);
    }
  });
}, { rootMargin: '200px 0px' });

// ===== REELS NAVIGATION (desktop buttons) =====
function scrollReels(dir) {
  const track = document.getElementById('reelsTrack');
  if (!track) return;
  const item = track.querySelector('.reel-item');
  const itemW = item ? item.offsetWidth + 12 : 220;
  track.scrollBy({ left: dir * itemW, behavior: 'smooth' });
}

// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.querySelector('.hamburger');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
document.addEventListener('click', (e) => {
  const link = e.target.closest('.mobile-menu a');
  if (link) {
    const menu = document.getElementById('mobile-menu');
    if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; }
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (navbar) {
    navbar.classList.toggle('scrolled', y > 50);
    if (y > lastScroll + 10 && y > 200) {
      navbar.classList.add('hidden');
    } else if (y < lastScroll) {
      navbar.classList.remove('hidden');
    }
  }
  lastScroll = y;
}, { passive: true });

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('iframe[data-src]').forEach(el => iframeObserver.observe(el));

  // ===== REELS DOTS + TOUCH SWIPE =====
  document.querySelectorAll('.reels-section').forEach(section => {
    const track = section.querySelector('.reels-track');
    const dots = section.querySelectorAll('.reel-dot');
    if (!track) return;

    // Update active dot on scroll
    if (dots.length) {
      track.addEventListener('scroll', () => {
        const items = track.querySelectorAll('.reel-item');
        if (!items.length) return;
        const itemW = items[0].offsetWidth + 12;
        const idx = Math.round(track.scrollLeft / itemW);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }, { passive: true });
    }

    // Touch swipe: snap to next/prev item on swipe
    let touchStartX = 0;
    let touchStartScrollLeft = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartScrollLeft = track.scrollLeft;
      isDragging = false;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const dx = touchStartX - e.touches[0].clientX;
      if (Math.abs(dx) > 5) isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const dx = touchStartX - e.changedTouches[0].clientX;
      const item = track.querySelector('.reel-item');
      const itemW = item ? item.offsetWidth + 12 : 220;
      const currentIdx = Math.round(touchStartScrollLeft / itemW);
      const targetIdx = dx > 30 ? currentIdx + 1 : dx < -30 ? currentIdx - 1 : currentIdx;
      const items = track.querySelectorAll('.reel-item');
      const clampedIdx = Math.max(0, Math.min(targetIdx, items.length - 1));
      track.scrollTo({ left: clampedIdx * itemW, behavior: 'smooth' });
    }, { passive: true });
  });
});
