import { jsx } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
import { R as RouteError } from "./RouteError-P6YbcEMU.js";
import "@tanstack/react-router";
import "./router-C-JuM0Ak.js";
import "@tanstack/react-query";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-B8qFd-8f.js";
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
import "./sitemap.server-BVrO7XJx.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
function BlogSpinner() {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) });
}
const SplitErrorComponent = ({
  error,
  reset
}) => /* @__PURE__ */ jsx(RouteError, { error, reset, title: "Не удалось загрузить блог" });
export {
  BlogSpinner,
  SplitErrorComponent as errorComponent
};
