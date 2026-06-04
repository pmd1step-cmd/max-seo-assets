import { jsx, jsxs } from "react/jsx-runtime";
import { j as Route, c as categoriesQuery, k as caseTagsQuery, l as casesListQuery, m as PER_PAGE, B as Button } from "./router-yZ3SXsa2.js";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ImageIcon, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { I as Input } from "./input-BbMhxfbj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Da9hGD5u.js";
import { R as Reveal } from "./reveal-BhbMLa_q.js";
import { B as Breadcrumbs } from "./Breadcrumbs-B22YOolp.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CKDW8voY.js";
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
import "@radix-ui/react-select";
function htmlPreview(html, maxLen = 140) {
  if (!html) return "";
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}
function PublicCaseCard({ caseItem: c }) {
  const taskCat = c.categories.find((cat) => cat.type === "task");
  const preview = htmlPreview(c.task_description);
  return /* @__PURE__ */ jsx(Reveal, { y: 12, children: /* @__PURE__ */ jsx(Link, { to: "/cases/$slug", params: { slug: c.slug }, className: "block", children: /* @__PURE__ */ jsxs("div", { className: "group glass overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-elevated", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-secondary", children: [
      c.cover_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: c.cover_url,
          alt: c.title,
          loading: "lazy",
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center gradient-mesh", children: /* @__PURE__ */ jsx(ImageIcon, { className: "text-muted-foreground/40", size: 40 }) }),
      taskCat && /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur", children: taskCat.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-primary", children: c.title }),
      preview && /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: preview }),
      c.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: c.tags.slice(0, 4).map((t) => /* @__PURE__ */ jsxs(
        "span",
        {
          className: "rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground",
          children: [
            "#",
            t.name
          ]
        },
        t.id
      )) }),
      c.author?.name && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 border-t border-border pt-3", children: [
        c.author.avatar_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: c.author.avatar_url,
            alt: "",
            className: "h-7 w-7 rounded-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[11px] font-bold", children: c.author.name[0] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: c.author.name })
      ] })
    ] })
  ] }) }) });
}
function CasesIndexPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const {
    data: categories
  } = useSuspenseQuery(categoriesQuery());
  const {
    data: tags
  } = useSuspenseQuery(caseTagsQuery());
  const {
    data
  } = useSuspenseQuery(casesListQuery({
    search: search.q,
    categorySlug: search.category,
    tagSlug: search.tag,
    sort: search.sort,
    page: search.page,
    perPage: PER_PAGE
  }));
  const [searchInput, setSearchInput] = useState(search.q);
  useEffect(() => setSearchInput(search.q), [search.q]);
  const totalPages = Math.max(1, Math.ceil(data.total / PER_PAGE));
  const submitSearch = (e) => {
    e.preventDefault();
    void navigate({
      search: (prev) => ({
        ...prev,
        q: searchInput,
        page: 1
      })
    });
  };
  const taskCats = categories.filter((c) => c.type === "task");
  const nicheCats = categories.filter((c) => c.type === "niche");
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title
    }))
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(itemListJsonLd)
    } }),
    /* @__PURE__ */ jsx(Breadcrumbs, { items: [{
      label: "Кейсы"
    }], className: "mb-6" }),
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold md:text-5xl", children: [
        "Кейсы ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "специалистов" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: "Реальные результаты рекламных кампаний и воронок в мессенджере МАКС от практикующих экспертов." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-6 lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: submitSearch, className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { size: 16, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { placeholder: "Поиск по кейсам...", className: "pl-9", value: searchInput, onChange: (e) => setSearchInput(e.target.value) })
        ] }),
        /* @__PURE__ */ jsx(CategorySection, { title: "Тип задачи", items: taskCats, activeSlug: search.category }),
        /* @__PURE__ */ jsx(CategorySection, { title: "Ниша", items: nicheCats, activeSlug: search.category }),
        tags.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Теги" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/cases", search: (prev) => ({
            ...prev,
            tag: prev.tag === t.slug ? null : t.slug,
            page: 1
          }), className: `rounded-full border px-2.5 py-0.5 text-xs transition-colors ${search.tag === t.slug ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`, children: [
            "#",
            t.name
          ] }, t.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Найдено: ",
            /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: data.total })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            (search.q || search.category || search.tag) && /* @__PURE__ */ jsx(Link, { to: "/cases", search: {
              q: "",
              category: null,
              tag: null,
              sort: search.sort,
              page: 1
            }, className: "text-sm text-primary hover:text-primary-glow", children: "Сбросить фильтры" }),
            /* @__PURE__ */ jsxs(Select, { value: search.sort, onValueChange: (v) => navigate({
              search: (prev) => ({
                ...prev,
                sort: v,
                page: 1
              })
            }), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[170px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "new", children: "Сначала новые" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "popular", children: "Популярные" })
              ] })
            ] })
          ] })
        ] }),
        data.items.length === 0 ? /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Кейсы не найдены." }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: data.items.map((c) => /* @__PURE__ */ jsx(PublicCaseCard, { caseItem: c }, c.id)) }),
        totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: search.page <= 1, onClick: () => navigate({
            search: (prev) => ({
              ...prev,
              page: prev.page - 1
            })
          }), children: "← Назад" }),
          /* @__PURE__ */ jsxs("span", { className: "px-3 text-sm text-muted-foreground", children: [
            search.page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: search.page >= totalPages, onClick: () => navigate({
            search: (prev) => ({
              ...prev,
              page: prev.page + 1
            })
          }), children: "Вперёд →" })
        ] })
      ] })
    ] })
  ] });
}
function CategorySection({
  title,
  items,
  activeSlug
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: items.map((c) => {
      const active = activeSlug === c.slug;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/cases", search: (prev) => ({
        ...prev,
        category: active ? null : c.slug,
        page: 1
      }), className: `block rounded-md px-3 py-1.5 text-sm transition-colors ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`, children: c.name }) }, c.id);
    }) })
  ] });
}
export {
  CasesIndexPage as component
};
