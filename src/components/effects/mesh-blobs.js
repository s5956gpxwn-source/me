/**
 * Soft mesh blobs — multiple blurred color orbs that drift slowly across
 * the hero for the Glass design.
 *
 *   const stop = mountMeshBlobs(container, { palette: [...], count: 4 });
 */

import { prefersReducedMotion } from "../../lib/utils.js";

/**
 * @param {HTMLElement} container
 * @param {{ palette?: string[], count?: number }} [opts]
 */
export function mountMeshBlobs(container, opts = {}) {
  const palette = opts.palette ?? ["#e0c3fc", "#8ec5fc", "#fbc2eb", "#d4a574"];
  const count = opts.count ?? 4;

  /** @type {HTMLElement[]} */
  const blobs = [];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "mesh-blob";
    b.style.background = `radial-gradient(circle, ${palette[i % palette.length]} 0%, transparent 65%)`;
    b.style.insetInlineStart = `${Math.random() * 80}%`;
    b.style.insetBlockStart = `${Math.random() * 80}%`;
    container.appendChild(b);
    blobs.push(b);
  }

  if (prefersReducedMotion()) {
    return () => blobs.forEach((b) => b.remove());
  }

  let running = true;
  const start = performance.now();

  function tick() {
    if (!running) return;
    const t = (performance.now() - start) / 1000;
    blobs.forEach((b, i) => {
      const px = (Math.sin(t * 0.12 + i * 1.7) * 0.5 + 0.5) * 90;
      const py = (Math.cos(t * 0.1 + i * 2.3) * 0.5 + 0.5) * 90;
      const s = 0.9 + 0.25 * Math.sin(t * 0.25 + i);
      b.style.transform = `translate3d(${px - 50}%, ${py - 50}%, 0) scale(${s})`;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return () => {
    running = false;
    blobs.forEach((b) => b.remove());
  };
}
