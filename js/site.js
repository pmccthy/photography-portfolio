document.querySelector('.menu-toggle').addEventListener('click', function() {
  const navWrap = document.querySelector('.nav-wrap');
  navWrap.classList.toggle('open');
  this.textContent = navWrap.classList.contains('open') ? '▲' : '▼';
});

document.querySelectorAll('.toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    this.closest('.has-children').classList.toggle('open');
  });
});
