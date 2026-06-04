import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Reveal } from "./reveal-BhbMLa_q.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { Send, Check, Link2, X, ChevronDown, ArrowLeft, Clock, Eye, ListOrdered, ChevronRight } from "lucide-react";
import { t as cn, O as Route, Q as blogPostBySlugQuery, T as relatedPostsQuery, s as supabase, B as Button } from "./router-yZ3SXsa2.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
import { toast } from "sonner";
import { B as BlogCard } from "./BlogCard-DA0gGMCE.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { a as formatDate } from "./format-BSlnw0iM.js";
import { B as Breadcrumbs } from "./Breadcrumbs-B22YOolp.js";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-CKDW8voY.js";
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
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
function processArticleHtml(html) {
  const headings = [];
  const used = /* @__PURE__ */ new Set();
  const out = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/(h2|h3)>/gi,
    (_match, tag, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const idMatch = /\bid=["']([^"']+)["']/i.exec(attrs);
      let id = idMatch?.[1] ?? slugify(text);
      if (!id) id = `section-${headings.length + 1}`;
      let unique = id;
      let i = 2;
      while (used.has(unique)) {
        unique = `${id}-${i++}`;
      }
      used.add(unique);
      headings.push({ id: unique, text, level: tag.toLowerCase() === "h3" ? 3 : 2 });
      const cleanedAttrs = attrs.replace(/\s*\bid=["'][^"']+["']/i, "");
      return `<${tag}${cleanedAttrs} id="${unique}">${inner}</${tag}>`;
    }
  );
  return { html: out, headings };
}
function BlogContent({ html }) {
  const { html: processed } = useMemo(() => processArticleHtml(html), [html]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "prose prose-invert max-w-none",
      dangerouslySetInnerHTML: { __html: processed }
    }
  );
}
function BlogTOC({ headings, onNavigate }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? null);
  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings.map((h) => document.getElementById(h.id)).filter((el) => !!el);
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);
  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
    onNavigate?.();
  };
  if (headings.length === 0) return null;
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Содержание статьи", className: "text-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Содержание" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-1 border-l border-border", children: headings.map((h) => {
      const isActive = h.id === activeId;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `#${h.id}`,
          onClick: (e) => handleClick(e, h.id),
          className: cn(
            "block -ml-px border-l-2 py-1.5 pl-4 transition-all duration-200",
            h.level === 3 && "pl-7 text-xs",
            isActive ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          ),
          children: h.text
        }
      ) }, h.id);
    }) })
  ] });
}
const maxLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='27'%20height='27'%20viewBox='0%200%2027%2027'%20fill='none'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.7687%2025.0626C11.3143%2025.0626%2010.1737%2024.7279%208.19103%2023.3893C6.93694%2024.8953%202.96571%2026.0722%202.79251%2024.0586C2.79251%2022.5471%202.4342%2021.2699%202.02811%2019.8755C1.54441%2018.1576%200.994995%2016.2444%200.994995%2013.4724C0.994995%206.85181%206.81155%201.87103%2013.703%201.87103C20.6004%201.87103%2026.0049%207.09722%2026.0049%2013.5337C26.0281%2019.8707%2020.5535%2025.0288%2013.7687%2025.0626ZM13.8702%207.59362C10.5141%207.43188%207.8984%209.60156%207.31914%2013.0039C6.8414%2015.8206%207.6894%2019.2508%208.41198%2019.4293C8.75835%2019.5073%209.63024%2018.8492%2010.1737%2018.3416C11.0723%2018.9214%2012.1187%2019.2696%2013.2074%2019.3512C16.6849%2019.5074%2019.6563%2017.0347%2019.8898%2013.7903C20.0257%2010.5391%2017.3482%207.78527%2013.8702%207.59921V7.59362Z'%20fill='%23ccc'%3e%3c/path%3e%3c/svg%3e";
function BlogShareRow({ url, title }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" ? new URL(url, window.location.origin).toString() : url;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;
  const vk = `https://vk.com/share.php?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`;
  const max = `https://max.ru/share?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Скопировано!");
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };
  const buttonClass = "glass flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-foreground hover:scale-110 hover:shadow-glow";
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Поделиться:" }),
    /* @__PURE__ */ jsx("a", { href: tg, target: "_blank", rel: "noopener noreferrer", className: buttonClass, "aria-label": "Telegram", children: /* @__PURE__ */ jsx(Send, { size: 16 }) }),
    /* @__PURE__ */ jsx("a", { href: vk, target: "_blank", rel: "noopener noreferrer", className: buttonClass, "aria-label": "VK", children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.019-1.298.581-1.49c.591-.19 1.35 1.265 2.155 1.824.61.422 1.072.33 1.072.33l2.154-.03s1.127-.07.593-.96c-.044-.073-.312-.658-1.605-1.864-1.354-1.263-1.172-1.058.459-3.246.993-1.331 1.39-2.144 1.266-2.493-.118-.332-.853-.244-.853-.244l-2.446.015s-.181-.025-.315.056c-.132.079-.217.262-.217.262s-.385 1.034-.898 1.913c-1.084 1.855-1.518 1.953-1.696 1.838-.413-.268-.31-1.075-.31-1.648 0-1.79.272-2.535-.527-2.728-.265-.064-.46-.106-1.138-.113-.871-.009-1.608.003-2.025.207-.278.136-.492.439-.361.457.16.022.524.099.717.362.249.339.24 1.1.24 1.1s.143 2.1-.335 2.36c-.327.179-.776-.187-1.741-1.872-.494-.864-.868-1.819-.868-1.819s-.072-.176-.202-.27c-.157-.114-.377-.15-.377-.15l-2.325.015s-.349.01-.477.162c-.114.135-.009.414-.009.414s1.821 4.262 3.882 6.41c1.892 1.969 4.04 1.84 4.04 1.84h.972z" }) }) }),
    /* @__PURE__ */ jsx("a", { href: max, target: "_blank", rel: "noopener noreferrer", className: buttonClass, "aria-label": "МАКС", children: /* @__PURE__ */ jsx("img", { src: maxLogo, alt: "", "aria-hidden": true, className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsx(Reveal, { as: "button", type: "button", onClick: handleCopy, className: cn(buttonClass, copied && "text-success"), "aria-label": "Скопировать ссылку", children: copied ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Link2, { size: 16 }) })
  ] });
}
function ReadingProgress({ targetId }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const end = start + rect.height - window.innerHeight;
      const current = window.scrollY;
      const pct = Math.max(0, Math.min(1, (current - start) / Math.max(1, end - start)));
      setProgress(pct * 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);
  return /* @__PURE__ */ jsx("div", { className: "reading-progress", style: { width: `${progress}%` }, "aria-hidden": true });
}
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(DialogPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
function BlogPostPage() {
  const params = Route.useParams();
  const {
    data: post
  } = useSuspenseQuery(blogPostBySlugQuery(params.slug));
  const {
    data: related
  } = useSuspenseQuery(relatedPostsQuery(post.id, post.category_id));
  const [tocOpen, setTocOpen] = useState(false);
  const [viewsCount, setViewsCount] = useState(post?.views_count ?? 0);
  const headings = useMemo(() => post ? processArticleHtml(post.content).headings : [], [post]);
  useEffect(() => {
    if (!post?.slug) return;
    setViewsCount(post.views_count);
    void supabase.rpc("increment_blog_post_views", {
      _slug: post.slug
    }).then(({
      error
    }) => {
      if (!error) setViewsCount((v) => v + 1);
    });
  }, [post?.slug, post?.views_count]);
  if (!post) return null;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: post.author?.name ? {
      "@type": "Person",
      name: post.author.name
    } : {
      "@type": "Organization",
      name: "МАКС Experts"
    }
  };
  const faqItems = Array.isArray(post.faq) ? post.faq.map((it) => ({
    question: typeof it?.question === "string" ? it.question.trim() : "",
    answer: typeof it?.answer === "string" ? it.answer.trim() : ""
  })).filter((it) => it.question && it.answer) : [];
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer
      }
    }))
  } : null;
  const authorName = post.author?.name ?? "Команда МАКС Experts";
  const authorBio = post.author ? null : "Публикуем экспертные материалы о рекламе в МАКС";
  const viewsLabel = `${viewsCount.toLocaleString("ru-RU")} просмотров`;
  const articleUrl = `/blog/${post.slug}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ReadingProgress, { targetId: "blog-article" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14", children: [
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
        __html: JSON.stringify(articleJsonLd)
      } }),
      faqJsonLd && /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
        __html: JSON.stringify(faqJsonLd)
      } }),
      /* @__PURE__ */ jsx(Breadcrumbs, { className: "mb-6", items: [{
        label: "Блог",
        to: "/blog"
      }, {
        label: post.title
      }] }),
      /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 14 }),
        " Назад в блог"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]", children: [
        /* @__PURE__ */ jsxs("article", { id: "blog-article", className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("header", { children: [
            post.category && /* @__PURE__ */ jsx(Link, { to: "/blog", search: (prev) => ({
              ...prev,
              category: post.category.slug,
              page: 1
            }), className: "inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/25", children: post.category.name }),
            /* @__PURE__ */ jsx("h1", { className: "mt-4 text-3xl font-extrabold leading-tight md:text-5xl", children: post.title }),
            post.excerpt && /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: post.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                post.author?.avatar_url ? /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: "", className: "h-9 w-9 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full gradient-bg text-sm font-bold text-primary-foreground", children: "M" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: authorName })
              ] }),
              post.published_at && /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Clock, { size: 14 }),
                " ",
                post.reading_minutes,
                " мин чтения"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Eye, { size: 14 }),
                " ",
                viewsLabel
              ] })
            ] })
          ] }),
          post.cover_url && /* @__PURE__ */ jsx(Reveal, { as: "img", y: 12, src: post.cover_url, alt: post.title, className: "mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-elevated" }),
          headings.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-8 lg:hidden", children: /* @__PURE__ */ jsxs(Sheet, { open: tocOpen, onOpenChange: setTocOpen, children: [
            /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { type: "button", className: "glass flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ListOrdered, { size: 16 }),
                " Содержание"
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { size: 16, className: "opacity-50" })
            ] }) }),
            /* @__PURE__ */ jsxs(SheetContent, { side: "bottom", className: "max-h-[80vh] overflow-y-auto", children: [
              /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: "Содержание" }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 pb-8", children: /* @__PURE__ */ jsx(BlogTOC, { headings, onNavigate: () => setTocOpen(false) }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(BlogContent, { html: post.content }) }),
          faqItems.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-12 border-t border-border pt-8", "aria-labelledby": "faq-heading", children: [
            /* @__PURE__ */ jsx("h2", { id: "faq-heading", className: "text-2xl font-bold md:text-3xl", children: "Часто задаваемые вопросы" }),
            /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-4", children: faqItems.map((item, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${i}`, children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-base font-semibold", children: item.question }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm leading-relaxed text-muted-foreground", children: /* @__PURE__ */ jsx(BlogContent, { html: item.answer }) })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass mt-12 rounded-2xl p-6 text-center md:p-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-foreground", children: "Не уверены в самостоятельной настройке?" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Найдите проверенного специалиста в нашем каталоге — 250+ экспертов с кейсами и отзывами." }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 gradient-bg shadow-glow", children: /* @__PURE__ */ jsx(Link, { to: "/specialists", children: "Найти специалиста" }) })
          ] }),
          post.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap gap-2 border-t border-border pt-6", children: post.tags.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/blog", search: (prev) => ({
            ...prev,
            tag: t.slug,
            page: 1
          }), className: "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground", children: [
            "#",
            t.name
          ] }, t.id)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 hidden border-t border-border pt-6 md:block", children: /* @__PURE__ */ jsx(BlogShareRow, { url: articleUrl, title: post.title }) })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24 space-y-6", children: [
          headings.length > 0 && /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-5", children: /* @__PURE__ */ jsx(BlogTOC, { headings }) }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              post.author?.avatar_url ? /* @__PURE__ */ jsx("img", { src: post.author.avatar_url, alt: "", className: "h-12 w-12 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full gradient-bg text-base font-bold text-primary-foreground", children: "M" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground", children: authorName }),
                authorBio && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: authorBio })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "mt-4 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/blog", children: "Все статьи автора" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl border-2 border-primary/30 p-5 shadow-glow", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-foreground", children: "Нужен специалист по рекламе в МАКС?" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: "Подберите эксперта из 250+ проверенных специалистов" }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-4 w-full gradient-bg", children: /* @__PURE__ */ jsx(Link, { to: "/specialists", children: "Найти специалиста" }) })
          ] }),
          post.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Теги" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: post.tags.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/blog", search: (prev) => ({
              ...prev,
              tag: t.slug,
              page: 1
            }), className: "rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground", children: [
              "#",
              t.name
            ] }, t.id)) })
          ] })
        ] }) })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-16", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold md:text-3xl", children: "Читайте также" }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-3", children: related.map((p) => /* @__PURE__ */ jsx("div", { className: "w-[85%] flex-shrink-0 snap-start md:w-auto", children: /* @__PURE__ */ jsx(BlogCard, { post: p, titleAs: "p" }) }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-16 left-0 right-0 z-30 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden", children: /* @__PURE__ */ jsx(BlogShareRow, { url: articleUrl, title: post.title }) })
  ] });
}
export {
  BlogPostPage as component
};
