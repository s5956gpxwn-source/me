/**
 * Skills — a dense list of animated chips. Visual treatment owned by CSS.
 */

import { html } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { skills } from "../../../content/skills.js";
import { uiStrings } from "../../../content/nav.js";

export function Skills(_design, locale) {
  return html`<section id="skills" class="section" data-section="skills">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${t(uiStrings.skillsHead, locale)}</span>
        <h2>${t(uiStrings.skillsSub, locale)}</h2>
      </div>

      <div class="skills-grid">
        ${skills.map(
          (s, i) => html`<span
            class="chip-skill reveal cursor-target"
            style="--reveal-delay: ${i * 40}ms;"
          >${s.label}</span>`
        )}
      </div>
    </div>
  </section>`;
}

export function hydrateSkills() {
  return () => {};
}
