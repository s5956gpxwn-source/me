/**
 * Contact — big CTA + email link.
 */

import { html } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { profile } from "../../../content/profile.js";
import { uiStrings } from "../../../content/nav.js";

export function Contact(_design, locale) {
  return html`<section id="contact" class="section contact" data-section="contact">
    <div class="container container--narrow" style="text-align: center;">
      <div class="section-head reveal" style="text-align: center; margin-inline: auto; align-items: center;">
        <span class="eyebrow">${t(uiStrings.contactHead, locale)}</span>
        <h2 class="contact__cta">
          ${locale === "ar" ? "جاهز لمشروع جديد؟" : "Got something in mind?"}
          <br/>
          <a href="mailto:${profile.email}" class="email cursor-target">${profile.email}</a>
        </h2>
        <p style="font-size: var(--text-lg); color: var(--fg-muted); margin-block-start: 1rem;">
          ${t(uiStrings.contactSub, locale)}
        </p>
      </div>
    </div>
  </section>`;
}

export function hydrateContact() {
  return () => {};
}
