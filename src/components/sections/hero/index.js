/**
 * Hero — router that chooses the variant based on current design.
 *
 * Each variant exports:
 *   - a render function (HeroAurora / HeroGlass / HeroBrutalist) that
 *     returns an html`` fragment
 *   - a hydrate function that wires up effects on the mounted element
 *
 * The router returns both so sections/index.js can re-hydrate after re-renders.
 */

import { HeroAurora, hydrateHeroAurora } from "./aurora.js";
import { HeroGlass, hydrateHeroGlass } from "./glass.js";
import { HeroBrutalist, hydrateHeroBrutalist } from "./brutalist.js";

const VARIANTS = {
  aurora: { render: HeroAurora, hydrate: hydrateHeroAurora },
  glass: { render: HeroGlass, hydrate: hydrateHeroGlass },
  brutalist: { render: HeroBrutalist, hydrate: hydrateHeroBrutalist },
};

/** @param {'aurora'|'glass'|'brutalist'} design */
export const Hero = (design, locale) => VARIANTS[design].render(locale);
/** @param {'aurora'|'glass'|'brutalist'} design */
export const hydrateHero = (design, el) => VARIANTS[design].hydrate(el);
