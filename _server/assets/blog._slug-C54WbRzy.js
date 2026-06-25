import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./router-Cn_-vz7E.js";
import "@tanstack/react-query";
import "react";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-ETur_-sM.js";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-20 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Статья не найдена" }),
  /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Возможно, она снята с публикации." }),
  /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/blog", children: "В блог" }) })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
