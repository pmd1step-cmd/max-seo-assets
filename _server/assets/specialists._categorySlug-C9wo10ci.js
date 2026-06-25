import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { n as Route } from "./router-BmDCopUW.js";
import "@tanstack/react-query";
import "react";
import "lucide-react";
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
