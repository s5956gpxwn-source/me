import { html } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { profile } from "../../../content/profile.js";
import { uiStrings } from "../../../content/nav.js";
import { Button } from "../../ui/button.js";
import { mountMeshBlobs } from "../../effects/mesh-blobs.js";

/**
 * @param {'ar'|'en'} locale
 */
export function HeroGlass(locale) {
  const fullRole = t(profile.role, locale);
  // Split role so we can italicize the second word/phrase
  const words = fullRole.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return html`<section id="top" class="hero--glass" data-section="hero">
    <div class="mesh-container" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden;"></div>

    <div class="container container--narrow" style="position: relative; z-index: 1;">
      <div class="reveal hero__eyebrow">
        <span class="badge">
          <span class="dot" style="background: var(--accent-1); color: var(--accent-1);"></span>
          <span>${t(uiStrings.availableLabel, locale)}</span>
        </span>
      </div>

      <h1 class="hero__title reveal" style="--reveal-delay: 100ms;">
        ${firstWord} <em>${rest || t(profile.name, locale)}</em>
      </h1>

      <p class="hero__sub reveal" style="--reveal-delay: 200ms;">
        ${t(profile.tagline, locale)}
      </p>

      <div class="hero__ctas reveal" style="--reveal-delay: 300ms;">
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
  </section>`;
}

/**
 * @param {HTMLElement} el
 */
export function hydrateHeroGlass(el) {
  const host = /** @type {HTMLElement} */ (el.querySelector(".mesh-container"));
  const stop = host ? mountMeshBlobs(host, { count: 5 }) : () => {};
  return () => stop();
}
