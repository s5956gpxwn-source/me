/**
 * Liquid blob follower — a soft, color-filled blob that trails the mouse with easing.
 * Pure CSS+JS, no canvas. Sized via CSS.
 *
 *   const stop = mountLiquidBlob(el, { ease: 0.08 });
 */

import { lerp, prefersReducedMotion } from "../../lib/utils.js";

/**
 * @param {HTMLElement} container  element that constrains the blob (position: relative)
 * @param {{ ease?: number, scale?: number }} [opts]
 */
export function mountLiquidBlob(container, opts = {}) {
  if (prefersReducedMotion()) return () => {};

  const ease = opts.ease ?? 0.08;

  const blob = document.createElement("div");
  blob.className = "liquid-blob";
  blob.style.background =
    "radial-gradient(circle at 30% 30%, var(--accent-1), transparent 60%)," +
    "radial-gradient(circle at 70% 60%, var(--accent-2), transparent 55%)," +
    "radial-gradient(circle at 50% 80%, var(--accent-3), transparent 60%)";
  container.appendChild(blob);

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let active = false;
  let running = true;

  const rect = () => container.getBoundingClientRect();

  function onMove(e) {
    const r = rect();
    const mx = (e.clientX ?? e.touches?.[0]?.clientX) - r.left;
    const my = (e.clientY ?? e.touches?.[0]?.clientY) - r.top;
    targetX = mx;
    targetY = my;
    if (!active) {
      x = mx;
      y = my;
      active = true;
    }
  }
  function onLeave() {
    const r = rect();
    targetX = r.width / 2;
    targetY = r.height / 2;
  }

  container.addEventListener("pointermove", onMove, { passive: true });
  container.addEventListener("pointerleave", onLeave, { passive: true });
  onLeave();

  function frame() {
    if (!running) return;
    x = lerp(x, targetX, ease);
    y = lerp(y, targetY, ease);
    blob.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  return () => {
    running = false;
    container.removeEventListener("pointermove", onMove);
    container.removeEventListener("pointerleave", onLeave);
    blob.remove();
  };
}
