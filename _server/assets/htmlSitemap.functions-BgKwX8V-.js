import { b as createServerRpc } from "./vendor-@tanstack-start-server-core-Dg4W7TWN.js";
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
async function safe(p) {
  try {
    const {
      data,
      error
    } = await p;
    if (error) {
      console.error("[htmlSitemap] query error:", error);
      return [];
    }
    return data ?? [];
  } catch (e) {
    console.error("[htmlSitemap] query exception:", e);
    return [];
  }
}
const getHtmlSitemap_createServerFn_handler = createServerRpc({
  id: "03eb80c9fe699e90a5241b29c2418a64adf0e37ec2686bf6faa3accedd59a269",
  name: "getHtmlSitemap",
  filename: "src/lib/htmlSitemap.functions.ts"
}, (opts) => getHtmlSitemap.__executeServer(opts));
const getHtmlSitemap = createServerFn({
  method: "GET"
}).handler(getHtmlSitemap_createServerFn_handler, async () => {
  const [services, categories, specialists, cases, posts] = await Promise.all([safe(supabaseAdmin.from("services").select("slug, name").eq("is_published", true).order("name")), safe(supabaseAdmin.from("categories").select("slug, name, type").order("name")), safe(supabaseAdmin.from("specialists").select("slug, name, brand_name").eq("is_published", true).eq("moderation_status", "approved").order("name")), safe(supabaseAdmin.from("cases").select("slug, title").eq("is_published", true).eq("moderation_status", "approved").order("title")), safe(supabaseAdmin.from("blog_posts").select("slug, title").eq("is_published", true).eq("moderation_status", "approved").order("title"))]);
  return {
    staticPages: [{
      label: "Главная",
      path: "/"
    }, {
      label: "Каталог специалистов",
      path: "/specialists"
    }, {
      label: "Услуги для бизнеса",
      path: "/max-dlya-biznesa"
    }, {
      label: "Кейсы",
      path: "/cases"
    }, {
      label: "Блог",
      path: "/blog"
    }, {
      label: "Политика конфиденциальности",
      path: "/privacy-policy"
    }, {
      label: "Согласие на обработку персональных данных",
      path: "/user-agreement"
    }],
    services: services.filter((s) => s.slug && s.name).map((s) => ({
      label: s.name,
      path: `/uslugi/${s.slug}`
    })),
    taskCategories: categories.filter((c) => c.type === "task" && c.slug).map((c) => ({
      label: c.name,
      path: `/specialists/${c.slug}`
    })),
    nicheCategories: categories.filter((c) => c.type === "niche" && c.slug).map((c) => ({
      label: c.name,
      path: `/specialists/${c.slug}`
    })),
    specialists: specialists.filter((s) => !!s.slug).map((s) => ({
      label: s.brand_name?.trim() || s.name?.trim() || s.slug,
      path: `/specialist/${s.slug}`
    })),
    cases: cases.filter((c) => c.slug && c.title).map((c) => ({
      label: c.title,
      path: `/cases/${c.slug}`
    })),
    blogPosts: posts.filter((p) => p.slug && p.title).map((p) => ({
      label: p.title,
      path: `/blog/${p.slug}`
    }))
  };
});
export {
  getHtmlSitemap_createServerFn_handler
};
