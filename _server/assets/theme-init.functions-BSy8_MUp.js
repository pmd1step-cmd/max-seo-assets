import { e as createServerRpc, a as createServerFn, g as getCookie } from "./vendor-tanstack-CnfQFLeX.js";
import { T as THEME_COOKIE } from "./theme-D1_WM6m3.js";
import "react/jsx-runtime";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "react";
import "@tanstack/react-router";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
const getInitialThemeFn_createServerFn_handler = createServerRpc({
  id: "cbb6bc6d6687d3122fe9c15a250f07265d616be9efef9da718dd570976d1d3a8",
  name: "getInitialThemeFn",
  filename: "src/lib/theme-init.functions.ts"
}, (opts) => getInitialThemeFn.__executeServer(opts));
const getInitialThemeFn = createServerFn({
  method: "GET"
}).handler(getInitialThemeFn_createServerFn_handler, async () => {
  const value = getCookie(THEME_COOKIE);
  if (value === "light" || value === "dark") return value;
  return "light";
});
export {
  getInitialThemeFn_createServerFn_handler
};
