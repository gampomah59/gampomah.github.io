const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const icon = toggle.querySelector('i');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  icon.classList.toggle('bi-list');
  icon.classList.toggle('bi-x');
});
