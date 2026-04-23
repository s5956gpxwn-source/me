/**
 * Nav items — label bilingual, `href` is a local anchor.
 */

export const navItems = [
  { href: "#about", label: { ar: "عني", en: "About" } },
  { href: "#projects", label: { ar: "الأعمال", en: "Work" } },
  { href: "#skills", label: { ar: "المهارات", en: "Skills" } },
  { href: "#socials", label: { ar: "الحسابات", en: "Social" } },
  { href: "#contact", label: { ar: "تواصل", en: "Contact" } },
];

export const uiStrings = {
  skip: { ar: "تخطّي إلى المحتوى", en: "Skip to content" },
  availableLabel: { ar: "متاح الآن", en: "Available now" },
  sayHi: { ar: "كلّمني", en: "Say hi" },
  viewWork: { ar: "شوف الأعمال", en: "See my work" },
  downloadCV: { ar: "حمّل السيرة الذاتية", en: "Download CV" },
  year: new Date().getFullYear(),
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  scrollCue: { ar: "مرّر للأسفل", en: "Scroll" },

  // Section heads
  aboutHead: { ar: "قليلاً عنّي", en: "A bit about me" },
  aboutSub: { ar: "من أنا، وماذا أصنع، ولماذا.", en: "Who I am, what I make, and why." },

  projectsHead: { ar: "أعمال مختارة", en: "Selected work" },
  projectsSub: { ar: "مشاريع أهتم بها فعلاً. اضغط لاستكشاف المزيد.", en: "Projects I genuinely care about. Click to dive in." },

  skillsHead: { ar: "أدواتي", en: "The stack" },
  skillsSub: { ar: "الأدوات التي أستخدمها يوميّاً.", en: "Tools I reach for every day." },

  socialsHead: { ar: "عبر الحسابات", en: "Elsewhere on the web" },
  socialsSub: { ar: "اختر المكان الذي يعجبك.", en: "Pick your favorite corner of the internet." },

  contactHead: { ar: "خلّنا نتكلّم", en: "Let's talk" },
  contactSub: { ar: "راسلني — أجيب بسرعة.", en: "Drop a line — I reply fast." },

  // Controls labels
  controls: {
    design: { ar: "التصميم", en: "Design" },
    theme: { ar: "السمة", en: "Theme" },
    locale: { ar: "اللغة", en: "Language" },
  },
};
