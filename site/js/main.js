/* ═══════════════════════════════════════════════════════════
   WIZARTS — main.js
   Lenis smooth scroll + GSAP ScrollTrigger + parallax/reveals
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ── Year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Preloader ── */
  const preloader = document.getElementById('preloader');
  const countEl = document.getElementById('preloaderCount');
  function runPreloader(done) {
    if (!preloader) { done(); return; }
    if (reduceMotion) {
      if (countEl) countEl.textContent = '100';
      preloader.classList.add('is-done');
      setTimeout(() => { preloader.remove(); done(); }, 200);
      return;
    }
    let n = 0;
    const tick = setInterval(() => {
      n += Math.floor(Math.random() * 9) + 3;
      if (n >= 100) { n = 100; clearInterval(tick); }
      if (countEl) countEl.textContent = n;
      if (n === 100) {
        setTimeout(() => {
          preloader.classList.add('is-done');
          setTimeout(() => { preloader.remove(); done(); }, 900);
        }, 250);
      }
    }, 90);
  }

  /* ── Lenis smooth scroll ── */
  let lenis = null;
  function initLenis() {
    if (!hasLenis || reduceMotion) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    document.documentElement.classList.add('has-lenis');
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  function scrollTo(target) {
    if (lenis) lenis.scrollTo(target, { offset: -10 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* ── Anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      scrollTo(el);
    });
  });

  /* ── Mobile menu ── */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!document.body.classList.contains('is-menu-open')) return;
    document.body.classList.remove('is-menu-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  }
  if (burger) {
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('is-menu-open');
      burger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ── Header hide/show + scrolled state ── */
  const header = document.getElementById('siteHeader');
  let lastY = 0;
  function onScrollHeader() {
    const y = window.scrollY;
    document.body.classList.toggle('is-scrolled', y > 40);
    if (y > lastY && y > 400 && !document.body.classList.contains('is-menu-open')) header.classList.add('is-hidden');
    else header.classList.remove('is-hidden');
    lastY = y;
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ── Sticky badge visibility ── */
  const badge = document.getElementById('stickyBadge');
  if (badge) {
    const hero = document.getElementById('hero');
    const io = new IntersectionObserver(([e]) => {
      badge.classList.toggle('is-visible', !e.isIntersecting);
    }, { threshold: 0.2 });
    if (hero) io.observe(hero);
  }

  /* ── Scroll-spy active nav ── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionMap = {};
  navLinks.forEach((a) => {
    const el = document.querySelector(a.getAttribute('href'));
    if (el) sectionMap[el.id] = a;
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const link = sectionMap[en.target.id];
      if (!link) return;
      if (en.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(sectionMap).forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ── Reveal animations (IntersectionObserver — independent of GSAP) ── */
  function initReveals() {
    const els = document.querySelectorAll('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ── Hero word reveal ── */
  function initHeroWords() {
    const words = document.querySelectorAll('.hero__title .word');
    if (!words.length) return;
    if (reduceMotion || !hasGSAP) { words.forEach((w) => { w.style.transform = 'none'; }); return; }
    gsap.to(words, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.07, delay: 0.15 });
  }

  /* ── Parallax (hero shapes, mesh, case images) ── */
  function initParallax() {
    if (!hasGSAP || reduceMotion) return;

    // Hero mesh drift on scroll
    gsap.utils.toArray('.mesh').forEach((m, i) => {
      gsap.to(m, { yPercent: (i + 1) * 14, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });

    // Hero shapes scroll parallax (depth-based)
    gsap.utils.toArray('.hero__shapes .shape').forEach((s) => {
      const depth = parseFloat(s.dataset.depth) || 0.3;
      gsap.to(s, { yPercent: -depth * 120, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });

    // Case images subtle parallax inside their frame
    gsap.utils.toArray('[data-parallax-img]').forEach((img) => {
      gsap.fromTo(img, { yPercent: -2 }, { yPercent: -14, ease: 'none',
        scrollTrigger: { trigger: img.closest('.case'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ── Hero mouse parallax ── */
  function initMouseParallax() {
    if (reduceMotion) return;
    const shapes = document.querySelectorAll('.hero__shapes .shape');
    const hero = document.getElementById('hero');
    if (!shapes.length || !hero) return;
    let raf = null, tx = 0, ty = 0, cx = {}, cy = {};
    shapes.forEach((s, i) => { cx[i] = 0; cy[i] = 0; });
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    function loop() {
      let active = false;
      shapes.forEach((s, i) => {
        const depth = parseFloat(s.dataset.depth) || 0.3;
        const dx = tx * depth * 60, dy = ty * depth * 60;
        cx[i] += (dx - cx[i]) * 0.08;
        cy[i] += (dy - cy[i]) * 0.08;
        s.style.setProperty('--mx', cx[i].toFixed(2) + 'px');
        s.style.setProperty('--my', cy[i].toFixed(2) + 'px');
        s.style.transform = `translate(${cx[i].toFixed(2)}px, ${cy[i].toFixed(2)}px)`;
        if (Math.abs(dx - cx[i]) > 0.1 || Math.abs(dy - cy[i]) > 0.1) active = true;
      });
      raf = active ? requestAnimationFrame(loop) : null;
    }
  }

  /* ── Marquee (drag-free, scroll-velocity aware) ── */
  function initMarquee() {
    const track = document.querySelector('[data-marquee] .marquee__track');
    if (!track) return;
    if (reduceMotion || !hasGSAP) return;
    let x = 0, base = 0.6, dir = -1;
    const w = track.scrollWidth / 2;
    gsap.ticker.add(() => {
      x += base * dir;
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: '.marquee-band', start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => { dir = self.direction === 1 ? -1 : 1; base = 0.6 + Math.abs(self.getVelocity()) / 3000; }
      });
    }
  }

  /* ── Contact form (demo, no backend) ── */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.getElementById('formNote');
      if (!form.checkValidity()) {
        if (note) { note.style.color = 'var(--oranje)'; note.textContent = 'Vul je naam en e-mailadres in om verder te gaan.'; }
        form.reportValidity();
        return;
      }
      if (note) { note.style.color = 'var(--groen)'; note.textContent = 'Bedankt! We toveren je bericht naar Stijn en contacteren je snel. ✦'; }
      form.reset();
    });
  }

  /* ── Boot ── */
  function boot() {
    initLenis();
    initReveals();
    initHeroWords();
    if (hasGSAP) {
      initParallax();
      initMarquee();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }
    initMouseParallax();
    onScrollHeader();
  }

  let booted = false;
  function start() { if (booted) return; booted = true; runPreloader(boot); }
  // Boot on full load, but never wait more than 2.2s (heavy images / slow CDNs)
  if (document.readyState === 'complete') start();
  else {
    window.addEventListener('load', start);
    setTimeout(start, 2200);
  }
})();
