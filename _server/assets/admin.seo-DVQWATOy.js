import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { queryOptions, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { s as supabase, B as Button, D as Dialog, y as DialogContent, z as DialogHeader, A as DialogTitle, E as DialogDescription, N as DialogFooter } from "./router-B-bBsSqt.js";
import { I as Input } from "./input-y2aUHo8n.js";
import { L as Label } from "./label-B9nl5izw.js";
import { T as Textarea } from "./textarea-C1ZeouRx.js";
import { S as Switch } from "./switch-B-R2OdrA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CiMuHX_H.js";
import "@tanstack/react-router";
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
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-DTsMGolV.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@radix-ui/react-select";
const adminSeoMetaListQuery = () => queryOptions({
  queryKey: ["admin", "seo-meta"],
  queryFn: async () => {
    const { data, error } = await supabase.from("seo_meta").select("*").order("page_path");
    if (error) throw error;
    return data ?? [];
  }
});
const PAGE_TYPES = [
  { value: "homepage", label: "Главная" },
  { value: "static", label: "Статическая" },
  { value: "listing", label: "Листинг" },
  { value: "hub", label: "Хаб" }
];
const EMPTY = {
  page_path: "",
  page_type: "static",
  title: "",
  description: "",
  keywords: "",
  canonical_override: false,
  canonical_url: "",
  is_paginated: false,
  pagination_param: "page",
  robots_index: true,
  robots_follow: true,
  robots_noarchive: false,
  robots_nosnippet: false,
  og_title: "",
  og_description: "",
  og_image: "",
  og_type: "website",
  twitter_card: "summary_large_image",
  twitter_title: "",
  twitter_description: "",
  twitter_image: "",
  json_ld: "",
  exclude_from_sitemap: false,
  sitemap_priority: "",
  sitemap_changefreq: ""
};
function rowToForm(r) {
  return {
    id: r.id,
    page_path: r.page_path,
    page_type: r.page_type,
    title: r.title ?? "",
    description: r.description ?? "",
    keywords: r.keywords ?? "",
    canonical_override: r.canonical_override,
    canonical_url: r.canonical_url ?? "",
    is_paginated: r.is_paginated,
    pagination_param: r.pagination_param,
    robots_index: r.robots_index,
    robots_follow: r.robots_follow,
    robots_noarchive: r.robots_noarchive,
    robots_nosnippet: r.robots_nosnippet,
    og_title: r.og_title ?? "",
    og_description: r.og_description ?? "",
    og_image: r.og_image ?? "",
    og_type: r.og_type,
    twitter_card: r.twitter_card,
    twitter_title: r.twitter_title ?? "",
    twitter_description: r.twitter_description ?? "",
    twitter_image: r.twitter_image ?? "",
    json_ld: r.json_ld ?? "",
    exclude_from_sitemap: r.exclude_from_sitemap,
    sitemap_priority: r.sitemap_priority != null ? String(r.sitemap_priority) : "",
    sitemap_changefreq: r.sitemap_changefreq ?? ""
  };
}
function formToPayload(f) {
  const nz = (v) => v.trim().length === 0 ? null : v.trim();
  return {
    page_path: f.page_path.trim(),
    page_type: f.page_type,
    title: nz(f.title),
    description: nz(f.description),
    keywords: nz(f.keywords),
    canonical_override: f.canonical_override,
    canonical_url: nz(f.canonical_url),
    is_paginated: f.is_paginated,
    pagination_param: f.pagination_param.trim() || "page",
    robots_index: f.robots_index,
    robots_follow: f.robots_follow,
    robots_noarchive: f.robots_noarchive,
    robots_nosnippet: f.robots_nosnippet,
    og_title: nz(f.og_title),
    og_description: nz(f.og_description),
    og_image: nz(f.og_image),
    og_type: f.og_type,
    twitter_card: f.twitter_card,
    twitter_title: nz(f.twitter_title),
    twitter_description: nz(f.twitter_description),
    twitter_image: nz(f.twitter_image),
    json_ld: nz(f.json_ld),
    exclude_from_sitemap: f.exclude_from_sitemap,
    sitemap_priority: f.sitemap_priority.trim() ? Number(f.sitemap_priority) : null,
    sitemap_changefreq: nz(f.sitemap_changefreq)
  };
}
function AdminSeoTab() {
  const qc = useQueryClient();
  const { data: rows, isLoading } = useQuery(adminSeoMetaListQuery());
  const [editing, setEditing] = useState(null);
  const saveMutation = useMutation({
    mutationFn: async (form) => {
      const payload = formToPayload(form);
      if (!payload.page_path.startsWith("/")) {
        throw new Error("Путь страницы должен начинаться с /");
      }
      if (form.id) {
        const { error } = await supabase.from("seo_meta").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("seo_meta").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Сохранено");
      qc.invalidateQueries({ queryKey: ["admin", "seo-meta"] });
      setEditing(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("seo_meta").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалено");
      qc.invalidateQueries({ queryKey: ["admin", "seo-meta"] });
    },
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "SEO мета-теги страниц" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Настройте title, description и расширенные параметры для статических страниц сайта. Динамические страницы (профили, кейсы, статьи) берут мета-теги из своих карточек и здесь не управляются." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => setEditing({ ...EMPTY }), children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Добавить страницу"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-surface/40", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-surface/60 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Путь" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Тип" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Title" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Robots" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Действия" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        (rows ?? []).map((r) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-xs", children: r.page_path }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: PAGE_TYPES.find((t) => t.value === r.page_type)?.label ?? r.page_type }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 max-w-md truncate", children: r.title ?? /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "—" }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: [
            r.robots_index ? "index" : "noindex",
            ",",
            " ",
            r.robots_follow ? "follow" : "nofollow"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => setEditing(rowToForm(r)),
                children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  if (confirm(`Удалить SEO для ${r.page_path}?`))
                    deleteMutation.mutate(r.id);
                },
                disabled: deleteMutation.isPending,
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, r.id)),
        (rows ?? []).length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-4 py-8 text-center text-muted-foreground", children: "Записей нет. Добавьте первую страницу." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: editing !== null, onOpenChange: (o) => !o && setEditing(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-3xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: editing?.id ? "Редактировать SEO" : "Новая SEO-запись" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Настройка мета-тегов для страницы. Поля Title до 60 символов, Description — до 160." })
      ] }),
      editing && /* @__PURE__ */ jsx(
        SeoForm,
        {
          value: editing,
          onChange: setEditing,
          onSubmit: () => saveMutation.mutate(editing),
          isSubmitting: saveMutation.isPending,
          onCancel: () => setEditing(null)
        }
      )
    ] }) })
  ] });
}
function SeoForm({ value, onChange, onSubmit, isSubmitting, onCancel }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit();
      },
      className: "space-y-5",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Путь страницы *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.page_path,
                onChange: (e) => set("page_path", e.target.value),
                placeholder: "/about",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Тип" }),
            /* @__PURE__ */ jsxs(Select, { value: value.page_type, onValueChange: (v) => set("page_type", v), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: PAGE_TYPES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t.value, children: t.label }, t.value)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: `text-[11px] ${value.title.length > 60 ? "text-destructive" : "text-muted-foreground"}`,
                children: [
                  value.title.length,
                  "/60"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Input, { value: value.title, onChange: (e) => set("title", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: `text-[11px] ${value.description.length > 160 ? "text-destructive" : "text-muted-foreground"}`,
                children: [
                  value.description.length,
                  "/160"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: value.description,
              onChange: (e) => set("description", e.target.value),
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Keywords" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: value.keywords,
              onChange: (e) => set("keywords", e.target.value),
              placeholder: "ключ1, ключ2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Переопределить canonical URL" }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: value.canonical_override,
                onCheckedChange: (v) => set("canonical_override", v)
              }
            )
          ] }),
          value.canonical_override && /* @__PURE__ */ jsx(
            Input,
            {
              value: value.canonical_url,
              onChange: (e) => set("canonical_url", e.target.value),
              placeholder: "https://maxexperts.ru/..."
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Пагинированная страница" }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: value.is_paginated,
                onCheckedChange: (v) => set("is_paginated", v)
              }
            )
          ] }),
          value.is_paginated && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Параметр пагинации" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.pagination_param,
                onChange: (e) => set("pagination_param", e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border border-border bg-surface/40 p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "Robots" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "index" }),
              /* @__PURE__ */ jsx(
                Switch,
                {
                  checked: value.robots_index,
                  onCheckedChange: (v) => set("robots_index", v)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "follow" }),
              /* @__PURE__ */ jsx(
                Switch,
                {
                  checked: value.robots_follow,
                  onCheckedChange: (v) => set("robots_follow", v)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "noarchive" }),
              /* @__PURE__ */ jsx(
                Switch,
                {
                  checked: value.robots_noarchive,
                  onCheckedChange: (v) => set("robots_noarchive", v)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "nosnippet" }),
              /* @__PURE__ */ jsx(
                Switch,
                {
                  checked: value.robots_nosnippet,
                  onCheckedChange: (v) => set("robots_nosnippet", v)
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "OpenGraph (для соцсетей)" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "OG Title" }),
            /* @__PURE__ */ jsx(Input, { value: value.og_title, onChange: (e) => set("og_title", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "OG Description" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                value: value.og_description,
                onChange: (e) => set("og_description", e.target.value),
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "OG Image (URL)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.og_image,
                onChange: (e) => set("og_image", e.target.value),
                placeholder: "https://..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "OG Type" }),
            /* @__PURE__ */ jsx(Input, { value: value.og_type, onChange: (e) => set("og_type", e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "Twitter Card" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Card type" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: value.twitter_card,
                onValueChange: (v) => set("twitter_card", v),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "summary", children: "summary" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "summary_large_image", children: "summary_large_image" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Twitter Title" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.twitter_title,
                onChange: (e) => set("twitter_title", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Twitter Description" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                value: value.twitter_description,
                onChange: (e) => set("twitter_description", e.target.value),
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Twitter Image (URL)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.twitter_image,
                onChange: (e) => set("twitter_image", e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "JSON-LD (структурированные данные)" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: value.json_ld,
              onChange: (e) => set("json_ld", e.target.value),
              rows: 5,
              placeholder: '{"@context":"https://schema.org",...}',
              className: "font-mono text-xs"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "Sitemap" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { children: "Исключить из sitemap" }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: value.exclude_from_sitemap,
                onCheckedChange: (v) => set("exclude_from_sitemap", v)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { children: "Priority (0.0–1.0)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  step: "0.1",
                  min: "0",
                  max: "1",
                  value: value.sitemap_priority,
                  onChange: (e) => set("sitemap_priority", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { children: "Changefreq" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: value.sitemap_changefreq || "none",
                  onValueChange: (v) => set("sitemap_changefreq", v === "none" ? "" : v),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "—" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "—" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "always", children: "always" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "hourly", children: "hourly" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "daily", children: "daily" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "weekly", children: "weekly" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "monthly", children: "monthly" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "yearly", children: "yearly" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "never", children: "never" })
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: onCancel, children: "Отмена" }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: isSubmitting, children: [
            isSubmitting && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Сохранить"
          ] })
        ] })
      ]
    }
  );
}
const SplitComponent = AdminSeoTab;
export {
  SplitComponent as component
};
