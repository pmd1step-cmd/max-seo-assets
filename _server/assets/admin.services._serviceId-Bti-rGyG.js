import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-CqGVUhNl.js";
import { M as Route } from "./router-D_x5CnOI.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-B28Xx6ZX.js";
import "./slugify-DPRENmKe.js";
import "./input-NiP_FRi8.js";
import "./textarea-D5mjvZgn.js";
import "./label-BDtSwWdI.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-CYNyI1l9.js";
import "@radix-ui/react-checkbox";
import "./tabs-DPBjjKWN.js";
import "@radix-ui/react-tabs";
import "./select-B7rE84Xh.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CZL9oFSC.js";
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
