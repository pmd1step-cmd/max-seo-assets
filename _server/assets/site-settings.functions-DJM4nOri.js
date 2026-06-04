import { b as createServerRpc } from "./vendor-@tanstack-start-server-core-CKDW8voY.js";
import { s as supabaseAdmin } from "./client.server-DEjuL_WB.js";
import { h as createServerFn } from "./vendor-@tanstack-start-client-core-C41cjU9Y.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@supabase/supabase-js";
const DEFAULT_ROBOTS_TXT = "User-agent: *\nDisallow: /\n\nSitemap: https://maxexperts.ru/sitemap.xml\n";
function extractScripts(html) {
  const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  const parts = [];
  let m;
  while ((m = re.exec(html)) !== null) parts.push(m[1]);
  return parts.join("\n");
}
function extractNoscript(html) {
  const re = /<noscript\b[^>]*>([\s\S]*?)<\/noscript>/gi;
  const parts = [];
  let m;
  while ((m = re.exec(html)) !== null) parts.push(m[1]);
  return parts.join("\n");
}
const getSiteSettingsFn_createServerFn_handler = createServerRpc({
  id: "8604e91a3b17b3cb4113e226a3b90ed51d427dc03a30494a60ba86efdef44c63",
  name: "getSiteSettingsFn",
  filename: "src/lib/site-settings.functions.ts"
}, (opts) => getSiteSettingsFn.__executeServer(opts));
const getSiteSettingsFn = createServerFn({
  method: "GET"
}).handler(getSiteSettingsFn_createServerFn_handler, async () => {
  try {
    const {
      data,
      error
    } = await supabaseAdmin.from("site_settings").select("metrika_code, verification_files, robots_txt, custom_head_code").limit(1).maybeSingle();
    const empty = {
      metrika_code: "",
      metrika_script: "",
      metrika_noscript: "",
      verification_files: [],
      robots_txt: DEFAULT_ROBOTS_TXT,
      custom_head_code: ""
    };
    if (error || !data) return empty;
    const files = Array.isArray(data.verification_files) ? data.verification_files : [];
    const raw = data.metrika_code ?? "";
    const hasScriptTag = /<script\b/i.test(raw);
    const script = hasScriptTag ? extractScripts(raw) : raw;
    const noscript = extractNoscript(raw);
    const extra = data;
    const robotsRaw = extra.robots_txt;
    return {
      metrika_code: raw,
      metrika_script: script,
      metrika_noscript: noscript,
      verification_files: files,
      robots_txt: robotsRaw && robotsRaw.length > 0 ? robotsRaw : DEFAULT_ROBOTS_TXT,
      custom_head_code: extra.custom_head_code ?? ""
    };
  } catch (err) {
    console.error("[getSiteSettingsFn] failed:", err);
    return {
      metrika_code: "",
      metrika_script: "",
      metrika_noscript: "",
      verification_files: [],
      robots_txt: DEFAULT_ROBOTS_TXT,
      custom_head_code: ""
    };
  }
});
export {
  getSiteSettingsFn_createServerFn_handler
};
