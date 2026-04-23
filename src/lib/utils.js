/**
 * Shared utilities.
 */

/**
 * Throttle using requestAnimationFrame — perfect for mouse/scroll handlers.
 * @template {(...a: any[]) => any} F
 * @param {F} fn
 * @returns {F}
 */
export function raf(fn) {
  let scheduled = false;
  let lastArgs;
  return /** @type {F} */ function (...args) {
    lastArgs = args;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fn(...lastArgs);
    });
  };
}

/** Linear interpolation */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Clamp a number to [min, max] */
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/** Map a value from one range to another */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);

/**
 * IntersectionObserver-based reveal — adds .is-visible when the element
 * enters the viewport.
 *
 * Safety net: any target that remains unrevealed after `maxDelay` ms
 * from creation is force-revealed. This guards against edge cases
 * (very tall elements, headless browsers, hidden ancestors) where
 * IO might never fire. For `prefers-reduced-motion`, elements are
 * marked visible immediately.
 *
 * @param {Element | NodeListOf<Element> | Element[]} targets
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean, stagger?: number, maxDelay?: number }} [options]
 */
export function revealOnScroll(targets, options = {}) {
  const list =
    targets instanceof Element
      ? [targets]
      : Array.from(/** @type {ArrayLike<Element>} */ (targets));

  if (
    typeof window === "undefined" ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    list.forEach((el) => el.classList.add("is-visible"));
    return () => {};
  }

  const {
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    once = true,
    stagger = 0,
    maxDelay = 2500,
  } = options;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = list.indexOf(entry.target);
          if (stagger > 0 && idx !== -1) {
            /** @type {HTMLElement} */ (entry.target).style.setProperty(
              "--reveal-delay",
              `${idx * stagger}ms`
            );
          }
          entry.target.classList.add("is-visible");
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          entry.target.classList.remove("is-visible");
        }
      }
    },
    { threshold, rootMargin }
  );

  list.forEach((el) => io.observe(el));

  // Safety net — force any still-hidden element visible after maxDelay.
  // Users who don't scroll immediately still see content.
  const timer = setTimeout(() => {
    list.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
      }
    });
  }, maxDelay);

  return () => {
    io.disconnect();
    clearTimeout(timer);
  };
}

/** Prefers-reduced-motion check (live). */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Find the first ancestor (or self) matching selector. */
export function closest(el, selector) {
  return el?.closest?.(selector) ?? null;
}
