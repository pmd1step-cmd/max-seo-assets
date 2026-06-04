import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-BXW6QBuM.js";
import { av as Route } from "./router-CNZS40VR.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DrULIsS6.js";
import "./slugify-DPRENmKe.js";
import "./input-BvOhrzGG.js";
import "./textarea-ij2xIvHx.js";
import "./label-BgIj_Nb2.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-hCLp8yaK.js";
import "@radix-ui/react-checkbox";
import "./tabs-DfWya0Vt.js";
import "@radix-ui/react-tabs";
import "./select-vYtGIip5.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-BB87h-KU.js";
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
