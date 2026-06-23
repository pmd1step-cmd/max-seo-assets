import { jsx } from "react/jsx-runtime";
import { S as ServiceEditor } from "./ServiceEditor-VokCYc4J.js";
import { O as Route } from "./router-ClLXIf0i.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
import "lucide-react";
import "zod";
import "./serviceMutations-RJ69e8RH.js";
import "./slugify-DPRENmKe.js";
import "./input-CxMC9Vc-.js";
import "./textarea-CC8jS2Jf.js";
import "./label-Cucl3Qoj.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./checkbox-BndPrn3t.js";
import "@radix-ui/react-checkbox";
import "./tabs-DZUpW7OD.js";
import "@radix-ui/react-tabs";
import "./select-fff4GoQo.js";
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
