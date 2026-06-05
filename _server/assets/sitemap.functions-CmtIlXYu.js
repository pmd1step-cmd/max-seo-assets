import { b as createServerRpc } from "./vendor-@tanstack-start-server-core-DQkimr5J.js";
import { a as buildSitemapEntries } from "./sitemap.server-D1SW1H7j.js";
import { h as createServerFn } from "./vendor-@tanstack-start-client-core-C41cjU9Y.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "./client.server-DEjuL_WB.js";
import "@supabase/supabase-js";
const getSitemapEntries_createServerFn_handler = createServerRpc({
  id: "7495b1e944a8a8a5cfe07e758520e82259347f5359e8f427606cf7c03d98d792",
  name: "getSitemapEntries",
  filename: "src/lib/sitemap.functions.ts"
}, (opts) => getSitemapEntries.__executeServer(opts));
const getSitemapEntries = createServerFn({
  method: "GET"
}).handler(getSitemapEntries_createServerFn_handler, async () => {
  try {
    return await buildSitemapEntries();
  } catch (err) {
    console.error("[getSitemapEntries] error:", err);
    return [];
  }
});
export {
  getSitemapEntries_createServerFn_handler
};
