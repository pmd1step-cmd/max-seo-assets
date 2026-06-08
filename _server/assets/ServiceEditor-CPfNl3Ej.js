import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useBlocker, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, AlertCircle, Check, Eye, History, Save } from "lucide-react";
import { z } from "zod";
import { J as adminServiceByIdQuery, K as serviceTagsQuery, L as serviceRevisionsQuery, c as categoriesQuery, M as makeEmptyService, B as Button, D as Dialog, y as DialogContent, z as DialogHeader, A as DialogTitle, N as DialogFooter } from "./router-qVa21U4f.js";
import { c as createService, u as updateService, s as setServiceTags, r as restoreRevision } from "./serviceMutations-BeMAdWo9.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
import { I as Input } from "./input-DXlOfp07.js";
import { T as Textarea } from "./textarea-ZEKPe5BN.js";
import { L as Label } from "./label-DYiJDhbq.js";
import { C as Checkbox } from "./checkbox-HQDfbHHl.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BcyjHnku.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-lO_wVOqS.js";
const requiredString = (msg) => z.preprocess((v) => v == null ? "" : v, z.string().trim()).refine((v) => v.length > 0, { message: msg });
const publishSchema = z.object({
  name: requiredString("Название обязательно"),
  slug: z.preprocess((v) => v == null ? "" : v, z.string().trim()).refine((v) => v.length > 0, { message: "Slug обязателен" }).refine((v) => v.length === 0 || /^[a-z0-9-]+$/.test(v), {
    message: "Только латиница, цифры и дефис"
  }),
  meta_title: requiredString("SEO Title обязателен"),
  meta_description: requiredString("SEO Description обязателен")
});
const FIELD_TAB = {
  name: "general",
  slug: "general",
  meta_title: "seo",
  meta_description: "seo"
};
function ServiceEditor({ mode, serviceId }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data: existing } = useQuery({
    ...serviceId ? adminServiceByIdQuery(serviceId) : adminServiceByIdQuery("__none__"),
    enabled: mode === "edit" && !!serviceId
  });
  const { data: existingTags } = useQuery({
    ...serviceId ? serviceTagsQuery(serviceId) : serviceTagsQuery("__none__"),
    enabled: mode === "edit" && !!serviceId
  });
  const { data: revisions } = useQuery({
    ...serviceId ? serviceRevisionsQuery(serviceId) : serviceRevisionsQuery("__none__"),
    enabled: mode === "edit" && !!serviceId
  });
  const { data: categories } = useQuery(categoriesQuery());
  const [form, setForm] = useState(makeEmptyService());
  const [tagIds, setTagIds] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const initialized = useRef(false);
  useEffect(() => {
    if (mode === "edit" && existing && !initialized.current) {
      setForm(existing);
      initialized.current = true;
    }
    if (mode === "edit" && existingTags) setTagIds(existingTags);
  }, [mode, existing, existingTags]);
  useBlocker({
    shouldBlockFn: () => dirty,
    withResolver: false
  });
  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);
  const update = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
    const keys = Object.keys(patch);
    if (keys.some((k) => k in errors)) {
      setErrors((prev) => {
        const next = { ...prev };
        for (const k of keys) delete next[k];
        return next;
      });
    }
  };
  const saveMut = useMutation({
    mutationFn: async (publish) => {
      const payload = {
        ...form,
        status: publish ? "published" : form.status === "published" ? "published" : "draft"
      };
      let id = form.id;
      if (mode === "create") {
        id = await createService(payload);
      } else {
        await updateService(payload);
      }
      await setServiceTags(id, tagIds);
      return id;
    },
    onSuccess: (id, publish) => {
      setDirty(false);
      setSavedAt(/* @__PURE__ */ new Date());
      toast.success(publish ? "Опубликовано" : "Сохранено");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["admin", "service", id] });
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["service", form.slug] });
      if (mode === "create") {
        navigate({ to: "/admin/services/$serviceId", params: { serviceId: id } });
      }
    },
    onError: (e) => toast.error(e.message)
  });
  const restoreMut = useMutation({
    mutationFn: (revisionId) => restoreRevision(form.id, revisionId),
    onSuccess: () => {
      toast.success("Откат выполнен. Перезагружаю.");
      setHistoryOpen(false);
      qc.invalidateQueries({ queryKey: ["admin", "service", form.id] });
      initialized.current = false;
    },
    onError: (e) => toast.error(e.message)
  });
  const handlePublish = () => {
    const r = publishSchema.safeParse(form);
    if (!r.success) {
      const fieldErrors = {};
      for (const issue of r.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstKey = Object.keys(fieldErrors)[0];
      const tab = firstKey ? FIELD_TAB[firstKey] : null;
      if (tab) setActiveTab(tab);
      const msg = Object.values(fieldErrors).map((m) => `• ${m}`).join("\n");
      toast.error(`Нельзя опубликовать:
${msg}`);
      return;
    }
    setErrors({});
    saveMut.mutate(true);
  };
  const onNameChange = (name) => {
    update({
      name,
      slug: mode === "create" && !form.slug ? slugify(name) : form.slug,
      hero_h1: form.hero_h1 ?? `${name} в МАКС для бизнеса`
    });
  };
  const tasks = useMemo(() => (categories ?? []).filter((c) => c.type === "task"), [categories]);
  const niches = useMemo(() => (categories ?? []).filter((c) => c.type === "niche"), [categories]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "icon", children: /* @__PURE__ */ jsx(Link, { to: "/admin/services", children: /* @__PURE__ */ jsx(ArrowLeft, {}) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: mode === "create" ? "Новая услуга" : form.name || "Услуга" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground flex items-center gap-2", children: dirty ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(AlertCircle, { size: 12, className: "text-accent" }),
            " Есть изменения"
          ] }) : savedAt ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { size: 12, className: "text-primary" }),
            " Сохранено",
            " ",
            savedAt.toLocaleTimeString("ru-RU")
          ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Без изменений" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        mode === "edit" && form.slug && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxs("a", { href: `/uslugi/${form.slug}`, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsx(Eye, {}),
          " Предпросмотр"
        ] }) }),
        mode === "edit" && (revisions?.length ?? 0) > 0 && /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setHistoryOpen(true), children: [
          /* @__PURE__ */ jsx(History, {}),
          " История"
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => saveMut.mutate(false),
            disabled: saveMut.isPending || !form.name.trim(),
            children: [
              /* @__PURE__ */ jsx(Save, {}),
              " Сохранить черновик"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handlePublish,
            disabled: saveMut.isPending,
            className: "gradient-bg",
            children: "Опубликовать"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "general", children: "Основное" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "hero", children: "Hero" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "blocks", children: "Блоки" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "seo", children: "SEO" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "links", children: "Связи" })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "general", className: "space-y-4 pt-4", children: [
        /* @__PURE__ */ jsx(Field, { label: "Название услуги *", error: errors.name, children: /* @__PURE__ */ jsx(Input, { value: form.name, onChange: (e) => onNameChange(e.target.value) }) }),
        /* @__PURE__ */ jsx(Field, { label: "URL slug *", hint: "Латиница, цифры, дефис. Уникален среди услуг.", error: errors.slug, children: /* @__PURE__ */ jsx(
          Input,
          {
            value: form.slug,
            onChange: (e) => update({ slug: e.target.value }),
            placeholder: "naprimer-reklama"
          }
        ) }),
        /* @__PURE__ */ jsx(Field, { label: "Краткое описание", children: /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 2,
            value: form.short_description ?? "",
            onChange: (e) => update({ short_description: e.target.value || null })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsx(Field, { label: "Иконка (lucide-имя или emoji)", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.icon ?? "",
              onChange: (e) => update({ icon: e.target.value || null }),
              placeholder: "Megaphone"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Порядок сортировки", children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              value: form.sort_order,
              onChange: (e) => update({ sort_order: Number(e.target.value) || 0 })
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Статус", children: /* @__PURE__ */ jsxs(
            Select,
            {
              value: form.status,
              onValueChange: (v) => update({ status: v }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "draft", children: "Черновик" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "published", children: "Опубликовано" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "archived", children: "В архиве" })
                ] })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "hero", className: "space-y-4 pt-4", children: [
        /* @__PURE__ */ jsx(Field, { label: "H1", hint: "По умолчанию: «{Название} в МАКС для бизнеса»", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: form.hero_h1 ?? "",
            onChange: (e) => update({ hero_h1: e.target.value || null })
          }
        ) }),
        /* @__PURE__ */ jsx(Field, { label: "Подзаголовок", children: /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 3,
            value: form.hero_subtitle ?? "",
            onChange: (e) => update({ hero_subtitle: e.target.value || null })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsx(Field, { label: "Текст основной CTA", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.hero_cta_primary ?? "",
              onChange: (e) => update({ hero_cta_primary: e.target.value || null })
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Текст вторичной CTA", children: /* @__PURE__ */ jsx(
            Input,
            {
              value: form.hero_cta_secondary ?? "",
              onChange: (e) => update({ hero_cta_secondary: e.target.value || null })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "Микротекст под кнопками", children: /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 2,
            value: form.hero_microtext ?? "",
            onChange: (e) => update({ hero_microtext: e.target.value || null })
          }
        ) }),
        /* @__PURE__ */ jsx(Field, { label: "Hero-изображение (URL)", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: form.hero_image ?? "",
            onChange: (e) => update({ hero_image: e.target.value || null })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "blocks", className: "space-y-6 pt-4", children: [
        /* @__PURE__ */ jsx(
          BlockHeader,
          {
            title: "Что входит в услугу",
            block: form.block_what_included,
            onChange: (v) => update({ block_what_included: v })
          }
        ),
        /* @__PURE__ */ jsx(
          ItemsEditor,
          {
            items: form.block_what_included.items,
            onChange: (items) => update({ block_what_included: { ...form.block_what_included, items } })
          }
        ),
        /* @__PURE__ */ jsx(
          BlockHeader,
          {
            title: "Кому подойдёт",
            block: form.block_audience,
            onChange: (v) => update({ block_audience: v })
          }
        ),
        /* @__PURE__ */ jsx(
          ItemsEditor,
          {
            items: form.block_audience.items,
            onChange: (items) => update({ block_audience: { ...form.block_audience, items } })
          }
        ),
        /* @__PURE__ */ jsx(
          BlockHeader,
          {
            title: "Как мы работаем",
            block: form.block_process,
            onChange: (v) => update({ block_process: v })
          }
        ),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: form.block_process.use_global,
              onCheckedChange: (v) => update({
                block_process: { ...form.block_process, use_global: !!v }
              })
            }
          ),
          "Использовать стандартные шаги"
        ] }),
        /* @__PURE__ */ jsx(
          BlockHeader,
          {
            title: "Кейсы",
            block: form.block_cases,
            onChange: (v) => update({ block_cases: v })
          }
        ),
        /* @__PURE__ */ jsx(
          BlockHeader,
          {
            title: "Исполнители под задачу",
            block: form.block_specialists,
            onChange: (v) => update({ block_specialists: v })
          }
        ),
        /* @__PURE__ */ jsx(
          BlockHeader,
          {
            title: "Финальный CTA",
            block: form.block_final_cta,
            onChange: (v) => update({ block_final_cta: v })
          }
        ),
        /* @__PURE__ */ jsx(Field, { label: "Текст CTA", children: /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 2,
            value: form.block_final_cta.text,
            onChange: (e) => update({
              block_final_cta: { ...form.block_final_cta, text: e.target.value }
            })
          }
        ) }),
        /* @__PURE__ */ jsx(Field, { label: "Текст кнопки", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: form.block_final_cta.button_text,
            onChange: (e) => update({
              block_final_cta: {
                ...form.block_final_cta,
                button_text: e.target.value
              }
            })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "seo", className: "space-y-4 pt-4", children: [
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Title *",
            hint: `${(form.meta_title ?? "").length}/60`,
            error: errors.meta_title,
            children: /* @__PURE__ */ jsx(
              Input,
              {
                maxLength: 80,
                value: form.meta_title ?? "",
                onChange: (e) => update({ meta_title: e.target.value || null })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Meta Description *",
            hint: `${(form.meta_description ?? "").length}/160`,
            error: errors.meta_description,
            children: /* @__PURE__ */ jsx(
              Textarea,
              {
                rows: 3,
                maxLength: 200,
                value: form.meta_description ?? "",
                onChange: (e) => update({ meta_description: e.target.value || null })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(Field, { label: "Canonical URL", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: form.seo_canonical ?? "",
            onChange: (e) => update({ seo_canonical: e.target.value || null }),
            placeholder: `/uslugi/${form.slug}`
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: form.seo_robots_index,
                onCheckedChange: (v) => update({ seo_robots_index: !!v })
              }
            ),
            "index"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: form.seo_robots_follow,
                onCheckedChange: (v) => update({ seo_robots_follow: !!v })
              }
            ),
            "follow"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "OG image (URL)", children: /* @__PURE__ */ jsx(
          Input,
          {
            value: form.og_image ?? "",
            onChange: (e) => update({ og_image: e.target.value || null })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "links", className: "space-y-4 pt-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "mb-2 block", children: "Теги задач" }),
          /* @__PURE__ */ jsx(
            TagPicker,
            {
              options: tasks.map((t) => ({ id: t.id, label: t.name })),
              selected: tagIds,
              onChange: (ids) => {
                setTagIds(ids);
                setDirty(true);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "mb-2 block", children: "Теги ниш" }),
          /* @__PURE__ */ jsx(
            TagPicker,
            {
              options: niches.map((n) => ({ id: n.id, label: n.name })),
              selected: tagIds,
              onChange: (ids) => {
                setTagIds(ids);
                setDirty(true);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: form.show_on_homepage,
              onCheckedChange: (v) => update({ show_on_homepage: !!v })
            }
          ),
          "Показывать на главной"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: form.show_on_hub,
              onCheckedChange: (v) => update({ show_on_hub: !!v })
            }
          ),
          "Показывать на хабе /max-dlya-biznesa"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: historyOpen, onOpenChange: setHistoryOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "История изменений" }) }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2 max-h-[60vh] overflow-y-auto", children: [
        (revisions ?? []).map((r) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-center justify-between gap-3 rounded-lg border border-border p-3 text-sm",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { children: new Date(r.created_at).toLocaleString("ru-RU") }),
                r.comment && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: r.comment })
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => restoreMut.mutate(r.id),
                  disabled: restoreMut.isPending,
                  children: "Откатить"
                }
              )
            ]
          },
          r.id
        )),
        (revisions ?? []).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Ревизий ещё нет." })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setHistoryOpen(false), children: "Закрыть" }) })
    ] }) })
  ] });
}
function Field({
  label,
  hint,
  error,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: `grid gap-1.5 ${error ? "[&_input]:border-destructive [&_textarea]:border-destructive [&_input]:ring-1 [&_input]:ring-destructive [&_textarea]:ring-1 [&_textarea]:ring-destructive" : ""}`, children: [
    /* @__PURE__ */ jsx(Label, { className: error ? "text-destructive" : void 0, children: label }),
    children,
    error ? /* @__PURE__ */ jsx("p", { className: "text-xs text-destructive", children: error }) : hint ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: hint }) : null
  ] });
}
function BlockHeader({
  title,
  block,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-surface/40 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold", children: title }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: !block.hidden,
            onCheckedChange: (v) => onChange({ ...block, hidden: !v })
          }
        ),
        "Показывать"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Заголовок блока", children: /* @__PURE__ */ jsx(Input, { value: block.title, onChange: (e) => onChange({ ...block, title: e.target.value }) }) })
  ] });
}
function ItemsEditor({
  items,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    items.map((it, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "grid gap-2 rounded-lg border border-border p-3 md:grid-cols-[120px_1fr_2fr_auto]",
        children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Иконка",
              value: it.icon,
              onChange: (e) => {
                const next = [...items];
                next[idx] = { ...it, icon: e.target.value };
                onChange(next);
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Заголовок",
              value: it.title,
              onChange: (e) => {
                const next = [...items];
                next[idx] = { ...it, title: e.target.value };
                onChange(next);
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Текст",
              value: it.text,
              onChange: (e) => {
                const next = [...items];
                next[idx] = { ...it, text: e.target.value };
                onChange(next);
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => onChange(items.filter((_, i) => i !== idx)),
              className: "text-destructive",
              children: "Удалить"
            }
          )
        ]
      },
      idx
    )),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        onClick: () => onChange([...items, { icon: "", title: "", text: "" }]),
        children: "+ Добавить пункт"
      }
    )
  ] });
}
function TagPicker({
  options,
  selected,
  onChange
}) {
  const toggle = (id) => {
    if (selected.includes(id)) onChange(selected.filter((x) => x !== id));
    else onChange([...selected, id]);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
    options.map((o) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => toggle(o.id),
        className: `rounded-full border px-3 py-1 text-xs transition ${selected.includes(o.id) ? "border-primary bg-primary/15 text-primary" : "border-border bg-surface/50 text-muted-foreground hover:bg-muted"}`,
        children: o.label
      },
      o.id
    )),
    options.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Нет доступных тегов" })
  ] });
}
export {
  ServiceEditor as S
};
