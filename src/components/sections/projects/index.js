/**
 * Projects — bento-style grid for aurora/glass, marquee + stacked grid for brutalist.
 */

import { html, raw } from "../../../lib/html.js";
import { t } from "../../../lib/t.js";
import { projects } from "../../../content/projects.js";
import { uiStrings } from "../../../content/nav.js";

/**
 * @param {'aurora'|'glass'|'brutalist'} design
 * @param {'ar'|'en'} locale
 */
export function Projects(design, locale) {
  return html`<section id="projects" class="section" data-section="projects">
    ${design === "brutalist" ? ProjectsMarquee() : ""}

    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${t(uiStrings.projectsHead, locale)}</span>
        <h2>${t(uiStrings.projectsSub, locale)}</h2>
      </div>

      <div class="bento">
        ${projects.map((p, i) => ProjectCard(p, locale, design, i))}
      </div>
    </div>
  </section>`;
}

function ProjectsMarquee() {
  const items = ["PROJECTS", "WORK", "SELECTED", "✺", "2025", "BUILD", "DESIGN", "✦"];
  return html`<div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      ${[...items, ...items, ...items].map((t) => html`<span class="marquee__item">${t}</span>`)}
    </div>
  </div>`;
}

function ProjectCard(p, locale, design, i) {
  const sizeClass =
    p.size === "wide" ? "b-wide" : p.size === "half" ? "b-half" : "b-narrow";

  const classes = [
    design === "brutalist" ? "project-card" : "card",
    sizeClass,
    "reveal",
    "cursor-target",
    "project-card-link",
  ].join(" ");

  const style = [
    `--reveal-delay: ${i * 80}ms`,
    p.accent ? `--social-color: ${p.accent}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  return html`<a
    href="${p.url || "#"}"
    class="${classes}"
    style="${style}"
  >
    <div>
      <div class="cluster project-card__tags">
        ${p.tags.map((tag) => html`<span class="badge">${tag}</span>`)}
      </div>
      <h3 class="project-card__title">${t(p.name, locale)}</h3>
      <p class="project-card__summary">${t(p.summary, locale)}</p>
    </div>
    <div class="eyebrow project-card__meta">
      <span>${p.year}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </div>
  </a>`;
}

export function hydrateProjects() {
  return () => {};
}
