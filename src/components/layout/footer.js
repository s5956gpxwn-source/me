import { html, raw } from "../../lib/html.js";
import { t } from "../../lib/t.js";
import { profile } from "../../content/profile.js";
import { uiStrings } from "../../content/nav.js";
import { socials } from "../../content/socials.js";

/**
 * @param {'ar'|'en'} locale
 */
export function Footer(locale) {
  return html`<footer class="footer">
    <div class="container footer__inner">
      <div>© ${uiStrings.year} ${t(profile.name, locale)} — ${t(uiStrings.rights, locale)}</div>
      <div class="cluster footer__socials">
        ${socials.slice(0, 4).map(
          (s) => html`<a
            class="cursor-target footer__social"
            href="${s.url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${s.label}"
          >${raw(s.icon)}</a>`
        )}
      </div>
    </div>
  </footer>`;
}
