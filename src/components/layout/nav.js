import { html } from "../../lib/html.js";
import { t } from "../../lib/t.js";
import { navItems } from "../../content/nav.js";
import { profile } from "../../content/profile.js";

/**
 * @param {'ar'|'en'} locale
 */
export function Nav(locale) {
  return html`<nav class="nav" aria-label="Primary">
    <div class="container nav__inner">
      <a href="#top" class="nav__brand cursor-target">${t(profile.shortName, locale)}<span style="color: var(--accent-1)">.</span></a>
      <div class="nav__links">
        ${navItems.map(
          (n) => html`<a class="nav__link cursor-target" href="${n.href}">${t(n.label, locale)}</a>`
        )}
      </div>
    </div>
  </nav>`;
}
