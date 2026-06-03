import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-6ozj0AwC.js";
import { M as Route } from "./router-DeAkxk-P.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DH7UeQyv.js";
import "./slugify-DPRENmKe.js";
import "./input-BFEQuVZo.js";
import "./textarea-DL3H4KLW.js";
import "./label-CX-xtoOs.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-zdqZ5C5_.js";
import "@radix-ui/react-checkbox";
import "./tabs-4a3VqT3w.js";
import "@radix-ui/react-tabs";
import "./select-YjjybuZL.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Ci2KmD1v.js";
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
