/**
 * Central app state — design variant, theme mode, locale.
 *
 * Each piece:
 *   - has a safe default
 *   - is persisted to localStorage
 *   - is reflected onto <html> data-* attrs for CSS targeting
 *   - is observable via store.subscribe(key, cb)
 *
 * Adding a new axis (e.g. density="compact|relaxed") is mechanical:
 *   1) Add to defaults + list of persisted keys below.
 *   2) Add a matching CSS selector ([data-density="compact"] { ... }).
 *   3) Add a control in components/layout/controls.js.
 */

import { createStore } from "../lib/state.js";

/** @typedef {'aurora' | 'glass' | 'brutalist'} Design */
/** @typedef {'dark' | 'light'} Theme */
/** @typedef {'ar' | 'en'} Locale */

/** @type {Design[]} */
export const DESIGNS = ["aurora", "glass", "brutalist"];
/** @type {Theme[]} */
export const THEMES = ["dark", "light"];
/** @type {Locale[]} */
export const LOCALES = ["ar", "en"];

const DEFAULTS = {
  design: /** @type {Design} */ ("aurora"),
  theme: /** @type {Theme} */ ("dark"),
  locale: /** @type {Locale} */ ("ar"),
};

function read(key, fallback, allowed) {
  try {
    const v = localStorage.getItem(key);
    if (v && allowed.includes(v)) return v;
  } catch {}
  return fallback;
}

export const appState = createStore({
  design: read("design", DEFAULTS.design, DESIGNS),
  theme: read("theme", DEFAULTS.theme, THEMES),
  locale: read("locale", DEFAULTS.locale, LOCALES),
});

/**
 * Wire state → <html> attrs + localStorage. Call once at startup.
 */
export function initAppState() {
  const root = document.documentElement;

  const apply = () => {
    const { design, theme, locale } = appState.all();
    root.dataset.design = design;
    root.dataset.theme = theme;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  };

  apply();

  appState.subscribe("design", (v) => {
    root.dataset.design = v;
    try { localStorage.setItem("design", v); } catch {}
  });
  appState.subscribe("theme", (v) => {
    root.dataset.theme = v;
    try { localStorage.setItem("theme", v); } catch {}
  });
  appState.subscribe("locale", (v) => {
    root.lang = v;
    root.dir = v === "ar" ? "rtl" : "ltr";
    try { localStorage.setItem("locale", v); } catch {}
  });
}
