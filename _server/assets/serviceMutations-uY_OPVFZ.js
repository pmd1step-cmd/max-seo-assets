import { s as supabase } from "./router-DJFIfEch.js";
function rowToPayload(row) {
  return {
    slug: row.slug.trim(),
    name: row.name.trim(),
    short_description: row.short_description,
    icon: row.icon,
    hero_h1: row.hero_h1,
    hero_subtitle: row.hero_subtitle,
    hero_cta_primary: row.hero_cta_primary,
    hero_cta_secondary: row.hero_cta_secondary,
    hero_microtext: row.hero_microtext,
    hero_image: row.hero_image,
    // legacy дублируем из новых блоков (на случай если фронт ещё читает старые)
    what_includes: row.block_what_included.items,
    audiences: row.block_audience.items,
    block_what_included: row.block_what_included,
    block_audience: row.block_audience,
    block_process: row.block_process,
    block_cases: row.block_cases,
    block_specialists: row.block_specialists,
    block_final_cta: row.block_final_cta,
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    og_image: row.og_image,
    seo_canonical: row.seo_canonical,
    seo_robots_index: row.seo_robots_index,
    seo_robots_follow: row.seo_robots_follow,
    status: row.status,
    show_on_homepage: row.show_on_homepage,
    show_on_hub: row.show_on_hub,
    sort_order: row.sort_order
  };
}
async function pushRevision(serviceId, comment) {
  const { data: row } = await supabase.from("services").select("*").eq("id", serviceId).maybeSingle();
  if (!row) return;
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("service_revisions").insert({
    service_id: serviceId,
    snapshot: row,
    comment: comment ?? null,
    created_by: user?.id ?? null
  });
}
async function createService(row) {
  const { data: { user } } = await supabase.auth.getUser();
  const payload = {
    ...rowToPayload(row),
    created_by: user?.id ?? null,
    updated_by: user?.id ?? null
  };
  const { data, error } = await supabase.from("services").insert(payload).select("id").single();
  if (error) throw error;
  await pushRevision(data.id, "Создание");
  return data.id;
}
async function updateService(row) {
  const { data: { user } } = await supabase.auth.getUser();
  const payload = {
    ...rowToPayload(row),
    updated_by: user?.id ?? null
  };
  const { error } = await supabase.from("services").update(payload).eq("id", row.id);
  if (error) throw error;
  await pushRevision(row.id);
}
async function duplicateService(id) {
  const { data: src, error: e1 } = await supabase.from("services").select("*").eq("id", id).single();
  if (e1) throw e1;
  const { data: { user } } = await supabase.auth.getUser();
  const newName = `${src.name} (копия)`;
  let newSlug = `${src.slug}-kopiya`;
  for (let i = 2; i < 50; i++) {
    const { data: exists } = await supabase.from("services").select("id").eq("slug", newSlug).maybeSingle();
    if (!exists) break;
    newSlug = `${src.slug}-kopiya-${i}`;
  }
  const dest = {
    ...src,
    name: newName,
    slug: newSlug,
    status: "draft",
    published_at: null,
    created_by: user?.id ?? null,
    updated_by: user?.id ?? null
  };
  delete dest.id;
  delete dest.created_at;
  delete dest.updated_at;
  delete dest.is_published;
  const { data: created, error: e2 } = await supabase.from("services").insert(dest).select("id").single();
  if (e2) throw e2;
  const { data: tags } = await supabase.from("service_tags").select("category_id").eq("service_id", id);
  if (tags && tags.length > 0) {
    await supabase.from("service_tags").insert(
      tags.map((t) => ({ service_id: created.id, category_id: t.category_id }))
    );
  }
  return created.id;
}
async function changeStatus(ids, status) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("services").update({ status, updated_by: user?.id ?? null }).in("id", ids);
  if (error) throw error;
  for (const id of ids) await pushRevision(id, `Статус: ${status}`);
}
async function deleteService(id, mode, target) {
  if (mode === "archive") {
    await changeStatus([id], "archived");
    return;
  }
  const { data: src } = await supabase.from("services").select("slug").eq("id", id).maybeSingle();
  const slug = src?.slug;
  if (mode === "redirect") {
    if (!slug) throw new Error("Услуга не найдена");
    if (!target) throw new Error("Не указан адрес перенаправления");
    const { data: { user } } = await supabase.auth.getUser();
    const { error: re } = await supabase.from("redirects").upsert(
      {
        from_path: `/uslugi/${slug}`,
        to_path: target,
        status_code: 301,
        source: "service-delete",
        created_by: user?.id ?? null
      },
      { onConflict: "from_path" }
    );
    if (re) throw re;
  }
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}
async function reorderServices(orderedIds) {
  const updates = orderedIds.map((id, idx) => ({ id, sort_order: idx }));
  await Promise.all(
    updates.map(
      (u) => supabase.from("services").update({ sort_order: u.sort_order }).eq("id", u.id)
    )
  );
}
async function setServiceTags(serviceId, categoryIds) {
  await supabase.from("service_tags").delete().eq("service_id", serviceId);
  if (categoryIds.length > 0) {
    const rows = categoryIds.map((cid) => ({ service_id: serviceId, category_id: cid }));
    const { error } = await supabase.from("service_tags").insert(rows);
    if (error) throw error;
  }
}
async function restoreRevision(serviceId, revisionId) {
  const { data: rev, error: e1 } = await supabase.from("service_revisions").select("snapshot").eq("id", revisionId).single();
  if (e1) throw e1;
  const snap = rev.snapshot;
  const { data: { user } } = await supabase.auth.getUser();
  const payload = {
    slug: snap.slug,
    name: snap.name,
    short_description: snap.short_description,
    icon: snap.icon,
    hero_h1: snap.hero_h1,
    hero_subtitle: snap.hero_subtitle,
    hero_cta_primary: snap.hero_cta_primary,
    hero_cta_secondary: snap.hero_cta_secondary,
    hero_microtext: snap.hero_microtext,
    hero_image: snap.hero_image,
    what_includes: snap.what_includes,
    audiences: snap.audiences,
    block_what_included: snap.block_what_included,
    block_audience: snap.block_audience,
    block_process: snap.block_process,
    block_cases: snap.block_cases,
    block_specialists: snap.block_specialists,
    block_final_cta: snap.block_final_cta,
    meta_title: snap.meta_title,
    meta_description: snap.meta_description,
    og_image: snap.og_image,
    seo_canonical: snap.seo_canonical,
    seo_robots_index: snap.seo_robots_index,
    seo_robots_follow: snap.seo_robots_follow,
    status: snap.status,
    show_on_homepage: snap.show_on_homepage,
    show_on_hub: snap.show_on_hub,
    sort_order: snap.sort_order,
    updated_by: user?.id ?? null
  };
  const { error } = await supabase.from("services").update(payload).eq("id", serviceId);
  if (error) throw error;
  await pushRevision(serviceId, "Откат к ревизии");
}
export {
  reorderServices as a,
  changeStatus as b,
  createService as c,
  duplicateService as d,
  deleteService as e,
  restoreRevision as r,
  setServiceTags as s,
  updateService as u
};
