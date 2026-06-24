import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter, Link, useLocation, createRootRouteWithContext, HeadContent, Scripts, Outlet, createFileRoute, lazyRouteComponent, redirect, notFound, stripSearchParams, createRouter } from "@tanstack/react-router";
import { queryOptions, useQuery, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState, useEffect, useCallback, useMemo, createContext, useContext } from "react";
import { Moon, Sun, ChevronDown, Shield, Heart, LayoutDashboard, LogIn, X, Menu, Home, Search, User, CheckCircle2, Send, Map as Map$1, Users, BookOpen } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";
import { r as resolveClientTheme, a as applyTheme } from "./theme-D1_WM6m3.js";
import { T as TSS_SERVER_FUNCTION, i as getServerFnById, h as createServerFn } from "../server.js";
import { Toaster as Toaster$1 } from "sonner";
import { z } from "zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { a as buildSitemapXml } from "./sitemap.server-DTsMGolV.js";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
const appCss = "https://cdn.jsdelivr.net/gh/pmd1step-cmd/max-seo-assets@main/assets/styles-Da7yIpxA.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function createSupabaseClient() {
  const SUPABASE_URL = typeof window !== "undefined" ? "https://maxexperts.ru/sb" : "https://pxbgrdfjsrdhumawjack.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YmdyZGZqc3JkaHVtYXdqYWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MTg2MTcsImV4cCI6MjA5MTk5NDYxN30.5ClGtem2P96ciF7Yo0o3scwlDQUpQstUIG8W9h_wYgw\n";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const EMPTY_ROLES = { isAdmin: false, isClient: false, isSpecialist: false };
function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState(EMPTY_ROLES);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setLoading(false);
      if (sess?.user) {
        setTimeout(() => {
          fetchRoles(sess.user.id).then(setRoles);
        }, 0);
      } else {
        setRoles(EMPTY_ROLES);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session?.user) {
        fetchRoles(data.session.user.id).then(setRoles);
      }
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);
  return {
    user: session?.user ?? null,
    session,
    loading,
    isAuthenticated: !!session?.user,
    ...roles
  };
}
async function fetchRoles(userId) {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  if (error || !data) return EMPTY_ROLES;
  const set = new Set(data.map((r) => r.role));
  return {
    isAdmin: set.has("admin"),
    isClient: set.has("client"),
    isSpecialist: set.has("specialist")
  };
}
async function signOut() {
  await supabase.auth.signOut();
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const setThemeCookieFn = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  if (data.theme !== "light" && data.theme !== "dark") {
    throw new Error("Invalid theme");
  }
  return data;
}).handler(createSsrRpc("29ced5f2dcc7c1623059e1e6889516930b4805911d8c04c06e8ff1063d06cca5"));
const ThemeContext = createContext(null);
function ThemeProvider({
  initialTheme,
  children
}) {
  const [theme, setThemeState] = useState(initialTheme);
  useEffect(() => {
    const resolved = resolveClientTheme();
    if (resolved !== theme) {
      setThemeState(resolved);
      applyTheme(resolved);
    } else {
      applyTheme(resolved);
    }
  }, []);
  const setTheme = useCallback((next) => {
    setThemeState(next);
    applyTheme(next);
    setThemeCookieFn({ data: { theme: next } }).catch(() => {
    });
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": isDark,
      "aria-label": isDark ? "Переключить на светлую тему" : "Переключить на тёмную тему",
      onClick: toggleTheme,
      className: `theme-toggle ${isDark ? "is-dark" : "is-light"} ${className}`,
      children: /* @__PURE__ */ jsx("span", { className: "theme-toggle-thumb", children: isDark ? /* @__PURE__ */ jsx(Moon, { size: 12 }) : /* @__PURE__ */ jsx(Sun, { size: 12 }) })
    }
  );
}
function coerceItems(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((it) => typeof it === "object" && it !== null).map((it) => ({
    icon: String(it.icon ?? ""),
    title: String(it.title ?? ""),
    text: String(it.text ?? "")
  }));
}
function coerceSimpleBlock(value, defaultTitle) {
  const o = value && typeof value === "object" ? value : {};
  return {
    title: String(o.title ?? defaultTitle),
    hidden: Boolean(o.hidden ?? false),
    items: coerceItems(o.items)
  };
}
function coerceProcessBlock(value) {
  const o = value && typeof value === "object" ? value : {};
  return {
    title: String(o.title ?? "Как мы работаем"),
    hidden: Boolean(o.hidden ?? false),
    use_global: Boolean(o.use_global ?? true),
    items: coerceItems(o.items)
  };
}
function coerceCasesBlock(value) {
  const o = value && typeof value === "object" ? value : {};
  const src = o.source === "manual" ? "manual" : "auto";
  return {
    title: String(o.title ?? "Кейсы"),
    hidden: Boolean(o.hidden ?? true),
    source: src,
    limit: Number(o.limit ?? 3),
    manual_ids: Array.isArray(o.manual_ids) ? o.manual_ids.map(String) : []
  };
}
function coerceSpecialistsBlock(value) {
  const o = value && typeof value === "object" ? value : {};
  const src = o.source === "manual" ? "manual" : "auto";
  return {
    title: String(o.title ?? "Исполнители под задачу"),
    hidden: Boolean(o.hidden ?? false),
    source: src,
    limit: Number(o.limit ?? 6),
    filter_tag: o.filter_tag == null ? null : String(o.filter_tag)
  };
}
function coerceFinalCtaBlock(value) {
  const o = value && typeof value === "object" ? value : {};
  const action = o.action === "url" ? "url" : "lead";
  return {
    title: String(o.title ?? "Готовы привлекать клиентов из МАКС?"),
    hidden: Boolean(o.hidden ?? false),
    text: String(o.text ?? "Оставьте заявку — подберем решение и исполнителей под вашу задачу."),
    button_text: String(o.button_text ?? "Получить решение"),
    action,
    url: o.url == null ? null : String(o.url)
  };
}
function mapService(row) {
  const block_what_included = coerceSimpleBlock(row.block_what_included, "Что входит в услугу");
  const block_audience = coerceSimpleBlock(row.block_audience, "Кому подойдёт");
  const legacyWhat = coerceItems(row.what_includes);
  const legacyAud = coerceItems(row.audiences);
  const status = row.status ?? "draft";
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    short_description: row.short_description ?? null,
    icon: row.icon ?? null,
    hero_h1: row.hero_h1 ?? null,
    hero_subtitle: row.hero_subtitle ?? null,
    hero_cta_primary: row.hero_cta_primary ?? null,
    hero_cta_secondary: row.hero_cta_secondary ?? null,
    hero_microtext: row.hero_microtext ?? null,
    hero_image: row.hero_image ?? null,
    what_includes: block_what_included.items.length > 0 ? block_what_included.items : legacyWhat,
    audiences: block_audience.items.length > 0 ? block_audience.items : legacyAud,
    block_what_included: {
      ...block_what_included,
      items: block_what_included.items.length > 0 ? block_what_included.items : legacyWhat
    },
    block_audience: {
      ...block_audience,
      items: block_audience.items.length > 0 ? block_audience.items : legacyAud
    },
    block_process: coerceProcessBlock(row.block_process),
    block_cases: coerceCasesBlock(row.block_cases),
    block_specialists: coerceSpecialistsBlock(row.block_specialists),
    block_final_cta: coerceFinalCtaBlock(row.block_final_cta),
    meta_title: row.meta_title ?? null,
    meta_description: row.meta_description ?? null,
    og_image: row.og_image ?? null,
    seo_canonical: row.seo_canonical ?? null,
    seo_robots_index: row.seo_robots_index !== false,
    seo_robots_follow: row.seo_robots_follow !== false,
    status,
    is_published: Boolean(row.is_published),
    show_on_homepage: row.show_on_homepage !== false,
    show_on_hub: row.show_on_hub !== false,
    sort_order: Number(row.sort_order ?? 0),
    published_at: row.published_at ?? null,
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
    created_by: row.created_by ?? null,
    updated_by: row.updated_by ?? null
  };
}
function servicesQuery() {
  return queryOptions({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").eq("status", "published").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapService);
    }
  });
}
function serviceBySlugQuery(slug) {
  return queryOptions({
    queryKey: ["service", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (error) throw error;
      return data ? mapService(data) : null;
    }
  });
}
function redirectByPathQuery(path) {
  return queryOptions({
    queryKey: ["redirect", path],
    queryFn: async () => {
      const { data, error } = await supabase.from("redirects").select("to_path").eq("from_path", path).maybeSingle();
      if (error) throw error;
      return data?.to_path ?? null;
    }
  });
}
function adminServicesQuery() {
  return queryOptions({
    queryKey: ["admin", "services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapService);
    }
  });
}
function adminServiceByIdQuery(id) {
  return queryOptions({
    queryKey: ["admin", "service", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data ? mapService(data) : null;
    }
  });
}
function serviceTagsQuery(serviceId) {
  return queryOptions({
    queryKey: ["admin", "service-tags", serviceId],
    queryFn: async () => {
      const { data, error } = await supabase.from("service_tags").select("category_id").eq("service_id", serviceId);
      if (error) throw error;
      return (data ?? []).map((r) => r.category_id);
    }
  });
}
function serviceRevisionsQuery(serviceId) {
  return queryOptions({
    queryKey: ["admin", "service-revisions", serviceId],
    queryFn: async () => {
      const { data, error } = await supabase.from("service_revisions").select("*").eq("service_id", serviceId).order("created_at", { ascending: false }).limit(10);
      if (error) throw error;
      return (data ?? []).map((r) => ({
        id: String(r.id),
        service_id: String(r.service_id),
        snapshot: mapService(r.snapshot ?? {}),
        comment: r.comment ?? null,
        created_at: String(r.created_at),
        created_by: r.created_by ?? null
      }));
    }
  });
}
function makeEmptyService() {
  return {
    id: "",
    slug: "",
    name: "",
    short_description: null,
    icon: null,
    hero_h1: null,
    hero_subtitle: null,
    hero_cta_primary: "Получить решение",
    hero_cta_secondary: "Оставить заявку",
    hero_microtext: null,
    hero_image: null,
    what_includes: [],
    audiences: [],
    block_what_included: { title: "Что входит в услугу", hidden: false, items: [] },
    block_audience: { title: "Кому подойдёт", hidden: false, items: [] },
    block_process: { title: "Как мы работаем", hidden: false, use_global: true, items: [] },
    block_cases: { title: "Кейсы", hidden: true, source: "auto", limit: 3, manual_ids: [] },
    block_specialists: {
      title: "Исполнители под задачу",
      hidden: false,
      source: "auto",
      limit: 6,
      filter_tag: null
    },
    block_final_cta: {
      title: "Готовы привлекать клиентов из МАКС?",
      hidden: false,
      text: "Оставьте заявку — подберем решение и исполнителей под вашу задачу.",
      button_text: "Получить решение",
      action: "lead",
      url: null
    },
    meta_title: null,
    meta_description: null,
    og_image: null,
    seo_canonical: null,
    seo_robots_index: true,
    seo_robots_follow: true,
    status: "draft",
    is_published: false,
    show_on_homepage: true,
    show_on_hub: true,
    sort_order: 0,
    published_at: null,
    created_at: "",
    updated_at: "",
    created_by: null,
    updated_by: null
  };
}
const navItems = [
  { to: "/", label: "Главная" },
  { to: "/specialists", label: "Специалисты" },
  { to: "/cases", label: "Кейсы" },
  { to: "/blog", label: "Блог" }
];
function Header({ isAuthenticated, isAdmin = false, isClient = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const router2 = useRouter();
  const { data: services = [] } = useQuery(servicesQuery());
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleSignOut = async () => {
    await signOut();
    router2.navigate({ to: "/" });
  };
  const accountTo = isClient && !isAdmin ? "/account" : "/dashboard";
  const accountLabel = isClient && !isAdmin ? "Мой кабинет" : "Кабинет";
  const AccountIcon = isClient && !isAdmin ? Heart : LayoutDashboard;
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/80" : "border-b border-transparent bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:px-8", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-extrabold tracking-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-lg gradient-bg shadow-glow", children: /* @__PURE__ */ jsx("span", { className: "text-lg text-primary-foreground", children: "M" }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg", children: [
              "МАКС ",
              /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Experts" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/",
                className: "relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                activeProps: { className: "text-foreground" },
                activeOptions: { exact: true },
                children: "Главная"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative",
                onMouseEnter: () => setServicesOpen(true),
                onMouseLeave: () => setServicesOpen(false),
                children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: "/max-dlya-biznesa",
                      className: "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                      activeProps: { className: "text-foreground" },
                      children: [
                        "Услуги",
                        /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: servicesOpen ? "rotate-180 transition-transform" : "transition-transform" })
                      ]
                    }
                  ),
                  servicesOpen && services.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-background/95 shadow-elevated backdrop-blur-xl", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        to: "/max-dlya-biznesa",
                        className: "block border-b border-border px-4 py-3 text-sm font-semibold hover:bg-secondary",
                        children: "Все услуги для бизнеса →"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "py-1", children: services.map((s) => /* @__PURE__ */ jsx(
                      Link,
                      {
                        to: "/uslugi/$serviceSlug",
                        params: { serviceSlug: s.slug },
                        className: "block px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
                        children: s.name
                      },
                      s.id
                    )) })
                  ] }) })
                ]
              }
            ),
            navItems.slice(1).map((item) => /* @__PURE__ */ jsx(
              Link,
              {
                to: item.to,
                className: "relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                activeProps: { className: "text-foreground" },
                children: item.label
              },
              item.to
            ))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-3 md:flex", children: [
            /* @__PURE__ */ jsx(ThemeToggle, {}),
            isAuthenticated ? /* @__PURE__ */ jsxs(Fragment, { children: [
              isAdmin && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: "/admin", children: [
                /* @__PURE__ */ jsx(Shield, {}),
                "Админ"
              ] }) }),
              /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: accountTo, children: [
                /* @__PURE__ */ jsx(AccountIcon, {}),
                accountLabel
              ] }) }),
              /* @__PURE__ */ jsx(Button, { onClick: handleSignOut, variant: "outline", size: "sm", children: "Выйти" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: "/login", children: [
                /* @__PURE__ */ jsx(LogIn, {}),
                "Войти"
              ] }) }),
              /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "gradient-bg shadow-glow hover:scale-105", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Регистрация" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "rounded-md p-2 text-foreground md:hidden",
              onClick: () => setOpen((v) => !v),
              "aria-label": "Меню",
              children: open ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background/95 backdrop-blur-xl md:hidden", children: /* @__PURE__ */ jsxs("nav", { className: "mx-auto flex max-w-[1280px] flex-col gap-1 p-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
              children: "Главная"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/max-dlya-biznesa",
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-2 text-sm font-semibold hover:bg-secondary",
              children: "Услуги"
            }
          ),
          services.length > 0 && /* @__PURE__ */ jsx("div", { className: "ml-3 flex flex-col gap-0.5 border-l border-border pl-3", children: services.map((s) => /* @__PURE__ */ jsx(
            Link,
            {
              to: "/uslugi/$serviceSlug",
              params: { serviceSlug: s.slug },
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
              children: s.name
            },
            s.id
          )) }),
          navItems.slice(1).map((item) => /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              onClick: () => setOpen(false),
              className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
              children: item.label
            },
            item.to
          )),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between border-t border-border pt-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Тема оформления" }),
            /* @__PURE__ */ jsx(ThemeToggle, {})
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-col gap-2", children: isAuthenticated ? /* @__PURE__ */ jsxs(Fragment, { children: [
            isAdmin && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full", children: /* @__PURE__ */ jsxs(Link, { to: "/admin", onClick: () => setOpen(false), children: [
              /* @__PURE__ */ jsx(Shield, {}),
              "Админ-панель"
            ] }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full", children: /* @__PURE__ */ jsxs(Link, { to: accountTo, onClick: () => setOpen(false), children: [
              /* @__PURE__ */ jsx(AccountIcon, {}),
              accountLabel
            ] }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => {
                  setOpen(false);
                  handleSignOut();
                },
                variant: "ghost",
                className: "w-full",
                children: "Выйти"
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full", children: /* @__PURE__ */ jsxs(Link, { to: "/login", onClick: () => setOpen(false), children: [
              /* @__PURE__ */ jsx(LogIn, {}),
              "Войти"
            ] }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full gradient-bg", children: /* @__PURE__ */ jsx(Link, { to: "/register", onClick: () => setOpen(false), children: "Регистрация" }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
