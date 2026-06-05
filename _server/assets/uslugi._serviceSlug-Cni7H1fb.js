import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { R as Reveal } from "./reveal-rzf4wsoJ.js";
import { ArrowRight, Star, Briefcase, Send, MessageSquare, Sparkles, Rocket, LineChart, Target, MapPin, GraduationCap, ShoppingBag, Search, Filter, Sprout, TrendingUp, Megaphone } from "lucide-react";
import { u as useLeadRequest, f as catalogQuery, B as Button, S as SITE_URL, a8 as Route, a9 as serviceBySlugQuery } from "./router-jf0TtKpr.js";
import { r as reviewsWord, a as formatPriceRange } from "./format-CdVWScmC.js";
import { B as Breadcrumbs } from "./Breadcrumbs-CRnt8l3W.js";
import "react";
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
function ServiceSpecialistsBlock({ serviceSlug, serviceName }) {
  const { open } = useLeadRequest();
  const { data, isLoading } = useQuery(
    catalogQuery({
      categorySlug: serviceSlug,
      sort: "rating",
      page: 1,
      perPage: 6
    })
  );
  const specialists = data?.items ?? [];
  if (!isLoading && specialists.length === 0) return null;
  return /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 pb-16 md:px-8 md:pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: "Исполнители под задачу" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Проверенные специалисты по услуге «",
        serviceName,
        "»"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: isLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "glass h-[280px] animate-pulse rounded-2xl" }, i)) : specialists.map((s, i) => /* @__PURE__ */ jsx(
      ServiceSpecialistCard,
      {
        specialist: s,
        index: i,
        onSendTask: () => open(`service:${serviceSlug}:specialist:${s.slug ?? s.id}`)
      },
      s.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsxs(Link, { to: "/specialists", search: { task: [serviceSlug] }, children: [
      "Все исполнители ",
      /* @__PURE__ */ jsx(ArrowRight, {})
    ] }) }) })
  ] });
}
function ServiceSpecialistCard({
  specialist,
  index,
  onSendTask
}) {
  const casesLabel = specialist.has_cases ? "есть кейсы" : "без кейсов";
  const profileSlug = specialist.slug ?? "";
  return /* @__PURE__ */ jsxs(Reveal, { className: "glass flex h-full flex-col rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-border", children: specialist.avatar_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: specialist.avatar_url,
          alt: specialist.name ?? "",
          className: "h-full w-full object-cover"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-secondary font-bold", children: specialist.name?.[0] ?? "?" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "truncate text-base font-bold", children: specialist.name }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsx(Star, { size: 12, className: "fill-accent text-accent" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: specialist.rating.toFixed(1) }),
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
              "(",
              specialist.reviews_count,
              " ",
              reviewsWord(specialist.reviews_count),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/40", children: "•" }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Briefcase, { size: 11 }),
            " ",
            casesLabel
          ] })
        ] })
      ] })
    ] }),
    specialist.short_description && /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: specialist.short_description }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm font-semibold text-accent", children: formatPriceRange(specialist.price_from, specialist.price_to) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { size: "sm", className: "gradient-bg shadow-glow", onClick: onSendTask, children: [
        /* @__PURE__ */ jsx(Send, {}),
        " Отправить задачу"
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxs(Link, { to: "/specialist/$slug", params: { slug: profileSlug }, children: [
        /* @__PURE__ */ jsx(MessageSquare, {}),
        " Связаться через платформу"
      ] }) })
    ] })
  ] });
}
const ICONS = {
  Megaphone,
  TrendingUp,
  Send,
  Sprout,
  Filter,
  Search,
  ShoppingBag,
  GraduationCap,
  Briefcase,
  MapPin,
  Target,
  LineChart,
  Sparkles,
  MessageSquare,
  Rocket
};
function pickIcon(name) {
  if (!name) return Sparkles;
  return ICONS[name] ?? Sparkles;
}
const GLOBAL_PROCESS_STEPS = [
  { icon: "Send", title: "Оставьте заявку", text: "Опишите задачу и бюджет." },
  { icon: "Search", title: "Получите подбор исполнителей", text: "Подберём проверенных специалистов." },
  { icon: "MessageSquare", title: "Работайте через платформу", text: "Общение и контроль этапов." },
  { icon: "Rocket", title: "Получите результат", text: "Принимайте работу и оставьте отзыв." }
];
function ServiceDetailPage({ service }) {
  const { open } = useLeadRequest();
  const source = `service:${service.slug}`;
  const heroTitle = service.hero_h1?.trim() || `${service.name} в МАКС для бизнеса`;
  const heroSubtitle = service.hero_subtitle?.trim() || `Запуск, настройка и ведение ${service.name.toLowerCase()} под задачи бизнеса. Подберем исполнителей и доведем до результата.`;
  const heroCtaPrimary = service.hero_cta_primary?.trim() || "Получить решение";
  service.hero_cta_secondary?.trim() || "Оставить заявку";
  const heroMicrotext = service.hero_microtext?.trim() || "Работа проходит через платформу — фиксируем задачу и контролируем результат.";
  const whatBlock = service.block_what_included;
  const audienceBlock = service.block_audience;
  const processBlock = service.block_process;
  const finalCtaBlock = service.block_final_cta;
  const processItems = processBlock.use_global || processBlock.items.length === 0 ? GLOBAL_PROCESS_STEPS : processBlock.items;
  const handleFinalCta = () => {
    if (finalCtaBlock.action === "url" && finalCtaBlock.url) {
      window.location.href = finalCtaBlock.url;
    } else {
      open(source);
    }
  };
  const serviceUrl = `${SITE_URL}/uslugi/${service.slug}`;
  const serviceImage = service.og_image || service.hero_image || void 0;
  const serviceDescription = service.meta_description?.trim() || heroSubtitle;
  const offerItems = whatBlock.items.filter((it) => it.title?.trim());
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: serviceDescription,
    url: serviceUrl,
    ...serviceImage ? { image: serviceImage } : {},
    category: "Реклама и маркетинг",
    provider: {
      "@type": "Organization",
      name: "МАКС Experts",
      url: `${SITE_URL}/`,
      description: "Каталог проверенных специалистов по рекламе и маркетингу в мессенджере МАКС."
    },
    areaServed: { "@type": "Country", name: "Россия" },
    audience: {
      "@type": "BusinessAudience",
      name: "E-commerce, инфобизнес, сфера услуг и локальный бизнес"
    },
    ...offerItems.length > 0 ? {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: whatBlock.title || "Что входит в услугу",
        itemListElement: offerItems.map((it) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: it.title,
            ...it.text?.trim() ? { description: it.text } : {}
          }
        }))
      }
    } : {}
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(serviceJsonLd) }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[1280px] px-4 pt-6 md:px-8", children: /* @__PURE__ */ jsx(
      Breadcrumbs,
      {
        items: [
          { label: "Услуги для бизнеса", to: "/max-dlya-biznesa" },
          { label: service.name }
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 gradient-mesh opacity-70" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl orb-1" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -right-32 top-40 -z-10 h-96 w-96 rounded-full bg-accent/25 blur-3xl orb-2" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1100px] px-4 py-20 text-center md:px-8 md:py-28", children: [
        /* @__PURE__ */ jsxs(Reveal, { className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "text-accent" }),
          "Услуги для бизнеса"
        ] }),
        /* @__PURE__ */ jsx(
          Reveal,
          {
            delay: 100,
            y: 20,
            className: "mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl",
            children: service.hero_h1?.trim() ? heroTitle : /* @__PURE__ */ jsxs(Fragment, { children: [
              service.name,
              " в ",
              /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "МАКС" }),
              " для бизнеса"
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Reveal,
          {
            delay: 200,
            y: 20,
            className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg",
            children: heroSubtitle
          }
        ),
        /* @__PURE__ */ jsxs(
          Reveal,
          {
            delay: 300,
            y: 20,
            className: "mt-8 flex flex-wrap items-center justify-center gap-3",
            children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "lg",
                  onClick: () => open(source),
                  className: "gradient-bg shadow-glow pulse-glow hover:scale-105",
                  children: [
                    heroCtaPrimary,
                    " ",
                    /* @__PURE__ */ jsx(ArrowRight, {})
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/max-dlya-biznesa", children: "Все услуги" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: heroMicrotext })
      ] })
    ] }),
    !whatBlock.hidden && whatBlock.items.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: whatBlock.title }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: whatBlock.items.map((item, i) => /* @__PURE__ */ jsx(StepItem, { item, index: i }, `${item.title}-${i}`)) })
    ] }),
    !audienceBlock.hidden && audienceBlock.items.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 pb-16 md:px-8 md:pb-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold md:text-4xl", children: audienceBlock.title }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: audienceBlock.items.map((item, i) => {
        const Icon = pickIcon(item.icon);
        return /* @__PURE__ */ jsxs(
          Reveal,
          {
            className: "rounded-2xl glass p-5",
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsx(Icon, { size: 22 }) }),
              /* @__PURE__ */ jsx("h3", { className: "mt-4 font-bold", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: item.text })
            ]
          },
          `${item.title}-${i}`
        );
      }) })
    ] }),
    !processBlock.hidden && processItems.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-[1280px] px-4 pb-16 md:px-8 md:pb-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl font-bold md:text-4xl", children: processBlock.title }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: processItems.map((step, i) => {
        const Icon = pickIcon(step.icon);
        return /* @__PURE__ */ jsxs(
          Reveal,
          {
            className: "glass rounded-2xl p-6",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary", children: i + 1 }),
                /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl gradient-bg", children: /* @__PURE__ */ jsx(Icon, { className: "text-primary-foreground", size: 18 }) })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-bold", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: step.text })
            ]
          },
          `${step.title}-${i}`
        );
      }) })
    ] }),
    !service.block_specialists.hidden && /* @__PURE__ */ jsx(ServiceSpecialistsBlock, { serviceSlug: service.slug, serviceName: service.name }),
    !finalCtaBlock.hidden && /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1280px] px-4 pb-20 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl glass-strong p-10 text-center md:p-16", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 gradient-mesh opacity-50" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold md:text-5xl", children: finalCtaBlock.title }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: finalCtaBlock.text }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "lg",
          onClick: handleFinalCta,
          className: "mt-8 gradient-bg shadow-glow hover:scale-105",
          children: [
            finalCtaBlock.button_text,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, {})
          ]
        }
      )
    ] }) })
  ] });
}
function StepItem({ item, index }) {
  const Icon = pickIcon(item.icon);
  return /* @__PURE__ */ jsxs(
    Reveal,
    {
      className: "relative rounded-2xl glass p-5",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "absolute right-4 top-4 text-xs font-bold text-muted-foreground/60", children: [
          "0",
          index + 1
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsx(Icon, { size: 22 }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-bold", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: item.text })
      ]
    }
  );
}
function ServiceRouteComponent() {
  const {
    serviceSlug
  } = Route.useParams();
  const {
    data
  } = useSuspenseQuery(serviceBySlugQuery(serviceSlug));
  if (!data) return null;
  return /* @__PURE__ */ jsx(ServiceDetailPage, { service: data });
}
export {
  ServiceRouteComponent as component
};
