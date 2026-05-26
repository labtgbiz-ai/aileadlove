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
// Load VK iframes only when they enter viewport - saves ~46 network requests on page load
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
}, { rootMargin: '200px 0px' }); // Start loading 200px before visible

// ===== REELS NAVIGATION =====
function scrollReels(btn, dir) {
  const track = btn.closest('.reels-section').querySelector('.reels-track');
  if (!track) return;
  const itemW = track.querySelector('.reel-item')?.offsetWidth || 200;
  track.scrollBy({ left: dir * (itemW + 12) * 3, behavior: 'smooth' });
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

// Close menu on nav link click
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
    navbar.classList.toggle('hidden', y > lastScroll + 10 && y > 200);
    navbar.classList.remove('hidden', y < lastScroll);
  }
  lastScroll = y;
}, { passive: true });

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  // Reveal animations
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Lazy iframes
  document.querySelectorAll('iframe[data-src]').forEach(el => iframeObserver.observe(el));

  // Reels dots
  document.querySelectorAll('.reels-section').forEach(section => {
    const track = section.querySelector('.reels-track');
    const dots = section.querySelectorAll('.reel-dot');
    if (!track || !dots.length) return;
    track.addEventListener('scroll', () => {
      const items = track.querySelectorAll('.reel-item');
      if (!items.length) return;
      const itemW = items[0].offsetWidth + 12;
      const idx = Math.round(track.scrollLeft / itemW);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, { passive: true });
  });
});
