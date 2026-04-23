/**
 * Socials — animated tiles. Each variant inherits the same structure; CSS styles differ.
 */

import { html, raw } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { socials } from "../../../content/socials.js";
import { uiStrings } from "../../../content/nav.js";

export function Socials(_design, locale) {
  return html`<section id="socials" class="section" data-section="socials">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${t(uiStrings.socialsHead, locale)}</span>
        <h2>${t(uiStrings.socialsSub, locale)}</h2>
      </div>

      <div class="socials-grid">
        ${socials.map(
          (s, i) => html`<a
            href="${s.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="social-card reveal cursor-target"
            style="--social-color: ${s.color}; --reveal-delay: ${i * 60}ms;"
            aria-label="${s.label}"
          >
            <div>${raw(s.icon)}</div>
            <div class="social-card__label">${s.label}</div>
            <div class="social-card__handle">${s.handle}</div>
          </a>`
        )}
      </div>
    </div>
  </section>`;
}

export function hydrateSocials() {
  return () => {};
}
