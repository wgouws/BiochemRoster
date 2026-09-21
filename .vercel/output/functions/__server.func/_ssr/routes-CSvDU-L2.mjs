import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Menu, c as Eraser, d as CircleAlert, f as ChevronRight, i as Printer, l as Download, m as CalendarPlus, n as Users, o as Info, p as ChevronLeft, r as TriangleAlert, s as FlaskConical, t as X, u as Copy } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as addDays, n as format, r as startOfWeek, t as parseISO } from "../_libs/date-fns.mjs";
import { i as Trigger$1, n as Portal, r as Root2$1, t as Content2$1 } from "../_libs/radix-ui__react-popover.mjs";
import { i as Trigger$2, n as List, r as Root2$2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CSvDU-L2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,border-color,transform,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			ghost: "text-foreground hover:bg-muted",
			destructive: "bg-destructive text-white hover:bg-destructive/90"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 rounded-sm px-2.5 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
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
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-card p-1 text-foreground shadow-lg", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm outline-none focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2.5 py-1.5 text-xs font-medium text-muted-foreground", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
/** Compact cell language: "CS:am+GL:pm", "WG+MW", "TW:all day", "" or "-". */
function parseCell(spec) {
	if (!spec) return [];
	const trimmed = spec.trim();
	if (!trimmed || trimmed === "-" || trimmed === "–") return [];
	return trimmed.split("+").flatMap((part) => {
		const token = part.trim();
		if (!token) return [];
		const colon = token.indexOf(":");
		if (colon === -1) return [{ staffId: token }];
		const staffId = token.slice(0, colon).trim();
		const note = token.slice(colon + 1).trim();
		if (!staffId) return [];
		return [{
			staffId,
			note: note || void 0
		}];
	});
}
function days(mon, tue, wed, thu, fri) {
	return [
		parseCell(mon),
		parseCell(tue),
		parseCell(wed),
		parseCell(thu),
		parseCell(fri)
	];
}
function formatCell(as, nameOf) {
	if (!as.length) return "";
	return as.map((a) => {
		const n = nameOf(a.staffId);
		return a.note ? `${n} – ${a.note}` : n;
	}).join("\n");
}
var STATIONS = [
	{
		id: "early",
		label: "Early start",
		sublabel: "08:00 – 16:30  ·  usually a scientist (or Jacquie)",
		section: "day",
		exclusive: false,
		min: 1,
		max: 1
	},
	{
		id: "pro1",
		label: "PRO 1",
		sublabel: "Roche cobas Pro 1",
		section: "day",
		exclusive: true,
		requiresScientist: true,
		min: 1,
		max: 2
	},
	{
		id: "pro2",
		label: "PRO 2",
		sublabel: "PVT buffers – am  ·  nLo – pm",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "pro3",
		label: "PRO 3",
		sublabel: "Outstanding list",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "val",
		label: "VALIDATION QC",
		sublabel: "+ Start PRO 1",
		section: "day",
		exclusive: false,
		min: 1,
		max: 3
	},
	{
		id: "pvt_err",
		label: "PVT – PM",
		sublabel: "Error buffers / O/S lists",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "c513",
		label: "c513",
		sublabel: "Roche cobas c513",
		section: "day",
		exclusive: true,
		min: 1,
		max: 3
	},
	{
		id: "alinity",
		label: "Alinity",
		sublabel: "Abbott Alinity",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "pvt_am",
		label: "PVT all day / am",
		section: "day",
		exclusive: true,
		min: 1,
		max: 3
	},
	{
		id: "pvt_pm",
		label: "PVT – PM",
		section: "day",
		exclusive: true,
		min: 0,
		max: 2
	},
	{
		id: "epp",
		label: "EPP",
		sublabel: "Tuesday = Animals",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "epp1",
		label: "EPP 1st read",
		section: "day",
		exclusive: false,
		min: 1,
		max: 2
	},
	{
		id: "epp2",
		label: "EPP 2nd read",
		section: "day",
		exclusive: false,
		min: 1,
		max: 2
	},
	{
		id: "send",
		label: "Sendaways",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "immuno_sci",
		label: "Immunology scientist",
		section: "day",
		exclusive: true,
		requiresScientist: true,
		min: 1,
		max: 2
	},
	{
		id: "immuno_am",
		label: "Immuno am",
		section: "day",
		exclusive: true,
		min: 1,
		max: 2
	},
	{
		id: "admin",
		label: "Admin / Projects",
		section: "day",
		exclusive: false,
		min: 0,
		max: 4
	},
	{
		id: "cobas_n1",
		label: "COBAS N1",
		sublabel: "Evening scientist  14:00 – 22:00",
		section: "evening",
		exclusive: false,
		requiresScientist: true,
		min: 1,
		max: 2
	},
	{
		id: "cobas_n2",
		label: "COBAS N2",
		sublabel: "Evening cover",
		section: "evening",
		exclusive: false,
		min: 1,
		max: 1
	},
	{
		id: "send_eve",
		label: "Sendaways 9.30",
		section: "evening",
		exclusive: false,
		min: 1,
		max: 1
	},
	{
		id: "pvt9",
		label: "PVT 9pm",
		section: "evening",
		exclusive: false,
		min: 1,
		max: 1
	},
	{
		id: "pvt7",
		label: "PVT 7pm",
		sublabel: "Retired mid-June 2026",
		section: "evening",
		exclusive: false,
		min: 0,
		max: 1,
		retired: true
	}
];
var DAY_STATIONS = STATIONS.filter((s) => s.section === "day");
var EVENING_STATIONS = STATIONS.filter((s) => s.section === "evening" && !s.retired);
function stationById(id) {
	return STATIONS.find((s) => s.id === id);
}
function emptyCells() {
	const cells = {};
	for (const s of STATIONS) cells[s.id] = [
		[],
		[],
		[],
		[],
		[]
	];
	return cells;
}
/** NZ nationwide public holidays that fall on weekdays in 2026–2027. */
var NZ_HOLIDAYS = {
	"2026-01-01": "New Year's Day",
	"2026-01-02": "Day after New Year's Day",
	"2026-02-06": "Waitangi Day",
	"2026-04-03": "Good Friday",
	"2026-04-06": "Easter Monday",
	"2026-04-27": "ANZAC Day",
	"2026-06-01": "King's Birthday",
	"2026-07-10": "Matariki",
	"2026-10-26": "Labour Day",
	"2026-12-25": "Christmas Day",
	"2026-12-28": "Boxing Day (observed)",
	"2027-01-01": "New Year's Day",
	"2027-01-04": "Day after New Year's Day (observed)",
	"2027-02-08": "Waitangi Day (observed)",
	"2027-03-26": "Good Friday",
	"2027-03-29": "Easter Monday",
	"2027-04-26": "ANZAC Day (observed)",
	"2027-06-07": "King's Birthday",
	"2027-06-25": "Matariki",
	"2027-10-25": "Labour Day",
	"2027-12-27": "Christmas Day (observed)",
	"2027-12-28": "Boxing Day (observed)"
};
function holidayName(isoDate) {
	return NZ_HOLIDAYS[isoDate];
}
function mondayOf(d) {
	return startOfWeek(d, { weekStartsOn: 1 });
}
function toISODate(d) {
	return format(d, "yyyy-MM-dd");
}
function weekdayISO(monday, day) {
	return toISODate(addDays(parseISO(monday), day));
}
function weekHolidays(monday) {
	const out = [];
	for (let i = 0; i < 5; i++) if (holidayName(weekdayISO(monday, i))) out.push(i);
	return out;
}
function ordinal(n) {
	const v = n % 100;
	if (v >= 11 && v <= 13) return `${n}th`;
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}th`;
	}
}
function weekTitle(monday) {
	const start = parseISO(monday);
	const end = addDays(start, 5);
	if (start.getMonth() === end.getMonth()) return `Roster ${ordinal(start.getDate())} – ${ordinal(end.getDate())} ${format(end, "MMMM yyyy")}`;
	return `Roster ${ordinal(start.getDate())} ${format(start, "MMMM")} – ${ordinal(end.getDate())} ${format(end, "MMMM yyyy")}`;
}
function weekRangeLabel(monday) {
	const start = parseISO(monday);
	const end = addDays(start, 4);
	if (start.getMonth() === end.getMonth()) return `${ordinal(start.getDate())}–${ordinal(end.getDate())} ${format(end, "MMMM yyyy")}`;
	return `${ordinal(start.getDate())} ${format(start, "MMM")} – ${ordinal(end.getDate())} ${format(end, "MMM yyyy")}`;
}
function shiftToMonday(monday, deltaWeeks) {
	return toISODate(addDays(parseISO(monday), deltaWeeks * 7));
}
function hydrate(monday, notes, holidays, raw, leave = {}, title) {
	const cells = emptyCells();
	for (const [id, tuple] of Object.entries(raw)) cells[id] = days(tuple[0], tuple[1], tuple[2], tuple[3], tuple[4]);
	const leaveMap = {};
	for (const [id, tuple] of Object.entries(leave)) leaveMap[id] = [...tuple];
	return {
		monday,
		title: title ?? weekTitle(monday),
		notes,
		cells,
		leave: leaveMap,
		holidays
	};
}
var ARCHIVE = [
	hydrate("2026-06-01", "King's Birthday Monday. Cara IVF on the holiday. PVT 7pm still in use this week.", [0], {
		early: [
			"",
			"WG",
			"GL",
			"CS",
			"AW"
		],
		pro1: [
			"CS:IVF",
			"GL",
			"CS",
			"CS",
			"GL"
		],
		pro2: [
			"",
			"SG",
			"RP",
			"SG",
			"CS"
		],
		pro3: [
			"",
			"RP",
			"KAH",
			"KAH",
			"KAH"
		],
		val: [
			"",
			"GL+AW",
			"CS",
			"CS",
			"GL+AW"
		],
		pvt_err: [
			"",
			"KAH",
			"JD",
			"VM",
			"AD"
		],
		c513: [
			"",
			"WG+MW",
			"WG+MW",
			"WG+DM",
			"WG+DM"
		],
		alinity: [
			"",
			"AD",
			"AD",
			"AD",
			"LO"
		],
		pvt_am: [
			"",
			"AV:am+SM",
			"AV:am+SM+DM",
			"VM:am+SM+LO",
			"VM+LO"
		],
		pvt_pm: [
			"",
			"DM",
			"",
			"",
			"SM"
		],
		epp: [
			"",
			"VM:Animals",
			"VM",
			"AL",
			"AL"
		],
		epp1: [
			"",
			"SPM",
			"MW",
			"SPM",
			"GL+AW"
		],
		epp2: [
			"",
			"AW",
			"TW",
			"AW",
			"TW"
		],
		send: [
			"",
			"LO",
			"LO",
			"RP",
			"RP"
		],
		immuno_sci: [
			"",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"",
			"JD+SS",
			"SS",
			"JD",
			"JD+SS"
		],
		admin: [
			"",
			"CS:pm",
			"GL:Sendaways project",
			"GL:pm Sendaways project",
			""
		],
		cobas_n1: [
			"",
			"CS",
			"AW",
			"MW",
			"SM"
		],
		cobas_n2: [
			"",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"",
			"AL:5pm",
			"AL:5pm",
			"SS",
			"AD"
		],
		pvt9: [
			"",
			"DM",
			"SH",
			"SH",
			"SH"
		],
		pvt7: [
			"",
			"LO",
			"LO",
			"LO",
			"LO"
		]
	}),
	hydrate("2026-06-08", "", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"AW",
			"AW"
		],
		pro1: [
			"CS",
			"GL",
			"CS",
			"WG",
			"GL"
		],
		pro2: [
			"SM",
			"SM",
			"SM",
			"KAH",
			"KAH"
		],
		pro3: [
			"AD",
			"AD",
			"AD",
			"AD",
			"CS"
		],
		val: [
			"CS:am+GL:pm+AW:pm",
			"GL+AW",
			"CS",
			"WG",
			"GL+AW"
		],
		pvt_err: [
			"RP",
			"CS",
			"JD",
			"CS:pm+GO:pm",
			"AD"
		],
		c513: [
			"MW+JD",
			"MW+WG",
			"DM+WG",
			"DM+RP:PM",
			"DM+WG"
		],
		alinity: [
			"DM",
			"AV:am+DM:pm",
			"AV:am+GL:pm",
			"AL",
			"AL"
		],
		pvt_am: [
			"AL",
			"SG+RP",
			"RP+KAH",
			"SG+VM",
			"RP"
		],
		pvt_pm: [
			"KAH+VM:pm",
			"KAH",
			"",
			"GL",
			"SM"
		],
		epp: [
			"LO+VM:start",
			"LO:Animals",
			"LO",
			"LO+AW:start",
			"LO"
		],
		epp1: [
			"SPM",
			"SPM",
			"MW",
			"AW",
			"AW"
		],
		epp2: [
			"AW",
			"AW",
			"TW",
			"TW",
			"TW"
		],
		send: [
			"SG",
			"VM",
			"VM",
			"VM:PVT help",
			"VM"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW+MW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"SS",
			"SS+JD",
			"SS:am",
			"JD+SS:pm",
			"JD+SS"
		],
		admin: [
			"WG:pm+CS:pm+AW:IQM",
			"",
			"GL:am+AW:pm",
			"AW+CS:Roche QC with Erin",
			""
		],
		cobas_n1: [
			"WG",
			"CS",
			"AW",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"GL",
			"AL:5pm",
			"AL:5pm",
			"SS",
			"AD"
		],
		pvt9: [
			"KAH",
			"DM",
			"SH",
			"SH",
			"SH"
		],
		pvt7: [
			"LO",
			"LO",
			"LO",
			"LO",
			"LO"
		]
	}, {
		VM: [
			"Hosp appt 10:30",
			"",
			"",
			"",
			""
		],
		SM: [
			"",
			"",
			"",
			"Leave",
			""
		]
	}),
	hydrate("2026-06-15", "Trial of evening roster change begins. PVT 7pm no longer exists.", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"WG",
			"WG",
			"CS",
			"WG",
			"WG"
		],
		pro2: [
			"AD",
			"AD",
			"AD",
			"AD",
			"VM"
		],
		pro3: [
			"SG",
			"SG",
			"GL",
			"CS",
			"GL"
		],
		val: [
			"WG:am+GL:pm+AW",
			"WG",
			"CS",
			"WG",
			"WG"
		],
		pvt_err: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SM"
		],
		c513: [
			"MW+VM",
			"MW+RP",
			"DM+RP",
			"DM+RP",
			"DM+RP"
		],
		alinity: [
			"LO",
			"GL",
			"AV:am+WG:pm",
			"SS",
			"AL"
		],
		pvt_am: [
			"DM+CS:am",
			"VM",
			"VM+LO",
			"LO+VM",
			"LO"
		],
		pvt_pm: [
			"SS",
			"DM+JD",
			"",
			"",
			"AD"
		],
		epp: [
			"SM",
			"SM:Animals+AW",
			"SM",
			"SM",
			"SS"
		],
		epp1: [
			"SPM",
			"SPM",
			"SPM",
			"SPM",
			"AW"
		],
		epp2: [
			"TW",
			"AW",
			"AW",
			"AW",
			"TW"
		],
		send: [
			"AL",
			"AV:am+LO:pm",
			"KAH",
			"KAH",
			"KAH"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW+MW",
			"TW",
			"CS:am"
		],
		immuno_am: [
			"JD",
			"JD:am+SS",
			"SS",
			"JD",
			"JD"
		],
		admin: [
			"CS:pm+WG:pm",
			"CS:pm",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL+AW:1-9",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"LO",
			"AL:5pm",
			"AL:5pm",
			"AD"
		],
		pvt9: [
			"SS",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		GO: [
			"",
			"",
			"",
			"AKL",
			"AKL"
		],
		TW: [
			"",
			"",
			"",
			"",
			"Leave"
		]
	}),
	hydrate("2026-06-22", "Week #2 roster change trial. Tea room duty.", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"SM",
			"SM",
			"CS+GO",
			"CS+GO",
			"WG"
		],
		pro2: [
			"LO",
			"AL",
			"LO",
			"VM",
			"VM"
		],
		pro3: [
			"VM",
			"VM",
			"VM",
			"LO",
			"AD"
		],
		val: [
			"SM:am+GL:pm+AW",
			"SM",
			"CS+GO:am",
			"CS+GO:am",
			"WG"
		],
		pvt_err: [
			"AD",
			"KAH",
			"WG",
			"GL:late?",
			"LO"
		],
		c513: [
			"DM+JD",
			"JD+AV:am",
			"DM+AV:am",
			"DM+AD",
			"DM+JD"
		],
		alinity: [
			"CS",
			"GL",
			"GL",
			"WG",
			"GL"
		],
		pvt_am: [
			"AL+WG",
			"SG+LO",
			"SM+AD",
			"KAH",
			"KAH+CS:am"
		],
		pvt_pm: [
			"KAH",
			"DM",
			"JD",
			"SM",
			"SS:pm"
		],
		epp: [
			"SG",
			"SS:Animals",
			"SS",
			"SG",
			"AW"
		],
		epp1: [
			"SPM",
			"SPM",
			"SPM",
			"AW",
			"AW"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"TW",
			"TW"
		],
		send: [
			"WG:PVT am",
			"WG:am+AD:pm",
			"KAH",
			"JD",
			"AL"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"MW:2pm+SS:pm",
			"MW:2pm",
			"MW:2pm",
			"SS",
			"SS:am"
		],
		admin: [
			"SM:pm",
			"CS:pm+WG:pm",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"SM",
			"MW:5pm"
		],
		cobas_n2: [
			"AD",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"LO",
			"AL:5pm",
			"AL:5pm",
			"AD"
		],
		pvt9: [
			"SS",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		RP: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		SM: [
			"",
			"",
			"",
			"",
			"Leave"
		]
	}),
	hydrate("2026-06-29", "Week #3 roster change trial. Lunch and learn Tuesday 30 June — let Anne know who wants to go.", [], {
		early: [
			"AW",
			"WG",
			"GL",
			"CS",
			"AW"
		],
		pro1: [
			"MW",
			"MW",
			"MW",
			"WG",
			"WG"
		],
		pro2: [
			"AW:am+RP:pm",
			"VM",
			"KAH+CS:cover",
			"KAH",
			"KAH"
		],
		pro3: [
			"DM+CS",
			"SM",
			"SM",
			"DM+CS",
			"DM+CS"
		],
		val: [
			"MW:am+GL:pm+AW",
			"MW+WG:pm",
			"MW+WG:pm",
			"WG",
			"WG"
		],
		pvt_err: [
			"KAH",
			"KAH",
			"JD",
			"GL",
			"SM"
		],
		c513: [
			"SM+DM",
			"JD+SG",
			"VM+LO",
			"VM+LO",
			"VM+LO"
		],
		alinity: [
			"WG",
			"LO",
			"SS",
			"SS",
			"SS"
		],
		pvt_am: [
			"AL+LO",
			"AL+AV:am",
			"DM+AV:am",
			"SM",
			"AL+AD"
		],
		pvt_pm: [
			"SS",
			"AD+DM",
			"CS:pm",
			"JD",
			"LO"
		],
		epp: [
			"SG",
			"GL:Animals",
			"GL",
			"SG+AW:PEG",
			"GL"
		],
		epp1: [
			"SPM",
			"GL+AW",
			"GL+AW",
			"SPM",
			"GL+AW"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"AW",
			"TW"
		],
		send: [
			"LO:PVT am",
			"RP",
			"RP",
			"RP",
			"RP"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"AD",
			"SS",
			"AD",
			"AD",
			"JD"
		],
		admin: [
			"",
			"STOCKTAKE",
			"KAH CPD 9am+CS:am",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"WG",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"SH",
			"JD",
			"SS"
		]
	}, {
		JD: [
			"Leave",
			"",
			"",
			"",
			""
		],
		VM: [
			"Leave",
			"",
			"",
			"",
			""
		],
		CS: [
			"",
			"IATA",
			"",
			"",
			""
		],
		SH: [
			"",
			"",
			"",
			"Leave",
			"Leave"
		]
	}),
	hydrate("2026-07-06", "Welcome Ally Marshall, AUT student. Friday is Matariki — Verna in for IVF samples only.", [4], {
		early: [
			"JD",
			"WG",
			"GL",
			"WG",
			"VM:IVF samples"
		],
		pro1: [
			"WG",
			"WG",
			"SM",
			"WG",
			""
		],
		pro2: [
			"LO",
			"VM",
			"LO",
			"LO",
			""
		],
		pro3: [
			"MW:am+KAH:pm",
			"JD",
			"MW:am+DM+WG:pm",
			"SM+DM",
			""
		],
		val: [
			"WG",
			"WG",
			"SM",
			"WG",
			""
		],
		pvt_err: [
			"RP",
			"KAH",
			"JD",
			"GL",
			""
		],
		c513: [
			"SM+AD",
			"AD+SM",
			"VM+GO:am",
			"VM+GO:am",
			""
		],
		alinity: [
			"VM",
			"GL",
			"KAH",
			"KAH",
			""
		],
		pvt_am: [
			"DM+AL+AY",
			"RP+AY",
			"AV:am+GL:am+AY:am",
			"RP+AY",
			""
		],
		pvt_pm: [
			"GL:pm+AY:pm",
			"DM",
			"RP+DM:pm",
			"JD",
			""
		],
		epp: [
			"AW",
			"LO:Animals+AW",
			"AW",
			"SS",
			""
		],
		epp1: [
			"AW",
			"SPM",
			"AW",
			"TW",
			""
		],
		epp2: [
			"TW",
			"AW",
			"TW",
			"AW",
			""
		],
		send: [
			"AD:c513 am",
			"AL",
			"AD",
			"AD",
			""
		],
		immuno_sci: [
			"TW",
			"MW",
			"TW",
			"TW",
			""
		],
		immuno_am: [
			"JD",
			"SS",
			"SS",
			"SS:EPP",
			""
		],
		admin: [
			"GL:H&S+AY",
			"",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"TW:5pm",
			"WG",
			"MW",
			""
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			""
		],
		send_eve: [
			"KAH",
			"AV:4:30pm",
			"AL:5pm",
			"JD",
			""
		],
		pvt9: [
			"SS",
			"DM",
			"RP",
			"AW",
			""
		]
	}, {
		SG: [
			"Leave",
			"Leave",
			"",
			"Leave",
			""
		],
		CS: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			""
		],
		GL: [
			"",
			"",
			"pm",
			"",
			""
		],
		SH: [
			"",
			"",
			"Leave",
			"Leave",
			""
		],
		AL: [
			"",
			"",
			"",
			"Leave",
			""
		]
	}),
	hydrate("2026-07-13", "Week #5 post roster change — speak up if problems.", [], {
		early: [
			"CS",
			"WG",
			"GL",
			"CS",
			"AW"
		],
		pro1: [
			"SM",
			"WG",
			"CS",
			"WG",
			"WG"
		],
		pro2: [
			"MW:am+GL:pm",
			"MW:am+CS:pm",
			"MW:am+KAH:pm",
			"AW",
			"AW"
		],
		pro3: [
			"CS",
			"RP",
			"RP+DM",
			"RP+DM",
			"RP+DM"
		],
		val: [
			"SM",
			"WG",
			"CS",
			"WG",
			"WG"
		],
		pvt_err: [
			"RP",
			"KAH",
			"WG",
			"GL",
			"SM"
		],
		c513: [
			"WG",
			"SM+LO",
			"SM+GO:am",
			"KAH+GO:am",
			"KAH"
		],
		alinity: [
			"DM",
			"AD",
			"AD",
			"CS",
			"CS"
		],
		pvt_am: [
			"AD+AY",
			"GL+AY+SS",
			"GL+AY+AV:am",
			"AD",
			"GL+AY"
		],
		pvt_pm: [
			"KAH",
			"DM",
			"JD",
			"SM",
			"LO+AD"
		],
		epp: [
			"SS:IMF",
			"AL:Animals+AW",
			"AW+SS:IMF",
			"JD",
			"AL"
		],
		epp1: [
			"SPM",
			"MW",
			"MW",
			"AW",
			"TW"
		],
		epp2: [
			"TW",
			"AW",
			"AW",
			"TW",
			"AW"
		],
		send: [
			"LO",
			"AL",
			"LO",
			"LO",
			"SS"
		],
		immuno_sci: [
			"TW:12-5pm",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"JD:EPP",
			"JD",
			"SS",
			"SS",
			"JD"
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AV:4:30pm",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"KAH",
			"SM",
			"AD"
		]
	}, {
		SG: [
			"Leave",
			"Leave",
			"",
			"Leave",
			""
		],
		AL: [
			"Leave",
			"",
			"",
			"",
			""
		],
		AW: [
			"Leave",
			"",
			"",
			"",
			""
		],
		GO: [
			"Leave",
			"",
			"",
			"",
			""
		],
		VM: [
			"SKL",
			"SKL",
			"SKL",
			"SKL",
			"SKL"
		],
		GL: [
			"",
			"pm",
			"pm",
			"",
			"pm"
		],
		SH: [
			"",
			"",
			"Leave",
			"Leave",
			"Leave"
		],
		AY: [
			"",
			"",
			"",
			"Leave",
			""
		]
	}),
	hydrate("2026-07-20", "", [], {
		early: [
			"CS",
			"WG",
			"GL",
			"CS",
			"AW"
		],
		pro1: [
			"CS",
			"SM",
			"SM",
			"CS",
			"CS"
		],
		pro2: [
			"WG",
			"WG",
			"LO",
			"WG",
			"WG"
		],
		pro3: [
			"DM+CS",
			"MW:am+CS:pm",
			"DM+CS",
			"DM+CS",
			"DM+CS"
		],
		val: [
			"CS:am+GL:pm",
			"SM",
			"SM",
			"CS",
			"CS"
		],
		pvt_err: [
			"RP",
			"KAH",
			"CS:pm+GO:pm",
			"GL+GO:pm",
			"SM"
		],
		c513: [
			"AD",
			"LO",
			"AD",
			"AD",
			"AD"
		],
		alinity: [
			"SM+AY",
			"RP+AY",
			"MW:am+AY+RP:pm",
			"RP+AY",
			"RP"
		],
		pvt_am: [
			"AL",
			"GL:am+SG",
			"GL:am",
			"LO",
			"GL:am+AL"
		],
		pvt_pm: [
			"SS+KAH",
			"DM",
			"KAH+SS:pm",
			"SG",
			"LO"
		],
		epp: [
			"LO",
			"AL:Animals+AW",
			"AW",
			"SM",
			"AW"
		],
		epp1: [
			"SPM",
			"MW",
			"AW",
			"SPM",
			"AW"
		],
		epp2: [
			"AW",
			"AW",
			"TW",
			"TW",
			"TW"
		],
		send: [
			"SG:PVT am",
			"AV:am+AD:pm",
			"AV:am+WG:pm",
			"KAH",
			"KAH"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"MW:2pm",
			"SS",
			"SS",
			"SS",
			"SS"
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"KAH",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"RP",
			"SG",
			"AV:5pm"
		]
	}, {
		JD: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		AW: [
			"am (in at 1pm)",
			"",
			"",
			"",
			""
		],
		VM: [
			"SKL",
			"SKL",
			"SKL",
			"SKL",
			"SKL"
		],
		GL: [
			"",
			"pm",
			"pm",
			"",
			"pm"
		],
		SH: [
			"",
			"",
			"Leave",
			"Leave",
			"Leave"
		],
		AY: [
			"",
			"",
			"",
			"",
			"Leave"
		]
	}),
	hydrate("2026-07-27", "", [], {
		early: [
			"AW",
			"WG",
			"GL",
			"CS",
			"AW"
		],
		pro1: [
			"WG",
			"GL",
			"CS",
			"AW",
			"CS"
		],
		pro2: [
			"CS",
			"AV:am+AD:pm",
			"AV:am+AD:pm",
			"DM+RP",
			"DM+RP"
		],
		pro3: [
			"DM",
			"WG",
			"DM",
			"WG",
			"AL"
		],
		val: [
			"WG",
			"GL:am+AW+CS:pm",
			"CS",
			"AW",
			"CS"
		],
		pvt_err: [
			"RP",
			"KAH",
			"RP",
			"SG",
			"GL"
		],
		c513: [
			"AL+AD",
			"LO+RP",
			"LO+AD:am",
			"KAH",
			"GO:am+SM:pm"
		],
		alinity: [
			"SM+AY",
			"SM+AY",
			"SM+AY",
			"SM+AY",
			"WG"
		],
		pvt_am: [
			"SG",
			"SG+AL",
			"GL:am",
			"AD",
			"AD"
		],
		pvt_pm: [
			"KAH",
			"DM",
			"WG+KAH",
			"GL",
			"LO"
		],
		epp: [
			"VM",
			"VM:Animals",
			"VM",
			"VM",
			"AW"
		],
		epp1: [
			"MW",
			"SPM",
			"AW",
			"SPM",
			"AW"
		],
		epp2: [
			"AW",
			"AW",
			"TW",
			"TW",
			"TW"
		],
		send: [
			"LO:PVT",
			"SS",
			"SS",
			"LO",
			"KAH"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"MW+SS:pm",
			"MW",
			"MW",
			"SS",
			"SS"
		],
		admin: [
			"GL:pm",
			"",
			"",
			"STOCKTAKE CS",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"RP",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL:5pm",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"KAH",
			"SG",
			"GL"
		]
	}, {
		JD: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		GL: [
			"",
			"pm",
			"pm",
			"",
			""
		],
		SH: [
			"",
			"",
			"Leave",
			"Leave",
			"Leave"
		],
		AY: [
			"",
			"",
			"",
			"",
			"Leave"
		],
		VM: [
			"",
			"",
			"",
			"",
			"Leave"
		]
	}),
	hydrate("2026-08-03", "", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"AW",
			"JD"
		],
		pro1: [
			"MW",
			"MW",
			"MW",
			"SM",
			"AW"
		],
		pro2: [
			"SG",
			"RP",
			"DM+GL",
			"DM+GL:pm",
			"DM+GL:pm"
		],
		pro3: [
			"DM",
			"SG",
			"LO",
			"LO",
			"LO"
		],
		val: [
			"MW:am+GL:pm",
			"MW:am+SM:pm",
			"MW:am+WG:pm",
			"SM",
			"AW:am+SM:pm"
		],
		pvt_err: [
			"KAH",
			"AD",
			"JD",
			"AD",
			"LO"
		],
		c513: [
			"WG+AY",
			"WG+AY",
			"SM+AW",
			"RP+AY",
			"AY+RP"
		],
		alinity: [
			"AL",
			"AV:am+KAH:pm",
			"SS",
			"SS",
			"SS"
		],
		pvt_am: [
			"LO+SM",
			"AL+LO",
			"KAH+RP:am",
			"KAH+SG",
			"KAH+AL"
		],
		pvt_pm: [
			"SS",
			"DM",
			"AD:2pm",
			"",
			""
		],
		epp: [
			"JD",
			"JD:Animals",
			"AV:am+RP:pm",
			"JD",
			"JD"
		],
		epp1: [
			"SPM",
			"GL",
			"GL",
			"SPM",
			"TW"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"AW",
			"AW"
		],
		send: [
			"VM",
			"VM",
			"VM",
			"VM",
			"VM"
		],
		immuno_sci: [
			"TW+AD",
			"TW",
			"TW",
			"TW",
			"TW:all day+AD"
		],
		immuno_am: [
			"AD:all day",
			"SS",
			"AD:2pm",
			"AD:2pm",
			"AD:all day"
		],
		admin: [
			"SM:pm+RP",
			"GL",
			"",
			"",
			"GL:am"
		],
		cobas_n1: [
			"GL",
			"SM",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		CS: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		AY: [
			"",
			"",
			"Leave",
			"",
			""
		],
		WG: [
			"",
			"",
			"",
			"Leave",
			"Leave"
		]
	}),
	hydrate("2026-08-10", "", [], {
		early: [
			"JD",
			"AW",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"SM",
			"GL",
			"GL",
			"WG",
			"GL"
		],
		pro2: [
			"MW:am+RP:pm",
			"SM",
			"SM",
			"SM",
			"AL:am"
		],
		pro3: [
			"LO",
			"LO",
			"VM",
			"VM",
			"VM"
		],
		val: [
			"SM",
			"GL+AW",
			"GL+AW",
			"WG",
			"GL+AW"
		],
		pvt_err: [
			"GL",
			"AD",
			"WG",
			"GL",
			"LO"
		],
		c513: [
			"JD+AY",
			"JD+AY",
			"CS",
			"JD+AY",
			"WG+AY"
		],
		alinity: [
			"VM",
			"RP",
			"LO",
			"LO",
			"JD"
		],
		pvt_am: [
			"AL",
			"MW+AL",
			"MW+KAH",
			"SG+KAH",
			"KAH"
		],
		pvt_pm: [
			"SS+KAH",
			"KAH",
			"SS:pm",
			"",
			"SM"
		],
		epp: [
			"AW",
			"AV:Animals+SS:IMF pm",
			"AV+JD:pm",
			"CS",
			"CS"
		],
		epp1: [
			"AW",
			"MW",
			"MW",
			"SPM",
			"AW"
		],
		epp2: [
			"TW",
			"AW",
			"AW",
			"AW",
			"TW"
		],
		send: [
			"SG",
			"SG",
			"RP",
			"RP",
			"RP"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"AD:all day",
			"SS:am",
			"SS",
			"SS",
			"SS"
		],
		admin: [
			"",
			"CS:pm",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"GO",
			"SH",
			"SH",
			"SH"
		]
	}, {
		WG: [
			"Leave",
			"Leave",
			"",
			"",
			""
		],
		DM: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		CS: [
			"Leave",
			"Leave",
			"",
			"",
			""
		],
		AD: [
			"",
			"",
			"Leave",
			"Leave",
			"Leave"
		],
		AY: [
			"",
			"",
			"Leave",
			"",
			""
		],
		VM: [
			"",
			"Leave",
			"",
			"",
			""
		],
		AL: [
			"",
			"",
			"",
			"",
			"pm"
		]
	}),
	hydrate("2026-08-17", "Tearoom duty — everyone.", [], {
		early: [
			"AW",
			"WG",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"MW",
			"GL",
			"GL",
			"SM",
			"GL"
		],
		pro2: [
			"SG",
			"SG",
			"KAH",
			"KAH",
			"KAH"
		],
		pro3: [
			"CS",
			"VM:am+AD:pm",
			"CS+AY",
			"CS+AY",
			"CS:1pm+AY+JD:1pm"
		],
		val: [
			"MW+GL:pm",
			"GL",
			"GL",
			"SM",
			"GL"
		],
		pvt_err: [
			"KAH",
			"KAH",
			"JD",
			"WG:pm",
			"SM"
		],
		c513: [
			"VM+AY",
			"WG+SS",
			"MW:am+WG:pm",
			"SS+JD",
			"SS+WG"
		],
		alinity: [
			"WG",
			"RP",
			"RP",
			"RP",
			"RP"
		],
		pvt_am: [
			"DM",
			"SM+LO",
			"DM+SM",
			"DM+SG",
			"DM"
		],
		pvt_pm: [
			"SS+RP",
			"DM",
			"SS",
			"AD",
			"LO"
		],
		epp: [
			"AW:am+JD:IMF",
			"AV:am Animals+VM:IMF",
			"VM",
			"VM",
			"VM"
		],
		epp1: [
			"SPM",
			"MW",
			"MW",
			"SPM",
			"TW"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"TW",
			"PATH"
		],
		send: [
			"AL",
			"AL",
			"LO",
			"LO",
			"AL"
		],
		immuno_sci: [
			"TW",
			"TW+MW",
			"TW+AD",
			"TW",
			"TW:all day+AD"
		],
		immuno_am: [
			"JD",
			"JD",
			"SS:2pm",
			"AD:2pm",
			"JD:1pm"
		],
		admin: [
			"",
			"CS",
			"",
			"GL:pm",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"WG",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		AD: [
			"Leave",
			"",
			"",
			"",
			""
		],
		LO: [
			"Leave",
			"",
			"",
			"",
			""
		],
		AY: [
			"",
			"Leave",
			"",
			"",
			""
		],
		AW: [
			"",
			"",
			"",
			"CL",
			"Leave"
		],
		MW: [
			"",
			"",
			"",
			"Leave",
			""
		],
		CS: [
			"",
			"",
			"",
			"",
			"1pm"
		]
	}),
	hydrate("2026-08-24", "", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"WG",
			"WG",
			"SM",
			"SM",
			"CS"
		],
		pro2: [
			"VM+GL:pm nLo",
			"VM",
			"AV:am+WG:pm",
			"CS",
			"GL"
		],
		pro3: [
			"JD",
			"SM",
			"CS",
			"WG",
			"WG"
		],
		val: [
			"WG",
			"WG",
			"SM",
			"SM",
			"CS"
		],
		pvt_err: [
			"KAH",
			"AD",
			"JD",
			"GL",
			"SM"
		],
		c513: [
			"CS",
			"GL+SS",
			"GL+SS",
			"SS",
			"SS"
		],
		alinity: [
			"SG",
			"SG",
			"KAH",
			"SG",
			"AL"
		],
		pvt_am: [
			"DM",
			"LO+AL",
			"VM",
			"KAH",
			"KAH"
		],
		pvt_pm: [
			"SS+RP",
			"DM",
			"AD:2pm",
			"JD:2pm",
			"LO"
		],
		epp: [
			"SM",
			"RP:Animals",
			"RP",
			"RP",
			"RP"
		],
		epp1: [
			"AW",
			"GL",
			"GL",
			"AW",
			"GL"
		],
		epp2: [
			"TW",
			"AW",
			"AW",
			"TW",
			"AW"
		],
		send: [
			"LO",
			"AV:am+KAH:pm",
			"LO+DM",
			"LO+DM",
			"DM+JD"
		],
		immuno_sci: [
			"TW",
			"MW",
			"TW+AD:2pm",
			"TW+AD",
			"TW:all day"
		],
		immuno_am: [
			"AD:2pm",
			"TW",
			"MW",
			"JD:2pm",
			"AD:2pm"
		],
		admin: [
			"",
			"CS:pm",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SS",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		AL: [
			"Leave",
			"",
			"",
			"",
			""
		],
		MW: [
			"Leave",
			"",
			"",
			"",
			""
		],
		AY: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		VM: [
			"",
			"",
			"",
			"Leave",
			"Leave"
		]
	}),
	hydrate("2026-08-31", "Stocktake Monday.", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"MW",
			"WG",
			"MW",
			"WG",
			"WG"
		],
		pro2: [
			"AL",
			"AL",
			"VM",
			"VM",
			"AL"
		],
		pro3: [
			"SM",
			"SG",
			"GL",
			"SG",
			"GL"
		],
		val: [
			"MW:am+GL:pm",
			"WG",
			"MW+WG:pm",
			"WG",
			"WG"
		],
		pvt_err: [
			"SG",
			"KAH",
			"JD",
			"GL",
			"LO"
		],
		c513: [
			"LO",
			"LO",
			"LO",
			"LO",
			"VM"
		],
		alinity: [
			"GO:am+RP:pm",
			"AV:am+AD:pm",
			"AV:am+AD:pm",
			"SM",
			"CS"
		],
		pvt_am: [
			"WG",
			"VM+SM",
			"SM",
			"RP",
			"RP"
		],
		pvt_pm: [
			"KAH",
			"DM",
			"AD",
			"JD",
			"SM"
		],
		epp: [
			"VM",
			"GL:Animals",
			"KAH+AW",
			"KAH+AW",
			"KAH+AW"
		],
		epp1: [
			"SPM",
			"GL",
			"GL",
			"TW",
			"GL"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"AW",
			"AW"
		],
		send: [
			"DM+JD",
			"RP",
			"DM+RP",
			"DM+AD",
			"DM"
		],
		immuno_sci: [
			"TW",
			"TW+MW",
			"TW",
			"TW",
			"TW:all day+AD"
		],
		immuno_am: [
			"AD",
			"JD:2pm",
			"AD:2pm",
			"JD:2pm",
			"JD:2pm"
		],
		admin: [
			"CS:stocktake",
			"CS:pm",
			"CS",
			"CS",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SG",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		SS: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		AY: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		GO: [
			"",
			"",
			"Leave",
			"",
			""
		]
	}),
	hydrate("2026-09-07", "IANZ audit Monday.", [], {
		early: [
			"JD",
			"WG",
			"GL",
			"CS",
			"JD"
		],
		pro1: [
			"CS",
			"WG",
			"CS",
			"CS",
			"CS"
		],
		pro2: [
			"VM",
			"VM",
			"VM",
			"VM",
			"GL"
		],
		pro3: [
			"JD",
			"GL+AY",
			"GL",
			"JD",
			"JD"
		],
		val: [
			"CS",
			"WG",
			"CS",
			"CS",
			"CS"
		],
		pvt_err: [
			"GL",
			"CS",
			"WG",
			"GL",
			"LO"
		],
		c513: [
			"WG+DM",
			"RP",
			"RP",
			"RP",
			"RP"
		],
		alinity: [
			"MW:am+AL:pm",
			"MW:am+AD:pm",
			"MW:am",
			"WG",
			"WG"
		],
		pvt_am: [
			"SG",
			"AL:am+SG",
			"KAH",
			"SG",
			"AL"
		],
		pvt_pm: [
			"KAH+RP",
			"KAH",
			"AD",
			"AD",
			"SM"
		],
		epp: [
			"SM",
			"AV:am Animals+JD:pm",
			"AV:am+JD:pm",
			"SM+KAH",
			"KAH+AW"
		],
		epp1: [
			"SPM",
			"MW",
			"MW",
			"SPM",
			"AW"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"AW",
			"TW"
		],
		send: [
			"LO",
			"LO+DM:pm",
			"LO+DM",
			"DM",
			"DM"
		],
		immuno_sci: [
			"TW",
			"TW",
			"TW",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"AD",
			"JD:am",
			"AD:2pm",
			"AD:2pm",
			"AD"
		],
		admin: [
			"CS:IANZ audit",
			"",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"AV:4pm",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		SS: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		AL: [
			"am",
			"pm",
			"",
			"",
			""
		],
		AY: [
			"Leave",
			"Leave",
			"CHL",
			"CHL",
			"CHL"
		],
		SM: [
			"",
			"Leave",
			"Leave",
			"",
			""
		],
		LO: [
			"",
			"",
			"",
			"Leave",
			""
		]
	}),
	hydrate("2026-09-14", "", [], {
		early: [
			"AW",
			"WG",
			"GL",
			"CS",
			"AW"
		],
		pro1: [
			"SM",
			"SM",
			"CS",
			"WG",
			"WG"
		],
		pro2: [
			"AD",
			"VM",
			"AD",
			"AD",
			"RP"
		],
		pro3: [
			"WG+AY",
			"WG+AY",
			"VM",
			"CS+AY",
			"CS+AY"
		],
		val: [
			"SM",
			"SM",
			"CS",
			"WG",
			"WG"
		],
		pvt_err: [
			"RP",
			"AD",
			"WG",
			"GL",
			"LO"
		],
		c513: [
			"VM",
			"GL:operator+RP",
			"GL:operator+RP:am",
			"RP",
			"GL:operator"
		],
		alinity: [
			"AL",
			"AL",
			"LO",
			"LO",
			"AL"
		],
		pvt_am: [
			"LO",
			"LO",
			"AV",
			"VM+SG",
			"VM"
		],
		pvt_pm: [
			"SG+KAH",
			"DM",
			"JD+RP:pm",
			"",
			"SM"
		],
		epp: [
			"",
			"SG:Animals",
			"KAH+SM",
			"KAH+SM",
			"KAH"
		],
		epp1: [
			"MW",
			"MW",
			"SPM",
			"SPM",
			"AW"
		],
		epp2: [
			"AW",
			"AW",
			"AW",
			"AW",
			"TW"
		],
		send: [
			"DM",
			"AV:am+KAH:pm",
			"DM",
			"DM",
			"DM"
		],
		immuno_sci: [
			"MW:2pm",
			"MW:2pm",
			"MW:2pm",
			"TW",
			"TW:all day"
		],
		immuno_am: [
			"TW:2pm",
			"TW:2pm",
			"TW:2pm",
			"JD:2pm",
			"JD:2pm"
		],
		admin: [
			"CS+GL:pm",
			"CS:pm",
			"",
			"",
			""
		],
		cobas_n1: [
			"GL",
			"CS",
			"WG",
			"MW",
			"SM"
		],
		cobas_n2: [
			"RP",
			"KAH",
			"JD",
			"GL",
			"SG:1630"
		],
		send_eve: [
			"KAH",
			"AD",
			"AL:5pm",
			"AL",
			"LO"
		],
		pvt9: [
			"SG",
			"DM",
			"SH",
			"SH",
			"SH"
		]
	}, {
		SS: [
			"Leave",
			"Leave",
			"Leave",
			"Leave",
			"Leave"
		],
		JD: [
			"Leave",
			"Leave",
			"",
			"",
			""
		],
		AY: [
			"",
			"",
			"Leave",
			"",
			""
		],
		AD: [
			"",
			"",
			"",
			"",
			"Leave"
		]
	})
];
function archiveByMonday() {
	const out = {};
	for (const w of ARCHIVE) out[w.monday] = structuredClone(w);
	return out;
}
var DAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri"
];
var DAY_FULL = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday"
];
var STAFF = [
	{
		id: "AW",
		firstName: "Anne",
		lastName: "Wilkinson",
		initials: "AW",
		rosterName: "Anne",
		role: "scientist",
		fte: "full",
		color: "#2f6f6a",
		autoAssign: true,
		notes: "Often Friday or Monday early start; EPP 2nd read; validation helper.",
		active: true
	},
	{
		id: "CS",
		firstName: "Cara",
		lastName: "Scott",
		initials: "CS",
		rosterName: "Cara",
		role: "scientist",
		fte: "full",
		color: "#3d5a80",
		autoAssign: true,
		notes: "Frequent PRO 1 / Thursday early start. Tuesday COBAS N1 evening.",
		active: true
	},
	{
		id: "WG",
		firstName: "William",
		lastName: "Gouws",
		initials: "WG",
		rosterName: "William",
		role: "scientist",
		fte: "full",
		color: "#6b5344",
		autoAssign: true,
		notes: "Almost always Tuesday early start. Wednesday COBAS N1 evening.",
		active: true
	},
	{
		id: "GL",
		firstName: "Greg",
		lastName: "Leamon",
		initials: "GL",
		rosterName: "Greg",
		role: "scientist",
		fte: "full",
		color: "#4a6741",
		autoAssign: true,
		notes: "Always Wednesday early start. Monday COBAS N1 and Thursday COBAS N2 evenings.",
		active: true
	},
	{
		id: "AD",
		firstName: "Alice",
		lastName: "Dony",
		initials: "AD",
		rosterName: "Alice",
		role: "scientist",
		fte: "full",
		color: "#7a4458",
		autoAssign: true,
		active: true
	},
	{
		id: "SM",
		firstName: "Shezeetha",
		lastName: "Matthews",
		initials: "SM",
		rosterName: "Shezeetha",
		role: "scientist",
		fte: "full",
		color: "#b85c38",
		autoAssign: true,
		notes: "Friday COBAS N1 evening.",
		active: true
	},
	{
		id: "MW",
		firstName: "Megan",
		lastName: "Winks",
		initials: "MW",
		rosterName: "Megan",
		role: "scientist",
		fte: "part",
		color: "#3f6b8a",
		autoAssign: true,
		notes: "Part-time. Thursday COBAS N1 evening. Covers immunology when Teresa is away.",
		active: true
	},
	{
		id: "TW",
		firstName: "Teresa",
		lastName: "Wong",
		initials: "TW",
		rosterName: "Teresa",
		role: "scientist",
		fte: "part",
		specialist: "immunology",
		color: "#8a5a2a",
		autoAssign: true,
		notes: "Immunology specialist (Theresa). Friday immunology all day. Rarely on core benches.",
		active: true
	},
	{
		id: "AL",
		firstName: "Abby",
		lastName: "Luet",
		initials: "AL",
		rosterName: "Abby",
		role: "technician",
		fte: "part",
		color: "#5c6b4a",
		autoAssign: true,
		notes: "Wednesday & Thursday sendaways evening (often 5 pm).",
		active: true
	},
	{
		id: "SG",
		firstName: "Susanna",
		lastName: "Gin",
		initials: "SG",
		rosterName: "Susanna",
		role: "technician",
		fte: "part",
		color: "#4d6a7a",
		autoAssign: true,
		notes: "Friday COBAS N2 until 16:30.",
		active: true
	},
	{
		id: "AV",
		firstName: "Amanda",
		lastName: "Vette",
		initials: "AV",
		rosterName: "Amanda",
		role: "technician",
		fte: "part",
		color: "#7a6240",
		autoAssign: true,
		morningsOnly: true,
		notes: "Typically morning only (Alinity / PVT / EPP am).",
		active: true
	},
	{
		id: "KAH",
		firstName: "Kelly-Anne",
		lastName: "Howard",
		initials: "KAH",
		rosterName: "Kelly-Anne",
		role: "technician",
		fte: "full",
		color: "#5a4e7a",
		autoAssign: true,
		notes: "Tuesday PVT-PM errors + Tuesday COBAS N2. Monday sendaways 9.30 evening.",
		active: true
	},
	{
		id: "DM",
		firstName: "Daphne",
		lastName: "Moreno",
		initials: "DM",
		rosterName: "Daphne",
		role: "technician",
		fte: "full",
		color: "#6a3f4a",
		autoAssign: true,
		notes: "Tuesday PVT 9 pm evening.",
		active: true
	},
	{
		id: "VM",
		firstName: "Verna",
		lastName: "Murcott",
		initials: "VM",
		rosterName: "Verna",
		role: "technician",
		fte: "full",
		color: "#3f5c4a",
		autoAssign: true,
		active: true
	},
	{
		id: "RP",
		firstName: "Rose",
		lastName: "Ploeg",
		initials: "RP",
		rosterName: "Rose",
		role: "technician",
		fte: "full",
		color: "#7a4035",
		autoAssign: true,
		notes: "Monday COBAS N2 evening.",
		active: true
	},
	{
		id: "SS",
		firstName: "Susie",
		lastName: "Storr",
		initials: "SS",
		rosterName: "Susie",
		role: "technician",
		fte: "full",
		specialist: "immunology",
		color: "#4a5870",
		autoAssign: true,
		notes: "Immunology technician. Monday PVT 9 pm evening.",
		active: true
	},
	{
		id: "JD",
		firstName: "Jacquie",
		lastName: "Duff",
		initials: "JD",
		rosterName: "Jacquie",
		role: "technician",
		fte: "full",
		color: "#2f4f6a",
		autoAssign: true,
		notes: "Often Monday/Friday early start. Wednesday PVT-PM errors + Wednesday COBAS N2.",
		active: true
	},
	{
		id: "LO",
		firstName: "Loraine",
		lastName: "",
		initials: "LO",
		rosterName: "Loraine",
		role: "technician",
		fte: "full",
		color: "#5c6a38",
		autoAssign: true,
		notes: "On every supplied roster but not on the original staff list — added from the documents. Friday sendaways evening.",
		active: true
	},
	{
		id: "SH",
		firstName: "Shamsia",
		lastName: "",
		initials: "SH",
		rosterName: "Shamsia",
		role: "technician",
		fte: "part",
		color: "#5a6570",
		autoAssign: true,
		eveningOnly: true,
		notes: "Evening PVT 9 pm Wednesday–Friday. Not on the day grid.",
		active: true
	},
	{
		id: "GO",
		firstName: "Gordon",
		lastName: "",
		initials: "GO",
		rosterName: "Gordon",
		role: "casual",
		fte: "part",
		color: "#6a5c48",
		autoAssign: false,
		notes: "Appears occasionally (c513, PVT-PM, Alinity). Not auto-assigned.",
		active: true
	},
	{
		id: "AY",
		firstName: "Ally",
		lastName: "Marshall",
		initials: "AY",
		rosterName: "Ally",
		role: "student",
		fte: "part",
		color: "#4a6a68",
		autoAssign: false,
		notes: "AUT student. Paired on PVT / c513. Not auto-assigned.",
		active: true
	},
	{
		id: "SPM",
		firstName: "SPM",
		lastName: "",
		initials: "SPM",
		rosterName: "SPM",
		role: "pathologist",
		fte: "part",
		color: "#4a4a48",
		autoAssign: true,
		eveningOnly: true,
		notes: "EPP 1st-read initials on the historical rosters. Pathologist / senior reader — not a bench assignment.",
		active: true
	},
	{
		id: "PATH",
		firstName: "Pathologist",
		lastName: "",
		initials: "PATH",
		rosterName: "Pathologist",
		role: "pathologist",
		fte: "part",
		color: "#5a5854",
		autoAssign: false,
		eveningOnly: true,
		notes: "Used when 2nd EPP read is a pathologist rather than a named scientist.",
		active: true
	}
];
function staffById(list, id) {
	return list.find((s) => s.id === id);
}
function displayName(s) {
	return s.lastName ? `${s.firstName} ${s.lastName}` : s.firstName;
}
var EXCLUSIVE = new Set(STATIONS.filter((s) => s.exclusive).map((s) => s.id));
var OVERLAY = /* @__PURE__ */ new Set([
	"early",
	"val",
	"epp1",
	"epp2",
	"admin",
	"cobas_n1",
	"cobas_n2",
	"send_eve",
	"pvt9",
	"pvt7"
]);
function validateWeek(week, staff) {
	const issues = [];
	const byId = new Map(staff.map((s) => [s.id, s]));
	for (let d = 0; d < 5; d++) {
		const holiday = holidayName(weekdayISO(week.monday, d));
		if (week.holidays.includes(d) || holiday) {
			issues.push({
				level: "info",
				day: d,
				message: `${DAYS[d]} is ${holiday ?? "a holiday"} — day benches can stay empty.`
			});
			continue;
		}
		const primary = /* @__PURE__ */ new Map();
		for (const station of STATIONS) {
			if (station.retired) continue;
			const cell = week.cells[station.id]?.[d] ?? [];
			for (const a of cell) {
				if (!byId.has(a.staffId)) issues.push({
					level: "warn",
					day: d,
					stationId: station.id,
					staffId: a.staffId,
					message: `Unknown person '${a.staffId}' on ${station.label}.`
				});
				const leaveNote = week.leave[a.staffId]?.[d];
				if (leaveNote) issues.push({
					level: "error",
					day: d,
					stationId: station.id,
					staffId: a.staffId,
					message: `${byId.get(a.staffId)?.rosterName ?? a.staffId} is on leave (${leaveNote}) but assigned to ${station.label}.`
				});
				if (station.requiresScientist) {
					const s = byId.get(a.staffId);
					if (s && s.role !== "scientist" && s.role !== "pathologist") issues.push({
						level: "warn",
						day: d,
						stationId: station.id,
						staffId: a.staffId,
						message: `${s.rosterName} is a ${s.role} on ${station.label}, which is usually a scientist.`
					});
				}
				if (EXCLUSIVE.has(station.id) && !OVERLAY.has(station.id)) {
					const list = primary.get(a.staffId) ?? [];
					list.push(station.id);
					primary.set(a.staffId, list);
				}
			}
			if (cell.length < station.min) issues.push({
				level: cell.length === 0 ? "error" : "warn",
				day: d,
				stationId: station.id,
				message: cell.length === 0 ? `${station.label} is empty on ${DAYS[d]}.` : `${station.label} has ${cell.length} on ${DAYS[d]} (needs ${station.min}).`
			});
		}
		for (const [staffId, stations] of primary) {
			const unique = [...new Set(stations)];
			if (unique.length > 1) {
				const names = unique.map((id) => STATIONS.find((s) => s.id === id)?.label ?? id);
				const person = byId.get(staffId)?.rosterName ?? staffId;
				const split = unique.every((id) => (week.cells[id]?.[d] ?? []).some((a) => a.staffId === staffId && a.note));
				issues.push({
					level: split ? "info" : "warn",
					day: d,
					staffId,
					message: split ? `${person} is split across ${names.join(" / ")} on ${DAYS[d]}.` : `${person} is on ${names.join(" and ")} on ${DAYS[d]} with no am/pm note.`
				});
			}
		}
		for (const s of staff) {
			if (!s.active || !s.autoAssign || s.eveningOnly || s.role === "pathologist") continue;
			if (week.leave[s.id]?.[d]) continue;
			if (!STATIONS.some((st) => (week.cells[st.id]?.[d] ?? []).some((a) => a.staffId === s.id))) issues.push({
				level: "warn",
				day: d,
				staffId: s.id,
				message: `${s.rosterName} is working ${DAYS[d]} but has no station.`
			});
		}
	}
	return issues;
}
function issueCounts(issues) {
	return {
		error: issues.filter((i) => i.level === "error").length,
		warn: issues.filter((i) => i.level === "warn").length,
		info: issues.filter((i) => i.level === "info").length
	};
}
function xmlEscape(s) {
	return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function cellXml(text, style, mergeAcross) {
	return `<Cell ss:StyleID="${style}"${mergeAcross ? ` ss:MergeAcross="${mergeAcross}"` : ""}><Data ss:Type="String">${xmlEscape(text).replaceAll("\n", "&#10;")}</Data></Cell>`;
}
function emptyCell(style = "sBody") {
	return `<Cell ss:StyleID="${style}"/>`;
}
function rosterToSpreadsheetXml(week, staff) {
	const nameOf = (id) => staffById(staff, id)?.rosterName ?? id;
	const headers = ["Station", ...DAY_FULL];
	const dayLabels = DAY_FULL.map((label, i) => {
		const hol = holidayName(weekdayISO(week.monday, i));
		return hol ? `${label}\n${hol}` : label;
	});
	const rows = [];
	rows.push(`<Row ss:Height="28">${cellXml("BIOCHEMISTRY LABORATORY", "sBanner", 5)}</Row>`);
	rows.push(`<Row ss:Height="22">${cellXml(week.title, "sTitle", 5)}</Row>`);
	rows.push(`<Row ss:Height="16">${cellXml(`Shifts: early 08:00–16:30  ·  day 08:30–17:00  ·  evening 14:00–22:00`, "sSub", 5)}</Row>`);
	rows.push(`<Row ss:Height="8">${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}</Row>`);
	const headerCells = `<Cell ss:StyleID="sHead"><Data ss:Type="String">${xmlEscape(headers[0])}</Data></Cell>` + dayLabels.map((d) => cellXml(d, "sHead")).join("");
	rows.push(`<Row ss:Height="28">${headerCells}</Row>`);
	const pushSection = (label) => {
		rows.push(`<Row ss:Height="20">${cellXml(label, "sSection", 5)}</Row>`);
	};
	const pushStation = (id, style = "sBody") => {
		const st = stationById(id);
		if (!st) return;
		const cells = [cellXml(st.sublabel ? `${st.label}\n${st.sublabel}` : st.label, "sStation")];
		for (let d = 0; d < 5; d++) {
			const hol = week.holidays.includes(d);
			const text = hol ? d === 0 && holidayName(weekdayISO(week.monday, d)) ? holidayName(weekdayISO(week.monday, d)) : "" : formatCell(week.cells[id]?.[d] ?? [], nameOf);
			cells.push(cellXml(text, hol ? "sHoliday" : style));
		}
		rows.push(`<Row ss:Height="36">${cells.join("")}</Row>`);
	};
	pushSection("DAY BENCHES");
	for (const st of DAY_STATIONS) pushStation(st.id);
	const leaveCells = [cellXml("Leave", "sStation")];
	for (let d = 0; d < 5; d++) {
		const names = [];
		for (const [id, slots] of Object.entries(week.leave)) {
			const note = slots[d];
			if (!note) continue;
			const n = nameOf(id);
			names.push(note && note !== "Leave" ? `${n} – ${note}` : n);
		}
		leaveCells.push(cellXml(names.join("\n"), "sLeave"));
	}
	rows.push(`<Row ss:Height="40">${leaveCells.join("")}</Row>`);
	rows.push(`<Row ss:Height="10">${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}</Row>`);
	pushSection("EVENING  ·  14:00 – 22:00");
	for (const st of EVENING_STATIONS) pushStation(st.id, "sEve");
	if (week.notes.trim()) {
		rows.push(`<Row ss:Height="10">${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}${emptyCell("sBlank")}</Row>`);
		rows.push(`<Row ss:Height="36">${cellXml("Notes: " + week.notes, "sNotes", 5)}</Row>`);
	}
	const personRows = [];
	personRows.push(`<Row ss:Height="24">${cellXml(`Who’s where  ·  ${weekRangeLabel(week.monday)}`, "sTitle", 5)}</Row>`);
	personRows.push(`<Row ss:Height="24">${headerCells}</Row>`);
	const activeStaff = staff.filter((s) => s.active).sort((a, b) => a.rosterName.localeCompare(b.rosterName));
	for (const s of activeStaff) {
		const cells = [cellXml(`${s.rosterName}${s.lastName ? " " + s.lastName : ""}  (${s.role})`, "sStation")];
		for (let d = 0; d < 5; d++) {
			if (week.leave[s.id]?.[d]) {
				cells.push(cellXml(`LEAVE${week.leave[s.id][d] !== "Leave" ? " – " + week.leave[s.id][d] : ""}`, "sLeave"));
				continue;
			}
			const hits = [];
			for (const st of [...DAY_STATIONS, ...EVENING_STATIONS]) {
				const as = (week.cells[st.id]?.[d] ?? []).filter((a) => a.staffId === s.id);
				for (const a of as) hits.push(a.note ? `${st.label} (${a.note})` : st.label);
			}
			cells.push(cellXml(hits.join("\n"), "sBody"));
		}
		personRows.push(`<Row ss:Height="40">${cells.join("")}</Row>`);
	}
	const issues = validateWeek(week, staff);
	const issueRows = [];
	issueRows.push(`<Row ss:Height="24">${cellXml("Coverage check", "sTitle", 2)}</Row>`);
	issueRows.push(`<Row ss:Height="22">${cellXml("Level", "sHead")}${cellXml("Day", "sHead")}${cellXml("Message", "sHead")}</Row>`);
	if (!issues.length) issueRows.push(`<Row>${cellXml("ok", "sBody")}${emptyCell("sBody")}${cellXml("No issues.", "sBody")}</Row>`);
	for (const i of issues) issueRows.push(`<Row ss:Height="22">${cellXml(i.level, "sBody")}${cellXml(DAY_FULL[i.day], "sBody")}${cellXml(i.message, "sBody")}</Row>`);
	const staffRows = [];
	staffRows.push(`<Row ss:Height="22">${cellXml("Name", "sHead")}${cellXml("Initials", "sHead")}${cellXml("Role", "sHead")}${cellXml("FTE", "sHead")}${cellXml("Notes", "sHead")}</Row>`);
	for (const s of activeStaff) staffRows.push(`<Row ss:Height="20">${cellXml(displayName(s), "sBody")}${cellXml(s.initials, "sBody")}${cellXml(s.role, "sBody")}${cellXml(s.fte, "sBody")}${cellXml(s.notes ?? "", "sBody")}</Row>`);
	return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default"><Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1C2421"/></Style>
  <Style ss:ID="sBanner"><Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#F7F4EE"/><Interior ss:Color="#1F5C57" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:Horizontal="Left"/></Style>
  <Style ss:ID="sTitle"><Font ss:FontName="Calibri" ss:Size="13" ss:Bold="1" ss:Color="#1C2421"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="sSub"><Font ss:FontName="Calibri" ss:Size="9" ss:Color="#5C6560"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="sHead"><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#F7F4EE"/><Interior ss:Color="#1F5C57" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#163E3B"/></Borders></Style>
  <Style ss:ID="sSection"><Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#1F5C57"/><Interior ss:Color="#E7EFEA" ss:Pattern="Solid"/><Alignment ss:Vertical="Center"/></Style>
  <Style ss:ID="sStation"><Font ss:FontName="Calibri" ss:Size="9" ss:Bold="1" ss:Color="#1C2421"/><Interior ss:Color="#F3EFE6" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D4CFC4"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E4DFD4"/></Borders></Style>
  <Style ss:ID="sBody"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1C2421"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E4DFD4"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#EEEAE2"/></Borders></Style>
  <Style ss:ID="sEve"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1C2421"/><Interior ss:Color="#EEF3F1" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D4CFC4"/></Borders></Style>
  <Style ss:ID="sLeave"><Font ss:FontName="Calibri" ss:Size="9" ss:Color="#6B3F1F"/><Interior ss:Color="#F4E6D8" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:WrapText="1"/></Style>
  <Style ss:ID="sHoliday"><Font ss:FontName="Calibri" ss:Size="9" ss:Italic="1" ss:Color="#7A7468"/><Interior ss:Color="#EDE8DC" ss:Pattern="Solid"/><Alignment ss:Vertical="Center" ss:Horizontal="Center" ss:WrapText="1"/></Style>
  <Style ss:ID="sNotes"><Font ss:FontName="Calibri" ss:Size="10" ss:Color="#1C2421"/><Alignment ss:Vertical="Center" ss:WrapText="1"/></Style>
  <Style ss:ID="sBlank"/>
 </Styles>
 <Worksheet ss:Name="Roster">
  <Table ss:ExpandedColumnCount="6" x:FullColumns="1" x:FullRows="1">
   <Column ss:Width="160"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   ${rows.join("\n   ")}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout x:Orientation="Landscape"/>
    <Header x:Margin="0.2"/>
    <Footer x:Margin="0.2" x:Data="&amp;C${xmlEscape(week.title)}"/>
    <PageMargins x:Bottom="0.3" x:Left="0.3" x:Right="0.3" x:Top="0.3"/>
   </PageSetup>
   <FitToPage/>
   <Print><ValidPrinterInfo/><FitToPage/><FitWidth>1</FitWidth><FitHeight>1</FitHeight></Print>
  </WorksheetOptions>
 </Worksheet>
 <Worksheet ss:Name="By person">
  <Table>
   <Column ss:Width="180"/>
   <Column ss:Width="130"/><Column ss:Width="130"/><Column ss:Width="130"/><Column ss:Width="130"/><Column ss:Width="130"/>
   ${personRows.join("\n   ")}
  </Table>
 </Worksheet>
 <Worksheet ss:Name="Coverage">
  <Table>
   <Column ss:Width="70"/><Column ss:Width="90"/><Column ss:Width="520"/>
   ${issueRows.join("\n   ")}
  </Table>
 </Worksheet>
 <Worksheet ss:Name="Staff">
  <Table>
   <Column ss:Width="160"/><Column ss:Width="70"/><Column ss:Width="90"/><Column ss:Width="70"/><Column ss:Width="360"/>
   ${staffRows.join("\n   ")}
  </Table>
 </Worksheet>
</Workbook>`;
}
function downloadRosterExcel(week, staff) {
	const xml = rosterToSpreadsheetXml(week, staff);
	const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${week.title}.xls`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function downloadJson(week) {
	const blob = new Blob([JSON.stringify(week, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${week.title}.json`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function Toolbar({ week, staff, onPrev, onNext, onGenerate, onReset, onCopy, onRestore }) {
	const prevMonday = shiftToMonday(week.monday, -1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium uppercase tracking-[0.18em] text-primary",
				children: "Biochemistry laboratory"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl",
				children: week.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Early 08:00–16:30 · day 08:30–17:00 · evening 14:00–22:00"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 print:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-lg border border-border bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-10",
							onClick: onPrev,
							"aria-label": "Previous week",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-36 px-2 text-center text-sm font-medium",
							children: weekRangeLabel(week.monday)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-10",
							onClick: onNext,
							"aria-label": "Next week",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onGenerate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, {}), "Generate week"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy / archive"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "max-h-80 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Build from" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => onCopy(prevMonday),
							children: "Previous week"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Supplied rosters" }),
						ARCHIVE.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => onRestore(w.monday),
							children: w.title.replace("Roster ", "")
						}, w.monday))
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => downloadRosterExcel(week, staff),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Excel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Print"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => downloadJson(week),
					className: "hidden sm:inline-flex",
					children: "JSON"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: onReset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Clear benches"]
				})
			]
		})]
	});
}
var Popover = Root2$1;
var PopoverTrigger = Trigger$1;
function PopoverContent({ className, align = "start", sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		align,
		sideOffset,
		className: cn("z-50 w-72 origin-[var(--radix-popover-content-transform-origin)] rounded-lg border border-border bg-card p-3 text-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
function PersonChip({ assignment, staff, selected, onRemove, compact }) {
	const person = staffById(staff, assignment.staffId);
	const name = person?.rosterName ?? assignment.staffId;
	const color = person?.color ?? "#5c6560";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex max-w-full items-center gap-1 rounded-sm border px-1.5 py-0.5 text-left leading-tight", compact ? "text-[11px]" : "text-xs", selected ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : ""),
		style: {
			background: `color-mix(in oklab, ${color} 16%, white)`,
			borderColor: `color-mix(in oklab, ${color} 35%, white)`,
			color
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "truncate font-medium",
			children: [name, assignment.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-normal opacity-80",
				children: [" · ", assignment.note]
			}) : null]
		}), onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "rounded-sm p-0.5 hover:bg-black/10",
			onClick: (e) => {
				e.stopPropagation();
				onRemove();
			},
			"aria-label": `Remove ${name}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
		}) : null]
	});
}
var NOTE_PRESETS = [
	"am",
	"pm",
	"all day",
	"2pm",
	"5pm",
	"1630",
	"Animals",
	"IVF",
	"cover"
];
function CellEditor({ assignments, staff, selectedStaffId, holiday, onChange, ariaLabel }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return staff.filter((s) => s.active).filter((s) => {
			if (!q) return true;
			return s.rosterName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q) || s.initials.toLowerCase().includes(q);
		});
	}, [staff, query]);
	const grouped = {
		scientist: filtered.filter((s) => s.role === "scientist"),
		technician: filtered.filter((s) => s.role === "technician"),
		other: filtered.filter((s) => s.role !== "scientist" && s.role !== "technician")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: (v) => {
			setOpen(v);
			if (!v) {
				setQuery("");
				setNote("");
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": ariaLabel,
				className: cn("flex min-h-14 w-full flex-col items-start gap-1 rounded-sm px-1.5 py-1.5 text-left transition-colors hover:bg-muted/70", holiday ? "bg-holiday/60" : "bg-transparent", assignments.length === 0 ? "text-muted-foreground" : ""),
				children: holiday && assignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] italic",
					children: "Holiday"
				}) : assignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px]",
					children: "Add"
				}) : assignments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonChip, {
					assignment: a,
					staff,
					selected: selectedStaffId === a.staffId,
					compact: true
				}, a.staffId + (a.note ?? "")))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			className: "w-80 p-0",
			align: "start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							autoFocus: true,
							placeholder: "Search staff",
							value: query,
							onChange: (e) => setQuery(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1",
							children: NOTE_PRESETS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("rounded-full border px-2 py-0.5 text-[11px]", note === n ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"),
								onClick: () => setNote(note === n ? "" : n),
								children: n
							}, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2 h-8",
							placeholder: "Custom note (am / pm / 5pm)",
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-64 overflow-y-auto p-2",
					children: [assignments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex flex-wrap gap-1 px-1",
						children: assignments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonChip, {
							assignment: a,
							staff,
							onRemove: () => onChange(assignments.filter((x) => x !== a))
						}, a.staffId + (a.note ?? "")))
					}) : null, [
						"scientist",
						"technician",
						"other"
					].map((g) => grouped[g].length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
							children: g === "other" ? "Student / other" : g
						}), grouped[g].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted",
							onClick: () => {
								onChange([...assignments.filter((a) => a.staffId !== s.id), {
									staffId: s.id,
									note: note || void 0
								}]);
								setQuery("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [s.rosterName, s.lastName ? ` ${s.lastName}` : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: s.initials
							})]
						}, s.id))]
					}, g) : null)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between border-t border-border p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onChange([]),
						children: "Clear"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setOpen(false),
						children: "Done"
					})]
				})
			]
		})]
	});
}
function StationRow({ station, week, staff, selectedStaffId, onChange, evening }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn(evening ? "bg-eve/40" : "odd:bg-row"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
			className: "sticky left-0 z-10 w-40 border-b border-r border-border bg-inherit px-2.5 py-1.5 text-left align-top",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[12px] font-semibold leading-tight text-foreground",
				children: station.label
			}), station.sublabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-[10px] leading-snug text-muted-foreground",
				children: station.sublabel
			}) : null]
		}), DAYS.map((_, d) => {
			const holiday = week.holidays.includes(d);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "border-b border-border p-0 align-top",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellEditor, {
					assignments: week.cells[station.id]?.[d] ?? [],
					staff,
					selectedStaffId,
					holiday,
					ariaLabel: `${station.label} ${DAY_FULL[d]}`,
					onChange: (next) => onChange(station.id, d, next)
				})
			}, station.id + d);
		})]
	});
}
function RosterGrid({ week, staff, selectedStaffId, onChange, onLeave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-auto rounded-lg border border-border bg-card shadow-[0_1px_0_rgba(28,36,33,0.04)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "min-w-[860px] w-full border-collapse text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "bg-primary text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "sticky left-0 z-20 w-40 bg-primary px-2.5 py-2 text-left text-[11px] font-semibold uppercase tracking-wider",
					children: "Station"
				}), DAYS.map((d, i) => {
					const hol = holidayName(weekdayISO(week.monday, i));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						className: "min-w-[140px] px-2 py-2 text-center text-[12px] font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: DAY_FULL[i] }), hol ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-normal opacity-80",
							children: hol
						}) : null]
					}, d);
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "bg-section px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary",
					children: "Day benches · 08:30 – 17:00"
				}) }),
				DAY_STATIONS.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationRow, {
					station: st,
					week,
					staff,
					selectedStaffId,
					onChange
				}, st.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "bg-leave/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "sticky left-0 z-10 border-b border-r border-border bg-leave/40 px-2.5 py-2 text-left text-[12px] font-semibold",
						children: "Leave"
					}), DAYS.map((_, d) => {
						const people = Object.entries(week.leave).map(([id, slots]) => ({
							id,
							note: slots[d]
						})).filter((x) => x.note);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1.5 py-1.5 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [people.map((p) => {
									const s = staffById(staff, p.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "rounded-sm bg-leave px-1.5 py-0.5 text-left text-[11px] text-leave-fg",
										onClick: () => onLeave(p.id, d, null),
										title: "Click to remove leave",
										children: [s?.rosterName ?? p.id, p.note && p.note !== "Leave" ? ` – ${p.note}` : ""]
									}, p.id);
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaveAdd, {
									staff,
									day: d,
									week,
									onLeave
								})]
							})
						}, "leave" + d);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "bg-section px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary",
					children: "Evening · 14:00 – 22:00"
				}) }),
				EVENING_STATIONS.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationRow, {
					station: st,
					week,
					staff,
					selectedStaffId,
					onChange,
					evening: true
				}, st.id))
			] })]
		})
	});
}
function LeaveAdd({ staff, day, week, onLeave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		className: "h-7 w-full rounded-sm border border-dashed border-border bg-transparent text-[11px] text-muted-foreground",
		defaultValue: "",
		onChange: (e) => {
			if (e.target.value) onLeave(e.target.value, day, "Leave");
			e.target.value = "";
		},
		"aria-label": `Add leave ${DAY_FULL[day]}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: "Add leave"
		}), staff.filter((s) => s.active && s.role !== "pathologist").filter((s) => !week.leave[s.id]?.[day]).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: s.id,
			children: s.rosterName
		}, s.id))]
	});
}
function StaffList({ staff, week, selectedStaffId, onSelect, onLeave }) {
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = staff.filter((s) => {
		if (!s.active) return false;
		if (!q.trim()) return true;
		return `${s.firstName} ${s.lastName} ${s.initials} ${s.role}`.toLowerCase().includes(q.toLowerCase());
	});
	const selected = staff.find((s) => s.id === selectedStaffId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: "Staff"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Select a person to highlight them on the grid."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Find a person",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto pr-1",
				children: [
					"scientist",
					"technician",
					"student",
					"casual",
					"pathologist"
				].map((role) => {
					const group = filtered.filter((s) => s.role === role);
					if (!group.length) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
							children: role
						}), group.map((s) => {
							const leaveDays = (week.leave[s.id] ?? []).filter(Boolean).length;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelect(selectedStaffId === s.id ? null : s.id),
								className: cn("mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted", selectedStaffId === s.id ? "bg-muted" : ""),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2.5 shrink-0 rounded-full",
										style: { background: s.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1 truncate",
										children: [s.rosterName, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [" ", s.initials]
										})]
									}),
									leaveDays ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-leave-fg",
										children: [leaveDays, " leave"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase text-muted-foreground",
										children: s.fte
									})
								]
							}, s.id);
						})]
					}, role);
				})
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonWeek, {
				person: selected,
				week,
				onLeave,
				onClear: () => onSelect(null)
			}) : null
		]
	});
}
function PersonWeek({ person, week, onLeave, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-muted/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: displayName(person)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					person.role,
					" · ",
					person.fte,
					"-time"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: onClear,
				children: "Clear"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-1.5 text-xs",
			children: DAYS.map((d, i) => {
				const leave = week.leave[person.id]?.[i];
				const hits = [];
				for (const st of [...DAY_STATIONS, ...EVENING_STATIONS]) for (const a of week.cells[st.id]?.[i] ?? []) if (a.staffId === person.id) hits.push(a.note ? `${st.label} (${a.note})` : st.label);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[2rem_1fr_auto] items-start gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-muted-foreground",
							children: d
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: leave ? "text-leave-fg" : "",
							children: leave ? `Leave${leave !== "Leave" ? ` – ${leave}` : ""}` : hits.join(" · ") || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground",
							onClick: () => onLeave(person.id, i, leave ? null : "Leave"),
							children: leave ? "Work" : "Leave"
						})
					]
				}, d);
			})
		})]
	});
}
function CoverageBar({ issues }) {
	const c = issueCounts(issues);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("rounded-full px-2.5 py-1 text-xs font-medium", c.error ? "bg-red-100 text-red-800" : "bg-muted text-muted-foreground"),
				children: [c.error, " holes"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("rounded-full px-2.5 py-1 text-xs font-medium", c.warn ? "bg-amber-100 text-amber-900" : "bg-muted text-muted-foreground"),
				children: [c.warn, " warnings"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
				children: [c.info, " notes"]
			})
		]
	});
}
function CoverageList({ issues }) {
	if (!issues.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "This week has no coverage issues."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2",
		children: issues.slice(0, 40).map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-2 text-sm",
			children: [i.level === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-4 shrink-0 text-red-700" }) : i.level === "warn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-amber-700" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium",
					children: [DAYS[i.day], "."]
				}),
				" ",
				i.message
			] })]
		}, idx))
	});
}
var LOCK_PCT = .7;
function analysePatterns(weeks = ARCHIVE) {
	const map = /* @__PURE__ */ new Map();
	const totals = /* @__PURE__ */ new Map();
	for (const week of weeks) for (const station of STATIONS) {
		const row = week.cells[station.id];
		if (!row) continue;
		for (let d = 0; d < 5; d++) {
			if (week.holidays.includes(d)) continue;
			const cell = row[d] ?? [];
			if (!cell.length) continue;
			const key = `${station.id}:${d}`;
			totals.set(key, (totals.get(key) ?? 0) + 1);
			let dayMap = map.get(key);
			if (!dayMap) {
				dayMap = /* @__PURE__ */ new Map();
				map.set(key, dayMap);
			}
			for (const a of cell) dayMap.set(a.staffId, (dayMap.get(a.staffId) ?? 0) + 1);
		}
	}
	const patterns = [];
	for (const station of STATIONS) for (let d = 0; d < 5; d++) {
		const key = `${station.id}:${d}`;
		const total = totals.get(key) ?? 0;
		if (!total) continue;
		const counts = [...map.get(key)?.entries() ?? []].map(([staffId, count]) => ({
			staffId,
			count,
			pct: count / total
		})).sort((a, b) => b.count - a.count);
		const top = counts[0];
		patterns.push({
			stationId: station.id,
			day: d,
			total,
			counts,
			locked: top && top.pct >= LOCK_PCT ? {
				staffId: top.staffId,
				pct: top.pct
			} : void 0
		});
	}
	return patterns;
}
function topPatterns(limit = 24) {
	const patterns = analysePatterns();
	const out = [];
	for (const p of patterns) {
		const top = p.counts[0];
		if (!top) continue;
		out.push({
			stationId: p.stationId,
			day: p.day,
			staffId: top.staffId,
			count: top.count,
			total: p.total,
			pct: top.pct
		});
	}
	return out.sort((a, b) => b.pct - a.pct || b.count - a.count).slice(0, limit);
}
function affinityScore(patterns, stationId, day, staffId) {
	const hit = patterns.find((x) => x.stationId === stationId && x.day === day)?.counts.find((c) => c.staffId === staffId);
	return hit ? hit.pct : 0;
}
function noteAffinity(weeks = ARCHIVE, stationId, day, staffId) {
	const notes = /* @__PURE__ */ new Map();
	for (const week of weeks) {
		const cell = week.cells[stationId]?.[day] ?? [];
		for (const a of cell) if (a.staffId === staffId && a.note) notes.set(a.note, (notes.get(a.note) ?? 0) + 1);
	}
	let best;
	let n = 0;
	for (const [note, count] of notes) if (count > n) {
		n = count;
		best = note;
	}
	return best;
}
function staffName(id) {
	return STAFF.find((s) => s.id === id)?.rosterName ?? id;
}
function Insights() {
	const patterns = topPatterns(18);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-base font-semibold",
			children: "Learned from your rosters"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "Sixteen weeks (1 June – 19 September 2026). Slots above 70% consistency are treated as locked templates when generating. Loraine, Shamsia and Gordon were added from the documents (they were not on the staff list you typed)."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-1.5",
			children: patterns.map((p) => {
				const st = stationById(p.stationId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-2 rounded-md px-1 py-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								DAYS[p.day],
								" ",
								st?.label
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-medium",
							children: staffName(p.staffId)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-xs text-muted-foreground",
							children: [
								p.count,
								"/",
								p.total,
								" · ",
								Math.round(p.pct * 100),
								"%"
							]
						})
					]
				}, `${p.stationId}-${p.day}-${p.staffId}`);
			})
		})]
	});
}
var Sheet = Dialog;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-full flex-col bg-card p-5 shadow-lg sm:max-w-md", side === "right" ? "right-0 top-0 border-l border-border" : "left-0 top-0 border-r border-border", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-sm p-1 text-muted-foreground hover:bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 pr-8", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-lg font-semibold", className),
		...props
	});
}
var Tabs = Root2$2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-10 items-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$2, {
		className: cn("inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-4 focus-visible:outline-none", className),
		...props
	});
}
var SCIENTISTS = [
	"CS",
	"WG",
	"GL",
	"SM",
	"MW",
	"AW",
	"AD"
];
var PRO1_ROTATION = [
	"CS",
	"WG",
	"SM",
	"MW",
	"GL",
	"AW"
];
var EPP_POOL = [
	"VM",
	"LO",
	"SM",
	"GL",
	"RP",
	"AW",
	"KAH",
	"AL",
	"SG",
	"JD",
	"SS"
];
var READERS_1 = [
	"SPM",
	"MW",
	"AW",
	"GL",
	"TW"
];
var READERS_2 = [
	"AW",
	"TW",
	"AW",
	"AW",
	"TW"
];
var EVENING_TEMPLATE = {
	cobas_n1: [
		{ id: "GL" },
		{ id: "CS" },
		{ id: "WG" },
		{ id: "MW" },
		{ id: "SM" }
	],
	cobas_n2: [
		{ id: "RP" },
		{ id: "KAH" },
		{ id: "JD" },
		{ id: "GL" },
		{
			id: "SG",
			note: "1630"
		}
	],
	send_eve: [
		{ id: "KAH" },
		{ id: "AD" },
		{
			id: "AL",
			note: "5pm"
		},
		{ id: "AL" },
		{ id: "LO" }
	],
	pvt9: [
		{ id: "SS" },
		{ id: "DM" },
		{ id: "SH" },
		{ id: "SH" },
		{ id: "SH" }
	]
};
var EARLY_TEMPLATE = [
	"JD",
	"WG",
	"GL",
	"CS",
	"JD"
];
var PVT_ERR_TEMPLATE = [
	"RP",
	"KAH",
	"JD",
	"GL",
	"SM"
];
var PRIMARY_FILL_ORDER = [
	"pro1",
	"immuno_sci",
	"immuno_am",
	"epp",
	"pro2",
	"pro3",
	"c513",
	"alinity",
	"pvt_am",
	"pvt_err",
	"send",
	"pvt_pm"
];
function weekIndex(monday) {
	const t = Date.parse(monday + "T00:00:00");
	return Math.round((t - Date.parse("2026-06-01T00:00:00")) / 6048e5);
}
function cloneLeave(src) {
	const out = {};
	for (const [k, v] of Object.entries(src)) out[k] = [...v];
	return out;
}
function onLeave(week, id, day) {
	return Boolean(week.leave[id]?.[day]);
}
function assignedPrimary(week, id, day) {
	return STATIONS.some((s) => s.exclusive && (week.cells[s.id]?.[day] ?? []).some((a) => a.staffId === id));
}
function assignedAnywhere(week, id, day) {
	return STATIONS.some((s) => (week.cells[s.id]?.[day] ?? []).some((a) => a.staffId === id));
}
function put(week, stationId, day, a) {
	const row = week.cells[stationId] ?? (week.cells[stationId] = [
		[],
		[],
		[],
		[],
		[]
	]);
	if (!row[day].some((x) => x.staffId === a.staffId && x.note === a.note)) row[day] = [...row[day], a];
}
function pickAvailable(staff, week, day, ids, opts) {
	const byId = new Map(staff.map((s) => [s.id, s]));
	for (const id of ids) {
		const s = byId.get(id);
		if (!s || !s.active) continue;
		if (opts?.requireRole && s.role !== opts.requireRole) continue;
		if (onLeave(week, id, day)) continue;
		if (!opts?.allowAssigned && assignedPrimary(week, id, day)) continue;
		return s;
	}
}
function rankCandidates(staff, week, stationId, day, patterns, extra) {
	const station = STATIONS.find((s) => s.id === stationId);
	return staff.filter((s) => {
		if (!s.active || !s.autoAssign) return false;
		if (onLeave(week, s.id, day)) return false;
		if (s.eveningOnly) return false;
		if (s.role === "pathologist") return false;
		if (station?.requiresScientist && s.role !== "scientist") return false;
		if (stationId === "immuno_sci" && s.specialist !== "immunology" && s.id !== "MW" && s.id !== "CS") return false;
		if (assignedPrimary(week, s.id, day)) return false;
		return true;
	}).map((s) => {
		let score = affinityScore(patterns, stationId, day, s.id) * 10;
		if (extra) score += extra(s);
		if (s.morningsOnly && (stationId === "pvt_pm" || stationId === "pvt_err")) score -= 5;
		if (s.specialist === "immunology" && stationId !== "immuno_sci" && stationId !== "immuno_am" && stationId !== "epp2") score -= 4;
		return {
			s,
			score
		};
	}).sort((a, b) => b.score - a.score).map((x) => x.s);
}
function generateWeek(monday, staff, options = {}) {
	const patterns = analysePatterns(ARCHIVE);
	const idx = weekIndex(monday);
	const holidays = weekHolidays(monday);
	const week = {
		monday,
		title: weekTitle(monday),
		notes: "",
		cells: emptyCells(),
		leave: cloneLeave(options.leave ?? {}),
		holidays
	};
	for (let d = 0; d < 5; d++) {
		if (holidays.includes(d)) continue;
		for (const [stationId, people] of Object.entries(EVENING_TEMPLATE)) {
			const planned = people[d];
			let chosen = pickAvailable(staff, week, d, [planned.id], { allowAssigned: true });
			if (!chosen) chosen = pickAvailable(staff, week, d, stationId === "cobas_n1" ? SCIENTISTS : stationId === "pvt9" ? [
				"SS",
				"DM",
				"SH",
				"KAH",
				"SG",
				"JD"
			] : stationId === "send_eve" ? [
				"KAH",
				"AD",
				"AL",
				"LO",
				"SS",
				"JD"
			] : [
				"RP",
				"KAH",
				"JD",
				"SG",
				"DM",
				"LO",
				"GL"
			], {
				allowAssigned: true,
				requireRole: stationId === "cobas_n1" ? "scientist" : void 0
			});
			if (chosen) {
				const note = chosen.id === planned.id ? planned.note ?? noteAffinity(ARCHIVE, stationId, d, chosen.id) : noteAffinity(ARCHIVE, stationId, d, chosen.id);
				put(week, stationId, d, {
					staffId: chosen.id,
					note
				});
			}
		}
		const earlyPref = d === 4 ? idx % 2 === 0 ? ["JD", "AW"] : ["AW", "JD"] : [
			EARLY_TEMPLATE[d],
			"AW",
			"CS",
			"WG",
			"GL",
			"JD"
		];
		const early = pickAvailable(staff, week, d, earlyPref, { allowAssigned: true });
		if (early) put(week, "early", d, { staffId: early.id });
		const immuno = pickAvailable(staff, week, d, [
			"TW",
			"MW",
			"CS",
			"AD"
		], { allowAssigned: true }) ?? pickAvailable(staff, week, d, SCIENTISTS, { allowAssigned: true });
		if (immuno) put(week, "immuno_sci", d, {
			staffId: immuno.id,
			note: d === 4 && immuno.id === "TW" ? "all day" : void 0
		});
		const immunoAm = pickAvailable(staff, week, d, d === 0 || d === 4 ? [
			"JD",
			"SS",
			"AD"
		] : [
			"SS",
			"JD",
			"AD"
		], { allowAssigned: true });
		if (immunoAm) put(week, "immuno_am", d, { staffId: immunoAm.id });
		const r1 = READERS_1[(idx + d) % READERS_1.length];
		put(week, "epp1", d, { staffId: r1 });
		put(week, "epp2", d, { staffId: READERS_2[d] });
	}
	for (let d = 0; d < 5; d++) {
		if (holidays.includes(d)) continue;
		const start = idx % PRO1_ROTATION.length;
		const rotated = [
			...PRO1_ROTATION.slice(start),
			...PRO1_ROTATION.slice(0, start),
			"AD"
		];
		const pro1 = rankCandidates(staff, week, "pro1", d, patterns, (s) => rotated.indexOf(s.id) === 0 ? 3 : rotated.includes(s.id) ? 1 : 0)[0];
		if (pro1) {
			put(week, "pro1", d, { staffId: pro1.id });
			put(week, "val", d, { staffId: pro1.id });
			if (d === 0) {
				const greg = pickAvailable(staff, week, d, ["GL"], { allowAssigned: true });
				if (greg && greg.id !== pro1.id) put(week, "val", d, {
					staffId: greg.id,
					note: "pm"
				});
			}
		}
		const errPref = [
			PVT_ERR_TEMPLATE[d],
			"KAH",
			"JD",
			"GL",
			"RP",
			"AD",
			"SM",
			"LO"
		];
		const err = pickAvailable(staff, week, d, errPref);
		if (err) put(week, "pvt_err", d, { staffId: err.id });
		const eppStart = (idx + d) % EPP_POOL.length;
		const eppOrder = [...EPP_POOL.slice(eppStart), ...EPP_POOL.slice(0, eppStart)];
		const epp = pickAvailable(staff, week, d, eppOrder);
		if (epp) put(week, "epp", d, {
			staffId: epp.id,
			note: d === 1 ? "Animals" : void 0
		});
		for (const stationId of PRIMARY_FILL_ORDER) {
			if (stationId === "pro1" || stationId === "immuno_sci" || stationId === "immuno_am" || stationId === "epp" || stationId === "pvt_err") continue;
			const station = STATIONS.find((s) => s.id === stationId);
			if (!station) continue;
			const have = week.cells[stationId][d].length;
			const need = Math.max(station.min, have);
			const target = station.id === "c513" ? 2 : need;
			while (week.cells[stationId][d].length < target) {
				const next = rankCandidates(staff, week, stationId, d, patterns, (s) => {
					if (stationId === "c513" && (s.id === "DM" || s.id === "WG" || s.id === "RP" || s.id === "LO")) return 1.5;
					if (stationId === "alinity" && s.morningsOnly) return 2;
					if (stationId === "pvt_am" && (s.id === "AL" || s.id === "SG" || s.id === "VM" || s.id === "LO")) return 1;
					if (stationId === "send" && (s.id === "LO" || s.id === "RP" || s.id === "DM" || s.id === "KAH")) return 1;
					return 0;
				})[0];
				if (!next) break;
				const note = next.morningsOnly ? "am" : noteAffinity(ARCHIVE, stationId, d, next.id);
				put(week, stationId, d, {
					staffId: next.id,
					note
				});
			}
		}
		const leftovers = staff.filter((s) => s.active && s.autoAssign && !s.eveningOnly && s.role !== "pathologist" && s.specialist !== "immunology" && !onLeave(week, s.id, d) && !assignedAnywhere(week, s.id, d));
		for (const s of leftovers) if (s.role === "scientist") put(week, "admin", d, { staffId: s.id });
		else if (s.morningsOnly) put(week, "pvt_am", d, {
			staffId: s.id,
			note: "am"
		});
		else if ((week.cells.pvt_pm[d]?.length ?? 0) < 2) put(week, "pvt_pm", d, { staffId: s.id });
		else put(week, "pvt_am", d, { staffId: s.id });
	}
	return week;
}
function copyAssignments(from, monday, keepLeave) {
	const week = {
		monday,
		title: weekTitle(monday),
		notes: from.notes,
		cells: emptyCells(),
		leave: cloneLeave(keepLeave),
		holidays: weekHolidays(monday)
	};
	for (const station of STATIONS) for (let d = 0; d < 5; d++) {
		if (week.holidays.includes(d)) continue;
		const src = from.cells[station.id]?.[d] ?? [];
		week.cells[station.id][d] = src.filter((a) => !onLeave(week, a.staffId, d)).map((a) => ({ ...a }));
	}
	return week;
}
function blankWeek(monday) {
	return {
		monday,
		title: weekTitle(monday),
		notes: "",
		cells: emptyCells(),
		leave: {},
		holidays: weekHolidays(monday)
	};
}
function ensureWeek(weeks, monday) {
	return weeks[monday] ?? blankWeek(monday);
}
var seeded = archiveByMonday();
var latestArchive = ARCHIVE[ARCHIVE.length - 1]?.monday ?? toISODate(mondayOf(/* @__PURE__ */ new Date()));
var useRosterStore = create()(persist((set, get) => ({
	staff: STAFF.map((s) => ({ ...s })),
	weeks: seeded,
	currentMonday: latestArchive,
	selectedStaffId: null,
	setMonday: (monday) => set((state) => ({
		currentMonday: monday,
		weeks: state.weeks[monday] ? state.weeks : {
			...state.weeks,
			[monday]: blankWeek(monday)
		}
	})),
	shiftWeek: (delta) => {
		const next = shiftToMonday(get().currentMonday, delta);
		get().setMonday(next);
	},
	updateNotes: (notes) => set((state) => {
		const week = {
			...ensureWeek(state.weeks, state.currentMonday),
			notes
		};
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: week
		} };
	}),
	setCell: (stationId, day, assignments) => set((state) => {
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const row = [...prev.cells[stationId] ?? [
			[],
			[],
			[],
			[],
			[]
		]];
		row[day] = assignments;
		const week = {
			...prev,
			cells: {
				...prev.cells,
				[stationId]: row
			}
		};
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: week
		} };
	}),
	addToCell: (stationId, day, assignment) => set((state) => {
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const row = [...prev.cells[stationId] ?? [
			[],
			[],
			[],
			[],
			[]
		]];
		const cell = [...row[day] ?? []];
		if (!cell.some((a) => a.staffId === assignment.staffId && a.note === assignment.note)) cell.push(assignment);
		row[day] = cell;
		const week = {
			...prev,
			cells: {
				...prev.cells,
				[stationId]: row
			}
		};
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: week
		} };
	}),
	removeFromCell: (stationId, day, staffId) => set((state) => {
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const row = [...prev.cells[stationId] ?? [
			[],
			[],
			[],
			[],
			[]
		]];
		row[day] = (row[day] ?? []).filter((a) => a.staffId !== staffId);
		const week = {
			...prev,
			cells: {
				...prev.cells,
				[stationId]: row
			}
		};
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: week
		} };
	}),
	setLeave: (staffId, day, note) => set((state) => {
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const leave = { ...prev.leave };
		const row = [...leave[staffId] ?? [
			"",
			"",
			"",
			"",
			""
		]];
		row[day] = note ?? "";
		if (row.every((x) => !x)) delete leave[staffId];
		else leave[staffId] = row;
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: {
				...prev,
				leave
			}
		} };
	}),
	generate: () => set((state) => {
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const generated = generateWeek(state.currentMonday, state.staff, { leave: prev.leave });
		generated.notes = prev.notes;
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: generated
		} };
	}),
	copyFrom: (sourceMonday) => set((state) => {
		const src = state.weeks[sourceMonday];
		if (!src) return state;
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const copied = copyAssignments(src, state.currentMonday, prev.leave);
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: copied
		} };
	}),
	resetWeek: () => set((state) => {
		const prev = ensureWeek(state.weeks, state.currentMonday);
		const week = blankWeek(state.currentMonday);
		week.leave = { ...prev.leave };
		week.notes = prev.notes;
		return { weeks: {
			...state.weeks,
			[state.currentMonday]: week
		} };
	}),
	restoreArchive: (monday) => set((state) => {
		const archived = ARCHIVE.find((w) => w.monday === monday);
		if (!archived) return state;
		return {
			currentMonday: monday,
			weeks: {
				...state.weeks,
				[monday]: structuredClone(archived)
			}
		};
	}),
	setSelectedStaff: (id) => set({ selectedStaffId: id }),
	upsertStaff: (member) => set((state) => {
		const idx = state.staff.findIndex((s) => s.id === member.id);
		const staff = [...state.staff];
		if (idx >= 0) staff[idx] = member;
		else staff.push(member);
		return { staff };
	}),
	importWeek: (week) => set((state) => ({
		currentMonday: week.monday,
		weeks: {
			...state.weeks,
			[week.monday]: week
		}
	}))
}), {
	name: "biochem-roster-v1",
	partialize: (s) => ({
		staff: s.staff,
		weeks: s.weeks,
		currentMonday: s.currentMonday
	})
}));
function currentWeek(state) {
	return ensureWeek(state.weeks, state.currentMonday);
}
function AppShell() {
	const staff = useRosterStore((s) => s.staff);
	const week = useRosterStore((s) => currentWeek(s));
	const selectedStaffId = useRosterStore((s) => s.selectedStaffId);
	const shiftWeek = useRosterStore((s) => s.shiftWeek);
	const setCell = useRosterStore((s) => s.setCell);
	const setLeave = useRosterStore((s) => s.setLeave);
	const generate = useRosterStore((s) => s.generate);
	const resetWeek = useRosterStore((s) => s.resetWeek);
	const copyFrom = useRosterStore((s) => s.copyFrom);
	const restoreArchive = useRosterStore((s) => s.restoreArchive);
	const setSelectedStaff = useRosterStore((s) => s.setSelectedStaff);
	const updateNotes = useRosterStore((s) => s.updateNotes);
	const [staffOpen, setStaffOpen] = (0, import_react.useState)(false);
	const issues = (0, import_react.useMemo)(() => validateWeek(week, staff), [week, staff]);
	const isArchive = ARCHIVE.some((w) => w.monday === week.monday);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				richColors: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border bg-card/80 print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold leading-none",
							children: "Biochem Roster"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "cobas Pro · c513 · Alinity · EPP"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "lg:hidden",
						onClick: () => setStaffOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), "Staff"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-[1400px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
							week,
							staff,
							onPrev: () => shiftWeek(-1),
							onNext: () => shiftWeek(1),
							onGenerate: () => {
								generate();
								toast.success("Week generated from the 16-week pattern set. Tweak any cell.");
							},
							onReset: () => {
								resetWeek();
								toast("Benches cleared. Leave kept.");
							},
							onCopy: (m) => {
								copyFrom(m);
								toast.success("Copied previous week, skipping anyone on leave.");
							},
							onRestore: (m) => {
								restoreArchive(m);
								toast.success("Loaded a supplied roster.");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center justify-between gap-3 print:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageBar, { issues }), isArchive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Loaded from a supplied June–September 2026 roster."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Working week — generate, copy, or fill cell by cell."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RosterGrid, {
								week,
								staff,
								selectedStaffId,
								onChange: setCell,
								onLeave: setLeave
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block print:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: "Week notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: week.notes,
								onChange: (e) => updateNotes(e.target.value),
								rows: 2,
								placeholder: "Tea room duty, stocktake, IANZ, lunch and learn…",
								className: "w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden print:hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky top-4 rounded-xl border border-border bg-card p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							defaultValue: "staff",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "w-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "staff",
											className: "flex-1",
											children: "Staff"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "check",
											className: "flex-1",
											children: "Check"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "rules",
											className: "flex-1",
											children: "Patterns"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "staff",
									className: "h-[calc(100svh-11rem)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffList, {
										staff,
										week,
										selectedStaffId,
										onSelect: setSelectedStaff,
										onLeave: setLeave
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "check",
									className: "max-h-[calc(100svh-11rem)] overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageList, { issues })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "rules",
									className: "max-h-[calc(100svh-11rem)] overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insights, {})
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: staffOpen,
				onOpenChange: setStaffOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), " People"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "staff",
					className: "min-h-0 flex-1 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "staff",
									className: "flex-1",
									children: "Staff"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "check",
									className: "flex-1",
									children: "Check"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "rules",
									className: "flex-1",
									children: "Patterns"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "staff",
							className: "h-[calc(100svh-8rem)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffList, {
								staff,
								week,
								selectedStaffId,
								onSelect: setSelectedStaff,
								onLeave: setLeave
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "check",
							className: "overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageList, { issues })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "rules",
							className: "overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insights, {})
						})
					]
				})] })
			})
		]
	});
}
function Home() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-svh items-center justify-center bg-background text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg",
			children: "Loading roster…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
