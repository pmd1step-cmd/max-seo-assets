import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-20 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Кейс не найден" }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Возможно, он был снят с публикации или ссылка устарела." }),
  /* @__PURE__ */ jsx(Link, { to: "/cases", className: "mt-6 inline-block text-primary hover:text-primary-glow", children: "← Вернуться ко всем кейсам" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
