/**
 * Minimal tagged-template helper — string-based to keep things lightweight.
 *
 * Usage:
 *   const el = html`<div class="foo">${text}</div>`;
 *   root.innerHTML = html`...`;
 *
 * Interpolated values are HTML-escaped by default. To inject raw HTML,
 * wrap the value with raw():
 *
 *   html`<div>${raw(someHtmlString)}</div>`
 *
 * Arrays are joined with no separator (convenient for lists of rendered rows).
 */

const RAW = Symbol("raw");

/** @param {string} str */
export function raw(str) {
  return { [RAW]: true, value: String(str ?? "") };
}

/** @param {unknown} v */
function escape(v) {
  if (v === null || v === undefined || v === false) return "";
  if (v && typeof v === "object" && RAW in v) return v.value;
  if (Array.isArray(v)) return v.map(escape).join("");
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Tagged template. Returns a raw-marked string so nested html`` stays raw.
 * @param {TemplateStringsArray} strings
 * @param  {...unknown} values
 */
export function html(strings, ...values) {
  let out = "";
  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) out += escape(values[i]);
  }
  return raw(out);
}

/**
 * Convert an html`` result (raw object) OR plain string into an HTMLElement.
 * Returns the first element in the template.
 * @param {ReturnType<typeof html> | string} htmlInput
 */
export function render(htmlInput) {
  const source = typeof htmlInput === "string" ? htmlInput : htmlInput.value;
  const tpl = document.createElement("template");
  tpl.innerHTML = source.trim();
  return /** @type {HTMLElement} */ (tpl.content.firstElementChild);
}

/**
 * Render multiple top-level nodes as a DocumentFragment.
 * @param {ReturnType<typeof html> | string} htmlInput
 */
export function renderFragment(htmlInput) {
  const source = typeof htmlInput === "string" ? htmlInput : htmlInput.value;
  const tpl = document.createElement("template");
  tpl.innerHTML = source.trim();
  return tpl.content;
}

/** Unescape-friendly conversion to a string (used when composing nested html). */
export function toString(htmlInput) {
  return typeof htmlInput === "string" ? htmlInput : htmlInput.value;
}
