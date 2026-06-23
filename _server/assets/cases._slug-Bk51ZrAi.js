import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, User, Star, Calendar } from "lucide-react";
import { $ as Route, a0 as caseBySlugQuery, B as Button } from "./router-CpHt6ALJ.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Co62pVwh.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-DTsMGolV.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
function CaseContent({ html }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "prose prose-invert max-w-none",
      dangerouslySetInnerHTML: { __html: html }
    }
  );
}
function CasePage() {
  const {
    slug
  } = Route.useParams();
  const {
    data
  } = useSuspenseQuery(caseBySlugQuery(slug));
  if (!data) return null;
  const taskCat = data.categories.find((c) => c.type === "task");
  const nicheCat = data.categories.find((c) => c.type === "niche");
  const formattedDate = new Date(data.created_at).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    image: data.cover_url ? [data.cover_url] : void 0,
    datePublished: data.created_at,
    author: data.author ? {
      "@type": "Person",
      name: data.author.name ?? "Специалист"
    } : void 0
  };
  return /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-[900px] px-4 py-8 md:px-6 md:py-12", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(articleLd)
    } }),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "mb-6", items: [{
      label: "Кейсы",
      to: "/cases"
    }, {
      label: data.title
    }] }),
    /* @__PURE__ */ jsxs(Link, { to: "/cases", className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
      " Все кейсы"
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-xs", children: [
        taskCat && /* @__PURE__ */ jsx(Link, { to: "/cases", search: {
          q: "",
          category: taskCat.slug,
          tag: null,
          sort: "new",
          page: 1
        }, className: "rounded-full bg-primary/15 px-3 py-1 font-semibold text-primary hover:bg-primary/25", children: taskCat.name }),
        nicheCat && /* @__PURE__ */ jsx(Link, { to: "/cases", search: {
          q: "",
          category: nicheCat.slug,
          tag: null,
          sort: "new",
          page: 1
        }, className: "rounded-full bg-accent/15 px-3 py-1 font-semibold text-accent hover:bg-accent/25", children: nicheCat.name })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl", children: data.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
        data.author && /* @__PURE__ */ jsxs(Link, { to: "/specialist/$slug", params: {
          slug: data.author.slug ?? ""
        }, className: "flex items-center gap-2 hover:text-foreground", children: [
          data.author.avatar_url ? /* @__PURE__ */ jsx("img", { src: data.author.avatar_url, alt: "", className: "h-8 w-8 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsx(User, { size: 16 }) }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: data.author.name ?? "Специалист" }),
          data.author.rating > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { size: 13, className: "fill-yellow-400 text-yellow-400" }),
            data.author.rating.toFixed(1)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Calendar, { size: 14 }),
          " ",
          formattedDate
        ] })
      ] })
    ] }),
    data.cover_url && /* @__PURE__ */ jsx("div", { className: "mt-8 overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsx("img", { src: data.cover_url, alt: data.title, className: "w-full object-cover" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 space-y-12", children: [
      /* @__PURE__ */ jsx(Section, { title: "Задача", html: data.task_description }),
      /* @__PURE__ */ jsx(Section, { title: "Что было сделано", html: data.work_done }),
      /* @__PURE__ */ jsx(Section, { title: "Результаты", html: data.results, accent: true }),
      /* @__PURE__ */ jsx(Section, { title: "Вывод и эффект", html: data.conclusion })
    ] }),
    data.media.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-bold", children: "Материалы кейса" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: data.media.map((m) => /* @__PURE__ */ jsx("a", { href: m.url, target: "_blank", rel: "noopener noreferrer", className: "overflow-hidden rounded-xl border border-border bg-surface transition-transform hover:-translate-y-0.5", children: /* @__PURE__ */ jsx("img", { src: m.url, alt: "", loading: "lazy", className: "aspect-video w-full object-cover" }) }, m.id)) })
    ] }),
    data.tags.length > 0 && /* @__PURE__ */ jsx("section", { className: "mt-12 border-t border-border pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Теги:" }),
      data.tags.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/cases", search: {
        q: "",
        category: null,
        tag: t.slug,
        sort: "new",
        page: 1
      }, className: "rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground", children: [
        "#",
        t.name
      ] }, t.id))
    ] }) }),
    data.author && /* @__PURE__ */ jsx("aside", { className: "glass mt-12 rounded-2xl p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        data.author.avatar_url ? /* @__PURE__ */ jsx("img", { src: data.author.avatar_url, alt: "", className: "h-16 w-16 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsx(User, { size: 28 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Автор кейса" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: data.author.name ?? "Специалист" }),
          data.author.short_description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: data.author.short_description })
        ] })
      ] }),
      data.author.slug && /* @__PURE__ */ jsx(Button, { asChild: true, className: "gradient-bg", children: /* @__PURE__ */ jsx(Link, { to: "/specialist/$slug", params: {
        slug: data.author.slug
      }, children: "Связаться со специалистом" }) })
    ] }) })
  ] });
}
function Section({
  title,
  html,
  accent = false
}) {
  const trimmed = (html ?? "").trim();
  if (!trimmed || trimmed === "<p></p>") return null;
  return /* @__PURE__ */ jsxs("section", { className: accent ? "rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8" : "", children: [
    /* @__PURE__ */ jsx("h2", { className: `mb-4 text-2xl font-bold md:text-3xl ${accent ? "text-accent" : ""}`, children: title }),
    /* @__PURE__ */ jsx(CaseContent, { html: trimmed })
  ] });
}
export {
  CasePage as component
};
