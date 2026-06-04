import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { R as Reveal } from "./reveal-0q7RM7HX.js";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Star, ExternalLink, Check, X, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { aj as adminReviewsQuery, s as supabase, B as Button } from "./router-Ame665Aj.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Cpfbehp8.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-BVrO7XJx.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
function AdminReviewsTab() {
  const qc = useQueryClient();
  const { data: items } = useSuspenseQuery(adminReviewsQuery());
  const [filter, setFilter] = useState("pending");
  const setApproved = useMutation({
    mutationFn: async ({ id, approved }) => {
      const { error } = await supabase.from("reviews").update({ is_approved: approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_d, v) => {
      toast.success(v.approved ? "Отзыв опубликован" : "Отзыв скрыт");
      qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteReview = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Отзыв удалён");
      qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = items.filter((r) => {
    if (filter === "pending") return !r.is_approved;
    if (filter === "approved") return r.is_approved;
    return true;
  });
  const pendingCount = items.filter((r) => !r.is_approved).length;
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Отзывы" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          items.length,
          " · На модерации:",
          " ",
          /* @__PURE__ */ jsx("span", { className: pendingCount > 0 ? "text-accent font-semibold" : "", children: pendingCount })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1 rounded-lg border border-border p-0.5", children: ["pending", "approved", "all"].map((f) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilter(f),
          className: `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
          children: f === "pending" ? `На модерации${pendingCount > 0 ? ` (${pendingCount})` : ""}` : f === "approved" ? "Опубликованные" : "Все"
        },
        f
      )) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-10 text-center text-muted-foreground", children: filter === "pending" ? "Нет отзывов на модерации" : "Отзывов нет" }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filtered.map((r) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold", children: r.author_name }),
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-0.5 text-xs", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(
              Star,
              {
                size: 12,
                className: i < r.rating ? "fill-accent text-accent" : "text-muted"
              },
              i
            )) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `rounded-full px-2 py-0.5 text-[11px] font-medium ${r.is_approved ? "bg-success/15 text-success" : "bg-accent/15 text-accent"}`,
                children: r.is_approved ? "Опубликован" : "На модерации"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: formatDistanceToNow(new Date(r.created_at), {
              addSuffix: true,
              locale: ru
            }) }),
            r.specialists?.slug && /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/specialist/$slug",
                params: { slug: r.specialists.slug },
                className: "inline-flex items-center gap-1 text-primary hover:text-primary-glow",
                children: [
                  "о ",
                  r.specialists.name ?? "—",
                  " ",
                  /* @__PURE__ */ jsx(ExternalLink, { size: 11 })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          !r.is_approved ? /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setApproved.mutate({ id: r.id, approved: true }),
              disabled: setApproved.isPending,
              children: [
                /* @__PURE__ */ jsx(Check, {}),
                " Одобрить"
              ]
            }
          ) : /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setApproved.mutate({ id: r.id, approved: false }),
              disabled: setApproved.isPending,
              children: [
                /* @__PURE__ */ jsx(X, {}),
                " Скрыть"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => deleteReview.mutate(r.id),
              className: "text-destructive hover:text-destructive",
              children: /* @__PURE__ */ jsx(Trash2, {})
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap rounded-lg bg-surface/50 p-3 text-sm", children: r.text })
    ] }, r.id)) })
  ] });
}
const SplitComponent = AdminReviewsTab;
export {
  SplitComponent as component
};
