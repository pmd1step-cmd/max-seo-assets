import { jsx } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
import { b as Route } from "./router-jfBiQfL2.js";
import "@tanstack/react-query";
import "react";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-DybHzttP.js";
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
function AuthenticatedLayout() {
  const {
    auth
  } = Route.useRouteContext();
  if (!auth.isReady) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) });
  }
  return /* @__PURE__ */ jsx(Outlet, {});
}
export {
  AuthenticatedLayout as component
};
