import { html, raw } from "../../lib/html.js";

/**
 * @param {{
 *   label: string,
 *   href?: string,
 *   variant?: 'solid' | 'ghost',
 *   size?: 'base' | 'large',
 *   icon?: string,
 *   iconAfter?: string,
 *   id?: string,
 *   magnetic?: boolean,
 * }} props
 */
export function Button(props) {
  const {
    label,
    href,
    variant = "solid",
    size = "base",
    icon = "",
    iconAfter = "",
    id = "",
    magnetic = false,
  } = props;

  const classes = [
    "btn",
    variant === "ghost" ? "btn--ghost" : "",
    size === "large" ? "btn--large" : "",
    "cursor-target",
    magnetic ? "magnetic" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = html`${icon ? html`<span class="btn__icon" aria-hidden="true">${raw(icon)}</span>` : ""}
    <span class="btn__label">${label}</span>
    ${iconAfter ? html`<span class="btn__icon" aria-hidden="true">${raw(iconAfter)}</span>` : ""}`;

  if (href) {
    return html`<a class="${classes}" href="${href}"${id ? ` id="${id}"` : ""}>${inner}</a>`;
  }
  return html`<button type="button" class="${classes}"${id ? ` id="${id}"` : ""}>${inner}</button>`;
}
