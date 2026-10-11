const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const icon = toggle.querySelector('i');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  icon.classList.toggle('bi-list');
  icon.classList.toggle('bi-x');
});
// Publication filter
const filterButtons = document.querySelectorAll('.filter');
const pubs = document.querySelectorAll('.publication-list article');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const choice = btn.dataset.filter;
    pubs.forEach(p => {
      p.classList.toggle('hidden', choice !== 'all' && p.dataset.category !== choice);
    });
  });
});
// Rotating hero text (home page only)
const rotator = document.getElementById('rotator');
if (rotator) {
  const words = ['protein chemist', 'chemical biologist',];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = words[wordIndex];
    rotator.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) {
      charIndex++;
      setTimeout(tick, 90);
    } else if (!deleting) {
      deleting = true;
      setTimeout(tick, 1500);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(tick, 45);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 300);
    }
  };
  tick();
}
// News slider (home page only)
const newsTrack = document.querySelector('.news-track');
if (newsTrack) {
  const cards = newsTrack.querySelectorAll('.news-card');
  const dotsBox = document.querySelector('.news-dots');
  let page = 0;
  let timer = null;

  const perView = () => Math.max(1, Math.round(newsTrack.clientWidth / cards[0].offsetWidth));
  const pageCount = () => Math.ceil(cards.length / perView());

  const mark = () => {
    dotsBox.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === page));
  };

  const goTo = (i) => {
    page = (i + pageCount()) % pageCount();
    const card = cards[Math.min(page * perView(), cards.length - 1)];
    const pad = parseInt(getComputedStyle(newsTrack).paddingLeft, 10) || 0;
    newsTrack.scrollTo({ left: card.offsetLeft - pad, behavior: 'smooth' });
    mark();
  };

  const buildDots = () => {
    dotsBox.innerHTML = '';
    for (let i = 0; i < pageCount(); i++) {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.addEventListener('click', () => goTo(i));
      dotsBox.appendChild(b);
    }
    page = Math.min(page, pageCount() - 1);
    mark();
  };

  // Keep the dots in sync when someone swipes or scrolls by hand
  let scrollTimer;
  newsTrack.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const atEnd = newsTrack.scrollLeft + newsTrack.clientWidth >= newsTrack.scrollWidth - 2;
      const index = Math.round(newsTrack.scrollLeft / (cards[0].offsetWidth + 24));
      page = atEnd ? pageCount() - 1 : Math.min(Math.floor(index / perView()), pageCount() - 1);
      mark();
    }, 80);
  });

  // Auto-advance, paused while the pointer is over the slider
  const start = () => { timer = setInterval(() => goTo(page + 1), 5000); };
  const stop = () => clearInterval(timer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    start();
    newsTrack.addEventListener('mouseenter', stop);
    newsTrack.addEventListener('mouseleave', () => { stop(); start(); });
  }

  window.addEventListener('resize', buildDots);
  buildDots();
}
// Number counters (About page only)
document.querySelectorAll('.count').forEach(el => {
  const target = parseInt(el.dataset.count, 10);

  // A counter with no number yet stays hidden
  if (!target) {
    el.closest('.counter').style.display = 'none';
    return;
  }

  const run = () => {
    const start = performance.now();
    const duration = 1200;
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) { run(); observer.disconnect(); }
  }).observe(el);
});
