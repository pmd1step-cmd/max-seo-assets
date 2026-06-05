import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { ExternalLink, Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { v as useAuth, ao as adminAllBlogPostsQuery, s as supabase, B as Button, o as blogCategoriesQuery, a4 as Dialog, ap as DialogTrigger, a5 as DialogContent, a6 as DialogHeader, a7 as DialogTitle, p as blogTagsQuery } from "./router-v36oCi4s.js";
import { B as BlogPostEditor } from "./BlogPostEditor-tdZLLhLq.js";
import { I as Input } from "./input-B0c4h0dZ.js";
import { L as Label } from "./label-DfymfW9y.js";
import { B as Badge } from "./badge-VI2QeL_o.js";
import { S as Switch } from "./switch-De0RUJlN.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-5Vfz-kJH.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DXBBXnpB.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
import { a as formatDate } from "./format-BSlnw0iM.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Dhbaly9m.js";
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
import "./textarea-C9J6pada.js";
import "./select-Bi3pzbOi.js";
import "@radix-ui/react-select";
import "./RichTextEditor-C-ItZWYb.js";
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
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@radix-ui/react-tabs";
import "@radix-ui/react-alert-dialog";
function AdminBlogTab() {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "posts", children: [
    /* @__PURE__ */ jsxs(TabsList, { children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "posts", children: "Статьи" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "categories", children: "Категории" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "tags", children: "Теги" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "posts", className: "mt-4", children: /* @__PURE__ */ jsx(PostsList, {}) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "categories", className: "mt-4", children: /* @__PURE__ */ jsx(CategoriesAdmin, {}) }),
    /* @__PURE__ */ jsx(TabsContent, { value: "tags", className: "mt-4", children: /* @__PURE__ */ jsx(TagsAdmin, {}) })
  ] });
}
function PostsList() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: posts } = useSuspenseQuery(adminAllBlogPostsQuery());
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const togglePub = useMutation({
    mutationFn: async (p) => {
      const next = !p.is_published;
      const { error } = await supabase.from("blog_posts").update({
        is_published: next,
        published_at: next ? p.published_at ?? (/* @__PURE__ */ new Date()).toISOString() : null
      }).eq("id", p.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Статус обновлён");
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-list"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const deletePost = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалено");
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-list"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const NewPostButton = /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Button, { onClick: () => {
    setEditing(null);
    setEditorOpen(true);
  }, children: [
    /* @__PURE__ */ jsx(Plus, {}),
    " Новая статья"
  ] }) });
  const editorEl = user && /* @__PURE__ */ jsx(
    BlogPostEditor,
    {
      open: editorOpen,
      onOpenChange: setEditorOpen,
      specialistId: editing?.author_specialist_id ?? null,
      userId: user.id,
      editing,
      allowAuthorPick: true
    }
  );
  if (posts.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      NewPostButton,
      /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Статей пока нет." }),
      editorEl
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    NewPostButton,
    posts.map((p) => /* @__PURE__ */ jsxs("div", { className: "glass flex flex-wrap items-center justify-between gap-3 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold", children: p.title }),
          p.is_published ? /* @__PURE__ */ jsx(Badge, { className: "bg-success/20 text-success", children: "Опубл." }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Черновик" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
          p.author?.name ?? "Без автора",
          " · ",
          p.category?.name ?? "Без категории",
          " · ",
          formatDate(p.updated_at)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Switch,
          {
            checked: p.is_published,
            onCheckedChange: () => togglePub.mutate({ id: p.id, is_published: p.is_published, published_at: p.published_at })
          }
        ),
        p.is_published && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/blog/$slug", params: { slug: p.slug }, children: /* @__PURE__ */ jsx(ExternalLink, { size: 14 }) }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setEditing(p);
              setEditorOpen(true);
            },
            title: "Редактировать",
            children: /* @__PURE__ */ jsx(Pencil, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }) }),
          /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Удалить статью?" }),
              /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                "«",
                p.title,
                "»"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
              /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => deletePost.mutate(p.id), children: "Удалить" })
            ] })
          ] })
        ] })
      ] })
    ] }, p.id)),
    editorEl
  ] });
}
function CategoriesAdmin() {
  const queryClient = useQueryClient();
  const { data: cats } = useSuspenseQuery(blogCategoriesQuery());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("blog_categories").insert({ name: name.trim(), slug: slug.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Категория создана");
      queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      setOpen(false);
      setName("");
      setSlug("");
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("blog_categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалена");
      queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
        /* @__PURE__ */ jsx(Plus, {}),
        " Новая категория"
      ] }) }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Новая категория" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Название" }),
            /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => {
              setName(e.target.value);
              setSlug(slugify(e.target.value));
            } })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Slug" }),
            /* @__PURE__ */ jsx(Input, { value: slug, onChange: (e) => setSlug(slugify(e.target.value)) })
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: () => create.mutate(), disabled: create.isPending, className: "w-full", children: create.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Создать" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      cats.map((c) => /* @__PURE__ */ jsxs("div", { className: "glass flex items-center justify-between rounded-xl p-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: c.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "/",
            c.slug
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", onClick: () => del.mutate(c.id), children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
      ] }, c.id)),
      cats.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Нет категорий" })
    ] })
  ] });
}
function TagsAdmin() {
  const queryClient = useQueryClient();
  const { data: tags } = useSuspenseQuery(blogTagsQuery());
  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("blog_tags").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалён");
      queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
    },
    onError: (e) => toast.error(e.message)
  });
  if (tags.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Тегов пока нет. Они создаются авторами при написании статей." });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((t) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 rounded-full border border-border bg-surface/40 py-1 pl-3 pr-1", children: [
    /* @__PURE__ */ jsxs("span", { className: "text-xs", children: [
      "#",
      t.name
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: () => del.mutate(t.id), className: "rounded-full p-1 text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { size: 12 }) })
  ] }, t.id)) });
}
const SplitComponent = AdminBlogTab;
export {
  SplitComponent as component
};
