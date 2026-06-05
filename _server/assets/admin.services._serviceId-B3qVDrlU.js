import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-Dp0_v-Wf.js";
import { aw as Route } from "./router-cxDlOnAG.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-CGBMuA6V.js";
import "./slugify-DPRENmKe.js";
import "./input-DlU9Pr1e.js";
import "./textarea-RWLRgyfF.js";
import "./label-BiWrzL7C.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-BznwiktG.js";
import "@radix-ui/react-checkbox";
import "./tabs-CyQovoJz.js";
import "@radix-ui/react-tabs";
import "./select-DYVHtNAM.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-uHAtuyCe.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-C41cjU9Y.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
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
