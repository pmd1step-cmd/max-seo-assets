import { e as createServerRpc, a as createServerFn, s as setCookie$1 } from "./vendor-tanstack-CnfQFLeX.js";
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
