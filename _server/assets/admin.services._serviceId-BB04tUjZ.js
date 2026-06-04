import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-BznXW6ax.js";
import { av as Route } from "./router-B__nZi39.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-BYkCjyyw.js";
import "./slugify-DPRENmKe.js";
import "./input-VOUuDOGh.js";
import "./textarea-ZbwFwkka.js";
import "./label-D0Jk7M9U.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-fZPYY-rt.js";
import "@radix-ui/react-checkbox";
import "./tabs-DpFpxYLv.js";
import "@radix-ui/react-tabs";
import "./select-acZekWiJ.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-BmXFLdnG.js";
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
