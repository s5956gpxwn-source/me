/**
 * Profile — main personal info.
 * Every field is bilingual ({ ar, en }) unless it's a URL or numeric.
 * Edit this file to update the site — components read it reactively.
 */

export const profile = {
  // Short name (shown in nav + as brand)
  shortName: { ar: "اسمك", en: "You" },

  // Full name for hero
  name: { ar: "اسمك الكامل", en: "Your Full Name" },

  // Role / title
  role: {
    ar: "مصمم ومطور منتجات",
    en: "Product Designer & Developer",
  },

  // Tagline — one short sentence for hero sub
  tagline: {
    ar: "أصنع منتجات رقمية تجمع بين البساطة والإحساس الجميل.",
    en: "I craft digital products where simplicity meets a beautiful feel.",
  },

  // Longer bio for About section
  bio: {
    ar: "عمري من طفولتي وأنا مهووس بتقاطع التصميم والكود. أشتغل اليوم على منتجات تجمع بين الجماليات العالية والتفاصيل التي تدوم — سواء واجهات ويب، تجارب تفاعلية، أو أدوات للمطوّرين. أؤمن بأن التفاصيل الصغيرة هي اللي تخلق الفرق الكبير.",
    en: "Since I was a kid I've been obsessed with the intersection of design and code. Today I build products that combine high aesthetics with details that last — web interfaces, interactive experiences, and tools for developers. I believe small details make the biggest difference.",
  },

  // Location / current city
  location: { ar: "الرياض، السعودية", en: "Riyadh, Saudi Arabia" },

  // Availability badge
  available: {
    ar: "متاح لفرص جديدة",
    en: "Available for new work",
  },

  // Primary email
  email: "hello@yourname.com",

  // Stats for About section
  stats: [
    {
      value: "5+",
      label: { ar: "سنوات خبرة", en: "Years of experience" },
    },
    {
      value: "40+",
      label: { ar: "مشروع مكتمل", en: "Completed projects" },
    },
    {
      value: "12",
      label: { ar: "دولة عمل", en: "Countries worked with" },
    },
    {
      value: "∞",
      label: { ar: "أكواب قهوة", en: "Cups of coffee" },
    },
  ],
};
