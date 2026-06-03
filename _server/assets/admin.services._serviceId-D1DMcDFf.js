import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-DiUY2R-u.js";
import { M as Route } from "./router-CRvJwpEG.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DAfNDS8_.js";
import "./slugify-DPRENmKe.js";
import "./input-DSH2BbCZ.js";
import "./textarea-CUGq8qmD.js";
import "./label-DB4XiV5X.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-BJiW1oNV.js";
import "@radix-ui/react-checkbox";
import "./tabs-vE6WFNc9.js";
import "@radix-ui/react-tabs";
import "./select-CSNoeKdE.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-BUKmmL_k.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "@radix-ui/react-dialog";
import "./sitemap.server-_9RNU9F4.js";
import "./client.server-DNj-FA3T.js";
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
