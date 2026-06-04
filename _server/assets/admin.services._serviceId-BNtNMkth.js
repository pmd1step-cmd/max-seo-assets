import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-Dl0SdNTs.js";
import { av as Route } from "./router-BfeJRAWz.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-Ch2F27uY.js";
import "./slugify-DPRENmKe.js";
import "./input-CWy4xDHh.js";
import "./textarea-BonBXFBs.js";
import "./label-vRVpglKB.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-D7TGN-rQ.js";
import "@radix-ui/react-checkbox";
import "./tabs-OcvOPuqs.js";
import "@radix-ui/react-tabs";
import "./select-DuYzs_-d.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CQIESKJI.js";
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
