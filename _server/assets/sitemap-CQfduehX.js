import { jsxs, jsx } from "react/jsx-runtime";
import { h as htmlSitemapQuery } from "./router-cQ4SP8Hh.js";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { B as Breadcrumbs } from "./Breadcrumbs-DA1hwRvw.js";
import "react";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-COvPlUwm.js";
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
function SitemapSection({
  title,
  links,
  columns = 2
}) {
  if (links.length === 0) return null;
  const colsClass = columns === 3 ? "md:columns-2 lg:columns-3" : columns === 2 ? "md:columns-2" : "";
  return /* @__PURE__ */ jsxs("section", { className: "mt-10", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold md:text-2xl", children: title }),
    /* @__PURE__ */ jsx("ul", { className: `mt-4 space-y-2 text-sm ${colsClass}`, children: links.map((l) => /* @__PURE__ */ jsx("li", { className: "break-inside-avoid", children: /* @__PURE__ */ jsx(Link, { to: l.path, className: "text-muted-foreground hover:text-foreground hover:underline", children: l.label }) }, l.path)) })
  ] });
}
function SitemapPage() {
  const {
    data
  } = useSuspenseQuery(htmlSitemapQuery());
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "mb-6", items: [{
      label: "Карта сайта"
    }] }),
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold md:text-5xl", children: "Карта сайта" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: "Структурированный список всех публичных страниц maxexperts.ru — основные разделы, услуги, категории специалистов, кейсы и статьи блога." })
    ] }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Основные страницы", links: data.staticPages, columns: 2 }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Услуги", links: data.services, columns: 2 }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Специалисты по задачам", links: data.taskCategories, columns: 3 }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Специалисты по нишам", links: data.nicheCategories, columns: 3 }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Специалисты", links: data.specialists, columns: 3 }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Кейсы", links: data.cases, columns: 2 }),
    /* @__PURE__ */ jsx(SitemapSection, { title: "Блог", links: data.blogPosts, columns: 2 })
  ] });
}
export {
  SitemapPage as component
};
