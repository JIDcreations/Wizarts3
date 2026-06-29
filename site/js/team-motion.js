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
