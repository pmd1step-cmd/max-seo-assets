import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { R as Reveal } from "./reveal-3YugxYMD.js";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { a3 as adminCategoriesQuery, s as supabase, B as Button, D as Dialog, y as DialogContent, z as DialogHeader, A as DialogTitle, N as DialogFooter } from "./router-BkIXR5aR.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
import { I as Input } from "./input-7NS4Zein.js";
import { L as Label } from "./label-B4H28xNA.js";
import { T as Textarea } from "./textarea-Bz6VxbLQ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-PAHiD6CK.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Bci-a1qN.js";
import "@tanstack/react-router";
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
import "@radix-ui/react-select";
import "@radix-ui/react-alert-dialog";
const empty = {
  name: "",
  slug: "",
  type: "task",
  description: "",
  seo_text: "",
  icon: "",
  sort_order: 0
};
function AdminCategoriesTab() {
  const qc = useQueryClient();
  const { data: items } = useSuspenseQuery(adminCategoriesQuery());
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const save = useMutation({
    mutationFn: async (form) => {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name),
        type: form.type,
        description: form.description.trim() || null,
        seo_text: form.seo_text.trim() || null,
        icon: form.icon.trim() || null,
        sort_order: form.sort_order
      };
      if (form.id) {
        const { error } = await supabase.from("categories").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: (_d, form) => {
      toast.success(form.id ? "Категория обновлена" : "Категория создана");
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
      setEditing(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Категория удалена");
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
      setToDelete(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const tasks = items.filter((c) => c.type === "task");
  const niches = items.filter((c) => c.type === "niche");
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Категории" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Задачи: ",
          tasks.length,
          " · Ниши: ",
          niches.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => setEditing({ ...empty }), className: "gradient-bg", children: [
        /* @__PURE__ */ jsx(Plus, {}),
        " Добавить"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        CategoryGroup,
        {
          title: "Задачи",
          items: tasks,
          onEdit: (c) => setEditing(toForm(c)),
          onDelete: setToDelete
        }
      ),
      /* @__PURE__ */ jsx(
        CategoryGroup,
        {
          title: "Ниши",
          items: niches,
          onEdit: (c) => setEditing(toForm(c)),
          onDelete: setToDelete
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: !!editing, onOpenChange: (o) => !o && setEditing(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: editing?.id ? "Редактировать категорию" : "Новая категория" }) }),
      editing && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Название *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: editing.name,
              onChange: (e) => setEditing({
                ...editing,
                name: e.target.value,
                slug: editing.id ? editing.slug : slugify(e.target.value)
              })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Slug *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: editing.slug,
              onChange: (e) => setEditing({ ...editing, slug: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Тип" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: editing.type,
                onValueChange: (v) => setEditing({ ...editing, type: v }),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "task", children: "Задача" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "niche", children: "Ниша" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Порядок" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "number",
                value: editing.sort_order,
                onChange: (e) => setEditing({
                  ...editing,
                  sort_order: Number(e.target.value) || 0
                })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Иконка (emoji или имя)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: editing.icon,
              placeholder: "🎯",
              onChange: (e) => setEditing({ ...editing, icon: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Описание" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              rows: 2,
              value: editing.description,
              onChange: (e) => setEditing({ ...editing, description: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "SEO-текст (для страницы каталога)" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              rows: 4,
              value: editing.seo_text,
              onChange: (e) => setEditing({ ...editing, seo_text: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditing(null), children: "Отмена" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => editing && save.mutate(editing),
            disabled: save.isPending || !editing?.name.trim(),
            className: "gradient-bg",
            children: "Сохранить"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!toDelete, onOpenChange: (o) => !o && setToDelete(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Удалить категорию?" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          "«",
          toDelete?.name,
          "» будет удалена. Связи со специалистами также пропадут."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: () => toDelete && remove.mutate(toDelete.id),
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Удалить"
          }
        )
      ] })
    ] }) })
  ] });
}
function toForm(c) {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    type: c.type,
    description: c.description ?? "",
    seo_text: c.seo_text ?? "",
    icon: c.icon ?? "",
    sort_order: c.sort_order
  };
}
function CategoryGroup({
  title,
  items,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-4 font-bold", children: title }),
    items.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Пусто" }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: items.map((c) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "flex items-center justify-between gap-2 rounded-lg border border-border bg-surface/40 p-3",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
              c.icon && /* @__PURE__ */ jsx("span", { children: c.icon }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: c.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "/",
              c.slug
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => onEdit(c), children: /* @__PURE__ */ jsx(Pencil, { size: 15 }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => onDelete(c),
                className: "text-destructive hover:text-destructive",
                children: /* @__PURE__ */ jsx(Trash2, { size: 15 })
              }
            )
          ] })
        ]
      },
      c.id
    )) })
  ] });
}
const SplitComponent = AdminCategoriesTab;
export {
  SplitComponent as component
};
