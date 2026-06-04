import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-neDOJwgW.js";
import { av as Route } from "./router-Ame665Aj.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DV0SmFwu.js";
import "./slugify-DPRENmKe.js";
import "./input-BFaOzrPc.js";
import "./textarea-C9NHj5PG.js";
import "./label-rmn-EVog.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-4OxpJO7L.js";
import "@radix-ui/react-checkbox";
import "./tabs-BxA0qZHD.js";
import "@radix-ui/react-tabs";
import "./select-yjRkvune.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Cpfbehp8.js";
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
import "./sitemap.server-BVrO7XJx.js";
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
