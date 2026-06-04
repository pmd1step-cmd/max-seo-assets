import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { t as cn } from "./router-DdxpHFF0.js";
const Reveal = forwardRef(function Reveal2({ children, className, delay = 0, y = 16, as: Tag = "div", style, ...rest }, ref) {
  const Component = Tag;
  const cssVars = {
    ...style,
    ["--reveal-delay"]: `${delay}ms`,
    ["--reveal-y"]: `${y}px`
  };
  return /* @__PURE__ */ jsx(Component, { ref, className: cn("reveal", className), style: cssVars, ...rest, children });
});
export {
  Reveal as R
};
