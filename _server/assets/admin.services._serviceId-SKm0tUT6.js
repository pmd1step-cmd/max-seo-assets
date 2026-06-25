import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-BDaWw2QB.js";
import { av as Route } from "./router-CU9EeC6X.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DsIs-2nl.js";
import "./slugify-DPRENmKe.js";
import "./input-D9qVVM7e.js";
import "./textarea-C-NwCKoH.js";
import "./label-CQUfrnuH.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-DXQCui_6.js";
import "@radix-ui/react-checkbox";
import "./tabs-DxvaGK1J.js";
import "@radix-ui/react-tabs";
import "./select-BPeIR1PJ.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-0xLTZYnB.js";
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
