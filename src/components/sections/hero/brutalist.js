import { html } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { profile } from "../../../content/profile.js";
import { uiStrings } from "../../../content/nav.js";
import { Button } from "../../ui/button.js";
import { mountBrutalBlobs } from "../../effects/brutal-blobs.js";

/**
 * @param {'ar'|'en'} locale
 */
export function HeroBrutalist(locale) {
  const name = t(profile.name, locale);
  const parts = name.split(" ");
  const first = parts[0];
  const last = parts.slice(1).join(" ");

  return html`<section id="top" class="hero--brutalist" data-section="hero">
    <div class="brutal-container" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden; z-index: 0;"></div>

    <div class="container" style="position: relative; z-index: 1;">
      <div class="reveal" style="display: inline-block;">
        <span class="hero__tag">★ ${t(uiStrings.availableLabel, locale)}</span>
      </div>

      <h1 class="hero__big reveal" style="--reveal-delay: 80ms; margin-block-start: 1.5rem;">
        <span>${first}</span><br/>
        <span class="stroke">${last || t(profile.role, locale)}</span>
      </h1>

      <div class="hero__meta reveal" style="--reveal-delay: 200ms;">
        <p style="font-size: var(--text-xl); max-width: 44ch; font-weight: 500;">
          ${t(profile.tagline, locale)}
        </p>
        <div class="cluster" style="gap: 0.75rem;">
          ${Button({
            label: t(uiStrings.viewWork, locale),
            href: "#projects",
            size: "large",
          })}
          ${Button({
            label: t(uiStrings.sayHi, locale),
            href: "#contact",
            variant: "ghost",
            size: "large",
          })}
        </div>
      </div>
    </div>
  </section>`;
}

/**
 * @param {HTMLElement} el
 */
export function hydrateHeroBrutalist(el) {
  const host = /** @type {HTMLElement} */ (el.querySelector(".brutal-container"));
  const stop = host ? mountBrutalBlobs(host, { count: 3 }) : () => {};
  return () => stop();
}
