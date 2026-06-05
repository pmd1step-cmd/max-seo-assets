import { jsxs, jsx } from "react/jsx-runtime";
import { e as Route, c as categoriesQuery, g as slugsToIds, i as catalogQuery, P as PER_PAGE, B as Button } from "./router-v36oCi4s.js";
import { useNavigate, Link } from "@tanstack/react-router";
import { R as Reveal } from "./reveal-CXI8C-7o.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { X, Filter } from "lucide-react";
import { S as SpecialistCard } from "./SpecialistCard-BPpi4jLV.js";
import { s as specialistsWord } from "./format-BSlnw0iM.js";
import { B as Breadcrumbs } from "./Breadcrumbs-GEccDvdO.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Dhbaly9m.js";
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
function SpecialistsIndexPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({
    from: "/specialists"
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    data: cats
  } = useSuspenseQuery(categoriesQuery());
  const taskIds = useMemo(() => slugsToIds(search.task, cats, "task"), [search.task, cats]);
  const nicheIds = useMemo(() => slugsToIds(search.niche, cats, "niche"), [search.niche, cats]);
  const {
    data: result
  } = useSuspenseQuery(catalogQuery({
    page: search.page,
    perPage: PER_PAGE,
    sort: search.sort,
    rating: search.rating,
    budgetMax: search.budget_max,
    hasCases: search.has_cases,
    location: search.location,
    taskCategoryIds: taskIds,
    nicheCategoryIds: nicheIds
  }));
  const taskCats = cats.filter((c) => c.type === "task");
  const nicheCats = cats.filter((c) => c.type === "niche");
  const totalPages = Math.max(1, Math.ceil(result.total / PER_PAGE));
  const totalSelected = search.task.length + search.niche.length;
  const updateSearch = (patch) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...patch,
        page: patch.page ?? 1
      })
    });
  };
  const toggleSlug = (key, slug) => {
    const current = search[key];
    const next = current.includes(slug) ? current.filter((x) => x !== slug) : [...current, slug];
    updateSearch({
      [key]: next
    });
  };
  const resetAll = () => navigate({
    search: {
      page: 1,
      sort: "rating",
      task: [],
      niche: []
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx(Breadcrumbs, { items: [{
      label: "Специалисты"
    }], className: "mb-4" }),
    /* @__PURE__ */ jsxs(Reveal, { y: 12, className: "text-3xl font-extrabold md:text-5xl", children: [
      /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Специалисты" }),
      " по продвижению в МАКС",
      " ",
      /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground text-xl md:text-2xl font-medium", children: [
        "— ",
        result.total,
        " ",
        specialistsWord(result.total)
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-muted-foreground", children: "Проверенные исполнители по рекламе, рассылкам, воронкам и SMM в мессенджере МАКС. Выбирайте теги ниже — можно комбинировать задачи и ниши." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-3", children: [
      /* @__PURE__ */ jsx(TagCloud, { label: "Задачи", items: taskCats, selected: search.task, onToggle: (slug) => toggleSlug("task", slug), tone: "primary" }),
      /* @__PURE__ */ jsx(TagCloud, { label: "Ниши", items: nicheCats, selected: search.niche, onToggle: (slug) => toggleSlug("niche", slug), tone: "accent" }),
      totalSelected > 0 && /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxs("button", { onClick: resetAll, className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsx(X, { size: 14 }),
        " Сбросить все теги"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(FiltersContent, { taskCats, nicheCats, selectedTask: search.task, selectedNiche: search.niche, rating: search.rating, budgetMax: search.budget_max, hasCases: search.has_cases, location: search.location ?? "", onTask: (slug) => toggleSlug("task", slug), onNiche: (slug) => toggleSlug("niche", slug), onRating: (r) => updateSearch({
        rating: r
      }), onBudget: (b) => updateSearch({
        budget_max: b
      }), onHasCases: (v) => updateSearch({
        has_cases: v || void 0
      }), onLocation: (loc) => updateSearch({
        location: loc || void 0
      }), onReset: resetAll }) }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "lg:hidden", onClick: () => setFiltersOpen(true), children: [
            /* @__PURE__ */ jsx(Filter, {}),
            " Фильтры"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground hidden sm:inline", children: "Сортировка:" }),
            /* @__PURE__ */ jsxs("select", { value: search.sort, onChange: (e) => updateSearch({
              sort: e.target.value
            }), className: "rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground", children: [
              /* @__PURE__ */ jsx("option", { value: "rating", children: "По рейтингу" }),
              /* @__PURE__ */ jsx("option", { value: "popular", children: "По популярности" }),
              /* @__PURE__ */ jsx("option", { value: "price_asc", children: "Сначала дешевле" }),
              /* @__PURE__ */ jsx("option", { value: "price_desc", children: "Сначала дороже" })
            ] })
          ] })
        ] }),
        result.items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-12 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "Ничего не найдено" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Попробуйте изменить фильтры" })
        ] }) : /* @__PURE__ */ jsx(Reveal, { className: "grid gap-5 md:grid-cols-2", children: result.items.map((s) => /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(SpecialistCard, { specialist: s }) }, s.id)) }),
        totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "mt-10 flex items-center justify-center gap-2", children: Array.from({
          length: totalPages
        }).map((_, i) => {
          const p = i + 1;
          return /* @__PURE__ */ jsx("button", { onClick: () => updateSearch({
            page: p
          }), className: `h-9 min-w-9 rounded-md border px-3 text-sm font-medium transition-colors ${p === search.page ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-foreground hover:bg-secondary"}`, children: p }, p);
        }) })
      ] })
    ] }),
    filtersOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-background/80 backdrop-blur", onClick: () => setFiltersOpen(false) }),
      /* @__PURE__ */ jsxs(Reveal, { className: "absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-surface p-6 shadow-elevated", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Фильтры" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setFiltersOpen(false), "aria-label": "Закрыть", children: /* @__PURE__ */ jsx(X, {}) })
        ] }),
        /* @__PURE__ */ jsx(FiltersContent, { taskCats, nicheCats, selectedTask: search.task, selectedNiche: search.niche, rating: search.rating, budgetMax: search.budget_max, hasCases: search.has_cases, location: search.location ?? "", onTask: (slug) => toggleSlug("task", slug), onNiche: (slug) => toggleSlug("niche", slug), onRating: (r) => updateSearch({
          rating: r
        }), onBudget: (b) => updateSearch({
          budget_max: b
        }), onHasCases: (v) => updateSearch({
          has_cases: v || void 0
        }), onLocation: (loc) => updateSearch({
          location: loc || void 0
        }), onReset: resetAll }),
        /* @__PURE__ */ jsx(Button, { className: "mt-6 w-full gradient-bg", onClick: () => setFiltersOpen(false), children: "Показать результаты" })
      ] })
    ] })
  ] });
}
function TagCloud({
  label,
  items,
  selected,
  tone
}) {
  if (items.length === 0) return null;
  const activeCls = tone === "primary" ? "border-primary bg-primary text-primary-foreground" : "border-accent bg-accent text-accent-foreground";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxs("span", { className: "mr-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
      label,
      ":"
    ] }),
    items.map((c) => {
      const isActive = selected.includes(c.slug);
      return /* @__PURE__ */ jsx(Link, { to: "/specialists/$categorySlug", params: {
        categorySlug: c.slug
      }, className: `rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${isActive ? `${activeCls} shadow-glow` : "border-border bg-surface text-foreground hover:border-primary/60"}`, children: c.name }, c.id);
    })
  ] });
}
function FiltersContent(props) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold", children: "Специализация" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: props.taskCats.map((c) => /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: props.selectedTask.includes(c.slug), onChange: () => props.onTask(c.slug), className: "h-4 w-4 rounded border-border bg-surface accent-primary" }),
        /* @__PURE__ */ jsx("span", { children: c.name })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold", children: "Ниша" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: props.nicheCats.map((c) => /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: props.selectedNiche.includes(c.slug), onChange: () => props.onNiche(c.slug), className: "h-4 w-4 rounded border-border bg-surface accent-primary" }),
        /* @__PURE__ */ jsx("span", { children: c.name })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold", children: "Бюджет (от, ₽)" }),
      /* @__PURE__ */ jsx("input", { type: "number", min: 0, step: 5e3, value: props.budgetMax ?? "", onChange: (e) => props.onBudget(e.target.value ? Number(e.target.value) : void 0), placeholder: "Например, 50000", className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold", children: "Минимальный рейтинг" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [3, 4, 4.5].map((r) => /* @__PURE__ */ jsxs("button", { onClick: () => props.onRating(props.rating === r ? void 0 : r), className: `rounded-md border px-3 py-1.5 text-xs font-medium ${props.rating === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-foreground"}`, children: [
        r,
        "+"
      ] }, r)) })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!props.hasCases, onChange: (e) => props.onHasCases(e.target.checked), className: "h-4 w-4 rounded border-border bg-surface accent-primary" }),
      /* @__PURE__ */ jsx("span", { children: "Только с кейсами" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-3 text-sm font-semibold", children: "Город" }),
      /* @__PURE__ */ jsx("input", { type: "text", value: props.location, onChange: (e) => props.onLocation(e.target.value), placeholder: "Например, Москва", className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "w-full", onClick: props.onReset, children: "Сбросить фильтры" })
  ] });
}
export {
  SpecialistsIndexPage as component
};
