# Personal Portfolio — 3 Designs, Switchable

موقع شخصي مبني بـ **HTML + CSS + JavaScript خالص** (بدون مكتبات أو build step). يوفّر ثلاثة اتجاهات تصميم قابلة للتبديل مباشرة من الموقع، مع تبديل **فاتح/داكن** و **عربي/إنجليزي**.

## التصاميم الثلاثة

- 🌌 **Aurora Liquid** — داكن سينمائي، شفق قطبي متحرك (WebGL)، زجاجية.
- 🥛 **Soft Liquid Glass** — أنيق هادئ، ميش باستيل، حواف مستديرة.
- 🌈 **Neo Brutalist Liquid** — جريء، تايبوغرافي ضخمة، ظلال حادة، Blobs.

---

## التشغيل

لا يحتاج المشروع **أي خطوة install**. كل اللي تحتاجه: متصفح حديث + سيرفر محلي بسيط (لأن JavaScript modules تتطلب HTTP، ما تشتغل عبر `file://`).

اختر طريقة واحدة:

### 1) باستخدام Node.js (أبسط)

```bash
npx http-server . -p 3000 -c-1 --cors -o
```
(سيفتح المتصفح تلقائياً على `http://localhost:3000`)

أو:

```bash
npm run dev
```
(نفس الأمر، مضاف كسكربت في `package.json`)

### 2) باستخدام Python

```bash
python3 -m http.server 3000
```
ثم افتح `http://localhost:3000` في المتصفح.

### 3) باستخدام أي سيرفر آخر

أي سيرفر ملفات ثابتة (nginx، caddy، VS Code Live Server، إلخ) يشتغل. فقط وجّهه على مجلد المشروع.

---

## الهيكلة

```
me/
├── index.html              ← نقطة الدخول الوحيدة
├── package.json            ← فقط سكربتات تشغيل، بدون deps
├── styles/
│   ├── main.css            ← يستورد البقية بالترتيب
│   ├── tokens.css          ← 🎨 المتغيرات (ألوان/خطوط/مقاسات) لكل تصميم
│   ├── base.css            ← Reset + typography + a11y
│   ├── layout.css          ← container / grid / bento
│   ├── components.css      ← button / card / nav / footer / controls
│   └── designs/
│       ├── aurora.css
│       ├── glass.css
│       └── brutalist.css
└── src/
    ├── main.js             ← الإقلاع: يركّب الـ providers ويرندر الأقسام
    ├── lib/
    │   ├── html.js         ← tagged-template صغير + raw()
    │   ├── state.js        ← store تفاعلي (pub/sub)
    │   ├── t.js            ← ترجمة { ar, en }
    │   └── utils.js        ← revealOnScroll, lerp, إلخ
    ├── providers/
    │   └── app-state.js    ← design / theme / locale + localStorage
    ├── content/            ← 🔑 المحتوى المركزي (عدّل هنا)
    │   ├── profile.js
    │   ├── projects.js
    │   ├── socials.js
    │   ├── skills.js
    │   └── nav.js
    └── components/
        ├── ui/             ← button, badge
        ├── effects/        ← aurora-shader, liquid-blob, magnetic, cursor, mesh-blobs, brutal-blobs
        ├── layout/         ← nav, footer, controls (floating switcher)
        └── sections/
            ├── hero/       ← index.js + aurora.js + glass.js + brutalist.js
            ├── about/
            ├── projects/
            ├── skills/
            ├── socials/
            └── contact/
```

---

## كيف تعدّل

- **النصوص والمحتوى** (اسم، نبذة، مشاريع، حسابات، مهارات): فقط في `src/content/*.js`.
- **الألوان والخطوط والمقاسات**: `styles/tokens.css` — لكل تصميم كتلة `[data-design="..."]`.
- **تغيير شكل قسم** في تصميم واحد: ابحث عن كلاس القسم في `styles/designs/<design>.css`.
- **إضافة قسم جديد**: أنشئ `src/components/sections/<name>/index.js` بدالة تُرجع `html`، ثم أضفه لمصفوفة `SECTIONS` في `src/main.js`.
- **إضافة تصميم رابع**:
  1. أضف اسمه إلى `DESIGNS` في `src/providers/app-state.js`.
  2. أنشئ ملفاً في `styles/designs/<name>.css` وحدّث `styles/main.css` لاستيراده.
  3. أنشئ variant جديد لكل قسم (مثلاً `hero/<name>.js`) أو أعِد استخدام variants موجودة.
  4. الأزرار في الـ Controls ستظهر تلقائياً.

---

## المزايا التقنية

- ✅ **صفر dependencies** — لا `node_modules`، لا package lock.
- ✅ يعمل مباشرة — لا build، لا bundler.
- ✅ **تبديل فوري** بين التصاميم/السمات/اللغات مع حفظ الاختيار في localStorage.
- ✅ **دعم RTL كامل** عبر logical properties.
- ✅ **احترام `prefers-reduced-motion`** — يعطل الأنميشن الثقيلة.
- ✅ **Accessibility**: skip link، focus states، ARIA، keyboard nav.
- ✅ **WebGL shader للـ Aurora** بدون three.js (فقط ~170 سطر GLSL/JS).

---

## الخطوة التالية

قابل للهجرة إلى Next.js/React لاحقاً بتطابق 1:1 — نفس الأقسام، نفس المحتوى، نفس tokens. راجع `/root/.claude/plans/moonlit-growing-biscuit.md` للخطة الأصلية.
