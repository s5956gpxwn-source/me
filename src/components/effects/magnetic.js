/**
 * Magnetic hover — elements gently pull toward the cursor when within range.
 * Attach to any element with class `magnetic` (added by primitives when requested).
 *
 *   const stop = mountMagnetic(root, { strength: 0.35 });
 */

import { lerp, prefersReducedMotion } from "../../lib/utils.js";

/**
 * @param {HTMLElement | Document} root
 * @param {{ strength?: number, radius?: number }} [opts]
 */
export function mountMagnetic(root = document, opts = {}) {
  if (prefersReducedMotion()) return () => {};

  const strength = opts.strength ?? 0.3;
  const radius = opts.radius ?? 80;

  /** @type {Map<HTMLElement, { rect: DOMRect, tx: number, ty: number, x: number, y: number }>} */
  const active = new Map();

  function onMove(e) {
    const mx = e.clientX;
    const my = e.clientY;
    const els = /** @type {HTMLElement[]} */ (
      Array.from(root.querySelectorAll(".magnetic"))
    );
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const d = Math.hypot(dx, dy);
      const r = Math.max(rect.width, rect.height) / 2 + radius;

      if (d < r) {
        const falloff = 1 - d / r;
        const tx = dx * strength * falloff;
        const ty = dy * strength * falloff;
        let s = active.get(el);
        if (!s) {
          s = { rect, tx, ty, x: 0, y: 0 };
          active.set(el, s);
          step(el);
        } else {
          s.tx = tx;
          s.ty = ty;
        }
      } else if (active.has(el)) {
        const s = active.get(el);
        s.tx = 0;
        s.ty = 0;
      }
    }
  }

  function step(el) {
    const s = active.get(el);
    if (!s) return;
    s.x = lerp(s.x, s.tx, 0.2);
    s.y = lerp(s.y, s.ty, 0.2);
    el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
    if (Math.abs(s.x - s.tx) < 0.1 && Math.abs(s.y - s.ty) < 0.1 && s.tx === 0 && s.ty === 0) {
      el.style.transform = "";
      active.delete(el);
      return;
    }
    requestAnimationFrame(() => step(el));
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    active.forEach((_, el) => (el.style.transform = ""));
    active.clear();
  };
}
