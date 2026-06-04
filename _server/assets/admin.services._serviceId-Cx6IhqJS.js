import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-CBa0upl0.js";
import { aw as Route } from "./router-BvhtVh2b.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-BQMlBGoY.js";
import "./slugify-DPRENmKe.js";
import "./input-DNeVRzAb.js";
import "./textarea-DZ9LDtK4.js";
import "./label-Cj_gVvp_.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-By8Mtt3q.js";
import "@radix-ui/react-checkbox";
import "./tabs-DKcsG2Fn.js";
import "@radix-ui/react-tabs";
import "./select-BMJX0ohO.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-B-8_7z8C.js";
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
