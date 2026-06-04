import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-DT8iroDn.js";
import { M as Route } from "./router-B8WkfRFF.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-Bp-ce-5v.js";
import "./slugify-DPRENmKe.js";
import "./input-La8udyUD.js";
import "./textarea-DBlEa78e.js";
import "./label-BHzQtKqY.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-CE0_cvNK.js";
import "@radix-ui/react-checkbox";
import "./tabs-DlmA9nay.js";
import "@radix-ui/react-tabs";
import "./select-bqdNaB8R.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CSbRTQ_y.js";
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
