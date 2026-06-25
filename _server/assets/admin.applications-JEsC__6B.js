import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { R as Reveal } from "./reveal-D7vvhq3X.js";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Inbox, ExternalLink, Mail, Phone, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { a6 as adminApplicationsQuery, s as supabase } from "./router-DUtz-x1q.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CYXkc2Qw.js";
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
import "@radix-ui/react-select";
const STATUS = {
  new: { label: "Новая", color: "bg-primary/15 text-primary" },
  in_progress: { label: "В работе", color: "bg-accent/15 text-accent" },
  closed: { label: "Закрыта", color: "bg-success/15 text-success" },
  rejected: { label: "Отклонена", color: "bg-muted text-muted-foreground" }
};
function AdminApplicationsTab() {
  const qc = useQueryClient();
  const { data: items } = useSuspenseQuery(adminApplicationsQuery());
  const [filter, setFilter] = useState("all");
  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Статус обновлён");
      qc.invalidateQueries({ queryKey: ["admin", "applications"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = filter === "all" ? items : items.filter((a) => a.status === filter);
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Все заявки" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          items.length
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
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "Заявок нет" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filtered.map((a) => {
      const meta = STATUS[a.status];
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
            /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { children: formatDistanceToNow(new Date(a.created_at), {
                addSuffix: true,
                locale: ru
              }) }),
              a.specialists?.slug && /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/specialist/$slug",
                  params: { slug: a.specialists.slug },
                  className: "inline-flex items-center gap-1 text-primary hover:text-primary-glow",
                  children: [
                    "→ ",
                    a.specialists.name ?? "Специалист",
                    " ",
                    /* @__PURE__ */ jsx(ExternalLink, { size: 11 })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: a.status,
              onValueChange: (v) => updateStatus.mutate({
                id: a.id,
                status: v
              }),
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
const SplitComponent = AdminApplicationsTab;
export {
  SplitComponent as component
};
