import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, Suspense } from "react";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { Clock, XCircle, CheckCircle2, Eye, EyeOff, Loader2, Camera, Save, Plus, ImageIcon, Pencil, Trash2, Inbox, Mail, Phone, MessageSquare, Star, FileText, ExternalLink, Edit, AlertTriangle } from "lucide-react";
import { U as mySpecialistQuery, c as categoriesQuery, V as mySpecialistCategoryIdsQuery, s as supabase, B as Button, W as myCasesQuery, X as myApplicationsQuery, Y as myReviewsQuery, Z as myDailyViewsQuery, _ as myBlogPostsQuery, $ as Route } from "./router-BwrB5FOf.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-gLweb8hi.js";
import { R as Reveal } from "./reveal-Cf68GMTy.js";
import { toast } from "sonner";
import { I as Input } from "./input-iek2JIRc.js";
import { T as Textarea } from "./textarea-5b7xoFjX.js";
import { L as Label } from "./label-B4cu7Hl5.js";
import { S as Switch } from "./switch-KA5qx17y.js";
import { C as Checkbox } from "./checkbox-BHnC0UhS.js";
import { d as deleteFromBucket, u as uploadToBucket } from "./RichTextEditor-DcxJtxwj.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction, h as AlertDialogTrigger } from "./alert-dialog-7vEbW8E1.js";
import { C as CaseEditor } from "./CaseEditor-CLOvvUQj.js";
import { formatDistanceToNow, format } from "date-fns";
import { ru } from "date-fns/locale";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DH9VNUWE.js";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import { B as Badge } from "./badge-ByFyx50K.js";
import { B as BlogPostEditor } from "./BlogPostEditor-b70Vkj5S.js";
import { a as formatDate } from "./format-BSlnw0iM.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-OEr_ZaGS.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-C41cjU9Y.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-tabs";
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@radix-ui/react-checkbox";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-link";
import "@tiptap/extension-image";
import "@tiptap/extension-placeholder";
import "@tiptap/extension-underline";
import "@tiptap/extension-text-align";
import "@tiptap/extension-text-style";
import "@tiptap/extension-color";
import "@tiptap/extension-highlight";
import "@tiptap/extension-table";
import "@tiptap/extension-table-row";
import "@tiptap/extension-table-header";
import "@tiptap/extension-table-cell";
import "@tiptap/extension-task-list";
import "@tiptap/extension-task-item";
import "@tiptap/extension-subscript";
import "@tiptap/extension-superscript";
import "@tiptap/core";
import "@radix-ui/react-alert-dialog";
import "@radix-ui/react-select";
const LABELS = {
  pending: "На проверке",
  approved: "Одобрено",
  rejected: "Отклонено"
};
const ICONS = {
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle
};
const STYLES = {
  pending: "bg-accent/15 text-accent",
  approved: "bg-success/15 text-success",
  rejected: "bg-destructive/15 text-destructive"
};
function ModerationBadge({
  status,
  className = ""
}) {
  const Icon = ICONS[status];
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${STYLES[status]} ${className}`,
      children: [
        /* @__PURE__ */ jsx(Icon, { size: 12 }),
        LABELS[status]
      ]
    }
  );
}
function ModerationStatusBanner({
  status,
  rejectionReason,
  compact = false,
  className = ""
}) {
  if (compact) return /* @__PURE__ */ jsx(ModerationBadge, { status, className });
  if (status === "approved") {
    return null;
  }
  if (status === "pending") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm ${className}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { size: 18, className: "mt-0.5 shrink-0 text-accent" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-accent", children: "Материал на проверке" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: "Администратор скоро его рассмотрит. После одобрения он станет виден в публичной части сайта." })
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm ${className}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(XCircle, { size: 18, className: "mt-0.5 shrink-0 text-destructive" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-destructive", children: "Материал отклонён модератором" }),
          rejectionReason ? /* @__PURE__ */ jsxs("p", { className: "mt-1 whitespace-pre-wrap text-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Причина:" }),
            " ",
            rejectionReason
          ] }) : /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: "Причина не указана. Внесите изменения и материал автоматически уйдёт на повторную проверку." }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Отредактируйте и сохраните — статус сменится на «На проверке»." })
        ] })
      ] })
    }
  );
}
function ProfileTab({ userId }) {
  const queryClient = useQueryClient();
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: selectedCatIds } = useSuspenseQuery(
    mySpecialistCategoryIdsQuery(spec?.id ?? null)
  );
  const [form, setForm] = useState({
    name: spec?.name ?? "",
    brand_name: spec?.brand_name ?? "",
    short_description: spec?.short_description ?? "",
    full_description: spec?.full_description ?? "",
    experience_years: spec?.experience_years?.toString() ?? "",
    price_from: spec?.price_from?.toString() ?? "",
    price_to: spec?.price_to?.toString() ?? "",
    location: spec?.location ?? "",
    phone: spec?.phone ?? "",
    telegram: spec?.telegram ?? "",
    whatsapp: spec?.whatsapp ?? "",
    meta_title: spec?.meta_title ?? "",
    meta_description: spec?.meta_description ?? ""
  });
  const [cats, setCats] = useState(new Set(selectedCatIds));
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  useEffect(() => {
    setCats(new Set(selectedCatIds));
  }, [selectedCatIds]);
  const tasks = categories.filter((c) => c.type === "task");
  const niches = categories.filter((c) => c.type === "niche");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleCat = (id) => {
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const validate = () => {
    if (!form.name.trim()) return "Укажите имя";
    if (!form.short_description.trim()) return "Заполните краткое описание";
    if (!form.full_description.trim()) return "Заполните полное описание";
    if (!form.phone.trim()) return "Укажите телефон";
    const taskIds = new Set(tasks.map((t) => t.id));
    const nicheIds = new Set(niches.map((n) => n.id));
    const hasTask = [...cats].some((id) => taskIds.has(id));
    const hasNiche = [...cats].some((id) => nicheIds.has(id));
    if (!hasTask) return "Выберите хотя бы одну задачу";
    if (!hasNiche) return "Выберите хотя бы одну нишу бизнеса";
    return null;
  };
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!spec) throw new Error("Профиль не найден");
      const validationError = validate();
      if (validationError) throw new Error(validationError);
      const slug = spec.slug || slugify(form.name || `expert-${spec.id.slice(0, 6)}`);
      const { error: e1 } = await supabase.from("specialists").update({
        name: form.name || null,
        brand_name: form.brand_name || null,
        short_description: form.short_description || null,
        full_description: form.full_description || null,
        experience_years: form.experience_years ? parseInt(form.experience_years, 10) : null,
        price_from: form.price_from ? parseFloat(form.price_from) : null,
        price_to: form.price_to ? parseFloat(form.price_to) : null,
        location: form.location || null,
        phone: form.phone || null,
        telegram: form.telegram || null,
        whatsapp: form.whatsapp || null,
        meta_title: form.meta_title.trim() || null,
        meta_description: form.meta_description.trim() || null,
        slug
      }).eq("id", spec.id);
      if (e1) throw e1;
      const current = new Set(selectedCatIds);
      const target = cats;
      const toDelete = [...current].filter((id) => !target.has(id));
      const toInsert = [...target].filter((id) => !current.has(id));
      if (toDelete.length > 0) {
        const { error } = await supabase.from("specialist_categories").delete().eq("specialist_id", spec.id).in("category_id", toDelete);
        if (error) throw error;
      }
      if (toInsert.length > 0) {
        const { error } = await supabase.from("specialist_categories").insert(toInsert.map((category_id) => ({ specialist_id: spec.id, category_id })));
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Профиль сохранён");
      queryClient.invalidateQueries({ queryKey: ["my-specialist"] });
      queryClient.invalidateQueries({ queryKey: ["my-specialist-categories"] });
      queryClient.invalidateQueries({ queryKey: ["specialist"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const publishMutation = useMutation({
    mutationFn: async (publish) => {
      if (!spec) return;
      if (publish) {
        const validationError = validate();
        if (validationError) throw new Error(validationError);
      }
      const { error } = await supabase.from("specialists").update({ is_published: publish }).eq("id", spec.id);
      if (error) throw error;
    },
    onSuccess: (_data, publish) => {
      toast.success(publish ? "Профиль опубликован" : "Профиль снят с публикации");
      queryClient.invalidateQueries({ queryKey: ["my-specialist"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !spec) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл больше 5 МБ");
      return;
    }
    setUploading(true);
    try {
      if (spec.avatar_url) {
        await deleteFromBucket("avatars", spec.avatar_url).catch(() => {
        });
      }
      const url = await uploadToBucket("avatars", userId, file);
      const { error } = await supabase.from("specialists").update({ avatar_url: url }).eq("id", spec.id);
      if (error) throw error;
      toast.success("Аватар обновлён");
      queryClient.invalidateQueries({ queryKey: ["my-specialist"] });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  if (!spec) {
    return /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Профиль не найден." });
  }
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, className: "space-y-8", children: [
    /* @__PURE__ */ jsx(
      ModerationStatusBanner,
      {
        status: spec.moderation_status,
        rejectionReason: spec.rejection_reason
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "glass flex items-center justify-between rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          spec.is_published ? /* @__PURE__ */ jsx(Eye, { size: 18, className: "text-success" }) : /* @__PURE__ */ jsx(EyeOff, { size: 18, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: spec.is_published ? "Профиль опубликован" : "Профиль не опубликован" }),
          /* @__PURE__ */ jsx(ModerationBadge, { status: spec.moderation_status })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: spec.is_published && spec.moderation_status === "approved" ? "Виден всем в каталоге." : spec.is_published && spec.moderation_status === "pending" ? "Профиль на проверке у администратора. Появится в каталоге после одобрения." : spec.is_published && spec.moderation_status === "rejected" ? "Профиль отклонён — исправьте замечания, и он автоматически уйдёт на повторную проверку." : "Заполните профиль и опубликуйте, чтобы клиенты могли вас найти." })
      ] }),
      /* @__PURE__ */ jsx(
        Switch,
        {
          checked: spec.is_published,
          onCheckedChange: (v) => publishMutation.mutate(v),
          disabled: publishMutation.isPending
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-4 font-semibold", children: "Аватар" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-border", children: spec.avatar_url ? /* @__PURE__ */ jsx("img", { src: spec.avatar_url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary text-2xl font-bold", children: form.name?.[0]?.toUpperCase() ?? "?" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              onChange: handleFile,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => fileRef.current?.click(),
              disabled: uploading,
              children: [
                uploading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Camera, {}),
                uploading ? "Загрузка…" : "Загрузить новый"
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "JPG, PNG до 5 МБ" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Основная информация" }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Поля со звёздочкой ",
        /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" }),
        " обязательны. После сохранения профиль уходит на модерацию."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Field, { label: "Имя", required: true, value: form.name, onChange: (v) => set("name", v) }),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Бренд / агентство",
            value: form.brand_name,
            onChange: (v) => set("brand_name", v)
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Город",
            value: form.location,
            onChange: (v) => set("location", v)
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Опыт (лет)",
            type: "number",
            value: form.experience_years,
            onChange: (v) => set("experience_years", v)
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Цена от, ₽",
            type: "number",
            value: form.price_from,
            onChange: (v) => set("price_from", v)
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Цена до, ₽",
            type: "number",
            value: form.price_to,
            onChange: (v) => set("price_to", v)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Краткое описание ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 2,
            maxLength: 200,
            value: form.short_description,
            onChange: (e) => set("short_description", e.target.value),
            placeholder: "1-2 предложения для карточки"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { children: [
          "Полное описание ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 6,
            value: form.full_description,
            onChange: (e) => set("full_description", e.target.value),
            placeholder: "Расскажите о себе, опыте и подходе к работе"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Контакты" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Телефон", required: true, value: form.phone, onChange: (v) => set("phone", v) }),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Telegram (без @)",
            value: form.telegram,
            onChange: (v) => set("telegram", v)
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "WhatsApp",
            value: form.whatsapp,
            onChange: (v) => set("whatsapp", v)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold", children: [
          "Задачи ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Выберите хотя бы один вариант" }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3", children: tasks.map((c) => /* @__PURE__ */ jsx(
          CatRow,
          {
            checked: cats.has(c.id),
            onChange: () => toggleCat(c.id),
            label: c.name
          },
          c.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold", children: [
          "Ниши бизнеса ",
          /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Выберите хотя бы один вариант" }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3", children: niches.map((c) => /* @__PURE__ */ jsx(
          CatRow,
          {
            checked: cats.has(c.id),
            onChange: () => toggleCat(c.id),
            label: c.name
          },
          c.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sticky bottom-4 flex justify-end", children: /* @__PURE__ */ jsxs(
      Button,
      {
        size: "lg",
        className: "gradient-bg shadow-glow",
        onClick: () => saveMutation.mutate(),
        disabled: saveMutation.isPending,
        children: [
          saveMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, {}),
          "Сохранить изменения"
        ]
      }
    ) })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs(Label, { children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-destructive", children: " *" })
    ] }),
    /* @__PURE__ */ jsx(Input, { type, value, onChange: (e) => onChange(e.target.value) })
  ] });
}
function CatRow({
  checked,
  onChange,
  label
}) {
  return /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface/50 px-3 py-2 text-sm transition-colors hover:bg-surface", children: [
    /* @__PURE__ */ jsx(Checkbox, { checked, onCheckedChange: onChange }),
    /* @__PURE__ */ jsx("span", { children: label })
  ] });
}
function CasesTab({ userId }) {
  const queryClient = useQueryClient();
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: cases } = useSuspenseQuery(myCasesQuery(spec?.id ?? null));
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const deleteMutation = useMutation({
    mutationFn: async (caseId) => {
      const { data: media } = await supabase.from("case_media").select("url").eq("case_id", caseId);
      if (media && media.length > 0) {
        const paths = media.map((m) => {
          const idx = m.url.indexOf("/case-media/");
          return idx === -1 ? null : m.url.slice(idx + "/case-media/".length);
        }).filter((p) => !!p);
        if (paths.length > 0) {
          await supabase.storage.from("case-media").remove(paths).catch(() => {
          });
        }
      }
      const { error } = await supabase.from("cases").delete().eq("id", caseId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Кейс удалён");
      queryClient.invalidateQueries({ queryKey: ["my-cases"] });
      queryClient.invalidateQueries({ queryKey: ["my-specialist"] });
      setConfirmDelete(null);
    },
    onError: (e) => toast.error(e.message)
  });
  if (!spec) return /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Сначала создайте профиль." });
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Мои кейсы" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          cases.length,
          " · Опубликовано: ",
          cases.filter((c) => c.is_published).length
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "gradient-bg",
          onClick: () => {
            setEditing(null);
            setEditorOpen(true);
          },
          children: [
            /* @__PURE__ */ jsx(Plus, {}),
            " Новый кейс"
          ]
        }
      )
    ] }),
    cases.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(ImageIcon, { className: "mx-auto text-muted-foreground", size: 48 }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "Кейсов пока нет" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Добавьте первый кейс, чтобы клиенты увидели ваш опыт." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: cases.map((c) => /* @__PURE__ */ jsxs("div", { className: "glass overflow-hidden rounded-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] bg-surface", children: [
        c.cover_url ? /* @__PURE__ */ jsx("img", { src: c.cover_url, alt: c.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(ImageIcon, { size: 40 }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-2 top-2 flex flex-col items-end gap-1", children: [
          c.is_published ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success backdrop-blur", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { size: 12 }),
            " Опубликован"
          ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur", children: [
            /* @__PURE__ */ jsx(EyeOff, { size: 12 }),
            " Черновик"
          ] }),
          /* @__PURE__ */ jsx(ModerationBadge, { status: c.moderation_status })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: c.title }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap gap-1.5", children: [
          c.niche && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/15 px-2 py-0.5 text-[11px] text-primary", children: c.niche }),
          c.task_type && /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground", children: c.task_type })
        ] }),
        c.task_description && /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: c.task_description }),
        c.moderation_status === "rejected" && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
          ModerationStatusBanner,
          {
            status: "rejected",
            rejectionReason: c.rejection_reason
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: () => {
                setEditing(c);
                setEditorOpen(true);
              },
              children: [
                /* @__PURE__ */ jsx(Pencil, {}),
                " Редактировать"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setConfirmDelete(c),
              children: /* @__PURE__ */ jsx(Trash2, { className: "text-destructive" })
            }
          )
        ] })
      ] })
    ] }, c.id)) }),
    /* @__PURE__ */ jsx(
      CaseEditor,
      {
        open: editorOpen,
        onOpenChange: setEditorOpen,
        specialistId: spec.id,
        userId,
        editing
      }
    ),
    /* @__PURE__ */ jsx(
      AlertDialog,
      {
        open: !!confirmDelete,
        onOpenChange: (v) => !v && setConfirmDelete(null),
        children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Удалить кейс?" }),
            /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
              "«",
              confirmDelete?.title,
              "» будет удалён вместе со всеми изображениями. Действие необратимо."
            ] })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
            /* @__PURE__ */ jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: () => confirmDelete && deleteMutation.mutate(confirmDelete.id),
                children: "Удалить"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
const STATUS_LABELS = {
  new: { label: "Новая", color: "bg-primary/15 text-primary" },
  in_progress: { label: "В работе", color: "bg-accent/15 text-accent" },
  closed: { label: "Закрыта", color: "bg-success/15 text-success" },
  rejected: { label: "Отклонена", color: "bg-muted text-muted-foreground" }
};
function ApplicationsTab({ userId }) {
  const queryClient = useQueryClient();
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: apps } = useSuspenseQuery(myApplicationsQuery(spec?.id ?? null));
  const [filter, setFilter] = useState("all");
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Статус обновлён");
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Заявки" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          apps.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: filter, onValueChange: (v) => setFilter(v), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Все статусы" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "new", children: "Новые" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "in_progress", children: "В работе" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "closed", children: "Закрытые" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "rejected", children: "Отклонённые" })
        ] })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(Inbox, { className: "mx-auto text-muted-foreground", size: 48 }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "Заявок пока нет" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Когда клиенты оставят заявку, они появятся здесь." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filtered.map((a) => {
      const meta = STATUS_LABELS[a.status];
      return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold", children: a.applicant_name }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.color}`,
                  children: meta.label
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: formatDistanceToNow(new Date(a.created_at), {
              addSuffix: true,
              locale: ru
            }) })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: a.status,
              onValueChange: (v) => updateStatus.mutate({ id: a.id, status: v }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-36 text-xs", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "new", children: "Новая" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "in_progress", children: "В работе" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "closed", children: "Закрыта" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "rejected", children: "Отклонена" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: `mailto:${a.applicant_email}`,
              className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground",
              children: [
                /* @__PURE__ */ jsx(Mail, { size: 14 }),
                " ",
                a.applicant_email
              ]
            }
          ),
          a.applicant_phone && /* @__PURE__ */ jsxs(
            "a",
            {
              href: `tel:${a.applicant_phone}`,
              className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 14 }),
                " ",
                a.applicant_phone
              ]
            }
          ),
          a.budget && /* @__PURE__ */ jsxs("span", { className: "text-accent font-medium", children: [
            "Бюджет: ",
            a.budget
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2 rounded-lg bg-surface/50 p-3 text-sm", children: [
          /* @__PURE__ */ jsx(
            MessageSquare,
            {
              size: 16,
              className: "mt-0.5 shrink-0 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: a.message })
        ] })
      ] }, a.id);
    }) })
  ] });
}
function ReviewsTab({ userId }) {
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: reviews } = useSuspenseQuery(myReviewsQuery(spec?.id ?? null));
  const approved = reviews.filter((r) => r.is_approved);
  const pending = reviews.filter((r) => !r.is_approved);
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Отзывы" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Опубликовано: ",
        approved.length,
        " · На модерации: ",
        pending.length
      ] })
    ] }),
    reviews.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(MessageSquare, { className: "mx-auto text-muted-foreground", size: 48 }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "Отзывов пока нет" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: reviews.map((r) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: r.author_name }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(
              Star,
              {
                size: 14,
                className: i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
              },
              i
            )) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(r.created_at), {
              addSuffix: true,
              locale: ru
            }) })
          ] })
        ] }),
        !r.is_approved && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent", children: "На модерации" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm", children: r.text })
    ] }, r.id)) })
  ] });
}
function StatsTab({ userId }) {
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: daily } = useSuspenseQuery(myDailyViewsQuery(spec?.id ?? null));
  const { data: apps } = useSuspenseQuery(myApplicationsQuery(spec?.id ?? null));
  const { data: cases } = useSuspenseQuery(myCasesQuery(spec?.id ?? null));
  if (!spec) return null;
  const total30 = daily.reduce((acc, d) => acc + d.views, 0);
  const newApps = apps.filter((a) => a.status === "new").length;
  const chartData = daily.map((d) => ({
    day: format(new Date(d.day), "d MMM", { locale: ru }),
    views: d.views
  }));
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(Eye, {}),
          label: "Просмотров (30д)",
          value: total30.toLocaleString("ru-RU"),
          sub: `Всего: ${spec.views_count.toLocaleString("ru-RU")}`
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(Star, {}),
          label: "Рейтинг",
          value: spec.rating.toFixed(1),
          sub: `${spec.reviews_count} отзывов`
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(Inbox, {}),
          label: "Заявок всего",
          value: apps.length.toString(),
          sub: `${newApps} новых`
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(FileText, {}),
          label: "Кейсов",
          value: cases.length.toString(),
          sub: `${cases.filter((c) => c.is_published).length} опубликовано`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Просмотры профиля за 30 дней" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: chartData, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "viewsGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.62 0.21 280)", stopOpacity: 0.5 }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.62 0.21 280)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(1 0 0 / 0.06)" }),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            dataKey: "day",
            tick: { fill: "oklch(0.65 0.04 280)", fontSize: 11 },
            tickLine: false,
            axisLine: false,
            interval: Math.max(0, Math.floor(chartData.length / 8) - 1)
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            tick: { fill: "oklch(0.65 0.04 280)", fontSize: 11 },
            tickLine: false,
            axisLine: false,
            allowDecimals: false,
            width: 32
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            contentStyle: {
              background: "oklch(0.21 0.04 280)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              borderRadius: 8,
              fontSize: 12
            },
            labelStyle: { color: "oklch(0.97 0.01 280)" }
          }
        ),
        /* @__PURE__ */ jsx(
          Area,
          {
            type: "monotone",
            dataKey: "views",
            stroke: "oklch(0.62 0.21 280)",
            strokeWidth: 2,
            fill: "url(#viewsGrad)"
          }
        )
      ] }) }) }),
      total30 === 0 && /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-muted-foreground", children: "Опубликуйте профиль, чтобы начать получать просмотры." })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary", children: icon }),
      /* @__PURE__ */ jsx("span", { className: "text-xs", children: label })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 text-3xl font-extrabold", children: value }),
    sub && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function BlogPostsTab({ userId }) {
  const queryClient = useQueryClient();
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: posts } = useSuspenseQuery(myBlogPostsQuery(spec?.id ?? null));
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const deleteMut = useMutation({
    mutationFn: async (post) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Статья удалена");
      queryClient.invalidateQueries({ queryKey: ["my-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-list"] });
    },
    onError: (e) => toast.error(e.message)
  });
  if (!spec) {
    return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Сначала заполните профиль." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        posts.length,
        " статей"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => {
        setEditing(null);
        setEditorOpen(true);
      }, children: [
        /* @__PURE__ */ jsx(Plus, {}),
        " Новая статья"
      ] })
    ] }),
    posts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Вы ещё не написали ни одной статьи." }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-2", children: posts.map((p) => /* @__PURE__ */ jsxs("div", { className: "glass space-y-3 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold", children: p.title }),
            p.is_published ? /* @__PURE__ */ jsx(Badge, { variant: "default", className: "bg-success/20 text-success", children: "Опубликована" }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Черновик" }),
            /* @__PURE__ */ jsx(ModerationBadge, { status: p.moderation_status })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
            "Обновлена ",
            formatDate(p.updated_at),
            " · ",
            p.views_count,
            " просмотров · ",
            p.reading_minutes,
            " мин"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          p.is_published && p.moderation_status === "approved" && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/blog/$slug", params: { slug: p.slug }, children: /* @__PURE__ */ jsx(ExternalLink, { size: 14 }) }) }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
            setEditing(p);
            setEditorOpen(true);
          }, children: /* @__PURE__ */ jsx(Edit, { size: 14 }) }),
          /* @__PURE__ */ jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }) }),
            /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Удалить статью?" }),
                /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                  "«",
                  p.title,
                  "» — это действие необратимо."
                ] })
              ] }),
              /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
                /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => deleteMut.mutate(p), children: deleteMut.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Удалить" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      p.moderation_status === "rejected" && /* @__PURE__ */ jsx(
        ModerationStatusBanner,
        {
          status: "rejected",
          rejectionReason: p.rejection_reason
        }
      )
    ] }, p.id)) }),
    /* @__PURE__ */ jsx(
      BlogPostEditor,
      {
        open: editorOpen,
        onOpenChange: setEditorOpen,
        specialistId: spec.id,
        userId,
        editing
      }
    )
  ] });
}
function DashboardPage() {
  const {
    auth
  } = Route.useRouteContext();
  const userId = auth.userId;
  if (!userId) {
    return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl px-4 py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Требуется вход." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12", children: [
    /* @__PURE__ */ jsx(DashboardHeader, { userId }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "profile", className: "mt-8", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "w-full overflow-x-auto md:w-auto", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "profile", children: "Профиль" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "cases", children: "Кейсы" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "blog", children: "Статьи" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "applications", children: "Заявки" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "reviews", children: "Отзывы" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "stats", children: "Статистика" })
      ] }),
      /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(TabSpinner, {}), children: [
        /* @__PURE__ */ jsx(TabsContent, { value: "profile", className: "mt-6", children: /* @__PURE__ */ jsx(ProfileTab, { userId }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "cases", className: "mt-6", children: /* @__PURE__ */ jsx(CasesTab, { userId }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "blog", className: "mt-6", children: /* @__PURE__ */ jsx(BlogPostsTab, { userId }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "applications", className: "mt-6", children: /* @__PURE__ */ jsx(ApplicationsTab, { userId }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "reviews", className: "mt-6", children: /* @__PURE__ */ jsx(ReviewsTab, { userId }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "stats", className: "mt-6", children: /* @__PURE__ */ jsx(StatsTab, { userId }) })
      ] })
    ] })
  ] });
}
function DashboardHeader({
  userId
}) {
  const {
    data: spec
  } = useSuspenseQuery(mySpecialistQuery(userId));
  const {
    data: cases
  } = useSuspenseQuery(myCasesQuery(spec?.id ?? null));
  const {
    data: posts
  } = useSuspenseQuery(myBlogPostsQuery(spec?.id ?? null));
  const rejectedCount = (spec?.moderation_status === "rejected" ? 1 : 0) + cases.filter((c) => c.moderation_status === "rejected").length + posts.filter((p) => p.moderation_status === "rejected").length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-extrabold md:text-4xl", children: [
          "Кабинет ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "специалиста" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: spec?.is_published ? "Профиль виден в каталоге." : "Заполните профиль и опубликуйте, чтобы появиться в каталоге." })
      ] }),
      spec?.slug && spec.is_published && spec.moderation_status === "approved" && /* @__PURE__ */ jsxs(Link, { to: "/specialist/$slug", params: {
        slug: spec.slug
      }, className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-glow", children: [
        "Открыть публичный профиль ",
        /* @__PURE__ */ jsx(ExternalLink, { size: 14 })
      ] })
    ] }),
    rejectedCount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { size: 18, className: "mt-0.5 shrink-0 text-destructive" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-destructive", children: [
          rejectedCount,
          " ",
          rejectedCount === 1 ? "материал отклонён" : rejectedCount < 5 ? "материала отклонено" : "материалов отклонено"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 text-muted-foreground", children: "— проверьте вкладки «Профиль», «Кейсы», «Статьи»: причина указана в карточке. После исправления материал автоматически уйдёт на повторную проверку." })
      ] })
    ] })
  ] });
}
function TabSpinner() {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) });
}
export {
  DashboardPage as component
};
