/* ═══════════════════════════════════════════════════════════
   WIZARTS — home.js
   Homepage-only section animations, bundled into one file:
     1. PROCES  — purple band slide-in + staggered step reveal
     2. MAGIE   — toverstaf that rides the timeline on scroll
     3. TEAM    — idle drift + draggable member discs
   Shared chrome (nav, reveals, form…) lives in base.js.
   ═══════════════════════════════════════════════════════════ */

/* ── 1. PROCES ──────────────────────────────────────────── */
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

/* ── 2. MAGIE (toverstaf) ───────────────────────────────── */
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
    // every point is already "reached": show its check in the final state
    nodes.forEach(function (n) { if (n) n.classList.add('is-checked'); });
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
        nodes[i].classList.add('is-checked'); // persistent: sparkle → check, stays
        nodes[i].classList.remove('is-hit');  // restart the pop/ring CSS animation
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

/* ── 3. TEAM (drift + drag) ─────────────────────────────── */
/* ════════════════════════════════════════════════════════════
   TEAM — gentle idle drift + draggable member discs (#team)
   - Drives TRANSFORM offsets on top of each member's flex anchor
     position, so the composition/layout is never changed.
   - Idle drift: small, slow, per-member out-of-phase wobble that
     orbits the anchor (never wanders off).
   - Drag (pointer + touch): grab a member, it follows smoothly and
     stays where released, then resumes the drift from there.
   - prefers-reduced-motion: no idle drift (static); drag still works.
   - No JS: members stay in their static places.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var section = document.getElementById('team');
  if (!section) return;
  var bounds = section.querySelector('.team__cover') || section;
  var members = Array.prototype.slice
    .call(section.querySelectorAll('.member'))
    .filter(function (m) { return !m.classList.contains('member--spacer'); });
  if (!members.length) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(v, min, max) { return v < min ? min : (v > max ? max : v); }

  var data = members.map(function (el, i) {
    el.style.cursor = 'grab';
    el.style.touchAction = 'none';
    el.style.willChange = 'transform';
    return {
      el: el,
      ox: 0, oy: 0,                  // current drag-base offset (px)
      ampX: 12 + (i % 3) * 4,        // drift amplitude (px) — gentle, bounded
      ampY: 13 + (i % 4) * 3,
      spX: 0.45 + (i % 5) * 0.07,    // drift angular speed (rad/s)
      spY: 0.38 + (i % 3) * 0.06,
      phX: i * 1.7,                  // phase (out of sync per member)
      phY: i * 2.3,
      dragging: false,
      layoutLeft: 0, layoutTop: 0, w: 0, h: 0,
      pStartX: 0, pStartY: 0, bStartX: 0, bStartY: 0
    };
  });

  /* ── Idle drift ─────────────────────────────────────────── */
  var start = null;
  function tick(ts) {
    if (start === null) start = ts;
    var t = (ts - start) / 1000;
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (d.dragging) continue;
      var dx = Math.sin(t * d.spX + d.phX) * d.ampX;
      var dy = Math.cos(t * d.spY + d.phY) * d.ampY;
      d.el.style.transform = 'translate(' + (d.ox + dx).toFixed(2) + 'px,' + (d.oy + dy).toFixed(2) + 'px)';
    }
    requestAnimationFrame(tick);
  }
  if (!reduceMotion) requestAnimationFrame(tick);

  /* ── Drag (pointer events cover mouse + touch) ──────────── */
  function currentOffset(el) {
    var tr = getComputedStyle(el).transform;
    if (!tr || tr === 'none') return { x: 0, y: 0 };
    try { var m = new DOMMatrixReadOnly(tr); return { x: m.m41, y: m.m42 }; }
    catch (e) { return { x: 0, y: 0 }; }
  }

  data.forEach(function (d) {
    d.el.addEventListener('pointerdown', function (e) {
      var r = d.el.getBoundingClientRect();
      var off = currentOffset(d.el);          // adopt current visual offset (incl. drift) → no jump
      d.ox = off.x; d.oy = off.y;
      d.layoutLeft = r.left - off.x;
      d.layoutTop = r.top - off.y;
      d.w = r.width; d.h = r.height;
      d.pStartX = e.clientX; d.pStartY = e.clientY;
      d.bStartX = d.ox; d.bStartY = d.oy;
      d.dragging = true;
      d.el.classList.add('is-dragging');
      d.el.style.cursor = 'grabbing';
      try { d.el.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
    });

    d.el.addEventListener('pointermove', function (e) {
      if (!d.dragging) return;
      var b = bounds.getBoundingClientRect();
      var pad = 8;
      var nx = d.bStartX + (e.clientX - d.pStartX);
      var ny = d.bStartY + (e.clientY - d.pStartY);
      // keep the disc inside the section so it can't cause overflow
      nx = clamp(nx, (b.left + pad) - d.layoutLeft, (b.right - pad) - d.layoutLeft - d.w);
      ny = clamp(ny, (b.top + pad) - d.layoutTop, (b.bottom - pad) - d.layoutTop - d.h);
      d.ox = nx; d.oy = ny;
      d.el.style.transform = 'translate(' + nx.toFixed(2) + 'px,' + ny.toFixed(2) + 'px)';
    });

    function endDrag(e) {
      if (!d.dragging) return;
      d.dragging = false;                     // drift resumes around the released position
      d.el.classList.remove('is-dragging');
      d.el.style.cursor = 'grab';
      try { d.el.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    d.el.addEventListener('pointerup', endDrag);
    d.el.addEventListener('pointercancel', endDrag);
  });
})();
