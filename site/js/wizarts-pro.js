/* ═══════════════════════════════════════════════════════════
   WIZARTS PRO — page-specific motion (loaded AFTER base.js)
   1. Expertise panels → pinned horizontal scroll on scrub.
   2. Aanpak cube → parallax drift tied to section scroll.
   Both are gated behind GSAP availability + matchMedia, so
   reduced-motion / no-GSAP / small screens fall back to the
   native horizontal scroll-snap and a static cube poster.
   GSAP + ScrollTrigger are registered by base.js (also wired
   to Lenis), so we only add ScrollTriggers here.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return; // → native scroll-snap fallback (CSS)

  function init() {
    var mm = gsap.matchMedia();

    /* ── 1. Pinned horizontal scroll for the expertise panels ── */
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', function () {
      var section  = document.querySelector('.pro-exp');
      var pin      = document.querySelector('.pro-exp__pin');
      var scroller = document.querySelector('.pro-exp__scroller');
      var track    = document.querySelector('.pro-exp__track');
      if (!section || !pin || !scroller || !track) return;

      // Only pin if the row is actually wider than the viewport.
      var amount = function () {
        return Math.max(0, track.scrollWidth - scroller.clientWidth);
      };
      if (amount() <= 0) return;

      section.classList.add('is-pinned');

      var tween = gsap.to(track, {
        x: function () { return -amount(); },
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: function () { return '+=' + amount(); },
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      return function () { // cleanup when the query stops matching
        section.classList.remove('is-pinned');
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    /* ── 2. Parallax cube drifting through the aanpak section ── */
    mm.add('(min-width: 981px) and (prefers-reduced-motion: no-preference)', function () {
      var section = document.querySelector('.pro-aanpak');
      var cube = section && section.querySelector('.pro-aanpak__cube');
      if (!cube) return;

      var tween = gsap.fromTo(cube,
        { yPercent: -6, rotation: -4 },
        {
          yPercent: 62,
          rotation: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

      return function () {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(cube, { clearProps: 'transform' });
      };
    });

    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Re-measure once everything (fonts, media) has loaded.
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
