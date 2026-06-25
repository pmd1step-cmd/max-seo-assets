import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { R as Reveal } from "./reveal-DmyFqgA4.js";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, User, Mail, Briefcase, Shield, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { v as useAuth, ag as adminUsersQuery, s as supabase } from "./router-CuqCsxv6.js";
import { I as Input } from "./input-DYsxL-iM.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-78w7Xrx-.js";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-Cfs02Iui.js";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-select";
const ROLE_META = {
  admin: { label: "Admin", color: "bg-primary/15 text-primary", icon: Shield },
  specialist: {
    label: "Специалист",
    color: "bg-accent/15 text-accent",
    icon: Briefcase
  },
  client: { label: "Заказчик", color: "bg-success/15 text-success", icon: User }
};
const ALL_ROLES = ["admin", "specialist", "client"];
function AdminUsersTab() {
  const qc = useQueryClient();
  const { user: currentUser } = useAuth();
  const { data: users } = useSuspenseQuery(adminUsersQuery());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const toggleRole = useMutation({
    mutationFn: async (vars) => {
      const { error } = await supabase.functions.invoke("admin-users", {
        method: "POST",
        body: vars
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      toast.success(
        vars.op === "grant" ? "Роль назначена" : "Роль снята"
      );
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteUser = useMutation({
    mutationFn: async (user_id) => {
      const { error } = await supabase.functions.invoke("admin-users", {
        method: "DELETE",
        body: { user_id }
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Пользователь удалён");
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (q && !(u.email ?? "").toLowerCase().includes(q)) return false;
      if (filter === "all") return true;
      if (filter === "no_role") return u.roles.length === 0;
      return u.roles.includes(filter);
    });
  }, [users, query, filter]);
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Пользователи" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          users.length,
          " · показано: ",
          filtered.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Search,
            {
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              size: 16
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Поиск по email…",
              className: "w-64 pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filter, onValueChange: (v) => setFilter(v), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Все роли" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "admin", children: "Админы" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "specialist", children: "Специалисты" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "client", children: "Заказчики" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "no_role", children: "Без роли" })
          ] })
        ] })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(User, { className: "mx-auto text-muted-foreground", size: 48 }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "Пользователей не найдено" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filtered.map((u) => /* @__PURE__ */ jsx(
      UserCard,
      {
        user: u,
        isSelf: u.id === currentUser?.id,
        onToggle: (role, op) => toggleRole.mutate({ user_id: u.id, role, op }),
        onDelete: () => {
          if (window.confirm(
            `Удалить пользователя ${u.email ?? u.id}? Это действие необратимо: будут удалены аккаунт и все его роли.`
          )) {
            deleteUser.mutate(u.id);
          }
        },
        busy: toggleRole.isPending || deleteUser.isPending
      },
      u.id
    )) })
  ] });
}
function UserCard({
  user,
  isSelf,
  onToggle,
  onDelete,
  busy
}) {
  return /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Mail, { size: 14, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: user.email ?? "—" }),
        isSelf && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground", children: "Это вы" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Регистрация:",
          " ",
          formatDistanceToNow(new Date(user.created_at), {
            addSuffix: true,
            locale: ru
          })
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Последний вход:",
          " ",
          user.last_sign_in_at ? formatDistanceToNow(new Date(user.last_sign_in_at), {
            addSuffix: true,
            locale: ru
          }) : "никогда"
        ] })
      ] }),
      user.roles.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: user.roles.map((r) => {
        const meta = ROLE_META[r];
        const Icon = meta.icon;
        return /* @__PURE__ */ jsxs(
          "span",
          {
            className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.color}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { size: 11 }),
              meta.label
            ]
          },
          r
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      ALL_ROLES.map((role) => {
        const has = user.roles.includes(role);
        const meta = ROLE_META[role];
        const disabledSelf = isSelf && role === "admin" && has;
        return /* @__PURE__ */ jsx(
          "button",
          {
            disabled: busy || disabledSelf,
            onClick: () => onToggle(role, has ? "revoke" : "grant"),
            title: disabledSelf ? "Нельзя снять с себя роль admin" : has ? `Снять роль ${meta.label}` : `Назначить роль ${meta.label}`,
            className: `rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${has ? `${meta.color} border-transparent hover:opacity-80` : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
            children: has ? `− ${meta.label}` : `+ ${meta.label}`
          },
          role
        );
      }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: busy || isSelf,
          onClick: onDelete,
          title: isSelf ? "Нельзя удалить самого себя" : "Удалить пользователя",
          className: "inline-flex items-center gap-1 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx(Trash2, { size: 12 }),
            "Удалить"
          ]
        }
      )
    ] })
  ] }) });
}
const SplitComponent = AdminUsersTab;
export {
  SplitComponent as component
};
