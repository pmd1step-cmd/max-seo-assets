import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { R as Reveal } from "./reveal-CzHUtdx3.js";
import { useQueryClient, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Save, Search, Star, ExternalLink, Pencil, EyeOff, Eye, Trash2 } from "lucide-react";
import { s as supabase, D as Dialog, y as DialogContent, z as DialogHeader, A as DialogTitle, E as DialogDescription, B as Button, G as adminSpecialistsQuery } from "./router-CWvpkSQG.js";
import { I as Input } from "./input-CAK0qsDw.js";
import { L as Label } from "./label-DDb9_nSU.js";
import { T as Textarea } from "./textarea-4KSYOsfF.js";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BpuU96Ja.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-DTsMGolV.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-label";
import "@radix-ui/react-alert-dialog";
function AdminSpecialistEditor({ open, onOpenChange, editing }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    brand_name: "",
    short_description: "",
    full_description: "",
    location: "",
    phone: "",
    email: "",
    telegram: "",
    max_contact: "",
    experience_years: "",
    price_from: "",
    price_to: "",
    meta_title: "",
    meta_description: ""
  });
  useEffect(() => {
    if (!open || !editing) return;
    setForm({
      name: editing.name ?? "",
      brand_name: editing.brand_name ?? "",
      short_description: editing.short_description ?? "",
      full_description: editing.full_description ?? "",
      location: editing.location ?? "",
      phone: editing.phone ?? "",
      email: editing.email ?? "",
      telegram: editing.telegram ?? "",
      max_contact: editing.max_contact ?? "",
      experience_years: editing.experience_years?.toString() ?? "",
      price_from: editing.price_from?.toString() ?? "",
      price_to: editing.price_to?.toString() ?? "",
      meta_title: editing.meta_title ?? "",
      meta_description: editing.meta_description ?? ""
    });
  }, [open, editing]);
  const save = useMutation({
    mutationFn: async () => {
      if (!editing) return;
      const { error } = await supabase.from("specialists").update({
        name: form.name || null,
        brand_name: form.brand_name || null,
        short_description: form.short_description || null,
        full_description: form.full_description || null,
        location: form.location || null,
        phone: form.phone || null,
        email: form.email || null,
        telegram: form.telegram || null,
        max_contact: form.max_contact || null,
        experience_years: form.experience_years ? parseInt(form.experience_years, 10) : null,
        price_from: form.price_from ? parseFloat(form.price_from) : null,
        price_to: form.price_to ? parseFloat(form.price_to) : null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null
      }).eq("id", editing.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Профиль обновлён");
      qc.invalidateQueries({ queryKey: ["admin", "specialists"] });
      qc.invalidateQueries({ queryKey: ["specialist"] });
      onOpenChange(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Редактирование специалиста" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Изменения сохраняются от имени админа." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Имя" }),
          /* @__PURE__ */ jsx(Input, { value: form.name, onChange: (e) => set("name", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Бренд" }),
          /* @__PURE__ */ jsx(Input, { value: form.brand_name, onChange: (e) => set("brand_name", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Город" }),
          /* @__PURE__ */ jsx(Input, { value: form.location, onChange: (e) => set("location", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Опыт (лет)" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.experience_years, onChange: (e) => set("experience_years", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Цена от" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.price_from, onChange: (e) => set("price_from", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Цена до" }),
          /* @__PURE__ */ jsx(Input, { type: "number", value: form.price_to, onChange: (e) => set("price_to", e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Краткое описание" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 2, value: form.short_description, onChange: (e) => set("short_description", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Полное описание" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 5, value: form.full_description, onChange: (e) => set("full_description", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsx(Input, { value: form.email, onChange: (e) => set("email", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Телефон" }),
          /* @__PURE__ */ jsx(Input, { value: form.phone, onChange: (e) => set("phone", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Telegram" }),
          /* @__PURE__ */ jsx(Input, { value: form.telegram, onChange: (e) => set("telegram", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "МАКС" }),
          /* @__PURE__ */ jsx(Input, { placeholder: "@username или ссылка", value: form.max_contact, onChange: (e) => set("max_contact", e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Meta title" }),
        /* @__PURE__ */ jsx(Input, { value: form.meta_title, onChange: (e) => set("meta_title", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Meta description" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 2, value: form.meta_description, onChange: (e) => set("meta_description", e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 border-t border-border pt-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Отмена" }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => save.mutate(), disabled: save.isPending, children: [
          save.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, {}),
          " Сохранить"
        ] })
      ] })
    ] })
  ] }) });
}
function AdminSpecialistsTab() {
  const qc = useQueryClient();
  const { data: items } = useSuspenseQuery(adminSpecialistsQuery());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toDelete, setToDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const togglePublish = useMutation({
    mutationFn: async (s) => {
      const { error } = await supabase.from("specialists").update({ is_published: !s.is_published }).eq("id", s.id);
      if (error) throw error;
    },
    onSuccess: (_d, s) => {
      toast.success(s.is_published ? "Снят с публикации" : "Опубликован");
      qc.invalidateQueries({ queryKey: ["admin", "specialists"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteSpec = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("specialists").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Специалист удалён");
      qc.invalidateQueries({ queryKey: ["admin", "specialists"] });
      setToDelete(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = items.filter((s) => {
    if (filter === "published" && !s.is_published) return false;
    if (filter === "draft" && s.is_published) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name?.toLowerCase().includes(q) || s.brand_name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q);
    }
    return true;
  });
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Специалисты" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          items.length,
          " · Опубликовано:",
          " ",
          items.filter((s) => s.is_published).length
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Search,
            {
              size: 16,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Поиск по имени, email...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-64 pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 rounded-lg border border-border p-0.5", children: ["all", "published", "draft"].map((f) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter(f),
            className: `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
            children: f === "all" ? "Все" : f === "published" ? "Опубл." : "Черновики"
          },
          f
        )) })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-10 text-center text-muted-foreground", children: "Ничего не найдено" }) : /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-surface/60 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "Специалист" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "Контакты" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "Рейтинг" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "Статус" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "Действия" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: filtered.map((s) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-surface/30", children: [
        /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          s.avatar_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: s.avatar_url,
              alt: "",
              className: "h-9 w-9 rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-full bg-secondary" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: s.name ?? "Без имени" }),
            s.brand_name && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: s.brand_name })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "p-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs", children: s.email ?? "—" }),
          s.phone && /* @__PURE__ */ jsx("div", { className: "text-xs", children: s.phone })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs", children: [
          /* @__PURE__ */ jsx(Star, { size: 12, className: "fill-accent text-accent" }),
          Number(s.rating).toFixed(1),
          " · ",
          s.reviews_count,
          " отз."
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${s.is_published ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`,
            children: s.is_published ? "Опубликован" : "Черновик"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          s.slug && s.is_published && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "icon", title: "Открыть", children: /* @__PURE__ */ jsx(Link, { to: "/specialist/$slug", params: { slug: s.slug }, children: /* @__PURE__ */ jsx(ExternalLink, { size: 16 }) }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => {
                setEditing(s);
                setEditorOpen(true);
              },
              title: "Редактировать",
              children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => togglePublish.mutate(s),
              disabled: togglePublish.isPending,
              title: s.is_published ? "Снять с публикации" : "Опубликовать",
              children: s.is_published ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setToDelete(s),
              className: "text-destructive hover:text-destructive",
              title: "Удалить",
              children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
            }
          )
        ] }) })
      ] }, s.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!toDelete, onOpenChange: (o) => !o && setToDelete(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Удалить специалиста?" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          toDelete?.name ?? "Специалист",
          " будет удалён вместе с кейсами, отзывами и заявками. Это действие нельзя отменить."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: () => toDelete && deleteSpec.mutate(toDelete.id),
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Удалить"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AdminSpecialistEditor, { open: editorOpen, onOpenChange: setEditorOpen, editing })
  ] });
}
const SplitComponent = AdminSpecialistsTab;
export {
  SplitComponent as component
};
