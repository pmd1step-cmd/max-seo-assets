import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Reveal } from "./reveal-BqE8YALL.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Target, TrendingUp, Repeat, Zap, Sparkles, ArrowRight, MessageCircle, Search, Sprout, Filter, Send, Megaphone, MapPin, Briefcase, GraduationCap, ShoppingBag, Users } from "lucide-react";
import { a as servicesQuery, c as categoriesQuery, u as useLeadRequest, B as Button } from "./router-B__nZi39.js";
import { B as Breadcrumbs } from "./Breadcrumbs-D7KxP-Lw.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-BmXFLdnG.js";
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
import "./sitemap.server-BVrO7XJx.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
const SERVICE_ICONS = {
  Megaphone,
  Send,
  Filter,
  Sprout,
  Search,
  Sparkles
};
const NICHE_ICONS = {
  ShoppingBag,
  GraduationCap,
  Briefcase,
  MapPin
};
const TASK_TILES = [{
  icon: Target,
  title: "Привлечение клиентов",
  text: "Таргет и реклама на новую аудиторию",
  serviceSlug: "nastrojka-reklamy"
}, {
  icon: TrendingUp,
  title: "Рост продаж",
  text: "Воронки и автоматизация для повторных продаж",
  serviceSlug: "voronki"
}, {
  icon: Repeat,
  title: "Прогрев аудитории",
  text: "Рассылки и контент, возвращающие клиента",
  serviceSlug: "rassylki"
}, {
  icon: Zap,
  title: "Автоматизация",
  text: "Чат-боты, посевы и сценарии без ручной работы",
  serviceSlug: "posevy"
}];
const WHY_MAX = [{
  icon: TrendingUp,
  title: "Высокая открываемость",
  text: "В 5 раз выше, чем email"
}, {
  icon: Zap,
  title: "Быстрый запуск",
  text: "Первые заявки за 1–2 недели"
}, {
  icon: MessageCircle,
  title: "Прямой контакт с клиентом",
  text: "Диалог в мессенджере, без посредников"
}];
function MaxForBusinessHub() {
  const {
    data: services
  } = useSuspenseQuery(servicesQuery());
  const {
    data: categories
  } = useSuspenseQuery(categoriesQuery());
  const {
    open
  } = useLeadRequest();
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const taskTiles = TASK_TILES.filter((t) => serviceSlugs.has(t.serviceSlug));
  const niches = categories.filter((c) => c.type === "niche").slice(0, 4);
  const scrollToServices = () => {
    const el = document.getElementById("services");
    el?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "orb-1 absolute -top-32 left-[10%] h-96 w-96 rounded-full bg-primary/30 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "orb-2 absolute top-20 right-[5%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[1100px] px-4 pt-6 md:px-8", children: /* @__PURE__ */ jsx(Breadcrumbs, { items: [{
      label: "Услуги для бизнеса"
    }] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1100px] px-4 pt-16 pb-12 md:px-8 md:pt-24 md:pb-16", children: /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary", children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 14 }),
        "Услуги для бизнеса"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl", children: [
        "Выберите услугу для продвижения в ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "МАКС" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Подберём решение под вашу задачу: реклама, рассылки, воронки, посевы и другие инструменты." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", onClick: scrollToServices, children: "Выбрать услугу" }),
        /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gradient-bg shadow-glow hover:scale-105", onClick: () => open("hub:hero"), children: [
          "Получить решение ",
          /* @__PURE__ */ jsx(ArrowRight, {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "services", className: "mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16 scroll-mt-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Услуги" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Выберите направление — на странице услуги расскажем, что входит и кому подойдёт" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: services.map((service, i) => /* @__PURE__ */ jsx(ServiceCard, { service, index: i }, service.id)) })
    ] }),
    taskTiles.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Выбор по задаче" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Скажите, какая задача — подскажем, с какой услуги начать" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: taskTiles.map((tile, i) => /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(Link, { to: "/uslugi/$serviceSlug", params: {
        serviceSlug: tile.serviceSlug
      }, className: "glass group flex h-full flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-elevated", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl gradient-bg shadow-glow", children: /* @__PURE__ */ jsx(tile.icon, { className: "text-primary-foreground", size: 22 }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-bold", children: tile.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 flex-1 text-sm text-muted-foreground", children: tile.text }),
        /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary", children: [
          "Перейти ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
        ] })
      ] }) }, tile.title)) })
    ] }),
    niches.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "По нишам бизнеса" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Подборки исполнителей, которые работают с вашей нишей" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: niches.map((niche, i) => /* @__PURE__ */ jsx(NicheCard, { niche, index: i }, niche.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16", children: /* @__PURE__ */ jsx("div", { className: "glass grid gap-6 rounded-3xl p-8 md:grid-cols-3 md:p-10", children: WHY_MAX.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-bg shadow-glow", children: /* @__PURE__ */ jsx(item.icon, { className: "text-primary-foreground", size: 20 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: item.text })
      ] })
    ] }, item.title)) }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1280px] px-4 pb-20 md:px-8", children: /* @__PURE__ */ jsxs(Reveal, { className: "glass-strong relative overflow-hidden rounded-3xl p-10 text-center md:p-14", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 -z-10 gradient-mesh opacity-50" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold md:text-4xl", children: "Не знаете, какую услугу выбрать?" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Оставьте заявку — подберем решение под вашу задачу." }),
      /* @__PURE__ */ jsxs(Button, { size: "lg", className: "mt-7 gradient-bg shadow-glow hover:scale-105", onClick: () => open("hub:final"), children: [
        "Получить решение ",
        /* @__PURE__ */ jsx(ArrowRight, {})
      ] })
    ] }) })
  ] });
}
function ServiceCard({
  service,
  index
}) {
  const Icon = SERVICE_ICONS[service.icon ?? ""] ?? Sparkles;
  return /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(Link, { to: "/uslugi/$serviceSlug", params: {
    serviceSlug: service.slug
  }, className: "glass group flex h-full flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-elevated", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl gradient-bg shadow-glow", children: /* @__PURE__ */ jsx(Icon, { className: "text-primary-foreground", size: 22 }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-bold", children: service.name }),
    service.short_description && /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-1 text-sm text-muted-foreground", children: service.short_description }),
    /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary", children: [
      "Подробнее ",
      /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
    ] })
  ] }) });
}
function NicheCard({
  niche,
  index
}) {
  const Icon = niche.icon && NICHE_ICONS[niche.icon] || Users;
  return /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(Link, { to: "/specialists/$categorySlug", params: {
    categorySlug: niche.slug
  }, className: "glass group flex h-full flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-elevated", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsx(Icon, { size: 22 }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-5 text-lg font-bold", children: niche.name }),
    niche.description && /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: niche.description }),
    /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary", children: [
      "Смотреть исполнителей ",
      /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
    ] })
  ] }) });
}
export {
  MaxForBusinessHub as component
};
