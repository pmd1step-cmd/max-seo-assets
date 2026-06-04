import { c as createStartHandler } from "./vendor-@tanstack-start-server-core-Di5y2R_q.js";
import { d as defaultStreamHandler } from "./vendor-@tanstack-react-start-server-B9hs-JjY.js";
import "react";
var fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
  return { async fetch(...args) {
    return await entry.fetch(...args);
  } };
}
var server_default = createServerEntry({ fetch });
const startInstance = void 0;
const start = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  startInstance
}, Symbol.toStringTag, { value: "Module" }));
export {
  start as a,
  server_default as s
};
