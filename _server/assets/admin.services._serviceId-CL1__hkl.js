import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-BZUDXCrp.js";
import { O as Route } from "./router-DJFIfEch.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-uY_OPVFZ.js";
import "./slugify-DPRENmKe.js";
import "./input-Cj9UG_D4.js";
import "./textarea-DPkDLA8P.js";
import "./label-B6JHAMlA.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-Br2NU6XT.js";
import "@radix-ui/react-checkbox";
import "./tabs-DWXoypgy.js";
import "@radix-ui/react-tabs";
import "./select-TZ0Ulukl.js";
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
