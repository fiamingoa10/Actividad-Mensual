import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react, y as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as currentMonthMeta, n as academicYearLabel, t as MONTHS, y as useAppStore } from "./store-CIYQvfIe.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as BookOpen, D as CalendarDays, E as ChartColumn, _ as Menu, d as Search, g as Moon, l as Sun, t as X, u as Settings, y as House } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-DsUKmRGs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-card hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			outline: "bg-card text-foreground shadow-card hover:bg-accent hover:text-accent-foreground",
			ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 min-h-11 px-4",
			sm: "h-9 min-h-9 rounded-lg px-3 text-xs",
			lg: "h-12 min-h-12 px-5 text-base",
			icon: "size-11 min-h-11 min-w-11",
			"icon-sm": "size-9 min-h-9 min-w-9 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Sheet({ shouldScaleBackground = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		shouldScaleBackground,
		...props
	});
}
Drawer.Trigger;
Drawer.Close;
var SheetPortal = Drawer.Portal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-foreground/40", className),
	...props
}));
SheetOverlay.displayName = "SheetOverlay";
var SheetContent = import_react.forwardRef(({ className, children, side = "left", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
	ref,
	className: cn("fixed z-50 flex flex-col bg-card text-card-foreground shadow-card outline-none", side === "left" && "bottom-0 left-0 top-0 w-[min(20rem,86vw)] rounded-r-2xl", side === "right" && "bottom-0 right-0 top-0 w-[min(20rem,86vw)] rounded-l-2xl", side === "bottom" && "inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl", className),
	...props,
	children: [
		side === "bottom" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1.5 w-10 rounded-full bg-border" }),
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Close, {
			className: "absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Cerrar"
			})]
		})
	]
})] }));
SheetContent.displayName = "SheetContent";
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-1 p-5 pr-12", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function AppShell({ children, title }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const yearStart = useAppStore((s) => s.academicYearStart);
	const theme = useAppStore((s) => s.theme);
	const setTheme = useAppStore((s) => s.setTheme);
	const [open, setOpen] = (0, import_react.useState)(false);
	const monthSlug = currentMonthMeta().slug;
	const dark = theme === "dark" || theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
	const tabs = [
		{
			label: "Inicio",
			icon: House,
			active: pathname === "/",
			to: "/",
			params: void 0
		},
		{
			label: "Mes",
			icon: CalendarDays,
			active: pathname.startsWith("/mes"),
			to: "/mes/$month",
			params: { month: monthSlug }
		},
		{
			label: "Año",
			icon: ChartColumn,
			active: pathname.startsWith("/resumen"),
			to: "/resumen",
			params: void 0
		},
		{
			label: "Más",
			icon: Settings,
			active: pathname.startsWith("/ajustes") || pathname.startsWith("/buscar"),
			to: "/ajustes",
			params: void 0
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-background/90 px-3 py-2 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Abrir menú",
						onClick: () => setOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium tracking-tight",
							children: title ?? "Actividad Mensual"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Ciclo ", academicYearLabel(yearStart)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/buscar",
							"aria-label": "Buscar registros",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
						onClick: () => setTheme(dark ? "light" : "dark"),
						children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Actividad Mensual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: ["Ciclo ", academicYearLabel(yearStart)] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerLink, {
								to: "/",
								active: pathname === "/",
								onClick: () => setOpen(false),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4" }),
								children: "Inicio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
								children: "Meses"
							}),
							MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerLink, {
								to: "/mes/$month",
								params: { month: m.slug },
								active: pathname === `/mes/${m.slug}`,
								onClick: () => setOpen(false),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }),
								children: m.name
							}, m.slug)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
								children: "Más"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerLink, {
								to: "/resumen",
								active: pathname.startsWith("/resumen"),
								onClick: () => setOpen(false),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }),
								children: "Resumen anual"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerLink, {
								to: "/buscar",
								active: pathname.startsWith("/buscar"),
								onClick: () => setOpen(false),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
								children: "Buscar por fecha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerLink, {
								to: "/ajustes",
								active: pathname.startsWith("/ajustes"),
								onClick: () => setOpen(false),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }),
								children: "Ajustes y copias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-xl bg-secondary px-3 py-3 text-xs text-secondary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "Objetivo"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "50 horas al mes · 600 horas al año"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 pb-28 pt-4",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-lg border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-4",
					children: tabs.map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							params: item.params,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors", item.active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: item.active ? 2.25 : 1.75
							}), item.label]
						}) }, item.label);
					})
				})
			})
		]
	});
}
function DrawerLink({ to, params, active, onClick, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		params,
		onClick,
		className: cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors", active ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-secondary"),
		children: [icon, children]
	});
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-2xl bg-card text-card-foreground shadow-card", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col gap-1 p-5 pb-0", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
	ref,
	className: cn("font-display text-lg font-medium tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-5", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-5 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
export { CardHeader as a, cn as c, CardContent as i, downloadBlob as l, Button as n, CardTitle as o, Card as r, buttonVariants as s, AppShell as t };
