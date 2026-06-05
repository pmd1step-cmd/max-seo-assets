import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-DbGZDOCE.js";
import { aw as Route } from "./router-DFdIRS9W.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DM8rGmwx.js";
import "./slugify-DPRENmKe.js";
import "./input-DZWG7XLg.js";
import "./textarea-B4-sZNXW.js";
import "./label-BQaw5Rh5.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-qksrPALK.js";
import "@radix-ui/react-checkbox";
import "./tabs-JeGTfkPU.js";
import "@radix-ui/react-tabs";
import "./select-ClrGoaqr.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CEYmFpEQ.js";
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
