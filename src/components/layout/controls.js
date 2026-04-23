/**
 * Floating controls — Design / Theme / Locale switcher.
 * Updates app state. Persistence is handled by the app-state provider.
 */

import { html, raw, renderFragment } from "../../lib/html.js";
import { appState, DESIGNS, THEMES, LOCALES } from "../../providers/app-state.js";
import { t } from "../../lib/t.js";
import { uiStrings } from "../../content/nav.js";

const ICON_SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
const ICON_MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const DESIGN_LABEL = {
  aurora: { ar: "أورورا", en: "Aurora" },
  glass: { ar: "زجاج", en: "Glass" },
  brutalist: { ar: "جريء", en: "Brutal" },
};

export function Controls() {
  return html`<aside class="controls" aria-label="Display preferences"></aside>`;
}

/**
 * Hydrate the controls: build buttons, wire clicks, reflect state.
 * @param {HTMLElement} root
 */
export function hydrateControls(root) {
  function render() {
    const { design, theme, locale } = appState.all();
    const s = uiStrings.controls;

    root.innerHTML = "";
    root.appendChild(
      renderFragment(html`
        <div class="controls__group" role="group" aria-label="${t(s.design, locale)}">
          ${DESIGNS.map(
            (d) => html`<button
              class="controls__btn cursor-target"
              data-action="design"
              data-value="${d}"
              aria-pressed="${d === design ? "true" : "false"}"
              title="${t(DESIGN_LABEL[d], locale)}"
            >${t(DESIGN_LABEL[d], locale)}</button>`
          )}
        </div>

        <div class="controls__group" role="group" aria-label="${t(s.theme, locale)}">
          ${THEMES.map(
            (k) => html`<button
              class="controls__btn cursor-target"
              data-action="theme"
              data-value="${k}"
              aria-pressed="${k === theme ? "true" : "false"}"
              title="${k}"
            >${raw(k === "dark" ? ICON_MOON : ICON_SUN)}</button>`
          )}
        </div>

        <div class="controls__group" role="group" aria-label="${t(s.locale, locale)}">
          ${LOCALES.map(
            (l) => html`<button
              class="controls__btn cursor-target"
              data-action="locale"
              data-value="${l}"
              aria-pressed="${l === locale ? "true" : "false"}"
              title="${l === "ar" ? "العربية" : "English"}"
            >${l === "ar" ? "ع" : "EN"}</button>`
          )}
        </div>
      `)
    );
  }

  root.addEventListener("click", (e) => {
    const btn = /** @type {HTMLElement} */ (e.target).closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    const value = btn.getAttribute("data-value");
    if (!action || !value) return;
    appState.set(action, value);
  });

  // Re-render on any state change that changes button states / labels
  appState.subscribe("design", render);
  appState.subscribe("theme", render);
  appState.subscribe("locale", render);

  render();
}
