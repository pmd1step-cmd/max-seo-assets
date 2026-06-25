import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-BrTR0GJ-.js";
import { O as Route } from "./router-COYVRa-T.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-C48Zri8H.js";
import "./slugify-DPRENmKe.js";
import "./input-BkSNRqWr.js";
import "./textarea-B8ky3qYq.js";
import "./label-BY59RQbb.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-DK0p-V9z.js";
import "@radix-ui/react-checkbox";
import "./tabs-CJyUkwd2.js";
import "@radix-ui/react-tabs";
import "./select-Dyk8BIxg.js";
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
