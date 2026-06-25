import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-DI6HaNKZ.js";
import { av as Route } from "./router-DuTJZkD0.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DJXjBC9h.js";
import "./slugify-DPRENmKe.js";
import "./input-B0gQlbTn.js";
import "./textarea-CQGwEPwL.js";
import "./label-BynslqYk.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-C2JqC5YE.js";
import "@radix-ui/react-checkbox";
import "./tabs-BZbUc80J.js";
import "@radix-ui/react-tabs";
import "./select-BJVaKbVa.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-CnfQFLeX.js";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
function EditServiceRoute() {
  const {
    serviceId
  } = Route.useParams();
  return /* @__PURE__ */ jsx(ServiceEditor, { mode: "edit", serviceId });
}
export {
  EditServiceRoute as component
};
