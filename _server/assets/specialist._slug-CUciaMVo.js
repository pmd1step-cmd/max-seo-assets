import { jsxs, jsx } from "react/jsx-runtime";
import { R as Reveal } from "./reveal-CXI8C-7o.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { CheckCircle2, Send, Star, MapPin, Briefcase } from "lucide-react";
import { C as ConsentCheckbox, B as Button, s as supabase, v as useAuth, H as Route, I as specialistBySlugQuery, J as specialistCasesQuery, K as specialistReviewsQuery, L as specialistBlogPostsQuery } from "./router-v36oCi4s.js";
import { B as BlogCard } from "./BlogCard-KMzuXGKo.js";
import { r as reviewsWord, y as yearsWord, f as formatPriceRange, a as formatDate } from "./format-BSlnw0iM.js";
import { B as Breadcrumbs } from "./Breadcrumbs-GEccDvdO.js";
import "@tanstack/react-router";
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
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
const BUDGETS = ["до 30 000 ₽", "30 000 – 80 000 ₽", "80 000 – 200 000 ₽", "от 200 000 ₽"];
function ApplicationForm({ specialistId, className }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Заполните обязательные поля");
      return;
    }
    if (!consent) {
      setError("Необходимо согласиться с обработкой персональных данных");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.from("applications").insert({
      specialist_id: specialistId,
      applicant_name: name,
      applicant_email: email,
      applicant_phone: phone || null,
      message,
      budget: budget || null,
      status: "new"
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDone(true);
  };
  if (done) {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-xl bg-success/10 p-5 text-center ${className ?? ""}`, children: [
      /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto text-success", size: 36 }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold", children: "Заявка отправлена!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Специалист свяжется с вами в ближайшее время." })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: `space-y-3 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Ваше имя *",
        value: name,
        onChange: (e) => setName(e.target.value),
        required: true,
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "email",
        placeholder: "Email *",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        required: true,
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "tel",
        placeholder: "Телефон",
        value: phone,
        onChange: (e) => setPhone(e.target.value),
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        placeholder: "Опишите задачу *",
        value: message,
        onChange: (e) => setMessage(e.target.value),
        required: true,
        rows: 4,
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsxs(
      "select",
      {
        value: budget,
        onChange: (e) => setBudget(e.target.value),
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm",
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Бюджет (опционально)" }),
          BUDGETS.map((b) => /* @__PURE__ */ jsx("option", { value: b, children: b }, b))
        ]
      }
    ),
    /* @__PURE__ */ jsx(ConsentCheckbox, { checked: consent, onChange: setConsent, id: "application-consent" }),
    error && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading || !consent, className: "w-full gradient-bg", children: [
      /* @__PURE__ */ jsx(Send, {}),
      " ",
      loading ? "Отправка…" : "Отправить заявку"
    ] })
  ] });
}
function ReviewForm({ specialistId }) {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (isAuthenticated && user) {
      const meta = user.user_metadata ?? {};
      if (meta.name && !name) setName(meta.name);
      if (user.email && !email) setEmail(user.email);
    }
  }, [isAuthenticated, user?.id]);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !text.trim()) {
      setError("Заполните имя и текст отзыва");
      return;
    }
    if (!consent) {
      setError("Необходимо согласиться с обработкой персональных данных");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.rpc("submit_review", {
      _specialist_id: specialistId,
      _author_name: name,
      _rating: rating,
      _text: text,
      _email: email || void 0
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDone(true);
  };
  if (!open) {
    return /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsx(Star, {}),
      " Оставить отзыв"
    ] });
  }
  if (done) {
    return /* @__PURE__ */ jsxs("div", { className: "glass rounded-xl p-5 text-center", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto text-success", size: 32 }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 font-semibold", children: "Спасибо за отзыв!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Он появится после модерации." })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "glass space-y-3 rounded-xl p-5", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Ваше имя *",
        value: name,
        onChange: (e) => setName(e.target.value),
        required: true,
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "email",
        placeholder: "Email (необязательно)",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Оценка:" }),
      [1, 2, 3, 4, 5].map((r) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setRating(r),
          "aria-label": `${r} звёзд`,
          children: /* @__PURE__ */ jsx(
            Star,
            {
              size: 22,
              className: r <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"
            }
          )
        },
        r
      ))
    ] }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        placeholder: "Текст отзыва *",
        value: text,
        onChange: (e) => setText(e.target.value),
        required: true,
        rows: 4,
        className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      }
    ),
    /* @__PURE__ */ jsx(ConsentCheckbox, { checked: consent, onChange: setConsent, id: "review-consent" }),
    error && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading || !consent, className: "gradient-bg", children: loading ? "Отправка…" : "Отправить" }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: "Отмена" })
    ] })
  ] });
}
function SpecialistPage() {
  const params = Route.useParams();
  const {
    data: spec
  } = useSuspenseQuery(specialistBySlugQuery(params.slug));
  const {
    data: cases
  } = useSuspenseQuery(specialistCasesQuery(spec.id));
  const {
    data: reviews
  } = useSuspenseQuery(specialistReviewsQuery(spec.id));
  const {
    data: posts
  } = useSuspenseQuery(specialistBlogPostsQuery(spec.id));
  useEffect(() => {
    if (spec?.slug) {
      void supabase.rpc("increment_specialist_views", {
        _slug: spec.slug
      });
    }
  }, [spec?.slug]);
  if (!spec) return null;
  const tasks = spec.categories.filter((c) => c.type === "task");
  const niches = spec.categories.filter((c) => c.type === "niche");
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: spec.name,
    description: spec.short_description,
    image: spec.avatar_url,
    address: spec.location,
    aggregateRating: spec.reviews_count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: spec.rating,
      reviewCount: spec.reviews_count
    } : void 0
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify(personJsonLd)
    } }),
    /* @__PURE__ */ jsx(Breadcrumbs, { className: "mb-4", items: [{
      label: "Специалисты",
      to: "/specialists"
    }, {
      label: spec.name ?? "Специалист"
    }] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Reveal, { className: "glass rounded-3xl p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-primary/30 shadow-glow", children: spec.avatar_url ? /* @__PURE__ */ jsx("img", { src: spec.avatar_url, alt: spec.name ?? "", fetchPriority: "high", decoding: "async", width: 128, height: 128, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary text-3xl font-bold", children: spec.name?.[0] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold md:text-4xl", children: spec.name }),
              /* @__PURE__ */ jsx(CheckCircle2, { className: "text-success", size: 22 })
            ] }),
            spec.brand_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: spec.brand_name }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Star, { size: 16, className: "fill-accent text-accent" }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: spec.rating.toFixed(1) }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "(",
                  spec.reviews_count,
                  " ",
                  reviewsWord(spec.reviews_count),
                  ")"
                ] })
              ] }),
              spec.location && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(MapPin, { size: 14 }),
                " ",
                spec.location
              ] }),
              spec.experience_years && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Briefcase, { size: 14 }),
                " ",
                spec.experience_years,
                " ",
                yearsWord(spec.experience_years),
                " опыта"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 inline-flex rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent", children: formatPriceRange(spec.price_from, spec.price_to) })
          ] })
        ] }) }),
        spec.full_description && /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "О специалисте" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-muted-foreground", children: spec.full_description })
        ] }),
        (tasks.length > 0 || niches.length > 0) && /* @__PURE__ */ jsxs("section", { className: "mt-6 flex flex-wrap gap-2", children: [
          tasks.map((c) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary", children: c.name }, c.id)),
          niches.map((c) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent", children: c.name }, c.id))
        ] }),
        cases.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold", children: [
            "Кейсы (",
            cases.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-5 sm:grid-cols-2", children: cases.map((c) => /* @__PURE__ */ jsxs(Reveal, { y: 12, className: "glass rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-elevated", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
              c.niche && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-accent/15 px-2 py-0.5 text-accent", children: c.niche }),
              c.task_type && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/15 px-2 py-0.5 text-primary", children: c.task_type })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-bold", children: c.title }),
            c.task_description && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: c.task_description }),
            c.results && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg bg-success/10 p-3 text-sm", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-success", children: "Результат: " }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground", children: c.results })
            ] })
          ] }, c.id)) })
        ] }),
        posts.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold", children: [
            "Статьи (",
            posts.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-5 sm:grid-cols-2", children: posts.map((p) => /* @__PURE__ */ jsx(BlogCard, { post: p }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold", children: [
            "Отзывы (",
            reviews.length,
            ")"
          ] }) }),
          reviews.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Пока нет отзывов. Будьте первым!" }) : /* @__PURE__ */ jsx("div", { className: "mt-5 space-y-4", children: reviews.map((r) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-bold", children: r.author_name[0] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: r.author_name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(r.created_at) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex", children: Array.from({
                length: 5
              }).map((_, i) => /* @__PURE__ */ jsx(Star, { size: 16, className: i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30" }, i)) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed", children: r.text })
          ] }, r.id)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(ReviewForm, { specialistId: spec.id }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Оставить заявку" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          spec.name,
          " свяжется с вами в течение дня"
        ] }),
        /* @__PURE__ */ jsx(ApplicationForm, { specialistId: spec.id, className: "mt-4" })
      ] }) })
    ] })
  ] });
}
export {
  SpecialistPage as component
};
