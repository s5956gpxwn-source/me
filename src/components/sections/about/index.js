/**
 * About — bio + stats. Structure stays the same across designs; CSS does the styling.
 */

import { html } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { profile } from "../../../content/profile.js";
import { uiStrings } from "../../../content/nav.js";

/**
 * @param {'aurora'|'glass'|'brutalist'} _design unused — CSS owns visual differences
 * @param {'ar'|'en'} locale
 */
export function About(_design, locale) {
  return html`<section id="about" class="section section--about" data-section="about">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${t(uiStrings.aboutHead, locale)}</span>
        <h2 class="text-grad">${t(uiStrings.aboutSub, locale)}</h2>
      </div>

      <div class="about__grid">
        <div class="about__bio card reveal" style="--reveal-delay: 60ms;">
          <p style="font-size: var(--text-lg); line-height: 1.7;">${t(profile.bio, locale)}</p>
          <p class="eyebrow" style="margin-block-start: 1.5rem;">
            ${locale === "ar" ? "يعمل من" : "Based in"} · ${t(profile.location, locale)}
          </p>
        </div>

        <ul class="about__stats grid" role="list">
          ${profile.stats.map(
            (s, i) => html`<li class="card reveal stat-card" style="--reveal-delay: ${120 + i * 80}ms;">
              <div class="stat">${s.value}</div>
              <div style="color: var(--fg-muted); margin-block-start: 0.5rem;">${t(s.label, locale)}</div>
            </li>`
          )}
        </ul>
      </div>
    </div>
  </section>`;
}

export function hydrateAbout() {
  return () => {};
}
