import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
function AdminErrorComponent({
  error,
  reset
}) {
  const router = useRouter();
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-20 text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Ошибка" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsx("button", { onClick: () => {
      router.invalidate();
      reset();
    }, className: "mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", children: "Повторить" })
  ] });
}
export {
  AdminErrorComponent as errorComponent
};
