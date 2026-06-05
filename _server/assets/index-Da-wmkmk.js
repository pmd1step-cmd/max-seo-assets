import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Reveal } from "./reveal-Cf68GMTy.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Sparkles, ArrowRight, Send, Search, MessageSquare, Rocket, MapPin, Briefcase, GraduationCap, ShoppingBag, Filter, Sprout, TrendingUp, Megaphone } from "lucide-react";
import { c as categoriesQuery, d as categoryCountsQuery, f as featuredSpecialistsQuery, a as servicesQuery, u as useLeadRequest, B as Button } from "./router-BwrB5FOf.js";
import { S as SpecialistCard } from "./SpecialistCard-CRiaJ1kG.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-OEr_ZaGS.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-C41cjU9Y.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "./format-BSlnw0iM.js";
const maxLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20viewBox='0%200%201000%201000'%3e%3cdefs%3e%3clinearGradient%20id='b'%3e%3cstop%20offset='0'%20stop-color='%2300f'/%3e%3cstop%20offset='1'%20stop-opacity='0'/%3e%3cstop%20offset='1'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='a'%3e%3cstop%20offset='0'%20stop-color='%234cf'/%3e%3cstop%20offset='.662'%20stop-color='%2353e'/%3e%3cstop%20offset='1'%20stop-color='%2393d'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='117.847'%20x2='1000'%20y1='760.536'%20y2='500'%20gradientUnits='userSpaceOnUse'%20href='%23a'/%3e%3cradialGradient%20id='d'%20cx='-87.392'%20cy='1166.116'%20r='500'%20fx='-87.392'%20fy='1166.116'%20gradientTransform='rotate(51.356%201551.478%20559.3)scale(2.42703433%201)'%20gradientUnits='userSpaceOnUse'%20href='%23b'/%3e%3c/defs%3e%3crect%20width='1000'%20height='1000'%20fill='url(%23c)'%20ry='249.681'/%3e%3crect%20width='1000'%20height='1000'%20fill='url(%23d)'%20ry='249.681'/%3e%3cpath%20fill='%23fff'%20fill-rule='evenodd'%20d='M508.211%20878.328c-75.007%200-109.864-10.95-170.453-54.75-38.325%2049.275-159.686%2087.783-164.979%2021.9%200-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508%200-216.626%20177.754-379.597%20388.357-379.597%20210.785%200%20375.947%20171.001%20375.947%20381.604.707%20207.346-166.595%20376.118-373.94%20377.224m3.103-571.585c-102.564-5.292-182.499%2065.7-200.201%20177.024-14.6%2092.162%2011.315%20204.398%2033.397%20210.238%2010.585%202.555%2037.23-18.98%2053.837-35.587a189.8%20189.8%200%200%200%2092.71%2033.032c106.273%205.112%20197.08-75.794%20204.215-181.95%204.154-106.382-77.67-196.486-183.958-202.574Z'%20clip-rule='evenodd'/%3e%3c/svg%3e";
const ICONS = {
  Megaphone,
  TrendingUp,
  Send,
  Sprout,
  Filter,
  Search,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  MapPin
};
function HomePage() {
  const {
    data: cats
  } = useSuspenseQuery(categoriesQuery());
  const {
    data: counts
  } = useSuspenseQuery(categoryCountsQuery());
  const {
    data: featured
  } = useSuspenseQuery(featuredSpecialistsQuery());
  const {
    data: services
  } = useSuspenseQuery(servicesQuery());
  const {
    open
  } = useLeadRequest();
  const niches = cats.filter((c) => c.type === "niche");
  const taskByServiceSlug = new Map(cats.filter((c) => c.type === "task").map((c) => [c.slug, c]));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 gradient-mesh opacity-70" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl orb-1" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -right-32 top-40 -z-10 h-96 w-96 rounded-full bg-accent/25 blur-3xl orb-2" }),
      /* @__PURE__ */ jsx("div", { className: "absolute left-1/3 top-80 -z-10 h-80 w-80 rounded-full bg-primary-glow/25 blur-3xl orb-3" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-20 text-center md:px-8 md:py-32", children: [
        /* @__PURE__ */ jsxs(Reveal, { y: 20, className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "text-accent" }),
          "Платформа №1 по поиску экспертов в МАКС"
        ] }),
        /* @__PURE__ */ jsxs(Reveal, { delay: 100, y: 20, className: "mt-6 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl", children: [
          "Платформа №1 для продвижения ",
          /* @__PURE__ */ jsx("br", {}),
          "бизнеса в ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "МАКС" }),
          " ",
          /* @__PURE__ */ jsx("img", { src: maxLogo, alt: "МАКС", className: "inline-block align-[-0.1em] h-[0.85em] w-auto pb-[6px]" })
        ] }),
        /* @__PURE__ */ jsx(Reveal, { delay: 200, y: 20, className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Реклама, рассылки, воронки и SMM под задачи бизнеса. Подберем исполнителей и доведем до результата." }),
        /* @__PURE__ */ jsxs(Reveal, { delay: 300, y: 20, className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gradient-bg shadow-glow pulse-glow hover:scale-105", onClick: () => open("home:hero"), children: [
            "Получить решение под задачу ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/max-dlya-biznesa", children: "Все услуги" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "cv-auto mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Услуги для бизнеса" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: services.map((s, i) => {
        const taskCat = taskByServiceSlug.get(s.slug);
        const iconName = taskCat?.icon ?? s.icon ?? null;
        return /* @__PURE__ */ jsx(ServiceTile, { slug: s.slug, name: s.name, description: s.short_description ?? taskCat?.description ?? null, iconName, delay: i * 0.05 }, s.id);
      }) }),
      /* @__PURE__ */ jsx("h2", { className: "mt-16 text-3xl font-bold md:text-4xl", children: "По нишам бизнеса" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: niches.map((c, i) => /* @__PURE__ */ jsx(NicheTile, { cat: c, delay: i * 0.05 }, c.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1280px] px-4 md:px-8", children: /* @__PURE__ */ jsx("div", { className: "glass grid grid-cols-1 gap-6 rounded-3xl p-8 md:grid-cols-3", children: [{
      v: "250+",
      l: "исполнителей под задачи бизнеса"
    }, {
      v: "1 200+",
      l: "реализованных проектов"
    }, {
      v: "98%",
      l: "клиентов довольны результатом"
    }].map((s) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "gradient-text text-4xl font-extrabold md:text-5xl", children: s.v }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "cv-auto mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Специалисты, которые решают задачи бизнеса" }),
        /* @__PURE__ */ jsxs(Link, { to: "/specialists", className: "hidden text-sm font-medium text-primary md:inline-flex md:items-center md:gap-1", children: [
          "Все специалисты ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: featured.map((s) => (
        // SpecialistCard expects categories — give empty array since we don't load them here
        /* @__PURE__ */ jsx(SpecialistCard, { specialist: {
          ...s,
          categories: []
        } }, s.id)
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "cv-auto mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl font-bold md:text-4xl", children: "Как это работает" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [{
        icon: Send,
        title: "Оставьте заявку",
        text: "Опишите задачу и бюджет — мы поймём, какой исполнитель нужен."
      }, {
        icon: Search,
        title: "Получите подбор исполнителей",
        text: "Подберём проверенных специалистов под вашу нишу и цели."
      }, {
        icon: MessageSquare,
        title: "Работайте через платформу",
        text: "Общение, согласование и контроль этапов — всё в одном месте."
      }, {
        icon: Rocket,
        title: "Получите результат",
        text: "Принимайте работу, оценивайте и оставляйте отзыв о сотрудничестве."
      }].map((step, i) => /* @__PURE__ */ jsxs(Reveal, { className: "glass rounded-2xl p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl gradient-bg", children: /* @__PURE__ */ jsx(step.icon, { className: "text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-bold", children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: step.text })
      ] }, step.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1280px] px-4 pb-20 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl glass-strong p-10 text-center md:p-16", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 gradient-mesh opacity-50" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold md:text-5xl", children: "Готовы начать продвижение бизнеса в МАКС?" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Оставьте заявку — подберем решение под вашу задачу и предложим исполнителей." }),
      /* @__PURE__ */ jsxs(Button, { size: "lg", className: "mt-8 gradient-bg shadow-glow hover:scale-105", onClick: () => open("home:final"), children: [
        "Получить решение ",
        /* @__PURE__ */ jsx(ArrowRight, {})
      ] })
    ] }) })
  ] });
}
function ServiceTile({
  slug,
  name,
  description,
  iconName,
  delay
}) {
  const Icon = iconName && ICONS[iconName] || Megaphone;
  return /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(Link, { to: "/uslugi/$serviceSlug", params: {
    serviceSlug: slug
  }, className: "group block rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-glow", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6", children: /* @__PURE__ */ jsx(Icon, { size: 22 }) }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-4 font-bold", children: name }),
    description && /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: description })
  ] }) });
}
function NicheTile({
  cat,
  delay
}) {
  const Icon = cat.icon && ICONS[cat.icon] || Megaphone;
  const cleanName = cat.name.replace(/\s+в\s+МАКС\s*$/i, "").trim();
  return /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs(Link, { to: "/specialists/$categorySlug", params: {
    categorySlug: cat.slug
  }, className: "group block rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-glow", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6", children: /* @__PURE__ */ jsx(Icon, { size: 22 }) }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-4 font-bold", children: cleanName }),
    cat.description && /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: cat.description })
  ] }) });
}
export {
  HomePage as component
};
