import { jsx, jsxs } from "react/jsx-runtime";
import { g as Route, h as blogCategoriesQuery, i as blogTagsQuery, j as blogListQuery, k as PER_PAGE, B as Button } from "./router-B8WkfRFF.js";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { I as Input } from "./input-La8udyUD.js";
import { B as BlogCard } from "./BlogCard-vqgufkYf.js";
import { B as Breadcrumbs } from "./Breadcrumbs-zGZJPAtz.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CSbRTQ_y.js";
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
import "./reveal-rCWaT2nZ.js";
import "./format-CdVWScmC.js";
function BlogIndexPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const {
    data: categories
  } = useSuspenseQuery(blogCategoriesQuery());
  const {
    data: tags
  } = useSuspenseQuery(blogTagsQuery());
  const {
    data
  } = useSuspenseQuery(blogListQuery({
    search: search.q,
    categorySlug: search.category,
    tagSlug: search.tag,
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
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/blog/${p.slug}`,
      name: p.title
    }))
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(itemListJsonLd)
    } }),
    /* @__PURE__ */ jsx(Breadcrumbs, { items: [{
      label: "Блог"
    }], className: "mb-6" }),
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold md:text-5xl", children: [
        "Блог ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "МАКС Experts" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: "Кейсы, гайды и инсайты от практикующих специалистов по рекламе в МАКС." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-6 lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: submitSearch, className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { size: 16, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { placeholder: "Поиск по статьям...", className: "pl-9", value: searchInput, onChange: (e) => setSearchInput(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Категории" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", search: (prev) => ({
              ...prev,
              category: null,
              page: 1
            }), className: `block rounded-md px-3 py-1.5 text-sm transition-colors ${!search.category ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`, children: "Все" }) }),
            categories.map((c) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", search: (prev) => ({
              ...prev,
              category: c.slug,
              page: 1
            }), className: `block rounded-md px-3 py-1.5 text-sm transition-colors ${search.category === c.slug ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`, children: c.name }) }, c.id)),
            categories.length === 0 && /* @__PURE__ */ jsx("li", { className: "px-3 py-1.5 text-xs text-muted-foreground", children: "Категории появятся после первых статей" })
          ] })
        ] }),
        tags.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Теги" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/blog", search: (prev) => ({
            ...prev,
            tag: search.tag === t.slug ? null : t.slug,
            page: 1
          }), className: `rounded-full border px-2.5 py-0.5 text-xs transition-colors ${search.tag === t.slug ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`, children: [
            "#",
            t.name
          ] }, t.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { children: [
        (search.q || search.category || search.tag) && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "Найдено: ",
            /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: data.total })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/blog", search: {
            q: "",
            category: null,
            tag: null,
            page: 1
          }, className: "text-primary hover:text-primary-glow", children: "Сбросить фильтры" })
        ] }),
        data.items.length === 0 ? /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Статьи не найдены." }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: data.items.map((post) => /* @__PURE__ */ jsx(BlogCard, { post }, post.id)) }),
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
function BlogSpinner() {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) });
}
export {
  BlogSpinner,
  BlogIndexPage as component
};
