import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as createServerFn, b as createSsrRpc, u as useServerFn } from "./vendor-tanstack-DybHzttP.js";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Loader2, Eye, Copy, EyeOff } from "lucide-react";
import { B as Button } from "./router-jfBiQfL2.js";
import { r as requireSupabaseAuth } from "./auth-middleware-DaGcjHsT.js";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/react-router";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
const revealServiceRoleKey = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("6b8b13552f92f4dab0a3aa867767d63090686451d557e4588ee383e6e36ca0ff"));
function RevealKeyPage() {
  const reveal = useServerFn(revealServiceRoleKey);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const [error, setError] = useState(null);
  const handleReveal = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await reveal();
      if (!res.SUPABASE_SERVICE_ROLE_KEY) {
        setError("SUPABASE_SERVICE_ROLE_KEY не задан в окружении сервера Lovable Cloud");
      }
      setData(res);
      setShown(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  const copy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} скопирован`);
    } catch {
      toast.error("Не удалось скопировать");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/40 bg-destructive/5 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "mt-0.5 shrink-0 text-destructive", size: 20 }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-destructive", children: "Временная страница — удалите после копирования" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-muted-foreground", children: [
          "Эта страница возвращает ",
          /* @__PURE__ */ jsx("code", { children: "SUPABASE_SERVICE_ROLE_KEY" }),
          " — ключ сервиса, обходящий RLS. Скопируйте значение, вставьте в ",
          /* @__PURE__ */ jsx("code", { children: ".env" }),
          " ",
          "на VPS, после чего попросите ассистента удалить файлы",
          " ",
          /* @__PURE__ */ jsx("code", { children: "src/routes/_authenticated/admin.reveal-key.tsx" }),
          " и",
          " ",
          /* @__PURE__ */ jsx("code", { children: "src/lib/reveal-key.functions.ts" }),
          "."
        ] })
      ] })
    ] }) }),
    !shown && /* @__PURE__ */ jsx(Button, { onClick: handleReveal, disabled: loading, children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Loader2, { className: "mr-2 animate-spin", size: 16 }),
      "Загрузка…"
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Eye, { className: "mr-2", size: 16 }),
      "Показать ключ"
    ] }) }),
    error && /* @__PURE__ */ jsx("div", { className: "rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive", children: error }),
    shown && data && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(KeyRow, { label: "SUPABASE_URL", value: data.SUPABASE_URL, onCopy: () => copy(data.SUPABASE_URL, "SUPABASE_URL") }),
      /* @__PURE__ */ jsx(KeyRow, { label: "SUPABASE_PUBLISHABLE_KEY", value: data.SUPABASE_PUBLISHABLE_KEY, onCopy: () => copy(data.SUPABASE_PUBLISHABLE_KEY, "SUPABASE_PUBLISHABLE_KEY"), secret: true }),
      /* @__PURE__ */ jsx(KeyRow, { label: "SUPABASE_SERVICE_ROLE_KEY ⚠️", value: data.SUPABASE_SERVICE_ROLE_KEY, onCopy: () => copy(data.SUPABASE_SERVICE_ROLE_KEY, "SUPABASE_SERVICE_ROLE_KEY"), secret: true, danger: true }),
      /* @__PURE__ */ jsxs("details", { className: "rounded-md border border-border bg-surface/40 p-3 text-sm", children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer font-medium", children: "Готовый блок для .env на VPS" }),
        /* @__PURE__ */ jsx("pre", { className: "mt-3 overflow-auto rounded bg-background p-3 text-xs", children: `NODE_ENV=production
SUPABASE_URL=${data.SUPABASE_URL}
SUPABASE_PUBLISHABLE_KEY=${data.SUPABASE_PUBLISHABLE_KEY}
SUPABASE_SERVICE_ROLE_KEY=${data.SUPABASE_SERVICE_ROLE_KEY}` }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "mt-2", onClick: () => copy(`NODE_ENV=production
SUPABASE_URL=${data.SUPABASE_URL}
SUPABASE_PUBLISHABLE_KEY=${data.SUPABASE_PUBLISHABLE_KEY}
SUPABASE_SERVICE_ROLE_KEY=${data.SUPABASE_SERVICE_ROLE_KEY}`, "Блок .env"), children: [
          /* @__PURE__ */ jsx(Copy, { className: "mr-2", size: 14 }),
          "Скопировать весь блок"
        ] })
      ] })
    ] })
  ] });
}
function KeyRow({
  label,
  value,
  onCopy,
  secret = false,
  danger = false
}) {
  const [visible, setVisible] = useState(!secret);
  const display = visible ? value : "•".repeat(Math.min(value.length, 48));
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl border p-4 ${danger ? "border-destructive/40 bg-destructive/5" : "border-border bg-surface/40"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-sm font-semibold", children: label }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        secret && /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => setVisible((v) => !v), "aria-label": visible ? "Скрыть" : "Показать", children: visible ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 }) }),
        /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: onCopy, "aria-label": "Скопировать", children: /* @__PURE__ */ jsx(Copy, { size: 16 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("pre", { className: "mt-2 overflow-x-auto break-all whitespace-pre-wrap rounded bg-background p-2 text-xs", children: display || "(пусто)" })
  ] });
}
export {
  RevealKeyPage as component
};
