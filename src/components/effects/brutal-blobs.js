/**
 * Brutalist blobs — bold, barely-blurred color blobs that drift across the hero.
 * They sit behind strict typography and add a "liquid" touch to a hard grid.
 *
 *   const stop = mountBrutalBlobs(container, { palette: [...] });
 */

import { prefersReducedMotion } from "../../lib/utils.js";

/**
 * @param {HTMLElement} container
 * @param {{ palette?: string[], count?: number }} [opts]
 */
export function mountBrutalBlobs(container, opts = {}) {
  const palette = opts.palette ?? ["#ff3366", "#0066ff", "#ffcc00", "#00ff88"];
  const count = opts.count ?? 3;

  const blobs = [];
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "brutal-blob";
    const size = 260 + i * 100;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.background = palette[i % palette.length];
    container.appendChild(b);
    blobs.push(b);
  }

  if (prefersReducedMotion()) {
    blobs.forEach((b, i) => {
      b.style.insetInlineStart = `${10 + i * 25}%`;
      b.style.insetBlockStart = `${20 + i * 20}%`;
    });
    return () => blobs.forEach((b) => b.remove());
  }

  let running = true;
  const start = performance.now();

  function tick() {
    if (!running) return;
    const t = (performance.now() - start) / 1000;
    blobs.forEach((b, i) => {
      const px = (Math.sin(t * 0.15 + i * 2.1) * 0.5 + 0.5) * 80;
      const py = (Math.cos(t * 0.12 + i * 1.4) * 0.5 + 0.5) * 75;
      b.style.insetInlineStart = `${px}%`;
      b.style.insetBlockStart = `${py}%`;
      b.style.transform = `translate(-50%, -50%) rotate(${Math.sin(t * 0.2 + i) * 20}deg)`;
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return () => {
    running = false;
    blobs.forEach((b) => b.remove());
  };
}
