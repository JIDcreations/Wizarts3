/* Probleem → Magie — toverstaf that travels down the timeline with scroll progress.
   Scoped to the #visie section; does not touch main.js or any shared state.
   Respects prefers-reduced-motion: the wand simply rests at the bottom, no auto-motion. */
(function () {
  var timeline = document.querySelector('[data-magie-timeline]');
  if (!timeline) return;
  var wand = timeline.querySelector('[data-magie-wand]');
  if (!wand) return;

  var steps = timeline.querySelectorAll('.magie__step');
  var nodes = [];
  steps.forEach(function (s) { nodes.push(s.querySelector('.magie__node')); });
  var hit = nodes.map(function () { return false; });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Offsets (within the list) of each node, measured from the first node — the wand's
  // translateY maps onto these, so we know when it has reached/passed a given point.
  function nodeOffset(i) { return steps[i].offsetTop - steps[0].offsetTop; }
  // Travel from the first node down to the last node.
  function maxTravel() {
    if (!steps.length) return 0;
    return nodeOffset(steps.length - 1);
  }

  function place(progress) {
    wand.style.transform = 'translateY(' + (progress * maxTravel()) + 'px)';
  }

  // Reduced motion: park the wand at the bottom, mark done (static glow), no listeners,
  // and fire no per-node pulses — all motion is skipped.
  if (reduce.matches) {
    place(1);
    timeline.classList.add('is-wand-done');
    return;
  }

  var done = false;
  var ticking = false;

  function update() {
    ticking = false;
    var rect = timeline.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var start = vh * 0.70; // progress 0 when the list top sits here
    var end = vh * 0.42;   // progress 1 when the list bottom reaches here
    var span = (start - end) + rect.height;
    var progress = span > 0 ? (start - rect.top) / span : 0;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    place(progress);

    // Per-node effect: as the wand's tip reaches each point, pulse that node once.
    // Scrolling back up past a node re-arms it so the effect can replay.
    var wandY = progress * maxTravel();
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i]) continue;
      var reached = wandY >= nodeOffset(i) - 3;
      if (reached && !hit[i]) {
        hit[i] = true;
        nodes[i].classList.remove('is-hit'); // restart the CSS animation
        void nodes[i].offsetWidth;            // reflow so the re-add re-triggers
        nodes[i].classList.add('is-hit');
      } else if (!reached && hit[i]) {
        hit[i] = false;
        nodes[i].classList.remove('is-hit');
      }
    }

    if (progress >= 0.999 && !done) {
      done = true;
      timeline.classList.add('is-wand-done'); // fires the bigger bottom sparkle burst (CSS)
    } else if (progress < 0.9 && done) {
      // allow the burst to replay if the user scrolls back up and down again
      done = false;
      timeline.classList.remove('is-wand-done');
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
