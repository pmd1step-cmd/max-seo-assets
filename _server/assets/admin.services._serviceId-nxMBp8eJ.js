import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-DMoQ2T8F.js";
import { M as Route } from "./router-Dn0X0tIv.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-Yg2IHymL.js";
import "./slugify-DPRENmKe.js";
import "./input-mWM98W_L.js";
import "./textarea-UHedjlW5.js";
import "./label-DJ2v2Gec.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-CmL_6RM5.js";
import "@radix-ui/react-checkbox";
import "./tabs-lGT_NoyB.js";
import "@radix-ui/react-tabs";
import "./select-yuLvPCzP.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-DBOu91YS.js";
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
