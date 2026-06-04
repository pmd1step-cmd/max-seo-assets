import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { D as Route } from "./router-Ame665Aj.js";
import "@tanstack/react-query";
import "react";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Cpfbehp8.js";
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
const SplitNotFoundComponent = () => {
  const {
    categorySlug
  } = Route.useParams();
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[720px] px-4 py-20 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold md:text-5xl", children: "Категория не найдена" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4 text-muted-foreground", children: [
      "Раздел «",
      categorySlug,
      "» удалён или никогда не существовал."
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/specialists", className: "mt-6 inline-block text-primary underline", children: "Вернуться ко всем специалистам" })
  ] });
};
export {
  SplitNotFoundComponent as notFoundComponent
};
