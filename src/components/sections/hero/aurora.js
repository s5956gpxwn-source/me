import { html } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { profile } from "../../../content/profile.js";
import { uiStrings } from "../../../content/nav.js";
import { Button } from "../../ui/button.js";
import { mountAuroraShader } from "../../effects/aurora-shader.js";
import { mountLiquidBlob } from "../../effects/liquid-blob.js";

/**
 * @param {'ar'|'en'} locale
 * @returns {import("../../../lib/html.js").raw}
 */
export function HeroAurora(locale) {
  const name = t(profile.name, locale);
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return html`<section
    id="top"
    class="hero--aurora"
    data-section="hero"
  >
    <canvas class="aurora-bg" aria-hidden="true"></canvas>

    <div class="container" style="position: relative; z-index: 1;">
      <div class="stack" style="--stack-gap: var(--space-8); max-width: 1000px;">
        <div class="reveal">
          <span class="badge">
            <span class="dot" style="background: var(--accent-4); color: var(--accent-4);"></span>
            <span>${t(uiStrings.availableLabel, locale)}</span>
          </span>
        </div>

        <h1 class="hero__title reveal" style="--reveal-delay: 80ms;">
          <span class="line">${firstName}</span>
          <span class="line">${lastName || t(profile.role, locale)}</span>
        </h1>

        <p class="reveal" style="--reveal-delay: 160ms; font-size: var(--text-xl); color: var(--fg-muted); max-width: 58ch; line-height: 1.55;">
          ${t(profile.tagline, locale)}
        </p>

        <div class="cluster reveal" style="--reveal-delay: 240ms; gap: 0.75rem;">
          ${Button({
            label: t(uiStrings.viewWork, locale),
            href: "#projects",
            size: "large",
            magnetic: true,
          })}
          ${Button({
            label: t(uiStrings.sayHi, locale),
            href: "#contact",
            variant: "ghost",
            size: "large",
            magnetic: true,
          })}
        </div>
      </div>
    </div>
  </section>`;
}

/**
 * @param {HTMLElement} el
 * @returns {() => void}
 */
export function hydrateHeroAurora(el) {
  const canvas = /** @type {HTMLCanvasElement} */ (el.querySelector(".aurora-bg"));
  const stopShader = canvas ? mountAuroraShader(canvas, { palette: ["#07091c", "#a855f7", "#3b82f6", "#ec4899"], intensity: 1.1 }) : () => {};
  const stopBlob = mountLiquidBlob(el, { ease: 0.08 });
  return () => {
    stopShader();
    stopBlob();
  };
}
