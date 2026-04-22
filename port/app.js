document.addEventListener('DOMContentLoaded', function () {

  AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });

  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  var fills = document.querySelectorAll('.bar__fill');
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting)
        e.target.style.width = e.target.dataset.w + '%';
    });
  }, { threshold: 0.4 });
  fills.forEach(function (f) { obs.observe(f); });

});
