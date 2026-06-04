import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { R as Reveal } from "./reveal-Cwj30fMP.js";
import { useQuery, useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, ExternalLink, Image, Eye, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { D as Dialog, y as DialogContent, z as DialogHeader, A as DialogTitle, E as DialogDescription, s as supabase, B as Button, ae as moderationQueueQuery, M as DialogFooter } from "./router-Bes4cunC.js";
import { T as Textarea } from "./textarea-CzhFAktu.js";
import { L as Label } from "./label-h4oTi4cf.js";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-BNLmlFsW.js";
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
import "./sitemap.server-BewSkGO6.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-label";
function ModerationPreviewDialog({ item, onClose }) {
  return /* @__PURE__ */ jsx(Dialog, { open: !!item, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Предпросмотр:",
        " ",
        item?.kind === "specialist" ? "профиль специалиста" : item?.kind === "case" ? "кейс" : "статья"
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Так материал увидят пользователи после публикации." })
    ] }),
    item && /* @__PURE__ */ jsx(PreviewBody, { item })
  ] }) });
}
function PreviewBody({ item }) {
  if (item.kind === "specialist") return /* @__PURE__ */ jsx(SpecialistPreview, { id: item.id });
  if (item.kind === "case") return /* @__PURE__ */ jsx(CasePreview, { id: item.id });
  return /* @__PURE__ */ jsx(BlogPostPreview, { id: item.id });
}
function SpecialistPreview({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-preview", "specialist", id],
    queryFn: async () => {
      const { data: data2, error: error2 } = await supabase.from("specialists").select("*, specialist_categories(category_id, categories(name, slug, type))").eq("id", id).maybeSingle();
      if (error2) throw error2;
      return data2;
    }
  });
  if (isLoading) return /* @__PURE__ */ jsx(LoadingState, {});
  if (error) return /* @__PURE__ */ jsx(ErrorState, { message: error.message });
  if (!data) return /* @__PURE__ */ jsx(ErrorState, { message: "Не найдено" });
  const cats = (data.specialist_categories ?? []).map((c) => c.categories?.name).filter(Boolean);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      data.avatar_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: data.avatar_url,
          alt: "",
          className: "h-24 w-24 rounded-2xl object-cover"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "h-24 w-24 rounded-2xl bg-surface" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: data.name ?? data.brand_name ?? "Без имени" }),
        data.brand_name && data.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: data.brand_name }),
        data.short_description && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: data.short_description }),
        cats.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: cats.map((c) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "rounded-full bg-secondary px-2 py-0.5 text-[11px]",
            children: c
          },
          c
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      FieldGrid,
      {
        fields: [
          ["Опыт", data.experience_years ? `${data.experience_years} лет` : null],
          ["Локация", data.location],
          [
            "Цена",
            data.price_from || data.price_to ? `${data.price_from ?? "?"} – ${data.price_to ?? "?"} ₽` : null
          ],
          ["Email", data.email],
          ["Телефон", data.phone],
          ["Telegram", data.telegram],
          ["WhatsApp", data.whatsapp]
        ]
      }
    ),
    data.full_description && /* @__PURE__ */ jsx(Section, { title: "Полное описание", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm leading-relaxed", children: data.full_description }) }),
    data.slug && /* @__PURE__ */ jsx(ExternalPreviewLink, { href: `/specialist/${data.slug}` })
  ] });
}
function CasePreview({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-preview", "case", id],
    queryFn: async () => {
      const { data: data2, error: error2 } = await supabase.from("cases").select(
        "*, specialists(name, slug), case_media(url, type, order_index)"
      ).eq("id", id).maybeSingle();
      if (error2) throw error2;
      return data2;
    }
  });
  if (isLoading) return /* @__PURE__ */ jsx(LoadingState, {});
  if (error) return /* @__PURE__ */ jsx(ErrorState, { message: error.message });
  if (!data) return /* @__PURE__ */ jsx(ErrorState, { message: "Не найдено" });
  const media = (data.case_media ?? []).sort(
    (a, b) => a.order_index - b.order_index
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    data.cover_url && /* @__PURE__ */ jsx(
      "img",
      {
        src: data.cover_url,
        alt: "",
        className: "aspect-video w-full rounded-xl object-cover"
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: data.title }),
    data.specialists?.name && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Автор: ",
      data.specialists.name
    ] }),
    /* @__PURE__ */ jsx(
      FieldGrid,
      {
        fields: [
          ["Тип задачи", data.task_type],
          ["Ниша", data.niche]
        ]
      }
    ),
    data.task_description && /* @__PURE__ */ jsx(Section, { title: "Задача", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm", children: data.task_description }) }),
    data.work_done && /* @__PURE__ */ jsx(Section, { title: "Что было сделано", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm", children: data.work_done }) }),
    data.results && /* @__PURE__ */ jsx(Section, { title: "Результаты", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm", children: data.results }) }),
    data.conclusion && /* @__PURE__ */ jsx(Section, { title: "Вывод", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm", children: data.conclusion }) }),
    media.length > 0 && /* @__PURE__ */ jsx(Section, { title: "Медиа", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: media.map((m, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "aspect-square overflow-hidden rounded-lg bg-surface",
        children: m.type === "image" ? /* @__PURE__ */ jsx("img", { src: m.url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx(
          "video",
          {
            src: m.url,
            controls: true,
            className: "h-full w-full object-cover"
          }
        )
      },
      i
    )) }) }),
    data.slug && /* @__PURE__ */ jsx(ExternalPreviewLink, { href: `/cases/${data.slug}` })
  ] });
}
function BlogPostPreview({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-preview", "blog_post", id],
    queryFn: async () => {
      const { data: data2, error: error2 } = await supabase.from("blog_posts").select(
        "*, category:blog_categories(name), author:specialists(name, slug)"
      ).eq("id", id).maybeSingle();
      if (error2) throw error2;
      return data2;
    }
  });
  if (isLoading) return /* @__PURE__ */ jsx(LoadingState, {});
  if (error) return /* @__PURE__ */ jsx(ErrorState, { message: error.message });
  if (!data) return /* @__PURE__ */ jsx(ErrorState, { message: "Не найдено" });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    data.cover_url && /* @__PURE__ */ jsx(
      "img",
      {
        src: data.cover_url,
        alt: "",
        className: "aspect-video w-full rounded-xl object-cover"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: data.title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
        data.author?.name && /* @__PURE__ */ jsxs(Fragment, { children: [
          "Автор: ",
          data.author.name
        ] }),
        data.category?.name && /* @__PURE__ */ jsxs(Fragment, { children: [
          " · Рубрика: ",
          data.category.name
        ] }),
        data.reading_minutes ? /* @__PURE__ */ jsxs(Fragment, { children: [
          " · ",
          data.reading_minutes,
          " мин чтения"
        ] }) : null
      ] })
    ] }),
    data.excerpt && /* @__PURE__ */ jsx("p", { className: "text-sm italic text-muted-foreground", children: data.excerpt }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "prose prose-sm max-w-none dark:prose-invert",
        dangerouslySetInnerHTML: { __html: data.content ?? "" }
      }
    ),
    data.slug && /* @__PURE__ */ jsx(ExternalPreviewLink, { href: `/blog/${data.slug}` })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-1.5 text-sm font-semibold text-muted-foreground", children: title }),
    children
  ] });
}
function FieldGrid({ fields }) {
  const visible = fields.filter(([, v]) => v !== null && v !== void 0 && v !== "");
  if (visible.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 rounded-xl bg-surface/50 p-3 text-sm sm:grid-cols-2", children: visible.map(([k, v]) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: k }),
    /* @__PURE__ */ jsx("div", { className: "font-medium", children: v })
  ] }, k)) });
}
function LoadingState() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 py-12 text-muted-foreground", children: [
    /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 16 }),
    " Загрузка…"
  ] });
}
function ErrorState({ message }) {
  return /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-destructive/10 p-4 text-sm text-destructive", children: message });
}
function ExternalPreviewLink({ href }) {
  return /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-3", children: [
    /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxs("a", { href, target: "_blank", rel: "noreferrer", children: [
      /* @__PURE__ */ jsx(ExternalLink, { size: 14 }),
      "Открыть публичную страницу (",
      href,
      ")"
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "Публичная страница доступна только после одобрения." })
  ] });
}
const KIND_LABEL = {
  specialist: "Профиль",
  case: "Кейс",
  blog_post: "Статья"
};
const KIND_TABLE = {
  specialist: "specialists",
  case: "cases",
  blog_post: "blog_posts"
};
function AdminModerationTab() {
  const qc = useQueryClient();
  const { data: items } = useSuspenseQuery(moderationQueueQuery());
  const [filter, setFilter] = useState("all");
  const [rejecting, setRejecting] = useState(null);
  const [previewing, setPreviewing] = useState(null);
  const [reason, setReason] = useState("");
  const approve = useMutation({
    mutationFn: async (item) => {
      const table = KIND_TABLE[item.kind];
      const { error } = await supabase.from(table).update({
        moderation_status: "approved",
        rejection_reason: null,
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Опубликовано");
      qc.invalidateQueries({ queryKey: ["admin", "moderation-queue"] });
      qc.invalidateQueries({ queryKey: ["admin", "moderation-counts"] });
      qc.invalidateQueries({ queryKey: ["admin", "specialists"] });
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const reject = useMutation({
    mutationFn: async ({ item, reason: reason2 }) => {
      const table = KIND_TABLE[item.kind];
      const { error } = await supabase.from(table).update({
        moderation_status: "rejected",
        rejection_reason: reason2,
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Отклонено — автор увидит причину");
      setRejecting(null);
      setReason("");
      qc.invalidateQueries({ queryKey: ["admin", "moderation-queue"] });
      qc.invalidateQueries({ queryKey: ["admin", "moderation-counts"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const filtered = filter === "all" ? items : items.filter((i) => i.kind === filter);
  const counts = {
    all: items.length,
    specialist: items.filter((i) => i.kind === "specialist").length,
    case: items.filter((i) => i.kind === "case").length,
    blog_post: items.filter((i) => i.kind === "blog_post").length
  };
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Модерация" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "На проверке: ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-accent", children: counts.all })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap gap-1 rounded-lg border border-border p-0.5", children: ["all", "specialist", "case", "blog_post"].map((k) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setFilter(k),
        className: `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${filter === k ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`,
        children: k === "all" ? `Все (${counts.all})` : k === "specialist" ? `Профили (${counts.specialist})` : k === "case" ? `Кейсы (${counts.case})` : `Статьи (${counts.blog_post})`
      },
      k
    )) }),
    filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-10 text-center text-muted-foreground", children: "Очередь пуста — всё проверено 🎉" }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filtered.map((item) => /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface", children: item.cover_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: item.cover_url,
          alt: "",
          className: "h-full w-full object-cover"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(Image, { size: 20 }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary", children: KIND_LABEL[item.kind] }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.title })
        ] }),
        item.author?.name && /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
          "Автор: ",
          item.author.name,
          item.submitted_at && /* @__PURE__ */ jsxs(Fragment, { children: [
            " · отправлено ",
            formatDistanceToNow(new Date(item.submitted_at), {
              addSuffix: true,
              locale: ru
            })
          ] })
        ] }),
        item.excerpt && /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: item.excerpt })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => setPreviewing(item),
            children: [
              /* @__PURE__ */ jsx(Eye, { size: 14 }),
              " Просмотр"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            size: "sm",
            onClick: () => approve.mutate(item),
            disabled: approve.isPending,
            children: [
              /* @__PURE__ */ jsx(Check, {}),
              " Одобрить"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => {
              setRejecting(item);
              setReason("");
            },
            children: [
              /* @__PURE__ */ jsx(X, {}),
              " Отклонить"
            ]
          }
        )
      ] })
    ] }) }, `${item.kind}-${item.id}`)) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!rejecting, onOpenChange: (o) => !o && setRejecting(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Отклонить материал" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Автор увидит причину в своём кабинете и сможет исправить." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Причина отклонения" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            rows: 4,
            value: reason,
            onChange: (e) => setReason(e.target.value),
            placeholder: "Например: указаны контакты в описании, текст не по теме, нарушение правил…"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setRejecting(null), children: "Отмена" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            disabled: !reason.trim() || reject.isPending,
            onClick: () => rejecting && reject.mutate({ item: rejecting, reason: reason.trim() }),
            children: "Отклонить"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ModerationPreviewDialog,
      {
        item: previewing,
        onClose: () => setPreviewing(null)
      }
    )
  ] });
}
const SplitComponent = AdminModerationTab;
export {
  SplitComponent as component
};
