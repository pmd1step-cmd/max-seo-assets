import { e as createServerRpc, a as createServerFn } from "./vendor-tanstack-DybHzttP.js";
import { r as requireSupabaseAuth } from "./auth-middleware-DaGcjHsT.js";
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
import "@supabase/supabase-js";
const revealServiceRoleKey_createServerFn_handler = createServerRpc({
  id: "6b8b13552f92f4dab0a3aa867767d63090686451d557e4588ee383e6e36ca0ff",
  name: "revealServiceRoleKey",
  filename: "src/lib/reveal-key.functions.ts"
}, (opts) => revealServiceRoleKey.__executeServer(opts));
const revealServiceRoleKey = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(revealServiceRoleKey_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: isAdmin,
    error: rpcError
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin"
  });
  if (rpcError) {
    throw new Error(`Не удалось проверить роль: ${rpcError.message}`);
  }
  if (!isAdmin) {
    throw new Error("Доступ запрещён: требуется роль admin");
  }
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const url = process.env.SUPABASE_URL ?? "";
  const publishable = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";
  return {
    SUPABASE_URL: url,
    SUPABASE_PUBLISHABLE_KEY: publishable,
    SUPABASE_SERVICE_ROLE_KEY: key,
    // Метаданные для отладки (без значений)
    has_service_role_key: key.length > 0,
    service_role_key_length: key.length
  };
});
export {
  revealServiceRoleKey_createServerFn_handler
};
