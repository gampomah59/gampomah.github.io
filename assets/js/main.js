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
