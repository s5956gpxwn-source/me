/**
 * App entry — mounts layout + sections, wires providers, and re-renders
 * on design/locale changes.
 *
 * Key design decision: on design/locale change we *replace* sections (via
 * innerHTML) and re-hydrate their effects. This keeps the runtime simple
 * and lets each variant own its own DOM and behaviors.
 */

import { renderFragment, toString } from "./lib/html.js";
import { appState, initAppState } from "./providers/app-state.js";
import { revealOnScroll } from "./lib/utils.js";

import { Nav } from "./components/layout/nav.js";
import { Footer } from "./components/layout/footer.js";
import { Controls, hydrateControls } from "./components/layout/controls.js";

import { Hero, hydrateHero } from "./components/sections/hero/index.js";
import { About, hydrateAbout } from "./components/sections/about/index.js";
import { Projects, hydrateProjects } from "./components/sections/projects/index.js";
import { Skills, hydrateSkills } from "./components/sections/skills/index.js";
import { Socials, hydrateSocials } from "./components/sections/socials/index.js";
import { Contact, hydrateContact } from "./components/sections/contact/index.js";

import { mountCursor } from "./components/effects/cursor-follower.js";
import { mountMagnetic } from "./components/effects/magnetic.js";

/**
 * Section registry — adding a new section = add a row here.
 * Each item:
 *   - render(design, locale): returns an html`` fragment
 *   - hydrate(design, el): optional — returns a cleanup function
 */
const SECTIONS = [
  { id: "hero", render: Hero, hydrate: hydrateHero },
  { id: "about", render: About, hydrate: hydrateAbout },
  { id: "projects", render: Projects, hydrate: hydrateProjects },
  { id: "skills", render: Skills, hydrate: hydrateSkills },
  { id: "socials", render: Socials, hydrate: hydrateSocials },
  { id: "contact", render: Contact, hydrate: hydrateContact },
];

/** Cleanup functions per section + global effects. */
let cleanups = [];

function app() {
  return `<div class="app-shell"></div>`;
}

/**
 * Render the full app (nav, sections, footer).
 * Called on startup and whenever the design/locale changes.
 */
function renderAll() {
  // Dispose previous hydrations
  cleanups.forEach((fn) => {
    try { fn(); } catch (e) { /* noop */ }
  });
  cleanups = [];

  const { design, locale } = appState.all();
  const root = /** @type {HTMLElement} */ (document.getElementById("app"));
  root.innerHTML = app();
  const shell = /** @type {HTMLElement} */ (root.firstElementChild);

  // Nav
  shell.insertAdjacentHTML("beforeend", toString(Nav(locale)));

  // Sections
  const main = document.createElement("main");
  main.id = "main";
  shell.appendChild(main);

  for (const s of SECTIONS) {
    const frag = s.render(design, locale);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = toString(frag);
    const el = /** @type {HTMLElement} */ (wrapper.firstElementChild);
    main.appendChild(el);
    // Hydrate section-specific effects
    try {
      const stop = s.hydrate(design, el);
      if (typeof stop === "function") cleanups.push(stop);
    } catch (e) {
      console.warn(`hydrate failed for ${s.id}`, e);
    }
  }

  // Footer
  shell.insertAdjacentHTML("beforeend", toString(Footer(locale)));

  // Reveal on scroll (per render)
  const reveals = document.querySelectorAll(".reveal");
  const stopReveal = revealOnScroll(reveals, { threshold: 0.12, stagger: 40 });
  cleanups.push(stopReveal);
}

function init() {
  initAppState();

  // Controls (floating) — built once, independent of sections
  document.body.insertAdjacentHTML("beforeend", toString(Controls()));
  const controlsEl = /** @type {HTMLElement} */ (document.querySelector(".controls"));
  hydrateControls(controlsEl);

  // Global effects — mounted once
  const stopCursor = mountCursor();
  const stopMag = mountMagnetic(document);

  // Initial render
  renderAll();

  // Re-render on design/locale changes; theme-only switches keep DOM.
  appState.subscribe("design", () => renderAll());
  appState.subscribe("locale", () => renderAll());

  // Global cleanup on pagehide (best-effort)
  window.addEventListener("pagehide", () => {
    stopCursor();
    stopMag();
    cleanups.forEach((fn) => { try { fn(); } catch {} });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
