import { html } from "../../lib/html.js";

/**
 * @param {{ label: string, dot?: boolean, color?: string }} props
 */
export function Badge({ label, dot = true, color = "" }) {
  return html`<span class="badge">
    ${dot ? html`<span class="dot"${color ? ` style="background:${color}; color:${color}"` : ""}></span>` : ""}
    ${label}
  </span>`;
}