const serviceLinks = [
  { slug: "nastrojka-reklamy", label: "Настройка рекламы" },
  { slug: "voronki", label: "Воронки и чат-боты" },
  { slug: "rassylki", label: "Рассылки" },
  { slug: "posevy", label: "Посевы" },
  { slug: "audit", label: "Аудит продвижения" }
];
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-background", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-extrabold", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-lg gradient-bg", children: /* @__PURE__ */ jsx("span", { className: "text-lg text-primary-foreground", children: "M" }) }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg", children: [
            "МАКС ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Experts" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-sm text-muted-foreground", children: "Каталог проверенных специалистов по рекламе и маркетингу в мессенджере МАКС." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground", children: "Услуги" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
          serviceLinks.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/uslugi/$serviceSlug",
              params: { serviceSlug: l.slug },
              className: "hover:text-foreground",
              children: l.label
            }
          ) }, l.slug)),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/max-dlya-biznesa", className: "hover:text-foreground", children: "Все услуги" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/specialists", className: "hover:text-foreground", children: "Каталог специалистов" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground", children: "Для специалистов" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/register", className: "hover:text-foreground", children: "Регистрация" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/login", className: "hover:text-foreground", children: "Войти в кабинет" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/cases", className: "hover:text-foreground", children: "Кейсы" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-foreground", children: "Блог" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/sitemap", className: "hover:text-foreground", children: "Карта сайта" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " МАКС Experts. Все права защищены.",
        " · ",
        /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "hover:text-foreground", children: "Политика конфиденциальности" }),
        " · ",
        /* @__PURE__ */ jsx(Link, { to: "/user-agreement", className: "hover:text-foreground", children: "Согласие на обработку персональных данных" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Платформа не аффилирована с мессенджером МАКС." })
    ] })
  ] }) });
}
function MobileBottomNav() {
  const loc = useLocation();
  const { isAuthenticated, isClient, isSpecialist, isAdmin } = useAuth();
  const accountTo = isClient && !isSpecialist ? "/account" : "/dashboard";
  const showAccount = isAuthenticated && (isClient || isSpecialist || isAdmin);
  const items = [
    { to: "/", label: "Главная", icon: Home, match: (p) => p === "/" },
    {
      to: "/specialists",
      label: "Каталог",
      icon: Search,
      match: (p) => p.startsWith("/specialists")
    },
    showAccount ? {
      to: accountTo,
      label: isClient && !isSpecialist ? "Избранное" : "Кабинет",
      icon: isClient && !isSpecialist ? Heart : User,
      match: (p) => p.startsWith("/account") || p.startsWith("/dashboard")
    } : {
      to: "/login",
      label: "Войти",
      icon: User,
      match: (p) => p === "/login" || p === "/register"
    }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl md:hidden", children: /* @__PURE__ */ jsx("ul", { className: "mx-auto flex max-w-[1280px] items-center justify-around px-2 py-2", children: items.map((item) => {
    const Icon = item.icon;
    const active = item.match(loc.pathname);
    return /* @__PURE__ */ jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: item.to,
        className: `flex flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[11px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground"}`,
        children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              size: 20,
              className: active ? "text-primary" : "text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ]
      }
    ) }, item.to);
  }) }) });
}
const STORAGE_KEY = "cookie-consent-accepted-v1";
function CookieBanner() {
  const [visible, setVisible] = useState(null);
  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      setVisible(!accepted);
    } catch {
      setVisible(true);
    }
  }, []);
  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
    }
    setVisible(false);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "dialog",
      "aria-label": "Уведомление об использовании cookies",
      className: "fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-border bg-background p-4 pr-10 shadow-lg md:bottom-6 md:right-6",
      style: { marginBottom: "env(safe-area-inset-bottom)" },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            "aria-label": "Закрыть уведомление",
            className: "absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-foreground", children: [
          "Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "font-medium text-primary hover:underline", children: "Политикой обработки cookie" }),
          "."
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "mt-3 inline-flex items-center justify-center rounded-md gradient-bg px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:shadow-glow",
            children: "Принять"
          }
        )
      ]
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function ConsentCheckbox({ checked, onChange, id = "consent", className }) {
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: id,
      className: `flex items-start gap-2 text-xs text-muted-foreground ${className ?? ""}`,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id,
            type: "checkbox",
            checked,
            onChange: (e) => onChange(e.target.checked),
            required: true,
            className: "mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          }
        ),
        /* @__PURE__ */ jsxs("span", { children: [
          "Я ознакомлен(а) и согласен(на) с",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/privacy-policy",
              target: "_blank",
              className: "text-primary hover:underline",
              children: "Политикой конфиденциальности"
            }
          ),
          " ",
          "и",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/user-agreement",
              target: "_blank",
              className: "text-primary hover:underline",
              children: "Согласием на обработку персональных данных"
            }
          ),
          "."
        ] })
      ]
    }
  );
}
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const leadSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100, "Слишком длинное имя"),
  phone: z.string().trim().min(5, "Введите телефон").max(30, "Слишком длинный телефон"),
  task: z.string().trim().min(1, "Опишите задачу").max(2e3, "Слишком длинное описание")
});
const LeadContext = createContext(null);
function useLeadRequest() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLeadRequest must be used inside <LeadRequestProvider>");
  return ctx;
}
function LeadRequestProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState(void 0);
  const open = useCallback((src) => {
    setSource(src);
    setIsOpen(true);
  }, []);
  const value = useMemo(() => ({ open }), [open]);
  return /* @__PURE__ */ jsxs(LeadContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(LeadRequestDialog, { isOpen, onOpenChange: setIsOpen, source })
  ] });
}
function LeadRequestDialog({
  isOpen,
  onOpenChange,
  source
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [task, setTask] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const handleOpenChange = (v) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setDone(false);
        setError("");
        if (done) {
          setName("");
          setPhone("");
          setTask("");
          setConsent(false);
        }
      }, 200);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError("Необходимо согласиться с обработкой персональных данных");
      return;
    }
    const parsed = leadSchema.safeParse({ name, phone, task });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Проверьте поля формы");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.from("lead_requests").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      task: parsed.data.task,
      source: source ?? null,
      status: "new"
    });
    setLoading(false);
    if (err) {
      setError("Не удалось отправить заявку. Попробуйте позже.");
      return;
    }
    setDone(true);
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-md", children: done ? /* @__PURE__ */ jsxs("div", { className: "py-6 text-center", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto text-success", size: 48 }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-bold", children: "Заявка отправлена" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Свяжемся с вами в течение рабочего дня и предложим решение под задачу." }),
    /* @__PURE__ */ jsx(Button, { onClick: () => handleOpenChange(false), className: "mt-6 gradient-bg", children: "Хорошо" })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Оставить заявку" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Опишите задачу — подберём решение и исполнителей под вас." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-2 space-y-3", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Ваше имя *",
          value: name,
          onChange: (e) => setName(e.target.value),
          maxLength: 100,
          required: true,
          className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "tel",
          placeholder: "Телефон *",
          value: phone,
          onChange: (e) => setPhone(e.target.value),
          maxLength: 30,
          required: true,
          className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          placeholder: "Опишите задачу *",
          value: task,
          onChange: (e) => setTask(e.target.value),
          rows: 4,
          maxLength: 2e3,
          required: true,
          className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        }
      ),
      /* @__PURE__ */ jsx(ConsentCheckbox, { checked: consent, onChange: setConsent, id: "lead-consent" }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          type: "submit",
          disabled: loading || !consent,
          className: "w-full gradient-bg shadow-glow",
          children: [
            /* @__PURE__ */ jsx(Send, {}),
            " ",
            loading ? "Отправка…" : "Отправить заявку"
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Работа проходит через платформу — фиксируем задачу и контролируем результат." })
    ] })
  ] }) }) });
}
const getInitialThemeFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cbb6bc6d6687d3122fe9c15a250f07265d616be9efef9da718dd570976d1d3a8"));
const DEFAULT_ROBOTS_TXT = "User-agent: *\nDisallow: /\n\nSitemap: https://maxexperts.ru/sitemap.xml\n";
const getSiteSettingsFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("8604e91a3b17b3cb4113e226a3b90ed51d427dc03a30494a60ba86efdef44c63"));
const SITE_URL$1 = "https://maxexperts.ru";
function canonicalUrl(pathname) {
  if (!pathname || pathname === "/") return `${SITE_URL$1}/`;
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const noQuery = clean.split("?")[0].split("#")[0];
  const trimmed = noQuery.length > 1 && noQuery.endsWith("/") ? noQuery.slice(0, -1) : noQuery;
  return `${SITE_URL$1}${trimmed}`;
}
function canonicalLink(pathname) {
  return [{ rel: "canonical", href: canonicalUrl(pathname) }];
}
function ogMeta(opts) {
  const { title, description, pathname, image, type = "website" } = opts;
  const tags = [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description }
  ];
  if (pathname) {
    tags.push({ property: "og:url", content: canonicalUrl(pathname) });
  }
  if (image) {
    tags.push({ property: "og:image", content: image });
    tags.push({ name: "twitter:image", content: image });
  }
  return tags;
}
const quickLinks = [
  { to: "/specialists", label: "Каталог специалистов", icon: Users },
  { to: "/max-dlya-biznesa", label: "Услуги", icon: BookOpen },
  { to: "/blog", label: "Блог", icon: BookOpen },
  { to: "/cases", label: "Кейсы", icon: BookOpen }
];
function NotFound() {
  return /* @__PURE__ */ jsxs("section", { className: "mx-auto flex max-w-[1280px] flex-col items-center justify-center px-4 py-20 text-center md:px-8 md:py-28", children: [
    /* @__PURE__ */ jsx("p", { className: "gradient-text text-[88px] font-extrabold leading-none md:text-[140px]", children: "404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-extrabold text-foreground md:text-3xl", children: "Страница не найдена" }),
    /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-lg text-sm text-muted-foreground md:text-base", children: "Возможно, адрес введён с ошибкой, страница была удалена или перемещена. Воспользуйтесь ссылками ниже, чтобы быстро найти нужный раздел." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center justify-center gap-2 rounded-md gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-glow",
          children: [
            /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
            "На главную"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/sitemap",
          className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: [
            /* @__PURE__ */ jsx(Map$1, { className: "h-4 w-4" }),
            "Карта сайта"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 w-full max-w-2xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Популярные разделы" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4", children: quickLinks.map((link) => {
        const Icon = link.icon;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: link.to,
            className: "flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-sm text-foreground transition-all hover:border-primary hover:shadow-md",
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsx("span", { children: link.label })
            ]
          },
          link.to
        );
      }) })
    ] })
  ] });
}
const Route$J = createRootRouteWithContext()({
  // Загружаем тему из cookie на сервере, чтобы корректно поставить класс на <html>
  // ещё до отрисовки HTML — без FOUC.
  // Также подгружаем код Я.Метрики (вставляется в <head> через RootShell).
  loader: async () => {
    const [theme, settings] = await Promise.all([
      getInitialThemeFn(),
      getSiteSettingsFn()
    ]);
    return {
      theme,
      metrikaScript: settings.metrika_script,
      metrikaNoscript: settings.metrika_noscript,
      customHeadCode: settings.custom_head_code
    };
  },
  head: () => {
    const title = "МАКС Experts — Каталог специалистов по рекламе в МАКС";
    const description = "Найдите проверенных специалистов по рекламе, продвижению и маркетингу в мессенджере МАКС. 250+ экспертов, кейсы, отзывы.";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title },
        { name: "description", content: description },
        { name: "author", content: "МАКС Experts" },
        { name: "yandex-verification", content: "af3ca3aaf109b677" },
        { property: "og:site_name", content: "МАКС Experts" },
        // OG/Twitter — производятся из title/description; дочерние роуты их
        // переопределяют автоматически через дедупликацию по name/property.
        ...ogMeta({ title, description, pathname: "/" })
      ],
      links: [
        // ВАЖНО: canonical здесь НЕ задаём. TanStack Router не дедуплицирует
        // <link rel="canonical">, поэтому корневой canonical перебивал бы canonical
        // дочерних роутов. Каждый публичный роут указывает свой canonical сам
        // через head().links + helpers из @/lib/seo.
        { rel: "stylesheet", href: appCss },
        // Favicon — тот же градиентный логотип "M", что и в шапке.
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        // Шрифт Inter подключаем как preload — фактический <link rel="stylesheet">
        // ставится в RootShell через dangerouslySetInnerHTML с media="print"+onload,
        // чтобы он не блокировал FCP. См. RootShell ниже.
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        }
      ]
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound
});
function RootShell({ children }) {
  const { theme, metrikaScript, metrikaNoscript, customHeadCode } = Route$J.useLoaderData();
  return /* @__PURE__ */ jsxs("html", { lang: "ru", className: theme, suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        }
      ),
      /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        }
      ) }),
      metrikaScript ? /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `(function(){var loaded=false;function load(){if(loaded)return;loaded=true;try{${metrikaScript}}catch(e){}}var ev=['scroll','mousemove','touchstart','keydown'];function onAct(){load();ev.forEach(function(e){window.removeEventListener(e,onAct)})}ev.forEach(function(e){window.addEventListener(e,onAct,{once:true,passive:true})});setTimeout(load,3500);})();`
          }
        }
      ) : null,
      customHeadCode ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("template", { dangerouslySetInnerHTML: { __html: "" } }),
        /* @__PURE__ */ jsx(
          "script",
          {
            dangerouslySetInnerHTML: {
              __html: `(function(){var d=document.createElement('div');d.innerHTML=${JSON.stringify(customHeadCode)};while(d.firstChild)document.head.appendChild(d.firstChild);})();`
            }
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      metrikaNoscript ? /* @__PURE__ */ jsx(
        "noscript",
        {
          dangerouslySetInnerHTML: { __html: metrikaNoscript }
        }
      ) : null,
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$J.useRouteContext();
  const { theme } = Route$J.useLoaderData();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(ThemeProvider, { initialTheme: theme, children: /* @__PURE__ */ jsx(LeadRequestProvider, { children: /* @__PURE__ */ jsx(AppShell, {}) }) }) });
}
function AppShell() {
  const auth = useAuth();
  const router2 = useRouter();
  useEffect(() => {
    router2.update({
      context: {
        ...router2.options.context,
        auth: {
          isReady: !auth.loading,
          isAuthenticated: auth.isAuthenticated,
          userId: auth.user?.id ?? null,
          userEmail: auth.user?.email ?? null,
          isAdmin: auth.isAdmin,
          isClient: auth.isClient,
          isSpecialist: auth.isSpecialist
        }
      }
    });
    if (!auth.loading) {
      router2.invalidate();
    }
  }, [
    auth.loading,
    auth.isAuthenticated,
    auth.user?.id,
    auth.user?.email,
    auth.isAdmin,
    auth.isClient,
    auth.isSpecialist,
    router2
  ]);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        isAuthenticated: auth.isAuthenticated,
        isAdmin: auth.isAdmin,
        isClient: auth.isClient
      }
    ),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pb-20 md:pb-0", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(MobileBottomNav, {}),
    /* @__PURE__ */ jsx(CookieBanner, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$D = () => import("./user-agreement-B_8bYWTM.js");
const Route$I = createFileRoute("/user-agreement")({
  head: () => {
    const title = "Согласие на обработку персональных данных | МАКС Experts";
    const description = "Согласие пользователя сайта maxexperts.ru на обработку персональных данных в соответствии с ФЗ-152: перечень данных, цели, получатели, срок и порядок отзыва.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/user-agreement"
      }), {
        name: "robots",
        content: "index, follow"
      }],
      links: canonicalLink("/user-agreement")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$D, "component")
});
const $$splitComponentImporter$C = () => import("./specialists-BFsOu0JM.js");
const Route$H = createFileRoute("/specialists")({
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const SITE_URL = "https://maxexperts.ru";
const Route$G = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const xml = await buildSitemapXml(SITE_URL);
          return new Response(xml, {
            status: 200,
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=1800, s-maxage=1800"
            }
          });
        } catch (err) {
          console.error("[sitemap.xml] generation failed:", err);
          const fallback2 = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc></url>
</urlset>
`;
          return new Response(fallback2, {
            status: 200,
            headers: { "Content-Type": "application/xml; charset=utf-8" }
          });
        }
      }
    }
  }
});
const getHtmlSitemap = createServerFn({
  method: "GET"
}).handler(createSsrRpc("03eb80c9fe699e90a5241b29c2418a64adf0e37ec2686bf6faa3accedd59a269"));
const htmlSitemapQuery = () => queryOptions({
  queryKey: ["html-sitemap"],
  queryFn: () => getHtmlSitemap(),
  // Карта сайта меняется редко — кешируем на 5 минут, чтобы не дёргать БД.
  staleTime: 5 * 60 * 1e3
});
const $$splitComponentImporter$B = () => import("./sitemap-CjX3WZIC.js");
const Route$F = createFileRoute("/sitemap")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(htmlSitemapQuery()),
  head: () => {
    const title = "Карта сайта | МАКС Experts";
    const description = "Структурированная карта сайта maxexperts.ru: разделы каталога, услуги, категории специалистов, кейсы и статьи блога — все публичные страницы в одном списке.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/sitemap"
      })],
      links: canonicalLink("/sitemap")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const Route$E = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        let body = DEFAULT_ROBOTS_TXT;
        try {
          const settings = await getSiteSettingsFn();
          if (settings.robots_txt && settings.robots_txt.length > 0) {
            body = settings.robots_txt;
          }
        } catch (e) {
          console.error("[robots.txt] failed to load settings:", e);
        }
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=300"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$A = () => import("./register-DRxuyC4C.js");
const Route$D = createFileRoute("/register")({
  head: () => {
    const title = "Регистрация — МАКС Experts";
    const description = "Создайте аккаунт на МАКС Experts: разместите профиль специалиста или найдите исполнителя для продвижения в мессенджере МАКС.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/register"
      })],
      links: canonicalLink("/register")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./privacy-policy-BzZ9aErs.js");
const Route$C = createFileRoute("/privacy-policy")({
  head: () => {
    const title = "Политика конфиденциальности и обработки файлов Cookie | МАКС Experts";
    const description = "Политика конфиденциальности и обработки файлов Cookie на сайте maxexperts.ru: цели обработки, права субъектов персональных данных, перечень cookie. Вы соглашаетесь с политикой посещая сайт";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/privacy-policy"
      }), {
        name: "robots",
        content: "index, follow"
      }],
      links: canonicalLink("/privacy-policy")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const PUBLIC_SPECIALIST_COLUMNS = "id, user_id, slug, name, brand_name, avatar_url, short_description, full_description, experience_years, price_from, price_to, rating, reviews_count, has_cases, location, is_published, views_count, meta_title, meta_description, moderation_status, rejection_reason, submitted_at, reviewed_at";
const PUBLIC_REVIEW_COLUMNS = "id, specialist_id, author_name, rating, text, is_approved, created_at";
const categoriesQuery = () => queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const { data, error } = await supabase.from("categories").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60 * 1e3
});
const categoryBySlugQuery = (slug) => queryOptions({
  queryKey: ["category", slug],
  queryFn: async () => {
    const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ?? null;
  },
  staleTime: 5 * 60 * 1e3
});
const featuredSpecialistsQuery = () => queryOptions({
  queryKey: ["specialists", "featured"],
  queryFn: async () => {
    const { data, error } = await supabase.from("specialists").select(PUBLIC_SPECIALIST_COLUMNS).eq("is_published", true).eq("moderation_status", "approved").order("rating", { ascending: false }).limit(6);
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 60 * 1e3
});
const catalogQuery = (filters) => queryOptions({
  queryKey: ["catalog", filters],
  queryFn: async () => {
    let catId = null;
    if (filters.categorySlug) {
      const { data: cat } = await supabase.from("categories").select("id").eq("slug", filters.categorySlug).maybeSingle();
      catId = cat?.id ?? null;
    }
    const filterCategoryIds = /* @__PURE__ */ new Set();
    if (catId) filterCategoryIds.add(catId);
    filters.taskCategoryIds?.forEach((id) => filterCategoryIds.add(id));
    filters.nicheCategoryIds?.forEach((id) => filterCategoryIds.add(id));
    let specialistIds = null;
    if (filterCategoryIds.size > 0) {
      const { data: links } = await supabase.from("specialist_categories").select("specialist_id, category_id").in("category_id", Array.from(filterCategoryIds));
      const map = /* @__PURE__ */ new Map();
      (links ?? []).forEach((l) => {
        const s = map.get(l.specialist_id) ?? /* @__PURE__ */ new Set();
        s.add(l.category_id);
        map.set(l.specialist_id, s);
      });
      specialistIds = Array.from(map.entries()).filter(([, set]) => Array.from(filterCategoryIds).every((id) => set.has(id))).map(([sid]) => sid);
      if (specialistIds.length === 0) return { items: [], total: 0 };
    }
    let q = supabase.from("specialists").select(PUBLIC_SPECIALIST_COLUMNS, { count: "exact" }).eq("is_published", true).eq("moderation_status", "approved");
    if (specialistIds) q = q.in("id", specialistIds);
    if (filters.budgetMax !== void 0) q = q.lte("price_from", filters.budgetMax);
    if (filters.rating !== void 0) q = q.gte("rating", filters.rating);
    if (filters.hasCases) q = q.eq("has_cases", true);
    if (filters.location) q = q.ilike("location", `%${filters.location}%`);
    switch (filters.sort) {
      case "rating":
        q = q.order("rating", { ascending: false });
        break;
      case "popular":
        q = q.order("views_count", { ascending: false });
        break;
      case "price_asc":
        q = q.order("price_from", { ascending: true, nullsFirst: false });
        break;
      case "price_desc":
        q = q.order("price_from", { ascending: false, nullsFirst: false });
        break;
    }
    const from = (filters.page - 1) * filters.perPage;
    const to = from + filters.perPage - 1;
    q = q.range(from, to);
    const { data: specs, error, count } = await q;
    if (error) throw error;
    const ids = (specs ?? []).map((s) => s.id);
    let catMap = /* @__PURE__ */ new Map();
    if (ids.length > 0) {
      const { data: links } = await supabase.from("specialist_categories").select("specialist_id, categories(*)").in("specialist_id", ids);
      (links ?? []).forEach((l) => {
        const arr = catMap.get(l.specialist_id) ?? [];
        if (l.categories) arr.push(l.categories);
        catMap.set(l.specialist_id, arr);
      });
    }
    const items = (specs ?? []).map((s) => ({
      ...s,
      categories: catMap.get(s.id) ?? []
    }));
    return { items, total: count ?? 0 };
  },
  staleTime: 30 * 1e3
});
const specialistBySlugQuery = (slug) => queryOptions({
  queryKey: ["specialist", slug],
  queryFn: async () => {
    const { data: spec, error } = await supabase.from("specialists").select(PUBLIC_SPECIALIST_COLUMNS).eq("slug", slug).eq("is_published", true).eq("moderation_status", "approved").maybeSingle();
    if (error) throw error;
    if (!spec) return null;
    const { data: links } = await supabase.from("specialist_categories").select("categories(*)").eq("specialist_id", spec.id);
    return {
      ...spec,
      categories: (links ?? []).map((l) => l.categories).filter((c) => !!c)
    };
  },
  staleTime: 60 * 1e3
});
const specialistCasesQuery = (specialistId) => queryOptions({
  queryKey: ["cases", specialistId],
  queryFn: async () => {
    const { data, error } = await supabase.from("cases").select("*").eq("specialist_id", specialistId).eq("is_published", true).eq("moderation_status", "approved").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const specialistReviewsQuery = (specialistId) => queryOptions({
  queryKey: ["reviews", specialistId],
  queryFn: async () => {
    const { data, error } = await supabase.from("reviews").select(PUBLIC_REVIEW_COLUMNS).eq("specialist_id", specialistId).eq("is_approved", true).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const categoryCountsQuery = () => queryOptions({
  queryKey: ["category-counts"],
  queryFn: async () => {
    const { data: links } = await supabase.from("specialist_categories").select("category_id, specialists!inner(is_published, moderation_status)");
    const counts = {};
    (links ?? []).forEach(
      (l) => {
        if (l.specialists?.is_published && l.specialists.moderation_status === "approved") {
          counts[l.category_id] = (counts[l.category_id] ?? 0) + 1;
        }
      }
    );
    return counts;
  },
  staleTime: 5 * 60 * 1e3
});
const $$splitComponentImporter$y = () => import("./max-dlya-biznesa-7D_4V3Y7.js");
const Route$B = createFileRoute("/max-dlya-biznesa")({
  loader: async ({
    context: {
      queryClient
    }
  }) => {
    await Promise.all([queryClient.ensureQueryData(servicesQuery()), queryClient.ensureQueryData(categoriesQuery())]);
  },
  head: () => {
    const title = "Услуги для бизнеса в мессенджере Макс | МАКС Experts";
    const description = "Реклама, рассылки, создание ботов, SMM, воронки, посевы и другие услуги для мессенджера МАКС. Большой выбор специалистов под разные услуги. Найдите решение вашей задачи.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/max-dlya-biznesa"
      })],
      links: canonicalLink("/max-dlya-biznesa")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./login-xiD0fupu.js");
const Route$A = createFileRoute("/login")({
  validateSearch: (search) => {
    const redirect2 = typeof search.redirect === "string" ? search.redirect : void 0;
    return redirect2 ? {
      redirect: redirect2
    } : {};
  },
  head: () => {
    const title = "Вход — МАКС Experts";
    const description = "Войдите в личный кабинет МАКС Experts — каталог специалистов по рекламе и продвижению в мессенджере МАКС.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/login"
      })],
      // ?redirect=… в canonical не учитываем — это техн. параметр.
      links: canonicalLink("/login")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./catalog-BFsOu0JM.js");
const Route$z = createFileRoute("/catalog")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./cases-BFsOu0JM.js");
const Route$y = createFileRoute("/cases")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./blog-BFsOu0JM.js");
const Route$x = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./_authenticated-CQaZ0u-R.js");
const Route$w = createFileRoute("/_authenticated")({
  beforeLoad: ({
    context,
    location
  }) => {
    if (!context.auth.isReady) return;
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
function html404(pathname) {
  const body = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>404 — Страница не найдена</title>
<style>
  :root { color-scheme: light dark; }
  body { margin:0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#fff; color:#0f172a; display:flex; min-height:100vh; align-items:center; justify-content:center; padding:24px; }
  @media (prefers-color-scheme: dark) { body { background:#0b0b10; color:#f5f5f7; } }
  .wrap { max-width: 560px; text-align:center; }
  .code { font-size: 96px; font-weight: 800; line-height: 1; background: linear-gradient(135deg,#6366f1,#a855f7); -webkit-background-clip: text; background-clip: text; color: transparent; }
  h1 { margin: 16px 0 8px; font-size: 24px; }
  p { color: #64748b; margin: 0 0 24px; }
  .row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
  a.btn { display:inline-block; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:500; font-size:14px; }
  a.primary { background: linear-gradient(135deg,#6366f1,#a855f7); color:#fff; }
  a.secondary { border:1px solid #e2e8f0; color: inherit; }
  @media (prefers-color-scheme: dark) { a.secondary { border-color:#27272a; } p { color:#a1a1aa; } }
</style>
</head>
<body>
  <div class="wrap">
    <div class="code">404</div>
    <h1>Страница не найдена</h1>
    
    <div class="row">
      <a class="btn primary" href="/">На главную</a>
      <a class="btn secondary" href="/sitemap">Карта сайта</a>
    </div>
  </div>
</body>
</html>`;
  return new Response(body, {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
const Route$v = createFileRoute("/$verificationFile.html")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const url = new URL(request.url);
        url.pathname;
        const p = params;
        const base = p.verificationFile ?? p["verificationFile.html"] ?? "";
        const fullName = base.toLowerCase().endsWith(".html") ? base : `${base}.html`;
        const settings = await getSiteSettingsFn();
        const file = settings.verification_files.find(
          (f) => f.filename === fullName || f.filename === base
        );
        if (!file) {
          return html404();
        }
        return new Response(file.content, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const setNotFoundStatus = async () => {
  const {
    setResponseStatus
  } = await import("./server-w87kMQc9.js");
  setResponseStatus(404);
};
const Route$u = createFileRoute("/$")({
  loader: () => {
    setNotFoundStatus();
    throw notFound();
  }
});
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
function SpecialistCardSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl glass", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 h-full w-[3px] bg-border" }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-16 shrink-0 rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/3" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/3" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-24 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-5/6" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" })
      ] })
    ] })
  ] });
}
function SpecialistGridSkeleton({ count = 6 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsx(SpecialistCardSkeleton, {}, i)) });
}
function ServiceCardSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-12 rounded-xl" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-4 h-4 w-2/3" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-2 h-3 w-full" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-1 h-3 w-4/5" })
  ] });
}
function ServiceGridSkeleton({ count = 6 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsx(ServiceCardSkeleton, {}, i)) });
}
function CaseCardSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "glass overflow-hidden rounded-2xl", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "aspect-[16/9] w-full rounded-none" }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mt-2 h-3 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mt-1 h-3 w-2/3" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 border-t border-border pt-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-7 rounded-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24" })
      ] })
    ] })
  ] });
}
function CaseGridSkeleton({ count = 6 }) {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsx(CaseCardSkeleton, {}, i)) });
}
function HomePageSkeleton() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 py-20 text-center md:px-8 md:py-32", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "mx-auto h-6 w-64" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mx-auto mt-6 h-12 w-3/4 md:h-16" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mx-auto mt-4 h-12 w-2/3 md:h-16" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mx-auto mt-6 h-4 w-1/2" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-11 w-48" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-11 w-32" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(ServiceGridSkeleton, { count: 6 }) }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mt-16 h-8 w-64" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(ServiceGridSkeleton, { count: 4 }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-80" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(SpecialistGridSkeleton, { count: 3 }) })
    ] })
  ] });
}
function SpecialistsPageSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-48" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-4 h-10 w-2/3" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-3 h-4 w-3/4" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-24 rounded-full" }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-20 rounded-full" }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden space-y-4 lg:block", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full rounded-xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full rounded-xl" })
      ] }),
      /* @__PURE__ */ jsx(SpecialistGridSkeleton, { count: 6 })
    ] })
  ] });
}
function CasesPageSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "mx-auto h-10 w-72" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "mx-auto mt-3 h-4 w-2/3" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full rounded-xl" })
      ] }),
      /* @__PURE__ */ jsx(CaseGridSkeleton, { count: 6 })
    ] })
  ] });
}
function SpecialistPageSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-64" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-8 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "glass rounded-3xl p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-start", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-32 shrink-0 rounded-full" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-9 w-2/3" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-40" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-3", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-48" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/6" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-32" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-2xl" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-40 rounded-2xl" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-96 w-full rounded-2xl" }) })
    ] })
  ] });
}
const $$splitErrorComponentImporter$8 = () => import("./index-D3vs0i7H.js");
const $$splitComponentImporter$s = () => import("./index-CJVS-YzD.js");
const Route$t = createFileRoute("/")({
  loader: async ({
    context: {
      queryClient
    }
  }) => {
    await Promise.all([queryClient.ensureQueryData(categoriesQuery()), queryClient.ensureQueryData(categoryCountsQuery()), queryClient.ensureQueryData(featuredSpecialistsQuery()), queryClient.ensureQueryData(servicesQuery())]);
  },
  head: () => {
    const title = "Cпециалисты по работе с МАКС – МАКС Experts";
    const description = "Каталог проверенных специалистов по продвижению в мессенодере Макс. Реклама, боты, маркетинг, SMM и другие услуги для Макса на сайте, большой выбор специалистов. Кейсы, отзывы, прозрачные цены.";
    return {
      meta: [
        {
          title
        },
        {
          name: "description",
          content: description
        },
        // OG/Twitter — автоматически из title/description страницы.
        ...ogMeta({
          title,
          description,
          pathname: "/"
        })
      ],
      links: canonicalLink("/")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$s, "component"),
  // Скелетон сразу — без задержки в 1 секунду — и держим минимум 500мс,
  // чтобы не мигало при быстрой загрузке.
  pendingComponent: HomePageSkeleton,
  pendingMs: 0,
  pendingMinMs: 500,
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$8, "errorComponent")
});
const PER_PAGE$3 = 12;
function slugsToIds$1(slugs, cats, type) {
  const map = new Map(cats.filter((c) => c.type === type).map((c) => [c.slug, c.id]));
  return slugs.map((s) => map.get(s)).filter((v) => !!v);
}
const $$splitErrorComponentImporter$7 = () => import("./specialists.index-cUi4DYAG.js");
const $$splitComponentImporter$r = () => import("./specialists.index-DMUKatTG.js");
const searchSchema$3 = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
  sort: fallback(z.enum(["rating", "popular", "price_asc", "price_desc"]), "rating").default("rating"),
  rating: fallback(z.number().min(0).max(5).optional(), void 0).default(void 0),
  budget_max: fallback(z.number().int().min(0).optional(), void 0).default(void 0),
  has_cases: fallback(z.boolean().optional(), void 0).default(void 0),
  location: fallback(z.string().optional(), void 0).default(void 0),
  // task / niche — массивы slug-ов категорий (для красивых публичных ссылок)
  task: fallback(z.array(z.string()), []).default([]),
  niche: fallback(z.array(z.string()), []).default([])
});
const searchDefaults$3 = {
  page: 1,
  sort: "rating",
  task: [],
  niche: []
};
const Route$s = createFileRoute("/specialists/")({
  validateSearch: zodValidator(searchSchema$3),
  search: {
    middlewares: [stripSearchParams(searchDefaults$3)]
  },
  loaderDeps: ({
    search
  }) => search,
  loader: async ({
    deps,
    context: {
      queryClient
    }
  }) => {
    const cats = await queryClient.ensureQueryData(categoriesQuery());
    await queryClient.ensureQueryData(catalogQuery({
      page: deps.page,
      perPage: PER_PAGE$3,
      sort: deps.sort,
      rating: deps.rating,
      budgetMax: deps.budget_max,
      hasCases: deps.has_cases,
      location: deps.location,
      taskCategoryIds: slugsToIds$1(deps.task, cats, "task"),
      nicheCategoryIds: slugsToIds$1(deps.niche, cats, "niche")
    }));
  },
  head: () => {
    const title = "Специалисты по продвижению в МАКС – МАКС Experts";
    const description = "Проверенные исполнители по рекламе, рассылкам, воронкам и SMM в мессенджере МАКС. Оценки и отзывы помогут выбрать лучшего специалиста под вашу задачу и бюджет, оставьте заявку уже сейчас!";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/specialists"
      })],
      links: canonicalLink("/specialists")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$r, "component"),
  pendingComponent: SpecialistsPageSkeleton,
  pendingMs: 0,
  pendingMinMs: 500,
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$7, "errorComponent")
});
const $$splitComponentImporter$q = () => import("./catalog.index-BTU5dmpx.js");
const Route$r = createFileRoute("/catalog/")({
  beforeLoad: () => {
    throw redirect({
      to: "/specialists",
      statusCode: 301
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const PER_PAGE$2 = 9;
const caseTagsQuery = () => queryOptions({
  queryKey: ["case-tags"],
  queryFn: async () => {
    const { data, error } = await supabase.from("case_tags").select("*").order("name");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60 * 1e3
});
const casesListQuery = (filters) => queryOptions({
  queryKey: ["cases-list", filters],
  queryFn: async () => {
    let caseIdsByCategory = null;
    if (filters.categorySlug) {
      const { data: cat } = await supabase.from("categories").select("id").eq("slug", filters.categorySlug).maybeSingle();
      if (!cat) return { items: [], total: 0 };
      const { data: links } = await supabase.from("case_categories").select("case_id").eq("category_id", cat.id);
      caseIdsByCategory = (links ?? []).map((l) => l.case_id);
      if (caseIdsByCategory.length === 0) return { items: [], total: 0 };
    }
    let caseIdsByTag = null;
    if (filters.tagSlug) {
      const { data: tag } = await supabase.from("case_tags").select("id").eq("slug", filters.tagSlug).maybeSingle();
      if (!tag) return { items: [], total: 0 };
      const { data: links } = await supabase.from("case_tag_pivot").select("case_id").eq("tag_id", tag.id);
      caseIdsByTag = (links ?? []).map((l) => l.case_id);
      if (caseIdsByTag.length === 0) return { items: [], total: 0 };
    }
    let restrictedIds = null;
    if (caseIdsByCategory && caseIdsByTag) {
      const set = new Set(caseIdsByTag);
      restrictedIds = caseIdsByCategory.filter((id) => set.has(id));
      if (restrictedIds.length === 0) return { items: [], total: 0 };
    } else {
      restrictedIds = caseIdsByCategory ?? caseIdsByTag;
    }
    let q = supabase.from("cases").select(
      "*, author:specialists!inner(id, name, slug, avatar_url, is_published, moderation_status)",
      { count: "exact" }
    ).eq("is_published", true).eq("moderation_status", "approved").eq("specialists.is_published", true).eq("specialists.moderation_status", "approved");
    if (restrictedIds) q = q.in("id", restrictedIds);
    if (filters.search.trim()) {
      const term = filters.search.trim();
      q = q.or(`title.ilike.%${term}%,task_description.ilike.%${term}%`);
    }
    if (filters.sort === "new") {
      q = q.order("created_at", { ascending: false });
    } else {
      q = q.order("rating", { ascending: false, foreignTable: "specialists" }).order("created_at", { ascending: false });
    }
    const from = (filters.page - 1) * filters.perPage;
    const to = from + filters.perPage - 1;
    q = q.range(from, to);
    const { data, error, count } = await q;
    if (error) throw error;
    const rows = data ?? [];
    const ids = rows.map((c) => c.id);
    const [{ data: catLinks }, { data: tagLinks }] = await Promise.all([
      ids.length ? supabase.from("case_categories").select("case_id, categories(*)").in("case_id", ids) : Promise.resolve({ data: [] }),
      ids.length ? supabase.from("case_tag_pivot").select("case_id, case_tags(*)").in("case_id", ids) : Promise.resolve({ data: [] })
    ]);
    const catMap = /* @__PURE__ */ new Map();
    (catLinks ?? []).forEach((l) => {
      const arr = catMap.get(l.case_id) ?? [];
      if (l.categories) arr.push(l.categories);
      catMap.set(l.case_id, arr);
    });
    const tagMap = /* @__PURE__ */ new Map();
    (tagLinks ?? []).forEach((l) => {
      const arr = tagMap.get(l.case_id) ?? [];
      if (l.case_tags) arr.push(l.case_tags);
      tagMap.set(l.case_id, arr);
    });
    const items = rows.map((r) => ({
      ...r,
      author: r.author ? {
        id: r.author.id,
        name: r.author.name,
        slug: r.author.slug,
        avatar_url: r.author.avatar_url
      } : null,
      categories: catMap.get(r.id) ?? [],
      tags: tagMap.get(r.id) ?? []
    }));
    return { items, total: count ?? 0 };
  },
  staleTime: 30 * 1e3
});
const caseCategoryIdsQuery = (caseId) => queryOptions({
  queryKey: ["case-category-ids", caseId],
  enabled: !!caseId,
  queryFn: async () => {
    if (!caseId) return [];
    const { data, error } = await supabase.from("case_categories").select("category_id").eq("case_id", caseId);
    if (error) throw error;
    return (data ?? []).map((r) => r.category_id);
  }
});
const caseTagIdsQuery = (caseId) => queryOptions({
  queryKey: ["case-tag-ids", caseId],
  enabled: !!caseId,
  queryFn: async () => {
    if (!caseId) return [];
    const { data, error } = await supabase.from("case_tag_pivot").select("tag_id").eq("case_id", caseId);
    if (error) throw error;
    return (data ?? []).map((r) => r.tag_id);
  }
});
const caseBySlugQuery = (slug) => queryOptions({
  queryKey: ["case-by-slug", slug],
  queryFn: async () => {
    const { data, error } = await supabase.from("cases").select(
      `*,
           author:specialists!inner(
             id, name, slug, avatar_url, brand_name,
             short_description, rating, reviews_count, is_published, moderation_status
           )`
    ).eq("slug", slug).eq("is_published", true).eq("moderation_status", "approved").eq("specialists.is_published", true).eq("specialists.moderation_status", "approved").maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const caseId = data.id;
    const [{ data: catLinks }, { data: tagLinks }, { data: mediaRows }] = await Promise.all([
      supabase.from("case_categories").select("categories(*)").eq("case_id", caseId),
      supabase.from("case_tag_pivot").select("case_tags(*)").eq("case_id", caseId),
      supabase.from("case_media").select("id, url, type, order_index").eq("case_id", caseId).order("order_index", { ascending: true })
    ]);
    const a = data.author;
    const author = a ? {
      id: a.id,
      name: a.name,
      slug: a.slug,
      avatar_url: a.avatar_url,
      brand_name: a.brand_name,
      short_description: a.short_description,
      rating: a.rating,
      reviews_count: a.reviews_count
    } : null;
    return {
      ...data,
      author,
      categories: (catLinks ?? []).map((l) => l.categories).filter((x) => !!x),
      tags: (tagLinks ?? []).map((l) => l.case_tags).filter((x) => !!x),
      media: mediaRows ?? []
    };
  },
  staleTime: 60 * 1e3
});
const $$splitErrorComponentImporter$6 = () => import("./cases.index-CiQgGOgl.js");
const $$splitComponentImporter$p = () => import("./cases.index-DCwMuYpK.js");
const searchSchema$2 = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string().nullable(), null).default(null),
  tag: fallback(z.string().nullable(), null).default(null),
  sort: fallback(z.enum(["new", "popular"]), "new").default("new"),
  page: fallback(z.number().int().min(1), 1).default(1)
});
const searchDefaults$2 = {
  q: "",
  category: null,
  tag: null,
  sort: "new",
  page: 1
};
const Route$q = createFileRoute("/cases/")({
  validateSearch: zodValidator(searchSchema$2),
  search: {
    middlewares: [stripSearchParams(searchDefaults$2)]
  },
  loaderDeps: ({
    search
  }) => ({
    q: search.q,
    category: search.category,
    tag: search.tag,
    sort: search.sort,
    page: search.page
  }),
  loader: async ({
    context: {
      queryClient
    },
    deps
  }) => {
    await Promise.all([queryClient.ensureQueryData(categoriesQuery()), queryClient.ensureQueryData(caseTagsQuery()), queryClient.ensureQueryData(casesListQuery({
      search: deps.q,
      categorySlug: deps.category,
      tagSlug: deps.tag,
      sort: deps.sort,
      page: deps.page,
      perPage: PER_PAGE$2
    }))]);
  },
  head: () => {
    const title = "Кейсы специалистов по рекламе в МАКС | МАКС Experts";
    const description = "Реальные кейсы продвижения и рекламы в мессенджере МАКС от практикующих специалистов. Примеры успешной раскрутки каналов, продающих ботов, рекламных компаний и др.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/cases"
      })],
      links: canonicalLink("/cases")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$p, "component"),
  pendingComponent: CasesPageSkeleton,
  pendingMs: 0,
  pendingMinMs: 500,
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$6, "errorComponent")
});
const PER_PAGE$1 = 9;
const blogCategoriesQuery = () => queryOptions({
  queryKey: ["blog-categories"],
  queryFn: async () => {
    const { data, error } = await supabase.from("blog_categories").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60 * 1e3
});
const blogTagsQuery = () => queryOptions({
  queryKey: ["blog-tags"],
  queryFn: async () => {
    const { data, error } = await supabase.from("blog_tags").select("*").order("name");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60 * 1e3
});
const blogListQuery = (filters) => queryOptions({
  queryKey: ["blog-list", filters],
  queryFn: async () => {
    let categoryId = null;
    if (filters.categorySlug) {
      const { data: cat } = await supabase.from("blog_categories").select("id").eq("slug", filters.categorySlug).maybeSingle();
      if (!cat) return { items: [], total: 0 };
      categoryId = cat.id;
    }
    let postIdsByTag = null;
    if (filters.tagSlug) {
      const { data: tag } = await supabase.from("blog_tags").select("id").eq("slug", filters.tagSlug).maybeSingle();
      if (!tag) return { items: [], total: 0 };
      const { data: links } = await supabase.from("blog_post_tags").select("post_id").eq("tag_id", tag.id);
      postIdsByTag = (links ?? []).map((l) => l.post_id);
      if (postIdsByTag.length === 0) return { items: [], total: 0 };
    }
    let q = supabase.from("blog_posts").select(
      "*, category:blog_categories(*), author:specialists(id, name, slug, avatar_url)",
      { count: "exact" }
    ).eq("is_published", true).eq("moderation_status", "approved");
    if (categoryId) q = q.eq("category_id", categoryId);
    if (postIdsByTag) q = q.in("id", postIdsByTag);
    if (filters.search.trim()) {
      const term = filters.search.trim();
      q = q.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%`);
    }
    q = q.order("published_at", { ascending: false, nullsFirst: false });
    const from = (filters.page - 1) * filters.perPage;
    const to = from + filters.perPage - 1;
    q = q.range(from, to);
    const { data, error, count } = await q;
    if (error) throw error;
    const items = data ?? [];
    const ids = items.map((p) => p.id);
    const tagMap = /* @__PURE__ */ new Map();
    if (ids.length > 0) {
      const { data: tagLinks } = await supabase.from("blog_post_tags").select("post_id, blog_tags(*)").in("post_id", ids);
      (tagLinks ?? []).forEach((l) => {
        const arr = tagMap.get(l.post_id) ?? [];
        if (l.blog_tags) arr.push(l.blog_tags);
        tagMap.set(l.post_id, arr);
      });
    }
    items.forEach((p) => {
      p.tags = tagMap.get(p.id) ?? [];
    });
    return { items, total: count ?? 0 };
  },
  staleTime: 30 * 1e3
});
const blogPostBySlugQuery = (slug) => queryOptions({
  queryKey: ["blog-post", slug],
  queryFn: async () => {
    const { data, error } = await supabase.from("blog_posts").select(
      "*, category:blog_categories(*), author:specialists(id, name, slug, avatar_url)"
    ).eq("slug", slug).eq("is_published", true).eq("moderation_status", "approved").maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const post = data;
    const { data: tagLinks } = await supabase.from("blog_post_tags").select("blog_tags(*)").eq("post_id", post.id);
    post.tags = (tagLinks ?? []).map((l) => l.blog_tags).filter((t) => !!t);
    return post;
  },
  staleTime: 60 * 1e3
});
const relatedPostsQuery = (postId, categoryId) => queryOptions({
  queryKey: ["blog-related", postId, categoryId],
  queryFn: async () => {
    let q = supabase.from("blog_posts").select("*, category:blog_categories(*), author:specialists(id, name, slug, avatar_url)").eq("is_published", true).eq("moderation_status", "approved").neq("id", postId).order("published_at", { ascending: false, nullsFirst: false }).limit(3);
    if (categoryId) q = q.eq("category_id", categoryId);
    const { data, error } = await q;
    if (error) throw error;
    const items = data ?? [];
    items.forEach((p) => p.tags = []);
    return items;
  },
  staleTime: 60 * 1e3
});
const specialistBlogPostsQuery = (specialistId) => queryOptions({
  queryKey: ["specialist-blog-posts", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const { data, error } = await supabase.from("blog_posts").select("*, category:blog_categories(*), author:specialists(id, name, slug, avatar_url)").eq("is_published", true).eq("moderation_status", "approved").eq("author_specialist_id", specialistId).order("published_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    const items = data ?? [];
    items.forEach((p) => p.tags = []);
    return items;
  }
});
const myBlogPostsQuery = (specialistId) => queryOptions({
  queryKey: ["my-blog-posts", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const { data, error } = await supabase.from("blog_posts").select("*").eq("author_specialist_id", specialistId).order("updated_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const adminAllBlogPostsQuery = () => queryOptions({
  queryKey: ["admin-blog-posts"],
  queryFn: async () => {
    const { data, error } = await supabase.from("blog_posts").select("*, category:blog_categories(*), author:specialists(id, name, slug, avatar_url)").order("updated_at", { ascending: false });
    if (error) throw error;
    const items = data ?? [];
    items.forEach((p) => p.tags = []);
    return items;
  }
});
const postTagIdsQuery = (postId) => queryOptions({
  queryKey: ["post-tag-ids", postId],
  enabled: !!postId,
  queryFn: async () => {
    if (!postId) return [];
    const { data, error } = await supabase.from("blog_post_tags").select("tag_id").eq("post_id", postId);
    if (error) throw error;
    return (data ?? []).map((r) => r.tag_id);
  }
});
const $$splitErrorComponentImporter$5 = () => import("./blog.index-BoLI7oQ9.js");
const $$splitComponentImporter$o = () => import("./blog.index-DBgO6m-C.js");
const searchSchema$1 = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string().nullable(), null).default(null),
  tag: fallback(z.string().nullable(), null).default(null),
  page: fallback(z.number().int().min(1), 1).default(1)
});
const searchDefaults$1 = {
  q: "",
  category: null,
  tag: null,
  page: 1
};
const Route$p = createFileRoute("/blog/")({
  validateSearch: zodValidator(searchSchema$1),
  search: {
    middlewares: [stripSearchParams(searchDefaults$1)]
  },
  loaderDeps: ({
    search
  }) => ({
    q: search.q,
    category: search.category,
    tag: search.tag,
    page: search.page
  }),
  loader: async ({
    context: {
      queryClient
    },
    deps
  }) => {
    const [categories, tags, list] = await Promise.all([queryClient.ensureQueryData(blogCategoriesQuery()), queryClient.ensureQueryData(blogTagsQuery()), queryClient.ensureQueryData(blogListQuery({
      search: deps.q,
      categorySlug: deps.category,
      tagSlug: deps.tag,
      page: deps.page,
      perPage: PER_PAGE$1
    }))]);
    return {
      categories,
      tags,
      list
    };
  },
  head: () => {
    const title = "Блог – статьи о мессенджере МАКС | МАКС Experts";
    const description = "Статьи, кейсы и советы от практикующих специалистов по рекламе и инструкции по использованию мессенджера МАКС. Гайды по таргету, аналитике, продвижению и настройке.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: "/blog"
      })],
      links: canonicalLink("/blog")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$o, "component"),
  // Не задаём кастомный pendingComponent/pendingMs:
  // с pendingMs:0 + pendingMinMs:500 роутер при гидрации SSR-данных
  // принудительно держал скелетон поверх готового контента ("вечная загрузка").
  // С дефолтами (pendingMs:1000) быстро резолвящийся loader из кэша
  // вообще не покажет pending UI.
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$5, "errorComponent")
});
const $$splitErrorComponentImporter$4 = () => import("./uslugi._serviceSlug-4kmBjOk_.js");
const $$splitNotFoundComponentImporter$4 = () => import("./uslugi._serviceSlug-jwSqcJp0.js");
const $$splitComponentImporter$n = () => import("./uslugi._serviceSlug-B86h9PMe.js");
const Route$o = createFileRoute("/uslugi/$serviceSlug")({
  loader: async ({
    context: {
      queryClient
    },
    params
  }) => {
    const service = await queryClient.ensureQueryData(serviceBySlugQuery(params.serviceSlug));
    if (!service) {
      const fromPath = `/uslugi/${params.serviceSlug}`;
      const toPath = await queryClient.ensureQueryData(redirectByPathQuery(fromPath));
      if (toPath) {
        throw redirect({
          to: toPath,
          replace: true
        });
      }
      throw notFound();
    }
    queryClient.prefetchQuery(catalogQuery({
      categorySlug: params.serviceSlug,
      sort: "rating",
      page: 1,
      perPage: 6
    }));
    return {
      service
    };
  },
  head: ({
    loaderData,
    params
  }) => {
    const service = loaderData?.service;
    const h1 = service?.hero_h1?.trim() || service?.name || "Услуга";
    const title = service?.meta_title?.trim() || `${h1} – привлечение клиентов и рост заявок`;
    const description = service?.meta_description?.trim() || `${h1}: привлечение клиентов, рост заявок и оптимизация рекламы 🚀 Подберем специалистов и доведем до результата.`;
    const robotsParts = [];
    if (service && !service.seo_robots_index) robotsParts.push("noindex");
    if (service && !service.seo_robots_follow) robotsParts.push("nofollow");
    const robots = robotsParts.length > 0 ? robotsParts.join(", ") : null;
    const seoCanonical = service?.seo_canonical?.trim();
    const canonicalLinks = seoCanonical?.startsWith("http") ? [{
      rel: "canonical",
      href: seoCanonical
    }] : canonicalLink(seoCanonical || `/uslugi/${params.serviceSlug}`);
    const fullTitle = `${title} — МАКС Experts`;
    return {
      meta: [
        {
          title: fullTitle
        },
        {
          name: "description",
          content: description
        },
        // OG/Twitter — из тех же title/description страницы.
        ...ogMeta({
          title: fullTitle,
          description,
          pathname: `/uslugi/${params.serviceSlug}`,
          image: service?.og_image ?? null
        }),
        ...robots ? [{
          name: "robots",
          content: robots
        }] : []
      ],
      links: canonicalLinks
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$4, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$4, "errorComponent")
});
const PER_PAGE = 12;
function slugsToIds(slugs, cats, type) {
  const map = new Map(cats.filter((c) => c.type === type).map((c) => [c.slug, c.id]));
  return slugs.map((s) => map.get(s)).filter((v) => !!v);
}
const $$splitErrorComponentImporter$3 = () => import("./specialists._categorySlug-CvE-hEjj.js");
const $$splitNotFoundComponentImporter$3 = () => import("./specialists._categorySlug-CS9jUyOI.js");
const $$splitComponentImporter$m = () => import("./specialists._categorySlug-RGPsV3Lr.js");
const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
  sort: fallback(z.enum(["rating", "popular", "price_asc", "price_desc"]), "rating").default("rating"),
  rating: fallback(z.number().min(0).max(5).optional(), void 0).default(void 0),
  budget_max: fallback(z.number().int().min(0).optional(), void 0).default(void 0),
  has_cases: fallback(z.boolean().optional(), void 0).default(void 0),
  location: fallback(z.string().optional(), void 0).default(void 0),
  task: fallback(z.array(z.string()), []).default([]),
  niche: fallback(z.array(z.string()), []).default([])
});
const searchDefaults = {
  page: 1,
  sort: "rating",
  task: [],
  niche: []
};
const Route$n = createFileRoute("/specialists/$categorySlug")({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(searchDefaults)]
  },
  loaderDeps: ({
    search
  }) => search,
  loader: async ({
    params,
    deps,
    context: {
      queryClient
    }
  }) => {
    const cats = await queryClient.ensureQueryData(categoriesQuery());
    const category = await queryClient.ensureQueryData(categoryBySlugQuery(params.categorySlug));
    if (!category) throw notFound();
    await queryClient.ensureQueryData(catalogQuery({
      categorySlug: params.categorySlug,
      page: deps.page,
      perPage: PER_PAGE,
      sort: deps.sort,
      rating: deps.rating,
      budgetMax: deps.budget_max,
      hasCases: deps.has_cases,
      location: deps.location,
      taskCategoryIds: slugsToIds(deps.task, cats, "task"),
      nicheCategoryIds: slugsToIds(deps.niche, cats, "niche")
    }));
    return {
      categoryName: category.name,
      metaTitle: category.meta_title,
      metaDescription: category.meta_description,
      heroH1: category.hero_h1
    };
  },
  head: ({
    params,
    loaderData
  }) => {
    const name = loaderData?.categoryName ?? params.categorySlug;
    const title = loaderData?.metaTitle ?? `${name} — специалисты, услуги и кейсы`;
    const description = loaderData?.metaDescription ?? `Специалисты по ${name}: кейсы, опыт, услуги и рекомендации. Подберите исполнителя под задачу и получите результат для бизнеса.`;
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, ...ogMeta({
        title,
        description,
        pathname: `/specialists/${params.categorySlug}`
      })],
      links: canonicalLink(`/specialists/${params.categorySlug}`)
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$m, "component"),
  // Категория не найдена → стандартный 404 (через notFoundComponent корня)
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$3, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent")
});
const $$splitErrorComponentImporter$2 = () => import("./specialist._slug-CO_POIs8.js");
const $$splitComponentImporter$l = () => import("./specialist._slug-R9f7GXsl.js");
const $$splitNotFoundComponentImporter$2 = () => import("./specialist._slug--ySXqKtq.js");
const Route$m = createFileRoute("/specialist/$slug")({
  loader: async ({
    params,
    context: {
      queryClient
    }
  }) => {
    const spec = await queryClient.ensureQueryData(specialistBySlugQuery(params.slug));
    if (!spec) throw notFound();
    await Promise.all([queryClient.ensureQueryData(specialistCasesQuery(spec.id)), queryClient.ensureQueryData(specialistReviewsQuery(spec.id)), queryClient.ensureQueryData(specialistBlogPostsQuery(spec.id))]);
    return spec;
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) {
      return {
        meta: [{
          title: "Специалист — МАКС Experts"
        }, {
          name: "description",
          content: "Профиль специалиста по рекламе в МАКС."
        }],
        links: canonicalLink(`/specialist/${params.slug}`)
      };
    }
    const displayName = loaderData.name ?? loaderData.brand_name ?? "Специалист";
    const title = loaderData.meta_title?.trim() || `${displayName} – специалист по маркетингу в МАКС, кейсы, отзывы и стоимость услуг`;
    const description = loaderData.meta_description?.trim() || `${displayName} – маркетинг в МАКС: кейсы, стоимость услуг и отзывы клиентов. ✅ Сравните специалистов и выберите подходящего исполнителя.`;
    const image = loaderData.avatar_url ?? void 0;
    const slugForUrl = loaderData.slug ?? params.slug;
    return {
      meta: [
        {
          title
        },
        {
          name: "description",
          content: description
        },
        // OG/Twitter — из тех же title/description страницы специалиста.
        ...ogMeta({
          title,
          description,
          pathname: `/specialist/${slugForUrl}`,
          image: image ?? null,
          type: "profile"
        })
      ],
      links: canonicalLink(`/specialist/${slugForUrl}`)
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$l, "component"),
  pendingComponent: SpecialistPageSkeleton,
  pendingMs: 0,
  pendingMinMs: 500,
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent")
});
const $$splitComponentImporter$k = () => import("./catalog._categorySlug-BTU5dmpx.js");
const Route$l = createFileRoute("/catalog/$categorySlug")({
  beforeLoad: ({
    params
  }) => {
    throw redirect({
      to: "/specialists/$categorySlug",
      params: {
        categorySlug: params.categorySlug
      },
      statusCode: 301
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./cases._slug-BXaGgaHe.js");
const $$splitErrorComponentImporter$1 = () => import("./cases._slug-CikpQYzB.js");
const $$splitNotFoundComponentImporter$1 = () => import("./cases._slug-BuX-wJ8g.js");
const Route$k = createFileRoute("/cases/$slug")({
  loader: async ({
    params,
    context: {
      queryClient
    }
  }) => {
    const data = await queryClient.ensureQueryData(caseBySlugQuery(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) {
      return {
        meta: [{
          title: "Кейс не найден"
        }],
        links: canonicalLink(`/cases/${params.slug}`)
      };
    }
    const nicheCat = loaderData.categories.find((c) => c.type === "niche");
    const nicheName = nicheCat?.name || loaderData.niche || "Маркетинг";
    const announcement = loaderData.results_announcement?.trim() || stripHtml(loaderData.results ?? "").slice(0, 100) || "результаты продвижения";
    const title = loaderData.meta_title?.trim() || `${nicheName}: ${announcement} – кейс продвижения в МАКС | maxexperts.ru`;
    const description = loaderData.meta_description?.trim() || `Кейс ${nicheName} в МАКС: ${announcement}. Разбор стратегии, инструментов и итогов продвижения.`;
    const image = loaderData.cover_url ?? void 0;
    return {
      meta: [
        {
          title
        },
        {
          name: "description",
          content: description
        },
        // OG/Twitter — из тех же title/description страницы кейса.
        ...ogMeta({
          title,
          description,
          pathname: `/cases/${loaderData.slug}`,
          image: image ?? null,
          type: "article"
        })
      ],
      links: canonicalLink(`/cases/${loaderData.slug}`)
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
const $$splitComponentImporter$i = () => import("./blog._slug-Bv05-9C0.js");
const $$splitNotFoundComponentImporter = () => import("./blog._slug-C8YJt5m9.js");
const Route$j = createFileRoute("/blog/$slug")({
  loader: async ({
    params,
    context: {
      queryClient
    }
  }) => {
    const post = await queryClient.ensureQueryData(blogPostBySlugQuery(params.slug));
    if (!post) throw notFound();
    await queryClient.ensureQueryData(relatedPostsQuery(post.id, post.category_id));
    return post;
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) {
      return {
        meta: [{
          title: "Статья — МАКС Experts"
        }, {
          name: "description",
          content: "Статья из блога МАКС Experts."
        }],
        links: canonicalLink(`/blog/${params.slug}`)
      };
    }
    const title = loaderData.meta_title?.trim() || `${loaderData.title} | Блог maxexperts.ru`;
    const description = loaderData.meta_description?.trim() || `${loaderData.title}. Подробный разбор, примеры и рекомендации по теме.`;
    const image = loaderData.cover_url ?? void 0;
    const authorName = loaderData.author?.name?.trim() || "Команда МАКС Experts";
    return {
      meta: [
        {
          title
        },
        {
          name: "description",
          content: description
        },
        {
          name: "author",
          content: authorName
        },
        {
          property: "article:author",
          content: authorName
        },
        // OG/Twitter — из тех же title/description страницы статьи.
        ...ogMeta({
          title,
          description,
          pathname: `/blog/${loaderData.slug}`,
          image: image ?? null,
          type: "article"
        })
      ],
      links: canonicalLink(`/blog/${loaderData.slug}`)
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const mySpecialistQuery = (userId) => queryOptions({
  queryKey: ["my-specialist", userId],
  enabled: !!userId,
  queryFn: async () => {
    if (!userId) return null;
    const { data, error } = await supabase.from("specialists").select("*").eq("user_id", userId).maybeSingle();
    if (error) throw error;
    return data ?? null;
  }
});
const mySpecialistCategoryIdsQuery = (specialistId) => queryOptions({
  queryKey: ["my-specialist-categories", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const { data, error } = await supabase.from("specialist_categories").select("category_id").eq("specialist_id", specialistId);
    if (error) throw error;
    return (data ?? []).map((r) => r.category_id);
  }
});
const myCasesQuery = (specialistId) => queryOptions({
  queryKey: ["my-cases", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const { data, error } = await supabase.from("cases").select("*").eq("specialist_id", specialistId).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const caseMediaQuery = (caseId) => queryOptions({
  queryKey: ["case-media", caseId],
  enabled: !!caseId,
  queryFn: async () => {
    if (!caseId) return [];
    const { data, error } = await supabase.from("case_media").select("*").eq("case_id", caseId).order("order_index");
    if (error) throw error;
    return data ?? [];
  }
});
const myApplicationsQuery = (specialistId) => queryOptions({
  queryKey: ["my-applications", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const { data, error } = await supabase.from("applications").select("*").eq("specialist_id", specialistId).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const myReviewsQuery = (specialistId) => queryOptions({
  queryKey: ["my-reviews", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const { data, error } = await supabase.from("reviews").select("*").eq("specialist_id", specialistId).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const myDailyViewsQuery = (specialistId) => queryOptions({
  queryKey: ["my-daily-views", specialistId],
  enabled: !!specialistId,
  queryFn: async () => {
    if (!specialistId) return [];
    const since = /* @__PURE__ */ new Date();
    since.setUTCDate(since.getUTCDate() - 29);
    const sinceStr = since.toISOString().slice(0, 10);
    const { data, error } = await supabase.from("specialist_views_daily").select("day, views").eq("specialist_id", specialistId).gte("day", sinceStr).order("day");
    if (error) throw error;
    const map = /* @__PURE__ */ new Map();
    (data ?? []).forEach((r) => map.set(r.day, r.views));
    const result = [];
    for (let i = 0; i < 30; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setUTCDate(d.getUTCDate() - (29 - i));
      const key = d.toISOString().slice(0, 10);
      result.push({ day: key, views: map.get(key) ?? 0 });
    }
    return result;
  },
  staleTime: 60 * 1e3
});
const $$splitComponentImporter$h = () => import("./dashboard-D9Y7vpWz.js");
const Route$i = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Кабинет специалиста — МАКС Experts"
    }]
  }),
  loader: async ({
    context: {
      queryClient,
      auth
    }
  }) => {
    const userId = auth.userId;
    if (!userId) return;
    const [spec] = await Promise.all([queryClient.ensureQueryData(mySpecialistQuery(userId)), queryClient.ensureQueryData(categoriesQuery())]);
    if (spec?.id) {
      await Promise.all([queryClient.ensureQueryData(mySpecialistCategoryIdsQuery(spec.id)), queryClient.ensureQueryData(myCasesQuery(spec.id)), queryClient.ensureQueryData(myApplicationsQuery(spec.id)), queryClient.ensureQueryData(myReviewsQuery(spec.id)), queryClient.ensureQueryData(myDailyViewsQuery(spec.id)), queryClient.ensureQueryData(myBlogPostsQuery(spec.id)), queryClient.ensureQueryData(blogCategoriesQuery()), queryClient.ensureQueryData(blogTagsQuery())]);
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitErrorComponentImporter = () => import("./admin-B0rzQtrK.js");
const $$splitComponentImporter$g = () => import("./admin-0poIxjcH.js");
const Route$h = createFileRoute("/_authenticated/admin")({
  beforeLoad: ({
    context,
    location
  }) => {
    if (!context.auth.isReady) return;
    if (!context.auth.isAdmin) {
      throw redirect({
        to: "/",
        search: {
          from: location.href
        }
      });
    }
  },
  head: () => ({
    meta: [{
      title: "Админ-панель — МАКС Experts"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const myFavoritesQuery = (userId) => queryOptions({
  queryKey: ["my-favorites", userId],
  queryFn: async () => {
    const { data, error } = await supabase.from("client_favorites").select("id, specialist_id, created_at, specialist:specialists(*)").eq("user_id", userId).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const myFavoriteIdsQuery = (userId) => queryOptions({
  queryKey: ["my-favorite-ids", userId],
  queryFn: async () => {
    if (!userId) return /* @__PURE__ */ new Set();
    const { data, error } = await supabase.from("client_favorites").select("specialist_id").eq("user_id", userId);
    if (error) throw error;
    return new Set((data ?? []).map((r) => r.specialist_id));
  },
  enabled: !!userId,
  staleTime: 30 * 1e3
});
async function addFavorite(userId, specialistId) {
  const { error } = await supabase.from("client_favorites").insert({ user_id: userId, specialist_id: specialistId });
  if (error && error.code !== "23505") throw error;
}
async function removeFavorite(userId, specialistId) {
  const { error } = await supabase.from("client_favorites").delete().eq("user_id", userId).eq("specialist_id", specialistId);
  if (error) throw error;
}
const myApplicationsAsClientQuery = (email) => queryOptions({
  queryKey: ["my-applications-client", email],
  queryFn: async () => {
    if (!email) return [];
    const { data, error } = await supabase.from("applications").select(
      "id, specialist_id, applicant_name, applicant_email, applicant_phone, message, budget, status, created_at, specialist:specialists(id, name, slug, avatar_url)"
    ).eq("applicant_email", email).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  enabled: !!email
});
const myReviewsAsClientQuery = (email) => queryOptions({
  queryKey: ["my-reviews-client", email],
  queryFn: async () => {
    if (!email) return [];
    const { data, error } = await supabase.rpc("my_reviews_by_email");
    if (error) throw error;
    const reviews = data ?? [];
    if (reviews.length === 0) return [];
    const ids = Array.from(new Set(reviews.map((r) => r.specialist_id)));
    const { data: specs, error: sErr } = await supabase.from("specialists").select("id, name, slug, avatar_url").in("id", ids);
    if (sErr) throw sErr;
    const byId = new Map(
      (specs ?? []).map((s) => [
        s.id,
        s
      ])
    );
    return reviews.map((r) => ({ ...r, specialist: byId.get(r.specialist_id) ?? null }));
  },
  enabled: !!email
});
const $$splitComponentImporter$f = () => import("./account-vcLZshbV.js");
const Route$g = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [{
      title: "Мой кабинет — МАКС Experts"
    }]
  }),
  beforeLoad: ({
    context
  }) => {
    if (context.auth.isSpecialist && !context.auth.isClient) {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  loader: async ({
    context: {
      queryClient,
      auth
    }
  }) => {
    if (!auth.userId) return;
    await Promise.all([queryClient.ensureQueryData(myFavoritesQuery(auth.userId)), queryClient.ensureQueryData(myApplicationsAsClientQuery(auth.userEmail)), queryClient.ensureQueryData(myReviewsAsClientQuery(auth.userEmail))]);
  },
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const Route$f = createFileRoute("/_authenticated/admin/")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/moderation" });
  }
});
const moderationQueueQuery = () => queryOptions({
  queryKey: ["admin", "moderation-queue"],
  queryFn: async () => {
    const [specs, cases, posts] = await Promise.all([
      supabase.from("specialists").select(
        "id, name, brand_name, slug, avatar_url, short_description, submitted_at, moderation_status, rejection_reason"
      ).eq("moderation_status", "pending").order("submitted_at", { ascending: false, nullsFirst: false }),
      supabase.from("cases").select(
        "id, title, slug, cover_url, task_description, submitted_at, moderation_status, rejection_reason, specialists(name, slug)"
      ).eq("moderation_status", "pending").order("submitted_at", { ascending: false, nullsFirst: false }),
      supabase.from("blog_posts").select(
        "id, title, slug, cover_url, excerpt, submitted_at, moderation_status, rejection_reason, specialists:author_specialist_id(name, slug)"
      ).eq("moderation_status", "pending").order("submitted_at", { ascending: false, nullsFirst: false })
    ]);
    const items = [];
    (specs.data ?? []).forEach(
      (s) => items.push({
        kind: "specialist",
        id: s.id,
        title: s.name ?? s.brand_name ?? "Без имени",
        excerpt: s.short_description,
        cover_url: s.avatar_url,
        slug: s.slug,
        submitted_at: s.submitted_at,
        author: { name: s.name, slug: s.slug },
        moderation_status: s.moderation_status,
        rejection_reason: s.rejection_reason
      })
    );
    (cases.data ?? []).forEach(
      (c) => items.push({
        kind: "case",
        id: c.id,
        title: c.title,
        excerpt: c.task_description,
        cover_url: c.cover_url,
        slug: c.slug,
        submitted_at: c.submitted_at,
        author: c.specialists ? { name: c.specialists.name, slug: c.specialists.slug } : null,
        moderation_status: c.moderation_status,
        rejection_reason: c.rejection_reason
      })
    );
    (posts.data ?? []).forEach(
      (p) => items.push({
        kind: "blog_post",
        id: p.id,
        title: p.title,
        excerpt: p.excerpt,
        cover_url: p.cover_url,
        slug: p.slug,
        submitted_at: p.submitted_at,
        author: p.specialists ? { name: p.specialists.name, slug: p.specialists.slug } : null,
        moderation_status: p.moderation_status,
        rejection_reason: p.rejection_reason
      })
    );
    items.sort((a, b) => {
      const ta = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
      const tb = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
      return tb - ta;
    });
    return items;
  },
  staleTime: 30 * 1e3
});
const moderationCountsQuery = () => queryOptions({
  queryKey: ["admin", "moderation-counts"],
  queryFn: async () => {
    const [s, c, b, r] = await Promise.all([
      supabase.from("specialists").select("id", { count: "exact", head: true }).eq("moderation_status", "pending"),
      supabase.from("cases").select("id", { count: "exact", head: true }).eq("moderation_status", "pending"),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("moderation_status", "pending"),
      supabase.from("reviews").select("id", { count: "exact", head: true }).eq("is_approved", false)
    ]);
    const counts = {
      specialists: s.count ?? 0,
      cases: c.count ?? 0,
      blog_posts: b.count ?? 0,
      reviews: r.count ?? 0,
      total: 0
    };
    counts.total = counts.specialists + counts.cases + counts.blog_posts + counts.reviews;
    return counts;
  },
  staleTime: 30 * 1e3
});
const adminSpecialistsQuery = () => queryOptions({
  queryKey: ["admin", "specialists"],
  queryFn: async () => {
    const { data, error } = await supabase.from("specialists").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const adminCasesQuery = () => queryOptions({
  queryKey: ["admin", "cases"],
  queryFn: async () => {
    const { data, error } = await supabase.from("cases").select("*, specialists(name, slug)").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const adminReviewsQuery = () => queryOptions({
  queryKey: ["admin", "reviews"],
  queryFn: async () => {
    const { data, error } = await supabase.from("reviews").select("*, specialists(name, slug), review_emails(email)").order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => {
      const re = row.review_emails;
      const email = Array.isArray(re) ? re[0]?.email ?? null : re?.email ?? null;
      const { review_emails: _omit, ...rest } = row;
      return { ...rest, author_email: email };
    });
  }
});
const adminApplicationsQuery = () => queryOptions({
  queryKey: ["admin", "applications"],
  queryFn: async () => {
    const { data, error } = await supabase.from("applications").select("*, specialists(name, slug)").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
});
const adminUsersQuery = () => queryOptions({
  queryKey: ["admin", "users"],
  queryFn: async () => {
    const { data, error } = await supabase.functions.invoke("admin-users", { method: "GET" });
    if (error) throw error;
    return data?.users ?? [];
  }
});
const adminCategoriesQuery = () => queryOptions({
  queryKey: ["admin", "categories"],
  queryFn: async () => {
    const { data, error } = await supabase.from("categories").select("*").order("type").order("sort_order");
    if (error) throw error;
    return data ?? [];
  }
});
const $$splitComponentImporter$e = () => import("./admin.users-DVtDnjDf.js");
const Route$e = createFileRoute("/_authenticated/admin/users")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(adminUsersQuery()),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin.specialists-DNYqwVvK.js");
const Route$d = createFileRoute("/_authenticated/admin/specialists")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(adminSpecialistsQuery()),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.sitemap-CiO5Odze.js");
const Route$c = createFileRoute("/_authenticated/admin/sitemap")({
  head: () => ({
    meta: [{
      title: "Sitemap — Админ-панель"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.seo-5vMy-43b.js");
const Route$b = createFileRoute("/_authenticated/admin/seo")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.reviews-Z43oIcIa.js");
const Route$a = createFileRoute("/_authenticated/admin/reviews")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(adminReviewsQuery()),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.reveal-key-BQIo2pqw.js");
const Route$9 = createFileRoute("/_authenticated/admin/reveal-key")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.moderation-BVNZAotS.js");
const Route$8 = createFileRoute("/_authenticated/admin/moderation")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(moderationQueueQuery()),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.counters-xlSifaG1.js");
const Route$7 = createFileRoute("/_authenticated/admin/counters")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.categories-ukuv22W5.js");
const Route$6 = createFileRoute("/_authenticated/admin/categories")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(adminCategoriesQuery()),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.cases-BId8HWfM.js");
const Route$5 = createFileRoute("/_authenticated/admin/cases")({
  loader: async ({
    context: {
      queryClient
    }
  }) => {
    await Promise.all([queryClient.ensureQueryData(adminCasesQuery()), queryClient.ensureQueryData(categoriesQuery()), queryClient.ensureQueryData(caseTagsQuery())]);
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.blog-CagLzAgX.js");
const Route$4 = createFileRoute("/_authenticated/admin/blog")({
  loader: async ({
    context: {
      queryClient
    }
  }) => {
    await Promise.all([queryClient.ensureQueryData(adminAllBlogPostsQuery()), queryClient.ensureQueryData(blogCategoriesQuery()), queryClient.ensureQueryData(blogTagsQuery())]);
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.applications-sV4j7L-D.js");
const Route$3 = createFileRoute("/_authenticated/admin/applications")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(adminApplicationsQuery()),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.services.index-D9WpTWZP.js");
const Route$2 = createFileRoute("/_authenticated/admin/services/")({
  loader: ({
    context: {
      queryClient
    }
  }) => queryClient.ensureQueryData(adminServicesQuery()),
  head: () => ({
    meta: [{
      title: "Услуги — Админ"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.services.new-DXnSJ7yp.js");
const Route$1 = createFileRoute("/_authenticated/admin/services/new")({
  head: () => ({
    meta: [{
      title: "Новая услуга — Админ"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.services._serviceId-uvlJQiJe.js");
const Route = createFileRoute("/_authenticated/admin/services/$serviceId")({
  loader: async ({
    context: {
      queryClient
    },
    params
  }) => {
    await Promise.all([queryClient.ensureQueryData(adminServiceByIdQuery(params.serviceId)), queryClient.ensureQueryData(serviceTagsQuery(params.serviceId)), queryClient.ensureQueryData(serviceRevisionsQuery(params.serviceId))]);
  },
  head: () => ({
    meta: [{
      title: "Редактирование услуги — Админ"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const UserAgreementRoute = Route$I.update({
  id: "/user-agreement",
  path: "/user-agreement",
  getParentRoute: () => Route$J
});
const SpecialistsRoute = Route$H.update({
  id: "/specialists",
  path: "/specialists",
  getParentRoute: () => Route$J
});
const SitemapDotxmlRoute = Route$G.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$J
});
const SitemapRoute = Route$F.update({
  id: "/sitemap",
  path: "/sitemap",
  getParentRoute: () => Route$J
});
const RobotsDottxtRoute = Route$E.update({
  id: "/robots.txt",
  path: "/robots.txt",
  getParentRoute: () => Route$J
});
const RegisterRoute = Route$D.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$J
});
const PrivacyPolicyRoute = Route$C.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$J
});
const MaxDlyaBiznesaRoute = Route$B.update({
  id: "/max-dlya-biznesa",
  path: "/max-dlya-biznesa",
  getParentRoute: () => Route$J
});
const LoginRoute = Route$A.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$J
});
const CatalogRoute = Route$z.update({
  id: "/catalog",
  path: "/catalog",
  getParentRoute: () => Route$J
});
const CasesRoute = Route$y.update({
  id: "/cases",
  path: "/cases",
  getParentRoute: () => Route$J
});
const BlogRoute = Route$x.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$J
});
const AuthenticatedRoute = Route$w.update({
  id: "/_authenticated",
  getParentRoute: () => Route$J
});
const VerificationFileDothtmlRoute = Route$v.update({
  id: "/$verificationFile.html",
  path: "/$verificationFile.html",
  getParentRoute: () => Route$J
});
const SplatRoute = Route$u.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => Route$J
});
const IndexRoute = Route$t.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$J
});
const SpecialistsIndexRoute = Route$s.update({
  id: "/",
  path: "/",
  getParentRoute: () => SpecialistsRoute
});
const CatalogIndexRoute = Route$r.update({
  id: "/",
  path: "/",
  getParentRoute: () => CatalogRoute
});
const CasesIndexRoute = Route$q.update({
  id: "/",
  path: "/",
  getParentRoute: () => CasesRoute
});
const BlogIndexRoute = Route$p.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const UslugiServiceSlugRoute = Route$o.update({
  id: "/uslugi/$serviceSlug",
  path: "/uslugi/$serviceSlug",
  getParentRoute: () => Route$J
});
const SpecialistsCategorySlugRoute = Route$n.update({
  id: "/$categorySlug",
  path: "/$categorySlug",
  getParentRoute: () => SpecialistsRoute
});
const SpecialistSlugRoute = Route$m.update({
  id: "/specialist/$slug",
  path: "/specialist/$slug",
  getParentRoute: () => Route$J
});
const CatalogCategorySlugRoute = Route$l.update({
  id: "/$categorySlug",
  path: "/$categorySlug",
  getParentRoute: () => CatalogRoute
});
const CasesSlugRoute = Route$k.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => CasesRoute
});
const BlogSlugRoute = Route$j.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const AuthenticatedDashboardRoute = Route$i.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAdminRoute = Route$h.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAccountRoute = Route$g.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAdminIndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminUsersRoute = Route$e.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSpecialistsRoute = Route$d.update({
  id: "/specialists",
  path: "/specialists",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSitemapRoute = Route$c.update({
  id: "/sitemap",
  path: "/sitemap",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminSeoRoute = Route$b.update({
  id: "/seo",
  path: "/seo",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminReviewsRoute = Route$a.update({
  id: "/reviews",
  path: "/reviews",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminRevealKeyRoute = Route$9.update({
  id: "/reveal-key",
  path: "/reveal-key",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminModerationRoute = Route$8.update({
  id: "/moderation",
  path: "/moderation",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCountersRoute = Route$7.update({
  id: "/counters",
  path: "/counters",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCategoriesRoute = Route$6.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminCasesRoute = Route$5.update({
  id: "/cases",
  path: "/cases",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminBlogRoute = Route$4.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminApplicationsRoute = Route$3.update({
  id: "/applications",
  path: "/applications",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminServicesIndexRoute = Route$2.update({
  id: "/services/",
  path: "/services/",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminServicesNewRoute = Route$1.update({
  id: "/services/new",
  path: "/services/new",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminServicesServiceIdRoute = Route.update({
  id: "/services/$serviceId",
  path: "/services/$serviceId",
  getParentRoute: () => AuthenticatedAdminRoute
});
const AuthenticatedAdminRouteChildren = {
  AuthenticatedAdminApplicationsRoute,
  AuthenticatedAdminBlogRoute,
  AuthenticatedAdminCasesRoute,
  AuthenticatedAdminCategoriesRoute,
  AuthenticatedAdminCountersRoute,
  AuthenticatedAdminModerationRoute,
  AuthenticatedAdminRevealKeyRoute,
  AuthenticatedAdminReviewsRoute,
  AuthenticatedAdminSeoRoute,
  AuthenticatedAdminSitemapRoute,
  AuthenticatedAdminSpecialistsRoute,
  AuthenticatedAdminUsersRoute,
  AuthenticatedAdminIndexRoute,
  AuthenticatedAdminServicesServiceIdRoute,
  AuthenticatedAdminServicesNewRoute,
  AuthenticatedAdminServicesIndexRoute
};
const AuthenticatedAdminRouteWithChildren = AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren);
const AuthenticatedRouteChildren = {
  AuthenticatedAccountRoute,
  AuthenticatedAdminRoute: AuthenticatedAdminRouteWithChildren,
  AuthenticatedDashboardRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const BlogRouteChildren = {
  BlogSlugRoute,
  BlogIndexRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const CasesRouteChildren = {
  CasesSlugRoute,
  CasesIndexRoute
};
const CasesRouteWithChildren = CasesRoute._addFileChildren(CasesRouteChildren);
const CatalogRouteChildren = {
  CatalogCategorySlugRoute,
  CatalogIndexRoute
};
const CatalogRouteWithChildren = CatalogRoute._addFileChildren(CatalogRouteChildren);
const SpecialistsRouteChildren = {
  SpecialistsCategorySlugRoute,
  SpecialistsIndexRoute
};
const SpecialistsRouteWithChildren = SpecialistsRoute._addFileChildren(
  SpecialistsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  SplatRoute,
  VerificationFileDothtmlRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  BlogRoute: BlogRouteWithChildren,
  CasesRoute: CasesRouteWithChildren,
  CatalogRoute: CatalogRouteWithChildren,
  LoginRoute,
  MaxDlyaBiznesaRoute,
  PrivacyPolicyRoute,
  RegisterRoute,
  RobotsDottxtRoute,
  SitemapRoute,
  SitemapDotxmlRoute,
  SpecialistsRoute: SpecialistsRouteWithChildren,
  UserAgreementRoute,
  SpecialistSlugRoute,
  UslugiServiceSlugRoute
};
const routeTree = Route$J._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Что-то пошло не так" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Произошла непредвиденная ошибка. Попробуйте ещё раз." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Повторить"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "На главную"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1e3,
        // SSR-данные приходят уже свежими из сервера, поэтому не перезапрашиваем
        // их сразу после hydration — иначе у юзера на медленной сети контент
        // мигает: SSR → skeleton → данные. Перезапрос только по навигации/мутации.
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        // Авторетрай для нестабильных сетей: до 2 раз для сетевых/5xx ошибок,
        // не ретраим 4xx (бизнес-логика).
        retry: (failureCount, error) => {
          const msg = error instanceof Error ? error.message : String(error);
          if (/\b4\d{2}\b/.test(msg)) return false;
          return failureCount < 2;
        },
        retryDelay: (attempt) => Math.min(1e3 * 2 ** attempt, 1e4)
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    context: {
      queryClient,
      auth: {
        isReady: false,
        isAuthenticated: false,
        userId: null,
        userEmail: null,
        isAdmin: false,
        isClient: false,
        isSpecialist: false
      }
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
    // Любые notFound() (из splat `/$`, из лоадеров дочерних роутов, из любых
    // layout-роутов без своего notFoundComponent) поднимаются в root и
    // рендерятся единым 404-экраном внутри AppShell (с шапкой/футером).
    notFoundMode: "root",
    defaultNotFoundComponent: NotFound
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$k as $,
  DialogTitle as A,
  Button as B,
  ConsentCheckbox as C,
  Dialog as D,
  DialogDescription as E,
  postTagIdsQuery as F,
  adminSpecialistsQuery as G,
  Route$h as H,
  moderationCountsQuery as I,
  adminServiceByIdQuery as J,
  serviceTagsQuery as K,
  serviceRevisionsQuery as L,
  makeEmptyService as M,
  DialogFooter as N,
  Route as O,
  PER_PAGE$3 as P,
  categoryCountsQuery as Q,
  Route$A as R,
  SITE_URL$1 as S,
  featuredSpecialistsQuery as T,
  Route$q as U,
  casesListQuery as V,
  PER_PAGE$2 as W,
  useAuth as X,
  myFavoriteIdsQuery as Y,
  removeFavorite as Z,
  addFavorite as _,
  servicesQuery as a,
  caseBySlugQuery as a0,
  adminUsersQuery as a1,
  adminReviewsQuery as a2,
  adminCasesQuery as a3,
  adminAllBlogPostsQuery as a4,
  DialogTrigger as a5,
  adminApplicationsQuery as a6,
  Route$o as a7,
  serviceBySlugQuery as a8,
  Route$m as a9,
  specialistBySlugQuery as aa,
  specialistCasesQuery as ab,
  specialistReviewsQuery as ac,
  specialistBlogPostsQuery as ad,
  createSsrRpc as ae,
  moderationQueueQuery as af,
  adminCategoriesQuery as ag,
  adminServicesQuery as ah,
  myFavoritesQuery as ai,
  myApplicationsAsClientQuery as aj,
  myReviewsAsClientQuery as ak,
  Route$g as al,
  Route$j as am,
  blogPostBySlugQuery as an,
  relatedPostsQuery as ao,
  mySpecialistQuery as ap,
  mySpecialistCategoryIdsQuery as aq,
  myCasesQuery as ar,
  myApplicationsQuery as as,
  myReviewsQuery as at,
  myDailyViewsQuery as au,
  myBlogPostsQuery as av,
  Route$i as aw,
  Skeleton as ax,
  router as ay,
  Route$w as b,
  categoriesQuery as c,
  Route$s as d,
  slugsToIds$1 as e,
  catalogQuery as f,
  Route$p as g,
  htmlSitemapQuery as h,
  blogCategoriesQuery as i,
  blogTagsQuery as j,
  blogListQuery as k,
  PER_PAGE$1 as l,
  cn as m,
  Route$n as n,
  categoryBySlugQuery as o,
  PER_PAGE as p,
  slugsToIds as q,
  buttonVariants as r,
  supabase as s,
  caseTagsQuery as t,
  useLeadRequest as u,
  caseCategoryIdsQuery as v,
  caseTagIdsQuery as w,
  caseMediaQuery as x,
  DialogContent as y,
  DialogHeader as z
};
