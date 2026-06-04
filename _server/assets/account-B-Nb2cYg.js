import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, Suspense } from "react";
import { Heart, Star, MapPin, Trash2, Inbox, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DKcsG2Fn.js";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { ad as myFavoritesQuery, x as removeFavorite, ae as myApplicationsAsClientQuery, af as myReviewsAsClientQuery, ag as Route } from "./router-BvhtVh2b.js";
import { r as reviewsWord, f as formatPriceRange, a as formatDate } from "./format-BSlnw0iM.js";
import { toast } from "sonner";
import "@radix-ui/react-tabs";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-B-8_7z8C.js";
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
import "./sitemap.server-BVrO7XJx.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
function ClientFavoritesTab({ userId }) {
  const { data: favorites } = useSuspenseQuery(myFavoritesQuery(userId));
  const qc = useQueryClient();
  const [removingId, setRemovingId] = useState(null);
  const handleRemove = async (specialistId) => {
    setRemovingId(specialistId);
    try {
      await removeFavorite(userId, specialistId);
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["my-favorites", userId] }),
        qc.invalidateQueries({ queryKey: ["my-favorite-ids", userId] })
      ]);
      toast.success("Удалено из избранного");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось удалить");
    } finally {
      setRemovingId(null);
    }
  };
  if (favorites.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(Heart, { className: "mx-auto text-muted-foreground/40", size: 36 }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold", children: "Пока нет избранных" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Добавляйте интересных специалистов в избранное из",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/specialists", className: "text-primary hover:underline", children: "каталога" }),
        "."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: favorites.map((fav) => {
    const s = fav.specialist;
    if (!s) return null;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group relative overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-elevated",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-border", children: s.avatar_url ? /* @__PURE__ */ jsx("img", { src: s.avatar_url, alt: s.name ?? "", loading: "lazy", decoding: "async", width: 64, height: 64, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary font-bold", children: s.name?.[0] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "truncate font-bold", children: s.name }),
              /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsx(Star, { size: 11, className: "fill-accent text-accent" }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: s.rating.toFixed(1) })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                  s.reviews_count,
                  " ",
                  reviewsWord(s.reviews_count)
                ] })
              ] }),
              s.location && /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-0.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx(MapPin, { size: 11 }),
                " ",
                s.location
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleRemove(s.id),
                disabled: removingId === s.id,
                "aria-label": "Удалить из избранного",
                className: "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50",
                children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
              }
            )
          ] }),
          s.short_description && /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: s.short_description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-accent", children: formatPriceRange(s.price_from, s.price_to) }),
            s.slug && /* @__PURE__ */ jsx(
              Link,
              {
                to: "/specialist/$slug",
                params: { slug: s.slug },
                className: "text-sm font-medium text-primary hover:text-primary-glow",
                children: "Открыть →"
              }
            )
          ] })
        ]
      },
      fav.id
    );
  }) });
}
const STATUS_LABELS = {
  new: { label: "Новая", className: "bg-primary/15 text-primary" },
  in_progress: { label: "В работе", className: "bg-accent/15 text-accent" },
  closed: { label: "Закрыта", className: "bg-success/15 text-success" },
  rejected: { label: "Отклонена", className: "bg-destructive/15 text-destructive" }
};
function ClientApplicationsTab({ email }) {
  const { data: applications } = useSuspenseQuery(myApplicationsAsClientQuery(email));
  if (!email) {
    return /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-10 text-center text-muted-foreground", children: "Email не определён." });
  }
  if (applications.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(Inbox, { className: "mx-auto text-muted-foreground/40", size: 36 }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold", children: "Заявок пока нет" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Здесь появятся заявки, отправленные с email ",
        /* @__PURE__ */ jsx("strong", { children: email }),
        ".",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/specialists", className: "text-primary hover:underline", children: "Найти специалиста" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: applications.map((app) => {
    const status = STATUS_LABELS[app.status] ?? STATUS_LABELS.new;
    return /* @__PURE__ */ jsxs("div", { className: "glass rounded-xl p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-border", children: app.specialist?.avatar_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: app.specialist.avatar_url,
              alt: app.specialist.name ?? "",
              className: "h-full w-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary text-xs font-bold", children: app.specialist?.name?.[0] ?? "?" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            app.specialist?.slug ? /* @__PURE__ */ jsx(
              Link,
              {
                to: "/specialist/$slug",
                params: { slug: app.specialist.slug },
                className: "font-bold hover:text-primary",
                children: app.specialist.name ?? "Специалист"
              }
            ) : /* @__PURE__ */ jsx("span", { className: "font-bold", children: app.specialist?.name ?? "Специалист" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(app.created_at) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${status.className}`, children: status.label })
      ] }),
      app.budget && /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Бюджет:" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: app.budget })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: app.message })
    ] }, app.id);
  }) });
}
function ClientReviewsTab({ email }) {
  const { data: reviews } = useSuspenseQuery(myReviewsAsClientQuery(email));
  if (!email) {
    return /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-10 text-center text-muted-foreground", children: "Email не определён." });
  }
  if (reviews.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsx(Star, { className: "mx-auto text-muted-foreground/40", size: 36 }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold", children: "Отзывов пока нет" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Оставляйте отзывы со страниц специалистов в",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/specialists", className: "text-primary hover:underline", children: "каталоге" }),
        "."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: reviews.map((r) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-xl p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-border", children: r.specialist?.avatar_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: r.specialist.avatar_url,
            alt: r.specialist.name ?? "",
            className: "h-full w-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary text-xs font-bold", children: r.specialist?.name?.[0] ?? "?" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          r.specialist?.slug ? /* @__PURE__ */ jsx(
            Link,
            {
              to: "/specialist/$slug",
              params: { slug: r.specialist.slug },
              className: "font-bold hover:text-primary",
              children: r.specialist.name ?? "Специалист"
            }
          ) : /* @__PURE__ */ jsx("span", { className: "font-bold", children: r.specialist?.name ?? "Специалист" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(r.created_at) })
        ] })
      ] }),
      r.is_approved ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 12 }),
        " Опубликован"
      ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Clock, { size: 12 }),
        " На модерации"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex items-center gap-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsx(
      Star,
      {
        size: 14,
        className: n <= r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
      },
      n
    )) }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: r.text })
  ] }, r.id)) });
}
function AccountPage() {
  const {
    auth
  } = Route.useRouteContext();
  if (!auth.userId) {
    return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl px-4 py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Требуется вход." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-extrabold md:text-4xl", children: [
          "Мой ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "кабинет" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Избранные специалисты, заявки и отзывы" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/specialists", className: "text-sm font-medium text-primary hover:text-primary-glow", children: "Найти специалиста →" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "favorites", className: "mt-8", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "w-full overflow-x-auto md:w-auto", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "favorites", children: [
          /* @__PURE__ */ jsx(Heart, { size: 14 }),
          " Избранное"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "applications", children: [
          /* @__PURE__ */ jsx(Inbox, { size: 14 }),
          " Мои заявки"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "reviews", children: [
          /* @__PURE__ */ jsx(Star, { size: 14 }),
          " Мои отзывы"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(TabSpinner, {}), children: [
        /* @__PURE__ */ jsx(TabsContent, { value: "favorites", className: "mt-6", children: /* @__PURE__ */ jsx(ClientFavoritesTab, { userId: auth.userId }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "applications", className: "mt-6", children: /* @__PURE__ */ jsx(ClientApplicationsTab, { email: auth.userEmail }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "reviews", className: "mt-6", children: /* @__PURE__ */ jsx(ClientReviewsTab, { email: auth.userEmail }) })
      ] })
    ] })
  ] });
}
function TabSpinner() {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) });
}
export {
  AccountPage as component
};
