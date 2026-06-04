import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-w3m3juJn.js";
import { N as Route } from "./router-Bes4cunC.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-C7-SPfXD.js";
import "./slugify-DPRENmKe.js";
import "./input-COWMtUwZ.js";
import "./textarea-CzhFAktu.js";
import "./label-h4oTi4cf.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-B7T5skCK.js";
import "@radix-ui/react-checkbox";
import "./tabs-C4bsIRjZ.js";
import "@radix-ui/react-tabs";
import "./select-YrLyuHjh.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-BNLmlFsW.js";
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
import "./sitemap.server-BewSkGO6.js";
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
