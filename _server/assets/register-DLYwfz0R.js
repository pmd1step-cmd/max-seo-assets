import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { C as ConsentCheckbox, B as Button, s as supabase } from "./router-C7PFiMKM.js";
import { MailCheck, Briefcase, Heart, UserPlus } from "lucide-react";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-DFdczEgR.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-_9RNU9F4.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
function RegisterPage() {
  const [role, setRole] = useState("specialist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError("Необходимо согласиться с обработкой персональных данных");
      return;
    }
    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов");
      return;
    }
    if (!/[A-ZА-ЯЁ]/.test(password)) {
      setError("Пароль должен содержать хотя бы одну заглавную букву");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`';]/.test(password)) {
      setError("Пароль должен содержать хотя бы один спецсимвол");
      return;
    }
    setLoading(true);
    const {
      data,
      error: err
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${role === "client" ? "/account" : "/dashboard"}`,
        data: {
          name,
          role
        }
      }
    });
    setLoading(false);
    if (err) {
      setError(translateAuthError(err.message));
      return;
    }
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError("Этот email уже зарегистрирован. Войдите или восстановите пароль.");
      return;
    }
    setSent(true);
  };
  if (sent) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(MailCheck, { className: "text-primary", size: 32 }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-extrabold", children: "Подтвердите email" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
        "Мы отправили письмо со ссылкой подтверждения на",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: email }),
        ". Перейдите по ссылке из письма, чтобы активировать аккаунт и войти."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "Не пришло письмо? Проверьте папку «Спам»." }),
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "mt-6 inline-block text-sm text-primary hover:underline", children: "Перейти ко входу" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-4 py-16", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold", children: "Регистрация" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Выберите тип аккаунта для начала работы" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setRole("specialist"), className: `group rounded-2xl border p-4 text-left transition-all ${role === "specialist" ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface hover:border-primary/50"}`, children: [
        /* @__PURE__ */ jsx(Briefcase, { className: role === "specialist" ? "text-primary" : "text-muted-foreground", size: 22 }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-bold", children: "Специалист" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "Получаю заявки от клиентов" })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setRole("client"), className: `group rounded-2xl border p-4 text-left transition-all ${role === "client" ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface hover:border-primary/50"}`, children: [
        /* @__PURE__ */ jsx(Heart, { className: role === "client" ? "text-primary" : "text-muted-foreground", size: 22 }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-bold", children: "Заказчик" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "Ищу специалиста для задачи" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "glass mt-6 space-y-3 rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Ваше имя", value: name, onChange: (e) => setName(e.target.value), required: true, className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("input", { type: "password", placeholder: "Пароль", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8, className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[11px] text-muted-foreground", children: "Пароль должен содержать большую букву, спецсимвол и длину не менее 8 символов." })
      ] }),
      /* @__PURE__ */ jsx(ConsentCheckbox, { checked: consent, onChange: setConsent, id: "register-consent" }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading || !consent, className: "w-full gradient-bg", children: [
        /* @__PURE__ */ jsx(UserPlus, {}),
        " ",
        loading ? "Создание…" : role === "client" ? "Создать аккаунт заказчика" : "Создать аккаунт специалиста"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
        "Уже есть аккаунт?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary", children: "Войти" })
      ] })
    ] })
  ] });
}
function translateAuthError(message) {
  const m = message.toLowerCase();
  if (m.includes("password should be at least") || m.includes("password is too short")) return "Пароль слишком короткий — минимум 8 символов";
  if (m.includes("password") && m.includes("weak")) return "Слишком простой пароль. Используйте заглавные буквы, цифры и спецсимволы";
  if (m.includes("password")) return "Пароль не соответствует требованиям безопасности";
  if (m.includes("user already registered") || m.includes("already registered")) return "Этот email уже зарегистрирован. Войдите или восстановите пароль.";
  if (m.includes("invalid email") || m.includes("email address") && m.includes("invalid")) return "Некорректный email";
  if (m.includes("rate limit") || m.includes("too many")) return "Слишком много попыток. Попробуйте позже.";
  if (m.includes("network") || m.includes("fetch")) return "Ошибка сети. Проверьте подключение.";
  return "Не удалось зарегистрироваться. Попробуйте ещё раз.";
}
export {
  RegisterPage as component
};
