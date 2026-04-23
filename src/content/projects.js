/**
 * Projects — each item is a card in the Projects section.
 *
 * Fields:
 *   id        : stable unique id
 *   name      : bilingual
 *   summary   : bilingual, short
 *   tags      : string[] (tech/labels)
 *   url       : optional link
 *   accent    : optional CSS color (used as --social-color)
 *   size      : 'wide' | 'narrow' | 'half' | 'tall' — controls bento grid span
 *   year      : string — shown as meta
 */

export const projects = [
  {
    id: "nebula",
    name: { ar: "نيبولا", en: "Nebula" },
    summary: {
      ar: "منصة تحليلات حيّة تستعرض البيانات كمجسّمات ثلاثية الأبعاد.",
      en: "Live analytics platform that renders data as 3D scenes.",
    },
    tags: ["WebGL", "Design", "React"],
    url: "#",
    accent: "#a855f7",
    size: "wide",
    year: "2025",
  },
  {
    id: "lumen",
    name: { ar: "لومن", en: "Lumen" },
    summary: {
      ar: "تطبيق تأمل وتركيز يتفاعل مع إيقاع نَفَسك.",
      en: "A meditation & focus app that syncs with your breath.",
    },
    tags: ["iOS", "Motion", "Haptics"],
    url: "#",
    accent: "#10b981",
    size: "narrow",
    year: "2024",
  },
  {
    id: "orbit",
    name: { ar: "أوربيت", en: "Orbit" },
    summary: {
      ar: "لوحة تحكم تعاونية لفرق المنتج عن بُعد.",
      en: "A collaborative command center for remote product teams.",
    },
    tags: ["SaaS", "TypeScript", "Realtime"],
    url: "#",
    accent: "#3b82f6",
    size: "narrow",
    year: "2024",
  },
  {
    id: "prism",
    name: { ar: "برزم", en: "Prism" },
    summary: {
      ar: "محرر صور ذكي يحوّل أسلوبك الفني إلى فلتر قابل للمشاركة.",
      en: "AI photo editor that turns your style into a shareable preset.",
    },
    tags: ["AI", "Canvas", "Product"],
    url: "#",
    accent: "#ec4899",
    size: "wide",
    year: "2023",
  },
  {
    id: "echo",
    name: { ar: "إيكو", en: "Echo" },
    summary: {
      ar: "مكتبة مفتوحة المصدر لمكوّنات واجهات سائلة ومتحركة.",
      en: "Open-source library of fluid, animated UI components.",
    },
    tags: ["OSS", "Library"],
    url: "#",
    accent: "#ffcc00",
    size: "half",
    year: "2023",
  },
  {
    id: "helio",
    name: { ar: "هليو", en: "Helio" },
    summary: {
      ar: "تجربة ويب تفاعلية تحاكي حركة الشمس والسماء في بلدتك.",
      en: "Interactive web experience that simulates sunlight in your town.",
    },
    tags: ["WebGL", "Creative"],
    url: "#",
    accent: "#f59e0b",
    size: "half",
    year: "2022",
  },
];
