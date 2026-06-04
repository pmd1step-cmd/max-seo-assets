import { a as createServerRpc, s as setCookie$1 } from "./vendor-@tanstack-start-server-core-CSbRTQ_y.js";
import { h as createServerFn } from "./vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
const THEME_COOKIE = "maxexperts-theme";
const setThemeCookieFn_createServerFn_handler = createServerRpc({
  id: "29ced5f2dcc7c1623059e1e6889516930b4805911d8c04c06e8ff1063d06cca5",
  name: "setThemeCookieFn",
  filename: "src/lib/theme.functions.ts"
}, (opts) => setThemeCookieFn.__executeServer(opts));
const setThemeCookieFn = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (data.theme !== "light" && data.theme !== "dark") {
    throw new Error("Invalid theme");
  }
  return data;
}).handler(setThemeCookieFn_createServerFn_handler, async ({
  data
}) => {
  setCookie$1(THEME_COOKIE, data.theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    // 1 год
    sameSite: "lax",
    httpOnly: false
    // нужен доступ из JS на клиенте
  });
  return {
    ok: true,
    theme: data.theme
  };
});
export {
  setThemeCookieFn_createServerFn_handler
};
