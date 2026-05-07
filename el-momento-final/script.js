
// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
function toggleMob() {
  const m = document.getElementById('mobMenu');
  m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}

// Menu tabs
function switchTab(id, btn) {
  document.querySelectorAll('.mpanel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

// Carousel
let slide = 0;
const cards = document.querySelectorAll('.review-card');
const total = cards.length;
const vis = window.innerWidth < 768 ? 1 : 3;
const maxS = Math.max(0, total - vis);

function buildDots() {
  const el = document.getElementById('carouselDots');
  for (let i = 0; i <= maxS; i++) {
    const d = document.createElement('div');
    d.className = 'cdot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    el.appendChild(d);
  }
}
function goTo(n) {
  slide = Math.max(0, Math.min(n, maxS));
  const w = document.querySelector('.review-card').offsetWidth + 24;
  document.getElementById('reviewsTrack').style.transform = `translateX(-${slide * w}px)`;
  document.querySelectorAll('.cdot').forEach((d, i) => d.classList.toggle('active', i === slide));
}
function moveCarousel(dir) { goTo(slide + dir); }
buildDots();
setInterval(() => goTo(slide >= maxS ? 0 : slide + 1), 5000);

// Booking
function submitBooking() {
  const btn = document.querySelector('.btn-book');
  const ok = document.getElementById('bookSuccess');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    ok.style.display = 'block';
    setTimeout(() => {
      btn.style.display = 'block';
      ok.style.display = 'none';
      btn.textContent = 'Confirm My Reservation 🎉';
      btn.disabled = false;
    }, 5000);
  }, 1200);
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.sr, .sr-l, .sr-r').forEach(el => obs.observe(el));
