import { s as supabaseAdmin } from "./client.server-DNj-FA3T.js";
const SITE_URL = "https://maxexperts.ru";
function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}
function normalizePath(url) {
  if (!url) return "/";
  const stripped = url.replace(/^https?:\/\/[^/]+/i, "").trim();
  if (!stripped) return "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}
function toDateOnly(value, fallback) {
  return value?.split("T")[0] ?? fallback ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
async function safeSelect(label, query) {
  const { data, error } = await query;
  if (error) {
    console.error(`[sitemap] ${label} query failed:`, error.message ?? error);
    return [];
  }
  return data ?? [];
}
async function buildSitemapEntries(siteUrl = SITE_URL) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [settings, specs, cats, cases, posts, reviews, services] = await Promise.all([
    safeSelect(
      "sitemap_settings",
      supabaseAdmin.from("sitemap_settings").select("*")
    ),
    safeSelect(
      "specialists",
      supabaseAdmin.from("specialists").select("id, slug, updated_at").eq("is_published", true).eq("moderation_status", "approved")
    ),
    safeSelect("categories", supabaseAdmin.from("categories").select("slug, updated_at")),
    safeSelect(
      "cases",
      supabaseAdmin.from("cases").select("slug, updated_at").eq("is_published", true).eq("moderation_status", "approved")
    ),
    safeSelect(
      "blog_posts",
      supabaseAdmin.from("blog_posts").select("slug, updated_at").eq("is_published", true).eq("moderation_status", "approved")
    ),
    safeSelect(
      "reviews",
      supabaseAdmin.from("reviews").select("specialist_id, created_at").eq("is_approved", true)
    ),
    safeSelect(
      "services",
      supabaseAdmin.from("services").select("slug, updated_at").eq("is_published", true)
    )
  ]);
  const settingsMap = new Map(settings.map((s) => [normalizePath(s.url), s]));
  const staticPages = [
    { path: "/", lastmod: today, priority: "1.0", changefreq: "daily" },
    { path: "/specialists", lastmod: today, priority: "0.9", changefreq: "daily" },
    { path: "/blog", lastmod: today, priority: "0.8", changefreq: "daily" },
    { path: "/cases", lastmod: today, priority: "0.8", changefreq: "weekly" },
    { path: "/max-dlya-biznesa", lastmod: today, priority: "0.9", changefreq: "weekly" },
    { path: "/sitemap", lastmod: today, priority: "0.3", changefreq: "weekly" },
    { path: "/privacy-policy", lastmod: today, priority: "0.3", changefreq: "yearly" },
    { path: "/user-agreement", lastmod: today, priority: "0.3", changefreq: "yearly" }
  ];
  const categoryPages = cats.filter((c) => c.slug).map((c) => ({
    path: `/specialists/${c.slug}`,
    lastmod: toDateOnly(c.updated_at, today),
    priority: "0.7",
    changefreq: "weekly"
  }));
  const servicePages = services.filter((s) => s.slug).map((s) => ({
    path: `/uslugi/${s.slug}`,
    lastmod: toDateOnly(s.updated_at, today),
    priority: "0.9",
    changefreq: "weekly"
  }));
  const specialistPages = specs.filter((s) => s.slug).map((s) => ({
    path: `/specialist/${s.slug}`,
    lastmod: toDateOnly(s.updated_at, today),
    priority: "0.7",
    changefreq: "weekly"
  }));
  const reviewLatest = /* @__PURE__ */ new Map();
  for (const review of reviews) {
    const date = toDateOnly(review.created_at, today);
    const existing = reviewLatest.get(review.specialist_id);
    if (!existing || date > existing) reviewLatest.set(review.specialist_id, date);
  }
  for (const entry of specialistPages) {
    const slug = entry.path.replace("/specialist/", "");
    const specialist = specs.find(
      (item) => item.slug === slug
    );
    if (!specialist) continue;
    const reviewDate = reviewLatest.get(specialist.id);
    if (reviewDate && reviewDate > entry.lastmod) entry.lastmod = reviewDate;
  }
  const casePages = cases.filter((c) => c.slug).map((c) => ({
    path: `/cases/${c.slug}`,
    lastmod: toDateOnly(c.updated_at, today),
    priority: "0.6",
    changefreq: "monthly"
  }));
  const blogPages = posts.filter((p) => p.slug).map((p) => ({
    path: `/blog/${p.slug}`,
    lastmod: toDateOnly(p.updated_at, today),
    priority: "0.6",
    changefreq: "monthly"
  }));
  const manualPages = settings.filter((s) => s.is_manual && !s.is_excluded).map((s) => ({
    path: normalizePath(s.url),
    lastmod: toDateOnly(s.updated_at, today),
    priority: s.priority ?? "0.5",
    changefreq: s.changefreq ?? "monthly"
  }));
  const seen = /* @__PURE__ */ new Set();
  const allPages = [
    ...staticPages,
    ...servicePages,
    ...categoryPages,
    ...specialistPages,
    ...casePages,
    ...blogPages,
    ...manualPages
  ];
  const entries = [];
  for (const page of allPages) {
    const path = normalizePath(page.path);
    if (seen.has(path)) continue;
    seen.add(path);
    const override = settingsMap.get(path);
    if (override?.is_excluded) continue;
    entries.push({
      loc: `${siteUrl}${path}`,
      path,
      lastmod: page.lastmod,
      changefreq: override?.changefreq ?? page.changefreq,
      priority: override?.priority ?? page.priority
    });
  }
  return entries;
}
async function buildSitemapXml(siteUrl = SITE_URL) {
  const entries = await buildSitemapEntries(siteUrl);
  const urlBlocks = entries.map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join("\n")}
</urlset>
`;
}
export {
  buildSitemapXml as a,
  buildSitemapEntries as b
};
