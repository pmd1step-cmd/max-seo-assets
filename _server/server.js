import { c as createStartHandler } from "./assets/vendor-@tanstack-start-server-core-BmXFLdnG.js";
import { d as defaultStreamHandler } from "./assets/vendor-@tanstack-react-start-server-B9hs-JjY.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./assets/vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "./assets/vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const fetchHandler = createStartHandler(defaultStreamHandler);
const SKIP_PREFIXES = ["/_build/", "/assets/", "/api/", "/@", "/__"];
function shouldSkip(pathname) {
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".")) return true;
  return false;
}
const server = {
  async fetch(request, ...rest) {
    const url = new URL(request.url);
    if (!shouldSkip(url.pathname) && /[A-Z]/.test(url.pathname)) {
      const target = new URL(url.toString());
      target.pathname = url.pathname.toLowerCase();
      return Response.redirect(target.toString(), 301);
    }
    return fetchHandler(request, ...rest);
  }
};
export {
  server as default
};
