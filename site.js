// Shared behavior for every page: scroll reveal + mobile menu.
(function () {
  'use strict';

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
})();
