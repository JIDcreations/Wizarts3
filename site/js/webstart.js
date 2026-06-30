/* ════════════════════════════════════════════════════════════
   WIZARTS — webstart.js  (page-scoped, loaded after base.js)

   AANPAK toverstaf: a wand rides down the #aanpak step timeline on
   scroll, drawing the progress line and lighting up each step's
   number as its tip reaches it. Inspired by the home "magie" wand
   (home.js, #visie) but its own take: numbers stay visible, the
   spine fills behind them and each circle gets an orange halo + ring
   pulse — instead of the home sparkle→check swap.

   Scoped to [data-ws-steps]; touches no shared state, no base.js.
   Respects prefers-reduced-motion: wand parks at the end, every step
   shown active, no scroll listeners, no travel animation.
   ════════════════════════════════════════════════════════════ */
(function () {
  var root = document.querySelector('[data-ws-steps]');
  if (!root) return;
  var wand = root.querySelector('[data-ws-wand]');
  var fill = root.querySelector('.ws-steps__fill');
  var steps = Array.prototype.slice.call(root.querySelectorAll('.ws-step'));
  if (!steps.length) return;

  var nums = steps.map(function (s) { return s.querySelector('.ws-step__num'); });
  var hit = steps.map(function () { return false; });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Vertical centre of each number circle, measured from the list's top.
  // (offsetTop is unreliable here: each number's offsetParent is its own
  // .ws-step, so it reports ~0 — we measure against the timeline root instead,
  // mirroring how home.js maps node offsets onto the wand's travel.)
  function centre(i) {
    var n = nums[i];
    if (!n) return 0;
    var rb = root.getBoundingClientRect();
    var nb = n.getBoundingClientRect();
    return (nb.top - rb.top) + nb.height / 2;
  }
  function maxTravel() { return centre(steps.length - 1) - centre(0); }

  function place(progress) {
    var base = centre(0);
    var y = progress * maxTravel();
    if (fill) { fill.style.top = base + 'px'; fill.style.height = y + 'px'; }
    if (wand) {
      var wh = wand.offsetHeight || 38;
      wand.style.transform = 'translateY(' + (base - wh / 2 + y) + 'px)';
    }
  }

  // Reduced motion: park at the end, mark all steps reached, no listeners.
  if (reduce.matches) {
    place(1);
    steps.forEach(function (s) { s.classList.add('is-active'); });
    root.classList.add('is-wand-done');
    return;
  }

  var done = false, ticking = false;

  function update() {
    ticking = false;
    var rect = root.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var start = vh * 0.72;  // progress 0 when the list top sits here
    var end = vh * 0.40;    // progress 1 when the list bottom reaches here
    var span = (start - end) + rect.height;
    var progress = span > 0 ? (start - rect.top) / span : 0;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    place(progress);

    // Light up each step as the wand's tip reaches it; re-arm on the way up.
    var y = progress * maxTravel();
    for (var i = 0; i < steps.length; i++) {
      var reached = y >= (centre(i) - centre(0)) - 4;
      if (reached && !hit[i]) {
        hit[i] = true;
        steps[i].classList.add('is-active');
        steps[i].classList.remove('is-pulse');
        void steps[i].offsetWidth; // reflow so the pulse animation restarts
        steps[i].classList.add('is-pulse');
      } else if (!reached && hit[i]) {
        hit[i] = false;
        steps[i].classList.remove('is-active');
        steps[i].classList.remove('is-pulse');
      }
    }

    if (progress >= 0.999 && !done) {
      done = true;
      root.classList.add('is-wand-done');
    } else if (progress < 0.9 && done) {
      done = false;
      root.classList.remove('is-wand-done');
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
