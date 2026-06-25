import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { S as SITE_URL } from "./router-DUtz-x1q.js";
function Breadcrumbs({ items, className }) {
  const full = [{ label: "Главная", to: "/" }, ...items];
  const location = useLocation();
  const currentPath = location.pathname || "/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((it, i) => {
      const isLast = i === full.length - 1;
      const path = it.to ?? (isLast ? currentPath : void 0);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: it.label,
        ...path ? { item: `${SITE_URL}${path === "/" ? "/" : path}` } : {}
      };
    })
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
      }
    ),
    /* @__PURE__ */ jsx(
      "nav",
      {
        "aria-label": "Хлебные крошки",
        className: "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground " + (className ?? ""),
        children: full.map((it, i) => {
          const isLast = i === full.length - 1;
          return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            i > 0 && /* @__PURE__ */ jsx(ChevronRight, { size: 14, className: "opacity-50" }),
            isLast || !it.to ? /* @__PURE__ */ jsx("span", { className: "line-clamp-1 text-foreground", "aria-current": "page", children: it.label }) : /* @__PURE__ */ jsx(Link, { to: it.to, className: "hover:text-foreground", children: it.label })
          ] }, `${it.label}-${i}`);
        })
      }
    )
  ] });
}
export {
  Breadcrumbs as B
};
