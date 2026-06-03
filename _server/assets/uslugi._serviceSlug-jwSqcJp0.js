import { jsxs, jsx } from "react/jsx-runtime";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[800px] px-4 py-24 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Услуга не найдена" }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Возможно, страница была перемещена. Посмотрите все услуги для бизнеса." }),
  /* @__PURE__ */ jsx("a", { href: "/max-dlya-biznesa", className: "mt-6 inline-flex items-center justify-center rounded-md gradient-bg px-5 py-2.5 text-sm font-medium text-primary-foreground", children: "Все услуги" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
