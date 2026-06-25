import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { Loader2, Heart, CheckCircle2, Star, MapPin, ArrowRight } from "lucide-react";
import { r as reviewsWord, f as formatPriceRange } from "./format-BSlnw0iM.js";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { v as useAuth, w as myFavoriteIdsQuery, x as removeFavorite, y as addFavorite } from "./router-DuTJZkD0.js";
import { toast } from "sonner";
function FavoriteButton({ specialistId, className, size = 18 }) {
  const { user, isAuthenticated, isSpecialist, isClient, isAdmin } = useAuth();
  const userId = user?.id ?? null;
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const canFavorite = !isAuthenticated || isClient || isAdmin || !isSpecialist;
  const { data: ids } = useQuery(myFavoriteIdsQuery(userId));
  const isFav = !!ids?.has(specialistId);
  if (!canFavorite) return null;
  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated || !userId) {
      toast.info("Войдите, чтобы сохранять избранное");
      navigate({ to: "/login", search: { redirect: void 0 } });
      return;
    }
    setBusy(true);
    try {
      if (isFav) {
        await removeFavorite(userId, specialistId);
      } else {
        await addFavorite(userId, specialistId);
      }
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["my-favorite-ids", userId] }),
        qc.invalidateQueries({ queryKey: ["my-favorites", userId] })
      ]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось обновить избранное");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: toggle,
      disabled: busy,
      "aria-label": isFav ? "Убрать из избранного" : "В избранное",
      "aria-pressed": isFav,
      className: `inline-flex items-center justify-center rounded-full bg-background/80 p-2 backdrop-blur transition-all hover:scale-110 hover:bg-background disabled:opacity-50 ${className ?? ""}`,
      children: busy ? /* @__PURE__ */ jsx(Loader2, { size, className: "animate-spin text-muted-foreground" }) : /* @__PURE__ */ jsx(
        Heart,
        {
          size,
          className: isFav ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"
        }
      )
    }
  );
}
function SpecialistCard({ specialist }) {
  const tasks = specialist.categories.filter((c) => c.type === "task").slice(0, 2);
  const niches = specialist.categories.filter((c) => c.type === "niche").slice(0, 3);
  return (
    // Без Reveal-обёртки: на каталогах с десятками карточек transform+will-change
    // на каждой карточке съедает Speed Index/TBT на мобильном.
    /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-2xl glass transition-shadow hover:shadow-elevated", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary/30 via-primary to-accent transition-opacity opacity-50 group-hover:opacity-100" }),
      /* @__PURE__ */ jsx(
        FavoriteButton,
        {
          specialistId: specialist.id,
          className: "absolute right-3 top-3 z-10 shadow-sm",
          size: 16
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-border transition-transform group-hover:scale-105", children: specialist.avatar_url ? (
            // loading=lazy + decoding=async + явные размеры — снижают LCP/CLS
            // и не блокируют главный поток на декоде картинок ниже first viewport.
            /* @__PURE__ */ jsx(
              "img",
              {
                src: specialist.avatar_url,
                alt: specialist.name ?? "",
                className: "h-full w-full object-cover",
                loading: "lazy",
                decoding: "async",
                fetchpriority: "low",
                width: 64,
                height: 64
              }
            )
          ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary font-bold", children: specialist.name?.[0] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("h3", { className: "truncate text-base font-bold", children: specialist.name }),
              /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "text-success shrink-0" })
            ] }),
            specialist.brand_name && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate", children: specialist.brand_name }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsx(Star, { size: 12, className: "fill-accent text-accent" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: specialist.rating.toFixed(1) })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                specialist.reviews_count,
                " ",
                reviewsWord(specialist.reviews_count)
              ] }),
              specialist.location && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40", children: "•" }),
                /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsx(MapPin, { size: 11 }),
                  " ",
                  specialist.location
                ] })
              ] })
            ] })
          ] })
        ] }),
        tasks.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: tasks.map((t) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary", children: t.name }, t.id)) }),
        specialist.short_description && /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: specialist.short_description }),
        niches.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: niches.map((n) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-muted-foreground", children: n.name }, n.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-accent", children: formatPriceRange(specialist.price_from, specialist.price_to) }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/specialist/$slug",
              params: { slug: specialist.slug ?? "" },
              className: "inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-glow",
              children: [
                "Подробнее ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
              ]
            }
          )
        ] })
      ] })
    ] })
  );
}
export {
  SpecialistCard as S
};
