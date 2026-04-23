/**
 * Custom cursor — a small circle that follows the pointer with easing and grows
 * when hovering interactive targets marked with `.cursor-target`.
 *
 * The #cursor element is expected in the document (see index.html).
 *
 *   const stop = mountCursor();
 */

import { lerp, prefersReducedMotion } from "../../lib/utils.js";

export function mountCursor() {
  if (prefersReducedMotion()) return () => {};
  const cursor = /** @type {HTMLElement} */ (document.getElementById("cursor"));
  if (!cursor) return () => {};

  let tx = -100;
  let ty = -100;
  let x = tx;
  let y = ty;
  let running = true;

  function onMove(e) {
    tx = e.clientX;
    ty = e.clientY;
  }
  function onEnterTarget() {
    cursor.classList.add("is-active");
  }
  function onLeaveTarget() {
    cursor.classList.remove("is-active");
  }

  window.addEventListener("pointermove", onMove, { passive: true });

  // Delegated hover via event listeners on the document
  document.addEventListener("pointerover", (e) => {
    if (/** @type {HTMLElement} */ (e.target).closest(".cursor-target")) {
      onEnterTarget();
    }
  });
  document.addEventListener("pointerout", (e) => {
    if (/** @type {HTMLElement} */ (e.target).closest(".cursor-target")) {
      onLeaveTarget();
    }
  });

  function frame() {
    if (!running) return;
    x = lerp(x, tx, 0.18);
    y = lerp(y, ty, 0.18);
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return () => {
    running = false;
    window.removeEventListener("pointermove", onMove);
    cursor.style.transform = "translate3d(-100px, -100px, 0) translate(-50%, -50%)";
  };
}
