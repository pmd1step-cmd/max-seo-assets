import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { R as Route, B as Button, s as supabase } from "./router-DUtz-x1q.js";
import { LogIn } from "lucide-react";
import { B as Breadcrumbs } from "./Breadcrumbs-Cx0IjGnF.js";
import "@tanstack/react-query";
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
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-DTsMGolV.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const search = Route.useSearch();
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const {
      data,
      error: err
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (err || !data.user) {
      setLoading(false);
      setError(err?.message ?? "Не удалось войти");
      return;
    }
    if (search.redirect) {
      setLoading(false);
      window.location.href = search.redirect;
      return;
    }
    const {
      data: rolesData
    } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    const roles = new Set((rolesData ?? []).map((r) => r.role));
    setLoading(false);
    if (roles.has("admin")) {
      navigate({
        to: "/admin"
      });
    } else if (roles.has("client") && !roles.has("specialist")) {
      navigate({
        to: "/account"
      });
    } else {
      navigate({
        to: "/dashboard"
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-4 py-16", children: [
    /* @__PURE__ */ jsx(Breadcrumbs, { items: [{
      label: "Вход"
    }], className: "mb-6" }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold", children: "Вход в кабинет" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Для специалистов платформы" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "glass mt-6 space-y-3 rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Пароль", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full gradient-bg", children: [
        /* @__PURE__ */ jsx(LogIn, {}),
        " ",
        loading ? "Вход…" : "Войти"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Нет аккаунта?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-primary", children: "Зарегистрироваться" })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
