import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { queryOptions, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, CheckCircle2, RotateCcw, AlertTriangle, SlidersHorizontal, RefreshCw, Map as Map$1, ExternalLink, Search, Eye, EyeOff, Loader2 } from "lucide-react";
import { m as cn, ae as createSsrRpc, s as supabase, B as Button, ax as Skeleton } from "./router-BmDCopUW.js";
import { I as Input } from "./input-DFgs8oOo.js";
import { B as Badge } from "./badge-DYyO77sU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CtXvmj0N.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D18c9XY3.js";
import { S as Switch } from "./switch-O3dFI6xO.js";
import { h as createServerFn } from "../server.js";
import { L as Label } from "./label-EAeAQu-r.js";
import { T as Textarea } from "./textarea-CAj1CRwA.js";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BCsfjYJO.js";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-DTsMGolV.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-select";
import "@radix-ui/react-tabs";
import "@radix-ui/react-switch";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "@radix-ui/react-label";
import "@radix-ui/react-alert-dialog";
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const getSitemapEntries = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7495b1e944a8a8a5cfe07e758520e82259347f5359e8f427606cf7c03d98d792"));
const sitemapSettingsQuery = () => queryOptions({
  queryKey: ["admin", "sitemap-settings"],
  queryFn: async () => {
    const { data, error } = await supabase.from("sitemap_settings").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 30 * 1e3
});
const liveSitemapQuery = () => queryOptions({
  queryKey: ["admin", "live-sitemap"],
  queryFn: async () => {
    const entries = await getSitemapEntries();
    return entries;
  },
  staleTime: 10 * 1e3
});
function detectKind(path) {
  if (path.startsWith("/specialists/") && path.length > "/specialists/".length) return "category";
  if (path.startsWith("/uslugi/")) return "static";
  if (path.startsWith("/specialist/")) return "specialist";
  if (path.startsWith("/cases/") && path.length > "/cases/".length) return "case";
  if (path.startsWith("/blog/") && path.length > "/blog/".length) return "blog";
  const staticPaths = /* @__PURE__ */ new Set([
    "/",
    "/specialists",
    "/blog",
    "/cases",
    "/max-dlya-biznesa"
  ]);
  if (staticPaths.has(path)) return "static";
  return "manual";
}
const KIND_LABELS = {
  static: "Статическая",
  category: "Категория",
  specialist: "Специалист",
  case: "Кейс",
  blog: "Статья",
  manual: "Ручная"
};
async function upsertSitemapSetting(input) {
  const { error } = await supabase.from("sitemap_settings").upsert(input, { onConflict: "url" });
  if (error) throw error;
}
async function clearAllExclusions() {
  const { error } = await supabase.from("sitemap_settings").update({ is_excluded: false }).eq("is_excluded", true);
  if (error) throw error;
}
async function clearAllOverrides() {
  const { error } = await supabase.from("sitemap_settings").update({ priority: null, changefreq: null }).eq("is_manual", false);
  if (error) throw error;
}
const PRIORITIES = ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"];
const FREQS = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
function validatePath(p) {
  if (!p.startsWith("/")) return "Путь должен начинаться с /";
  if (/\s/.test(p)) return "Путь не должен содержать пробелы";
  if (/^https?:/i.test(p)) return "Укажите путь, а не полный URL";
  return null;
}
function AdminSitemapManual() {
  const queryClient = useQueryClient();
  const settingsQ = useQuery(sitemapSettingsQuery());
  const [path, setPath] = useState("/");
  const [priority, setPriority] = useState("0.5");
  const [changefreq, setChangefreq] = useState("monthly");
  const [note, setNote] = useState("");
  const addMut = useMutation({
    mutationFn: async () => {
      const err = validatePath(path);
      if (err) throw new Error(err);
      await upsertSitemapSetting({
        url: path,
        is_manual: true,
        is_excluded: false,
        priority,
        changefreq,
        note: note.trim() || null
      });
    },
    onSuccess: () => {
      toast.success("URL добавлен в sitemap");
      setPath("/");
      setNote("");
      queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const restoreMut = useMutation({
    mutationFn: async (url) => {
      await upsertSitemapSetting({ url, is_excluded: false });
    },
    onSuccess: () => {
      toast.success("URL восстановлен");
      queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const excluded = (settingsQ.data ?? []).filter((s) => s.is_excluded);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Ручное управление URL" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "add", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "add", children: "Добавить URL" }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "excluded", children: [
          "Исключённые URL (",
          excluded.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "add", className: "mt-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "sm-path", children: "Путь страницы" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "sm-path",
                placeholder: "/my-custom-page",
                value: path,
                onChange: (e) => setPath(e.target.value),
                className: "mt-1"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Путь без домена, начинается с «/»." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Priority" }),
            /* @__PURE__ */ jsxs(Select, { value: priority, onValueChange: setPriority, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: PRIORITIES.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Changefreq" }),
            /* @__PURE__ */ jsxs(Select, { value: changefreq, onValueChange: setChangefreq, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: FREQS.map((f) => /* @__PURE__ */ jsx(SelectItem, { value: f, children: f }, f)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "sm-note", children: "Заметка для администратора" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "sm-note",
                placeholder: "Опционально",
                value: note,
                onChange: (e) => setNote(e.target.value),
                className: "mt-1",
                rows: 2
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => addMut.mutate(), disabled: addMut.isPending, children: [
          /* @__PURE__ */ jsx(Plus, { size: 14 }),
          " Добавить в карту"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "excluded", className: "mt-4", children: excluded.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 py-10 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 36, className: "text-primary" }),
        /* @__PURE__ */ jsx("p", { children: "Нет исключённых URL" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "URL" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Заметка" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Дата исключения" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Действие" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: excluded.map((s) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: s.url,
              target: "_blank",
              rel: "noreferrer",
              className: "break-all text-sm text-primary hover:underline",
              children: s.url
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-sm text-muted-foreground", children: s.note ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-sm text-muted-foreground", children: s.updated_at?.split("T")[0] ?? "—" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => restoreMut.mutate(s.url),
              children: [
                /* @__PURE__ */ jsx(RotateCcw, { size: 14 }),
                " Восстановить"
              ]
            }
          ) })
        ] }, s.id)) })
      ] }) }) })
    ] }) })
  ] });
}
function AdminSitemapDanger() {
  const queryClient = useQueryClient();
  const [confirm, setConfirm] = useState(null);
  const clearExclMut = useMutation({
    mutationFn: clearAllExclusions,
    onSuccess: () => {
      toast.success("Все исключения сброшены");
      queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const clearOverMut = useMutation({
    mutationFn: clearAllOverrides,
    onSuccess: () => {
      toast.success("Все переопределения сброшены");
      queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const refreshCacheMut = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/sitemap.xml?_=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Не удалось обновить sitemap");
    },
    onSuccess: () => {
      toast.success("Готово — кэш sitemap обновлён");
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const onConfirm = () => {
    if (confirm === "exclusions") clearExclMut.mutate();
    if (confirm === "overrides") clearOverMut.mutate();
    setConfirm(null);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Card, { className: "border-destructive/40", children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-destructive", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { size: 18 }),
        " Служебные действия"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(
          ActionRow,
          {
            icon: /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
            title: "Сбросить все исключения",
            description: "Все вручную исключённые URL вернутся в карту сайта.",
            onClick: () => setConfirm("exclusions")
          }
        ),
        /* @__PURE__ */ jsx(
          ActionRow,
          {
            icon: /* @__PURE__ */ jsx(SlidersHorizontal, { size: 16 }),
            title: "Сбросить все приоритеты",
            description: "Удалит ручные значения priority/changefreq для авто-URL. Ручные URL не затрагиваются.",
            onClick: () => setConfirm("overrides")
          }
        ),
        /* @__PURE__ */ jsx(
          ActionRow,
          {
            icon: /* @__PURE__ */ jsx(RefreshCw, { size: 16 }),
            title: "Принудительно обновить кэш",
            description: "Перегенерирует sitemap.xml без ожидания истечения кэша.",
            onClick: () => refreshCacheMut.mutate(),
            variant: "default"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(AlertDialog, { open: confirm !== null, onOpenChange: (o) => !o && setConfirm(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Подтвердите действие" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: confirm === "exclusions" ? "Все вручную исключённые URL станут видимыми в sitemap. Это действие нельзя отменить." : "Все ручные значения priority и changefreq будут удалены — авто-URL вернутся к значениям по умолчанию." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: onConfirm,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Подтвердить"
          }
        )
      ] })
    ] }) })
  ] });
}
function ActionRow({
  icon,
  title,
  description,
  onClick,
  variant = "destructive"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-medium", children: [
        icon,
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx(Button, { size: "sm", variant, onClick, children: "Выполнить" })
  ] });
}
const PRIORITY_OPTIONS = ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3"];
const CHANGEFREQ_OPTIONS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never"
];
const KIND_FILTERS = [
  { value: "all", label: "Все типы" },
  { value: "static", label: "Статические" },
  { value: "specialist", label: "Специалисты" },
  { value: "category", label: "Категории" },
  { value: "case", label: "Кейсы" },
  { value: "blog", label: "Статьи" },
  { value: "manual", label: "Ручные" }
];
const PAGE_SIZE = 50;
function AdminSitemapTab() {
  const queryClient = useQueryClient();
  const liveQ = useQuery(liveSitemapQuery());
  const settingsQ = useQuery(sitemapSettingsQuery());
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState("all");
  const [onlyExcluded, setOnlyExcluded] = useState(false);
  const [page, setPage] = useState(1);
  const settingsByUrl = useMemo(() => {
    const list = settingsQ.data ?? [];
    const m = /* @__PURE__ */ new Map();
    list.forEach((s) => m.set(s.url, s));
    return m;
  }, [settingsQ.data]);
  const combinedRows = useMemo(() => {
    const live = liveQ.data ?? [];
    const rows = live.map((e) => ({
      ...e,
      isExcluded: false,
      kind: detectKind(e.path)
    }));
    (settingsQ.data ?? []).filter((s) => s.is_excluded).forEach((s) => {
      if (rows.find((r) => r.path === s.url)) return;
      rows.push({
        loc: `https://maxexperts.ru${s.url}`,
        path: s.url,
        lastmod: s.updated_at?.split("T")[0] ?? "",
        changefreq: s.changefreq ?? "—",
        priority: s.priority ?? "—",
        isExcluded: true,
        kind: detectKind(s.url)
      });
    });
    return rows;
  }, [liveQ.data, settingsQ.data]);
  const filteredRows = useMemo(() => {
    return combinedRows.filter((r) => {
      if (kindFilter !== "all" && r.kind !== kindFilter) return false;
      if (onlyExcluded && !r.isExcluded) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!r.path.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [combinedRows, kindFilter, onlyExcluded, search]);
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filteredRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalUrls = liveQ.data?.length ?? 0;
  const excludedCount = (settingsQ.data ?? []).filter((s) => s.is_excluded).length;
  const lastUpdated = useMemo(() => {
    const live = liveQ.data ?? [];
    if (!live.length) return "—";
    const dates = live.map((e) => e.lastmod).filter(Boolean).sort().reverse();
    return dates[0] ?? "—";
  }, [liveQ.data]);
  const toggleExcludeMut = useMutation({
    mutationFn: async ({ url, exclude }) => {
      await upsertSitemapSetting({ url, is_excluded: exclude });
    },
    onSuccess: (_d, vars) => {
      toast.success(vars.exclude ? "URL исключён" : "URL восстановлен");
      queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const overrideMut = useMutation({
    mutationFn: async (input) => {
      await upsertSitemapSetting(input);
    },
    onSuccess: () => {
      toast.success("Сохранено");
      queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "live-sitemap"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
  };
  const isLoading = liveQ.isLoading || settingsQ.isLoading;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-glow", children: /* @__PURE__ */ jsx(Map$1, { className: "text-primary-foreground", size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Управление Sitemap" }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Карта сайта обновляется автоматически при публикации контента." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: refreshAll, children: [
          /* @__PURE__ */ jsx(RefreshCw, { size: 14 }),
          " Обновить"
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxs("a", { href: "/sitemap.xml", target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsx(ExternalLink, { size: 14 }),
          " Открыть sitemap.xml"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Всего URL в карте", value: totalUrls, loading: isLoading }),
      /* @__PURE__ */ jsx(StatCard, { label: "Исключено вручную", value: excludedCount, loading: isLoading }),
      /* @__PURE__ */ jsx(StatCard, { label: "Последнее обновление", value: lastUpdated, loading: isLoading })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Текущая карта сайта" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(
              Search,
              {
                size: 14,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Поиск по URL...",
                value: search,
                onChange: (e) => {
                  setSearch(e.target.value);
                  setPage(1);
                },
                className: "pl-9"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: kindFilter,
              onValueChange: (v) => {
                setKindFilter(v);
                setPage(1);
              },
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "md:w-48", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: KIND_FILTERS.map((f) => /* @__PURE__ */ jsx(SelectItem, { value: f.value, children: f.label }, f.value)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: onlyExcluded,
                onCheckedChange: (v) => {
                  setOnlyExcluded(v);
                  setPage(1);
                }
              }
            ),
            "Только исключённые"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-border", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { className: "min-w-[280px]", children: "URL" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Тип" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Lastmod" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-28", children: "Priority" }),
            /* @__PURE__ */ jsx(TableHead, { className: "w-32", children: "Changefreq" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Статус" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Действия" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: isLoading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(TableRow, { children: Array.from({ length: 7 }).map((_2, j) => /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }) }, j)) }, i)) : paginated.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 7, className: "py-10 text-center text-muted-foreground", children: "Нет URL по заданным фильтрам." }) }) : paginated.map((row) => {
            const setting = settingsByUrl.get(row.path);
            const effectivePriority = setting?.priority ?? row.priority;
            const effectiveChangefreq = setting?.changefreq ?? row.changefreq;
            return /* @__PURE__ */ jsxs(
              TableRow,
              {
                className: row.isExcluded ? "opacity-50 hover:bg-primary/5" : "hover:bg-primary/5",
                children: [
                  /* @__PURE__ */ jsx(TableCell, { className: "max-w-md", children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: row.path,
                      target: "_blank",
                      rel: "noreferrer",
                      className: `break-all text-sm ${row.isExcluded ? "line-through" : "text-primary hover:underline"}`,
                      children: row.path
                    }
                  ) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: KIND_LABELS[row.kind] }) }),
                  /* @__PURE__ */ jsx(TableCell, { className: "text-sm text-muted-foreground", children: row.lastmod || "—" }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: effectivePriority,
                      onValueChange: (v) => overrideMut.mutate({ url: row.path, priority: v }),
                      disabled: row.isExcluded,
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsx(SelectContent, { children: PRIORITY_OPTIONS.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: effectiveChangefreq,
                      onValueChange: (v) => overrideMut.mutate({ url: row.path, changefreq: v }),
                      disabled: row.isExcluded,
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsx(SelectContent, { children: CHANGEFREQ_OPTIONS.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c)) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(TableCell, { children: row.isExcluded ? /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-destructive", children: "Исключена" }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-primary", children: "Включена" }) }),
                  /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: row.isExcluded ? /* @__PURE__ */ jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => toggleExcludeMut.mutate({ url: row.path, exclude: false }),
                      children: [
                        /* @__PURE__ */ jsx(Eye, { size: 14 }),
                        " Восстановить"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "destructive",
                      onClick: () => toggleExcludeMut.mutate({ url: row.path, exclude: true }),
                      children: [
                        /* @__PURE__ */ jsx(EyeOff, { size: 14 }),
                        " Исключить"
                      ]
                    }
                  ) })
                ]
              },
              row.path
            );
          }) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "Страница ",
            currentPage,
            " из ",
            totalPages,
            " (",
            filteredRows.length,
            " URL)"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                disabled: currentPage <= 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                children: "Назад"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                disabled: currentPage >= totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                children: "Вперёд"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AdminSitemapManual, {}),
    /* @__PURE__ */ jsx(AdminSitemapDanger, {})
  ] });
}
function StatCard({
  label,
  value,
  loading
}) {
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "mt-1 text-2xl font-bold", children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 20 }) : value })
  ] }) });
}
const SplitComponent = AdminSitemapTab;
export {
  SplitComponent as component
};
