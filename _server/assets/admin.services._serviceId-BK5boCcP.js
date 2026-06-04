import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-DMA-qcZv.js";
import { M as Route } from "./router-C7PFiMKM.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-sZuL-rM5.js";
import "./slugify-DPRENmKe.js";
import "./input-D45tfsjj.js";
import "./textarea-BVOWNLtl.js";
import "./label-CIrBNpX9.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-DofvvFMy.js";
import "@radix-ui/react-checkbox";
import "./tabs-C5e5flFo.js";
import "@radix-ui/react-tabs";
import "./select-D1_iDQmx.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-DFdczEgR.js";
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
