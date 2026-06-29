/* PROCES (Branding) entrance — scoped, independent of main.js.
   On scroll-in: add `.band-in` to the section, which (via CSS) slides the
   purple band in from the left first, then reveals the 4 steps one-by-one.
   Reduced-motion or no IntersectionObserver: reveal everything immediately. */
(function () {
  var proces = document.querySelector('.proces');
  if (!proces) return;

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    proces.classList.add('band-in');
    return;
  }

  /* Observe the (un-transformed) header so the trigger fires as the section
     scrolls into frame — the band itself is transformed off-screen, so it is
     not a reliable intersection target. */
  var trigger = proces.querySelector('.proces__head') || proces;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        proces.classList.add('band-in');
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(trigger);
})();
