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
