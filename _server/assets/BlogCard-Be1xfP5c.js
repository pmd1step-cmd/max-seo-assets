import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Reveal } from "./reveal-CyJEuXUU.js";
import { Clock, Eye } from "lucide-react";
import { f as formatDate } from "./format-CdVWScmC.js";
const DEFAULT_AUTHOR_NAME = "Команда МАКС Experts";
function BlogCard({ post, titleAs = "h3" }) {
  const TitleTag = titleAs;
  const authorName = post.author?.name ?? DEFAULT_AUTHOR_NAME;
  const authorAvatar = post.author?.avatar_url ?? null;
  return /* @__PURE__ */ jsx(Reveal, { y: 12, className: "group glass overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-elevated", children: /* @__PURE__ */ jsxs(Link, { to: "/blog/$slug", params: { slug: post.slug }, className: "block", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-secondary", children: [
      post.cover_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: post.cover_url,
          alt: post.title,
          loading: "lazy",
          decoding: "async",
          width: 640,
          height: 360,
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center gradient-mesh text-4xl font-bold text-muted-foreground/30", children: post.title[0]?.toUpperCase() }),
      post.category && /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur", children: post.category.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsx(TitleTag, { className: "line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-primary", children: post.title }),
      post.excerpt && /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: post.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
          post.published_at && /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { size: 12 }),
            " ",
            post.reading_minutes,
            " мин"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Eye, { size: 12 }),
          " ",
          post.views_count
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 border-t border-border pt-3", children: [
        authorAvatar ? /* @__PURE__ */ jsx("img", { src: authorAvatar, alt: "", loading: "lazy", decoding: "async", width: 24, height: 24, className: "h-6 w-6 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold", children: authorName[0] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: authorName })
      ] })
    ] })
  ] }) });
}
export {
  BlogCard as B
};
