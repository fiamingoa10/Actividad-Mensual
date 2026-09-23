import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as progressTone, l as formatPercent } from "./store-CIYQvfIe.mjs";
import { c as cn } from "./card-DsUKmRGs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-meter-DFM4_2Sp.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressMeter({ percent, className, size = "md" }) {
	const clamped = Math.max(0, percent);
	const width = Math.min(100, clamped);
	const tone = progressTone(clamped);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("overflow-hidden rounded-full bg-secondary", size === "sm" && "h-1.5", size === "md" && "h-2.5", size === "lg" && "h-3.5"),
			role: "progressbar",
			"aria-valuenow": Math.round(width),
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-[width,background-color] duration-300 ease-out", tone === "low" && "bg-progress-low", tone === "mid" && "bg-progress-mid", tone === "high" && "bg-progress-high"),
				style: { width: `${width}%` }
			})
		})
	});
}
function ToneBadge({ percent }) {
	const tone = progressTone(percent);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums", tone === "low" && "bg-progress-low/12 text-progress-low", tone === "mid" && "bg-progress-mid/12 text-progress-mid", tone === "high" && "bg-progress-high/12 text-progress-high"),
		children: formatPercent(percent)
	});
}
//#endregion
export { ToneBadge as n, ProgressMeter as t };
