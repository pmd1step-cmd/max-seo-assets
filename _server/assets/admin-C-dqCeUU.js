import { jsxs, jsx } from "react/jsx-runtime";
import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, Loader2 } from "lucide-react";
import { G as moderationCountsQuery } from "./router-CtIgQZLw.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-KeVK-0js.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-_9RNU9F4.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
const TABS = [{
  to: "/admin/moderation",
  label: "Модерация",
  key: "moderation"
}, {
  to: "/admin/specialists",
  label: "Специалисты",
  key: void 0
}, {
  to: "/admin/cases",
  label: "Кейсы",
  key: void 0
}, {
  to: "/admin/services",
  label: "Услуги",
  key: void 0
}, {
  to: "/admin/reviews",
  label: "Отзывы",
  key: "reviews"
}, {
  to: "/admin/applications",
  label: "Заявки",
  key: void 0
}, {
  to: "/admin/categories",
  label: "Категории",
  key: void 0
}, {
  to: "/admin/blog",
  label: "Блог",
  key: void 0
}, {
  to: "/admin/users",
  label: "Пользователи",
  key: void 0
}, {
  to: "/admin/sitemap",
  label: "Sitemap",
  key: void 0
}, {
  to: "/admin/seo",
  label: "SEO",
  key: void 0
}, {
  to: "/admin/counters",
  label: "Счётчики",
  key: void 0
}];
function AdminLayout() {
  const {
    data: counts
  } = useQuery(moderationCountsQuery());
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-glow", children: /* @__PURE__ */ jsx(Shield, { className: "text-primary-foreground", size: 20 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-extrabold md:text-4xl", children: [
          "Админ-",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "панель" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Модерация контента и управление каталогом." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "mt-6 flex flex-wrap gap-1 rounded-xl border border-border bg-surface/40 p-1", children: TABS.map((t) => {
      const badge = t.key === "moderation" ? (counts?.specialists ?? 0) + (counts?.cases ?? 0) + (counts?.blog_posts ?? 0) : t.key === "reviews" ? counts?.reviews ?? 0 : 0;
      return /* @__PURE__ */ jsxs(Link, { to: t.to, className: "relative rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground", activeProps: {
        className: "bg-primary/15 text-primary hover:bg-primary/15 hover:text-primary"
      }, children: [
        t.label,
        badge > 0 && /* @__PURE__ */ jsx("span", { className: "ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground", children: badge })
      ] }, t.to);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) }), children: /* @__PURE__ */ jsx(Outlet, {}) }) })
  ] });
}
export {
  AdminLayout as component
};
