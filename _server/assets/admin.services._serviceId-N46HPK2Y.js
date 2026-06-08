import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-BANSG9c4.js";
import { O as Route } from "./router-CvfqUwn4.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-DHwAxWB_.js";
import "./slugify-DPRENmKe.js";
import "./input-CsgcuEnz.js";
import "./textarea-DQIAemDf.js";
import "./label-pz4Vy_IL.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-BakrY_j1.js";
import "@radix-ui/react-checkbox";
import "./tabs-DLo9_c-N.js";
import "@radix-ui/react-tabs";
import "./select-Djm-miL1.js";
import "@radix-ui/react-select";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "@radix-ui/react-dialog";
import "./sitemap.server-DTsMGolV.js";
import "./client.server-DEjuL_WB.js";
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
