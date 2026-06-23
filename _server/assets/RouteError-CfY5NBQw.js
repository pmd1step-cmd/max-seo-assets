import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { WifiOff, RefreshCw } from "lucide-react";
import { B as Button } from "./router-v85oIjpY.js";
function RouteError({
  error,
  reset,
  title = "Не удалось загрузить данные",
  description = "Возможно, проблемы с интернет-соединением. Попробуйте ещё раз."
}) {
  const router = useRouter();
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(WifiOff, { className: "text-primary", size: 24, "aria-hidden": true }) }),
    /* @__PURE__ */ jsx("h2", { className: "mt-5 text-xl font-bold text-foreground", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: description }),
    false,
    /* @__PURE__ */ jsxs(
      Button,
      {
        onClick: () => {
          void router.invalidate();
          reset?.();
        },
        className: "mt-6",
        children: [
          /* @__PURE__ */ jsx(RefreshCw, {}),
          " Повторить"
        ]
      }
    )
  ] });
}
export {
  RouteError as R
};
