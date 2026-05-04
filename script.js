/* ============================================================
   KKS & Co — script.js
   Minimal interaction layer.
   ============================================================ */

(function () {
  'use strict';

  // -----------------------------------------------------------
  // 1. Year stamp in footer
  // -----------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------------------------------------------
  // 2. Header — toggle "scrolled" class for subtle border
  // -----------------------------------------------------------
  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;
    if (header) {
      if (y > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -----------------------------------------------------------
  // 3. Mobile nav toggle
  // -----------------------------------------------------------
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // -----------------------------------------------------------
  // 4. Scroll-triggered reveal for sections below the fold
  //    (Hero animates on load; the rest reveals as you scroll.)
  // -----------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.section-title, .prose, .pillars, .services, .now-statement, .articles, .principal-grid, .engage-title, .engage-prose, .engage-actions, .engage-detail'
    );

    targets.forEach(function (el) { el.classList.add('reveal'); });

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  // -----------------------------------------------------------
  // 5. Smooth scroll offset for sticky header
  //    (CSS scroll-behavior already smooth; this just adjusts
  //    landing position so headings aren't hidden under header.)
  // -----------------------------------------------------------
  const headerOffset = 80;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
