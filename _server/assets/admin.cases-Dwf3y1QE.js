import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { v as useAuth, an as adminCasesQuery, s as supabase, B as Button } from "./router-cxDlOnAG.js";
import { S as Switch } from "./switch-BoGnDqhU.js";
import { B as Badge } from "./badge-COGGTmha.js";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BkX_ZDKB.js";
import { C as CaseEditor } from "./CaseEditor-CMmibnTT.js";
import { a as formatDate } from "./format-BSlnw0iM.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-uHAtuyCe.js";
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
import "@radix-ui/react-switch";
import "@radix-ui/react-alert-dialog";
import "./input-DlU9Pr1e.js";
import "./label-BiWrzL7C.js";
import "@radix-ui/react-label";
import "./RichTextEditor-BaE7784u.js";
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
import "./slugify-DPRENmKe.js";
function AdminCasesTab() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: cases } = useSuspenseQuery(adminCasesQuery());
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const togglePub = useMutation({
    mutationFn: async (c) => {
      const { error } = await supabase.from("cases").update({ is_published: !c.is_published }).eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Статус обновлён");
      qc.invalidateQueries({ queryKey: ["admin", "cases"] });
      qc.invalidateQueries({ queryKey: ["cases-list"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("cases").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалено");
      qc.invalidateQueries({ queryKey: ["admin", "cases"] });
    },
    onError: (e) => toast.error(e.message)
  });
  if (cases.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Кейсов пока нет." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    cases.map((c) => /* @__PURE__ */ jsxs("div", { className: "glass flex flex-wrap items-center justify-between gap-3 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold", children: c.title }),
          c.is_published ? /* @__PURE__ */ jsx(Badge, { className: "bg-success/20 text-success", children: "Опубл." }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Черновик" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
          c.specialists?.name ?? "Без автора",
          " · ",
          formatDate(c.created_at)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Switch, { checked: c.is_published, onCheckedChange: () => togglePub.mutate(c) }),
        c.is_published && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/cases/$slug", params: { slug: c.slug }, children: /* @__PURE__ */ jsx(ExternalLink, { size: 14 }) }) }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
          setEditing(c);
          setOpen(true);
        }, children: /* @__PURE__ */ jsx(Pencil, { size: 14 }) }),
        /* @__PURE__ */ jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }) }),
          /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Удалить кейс?" }),
              /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                "«",
                c.title,
                "»"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Отмена" }),
              /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => del.mutate(c.id), children: "Удалить" })
            ] })
          ] })
        ] })
      ] })
    ] }, c.id)),
    user && /* @__PURE__ */ jsx(
      CaseEditor,
      {
        open,
        onOpenChange: setOpen,
        specialistId: editing?.specialist_id ?? null,
        userId: user.id,
        editing
      }
    )
  ] });
}
const SplitComponent = AdminCasesTab;
export {
  SplitComponent as component
};
