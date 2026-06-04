import { c as createStartHandler } from "./assets/vendor-@tanstack-start-server-core-CKDW8voY.js";
import { d as defaultStreamHandler } from "./assets/vendor-@tanstack-react-start-server-B9hs-JjY.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./assets/vendor-@tanstack-start-client-core-C41cjU9Y.js";
import "./assets/vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const SKIP_PREFIXES = ["/_", "/assets/", "/api/", "/@"];
function shouldSkip(pathname) {
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".")) return true;
  return false;
}
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "connect-src 'self' https: wss:",
  "media-src 'self' https: data: blob:",
  "frame-src 'self' https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'"
].join("; ");
const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "sync-xhr=()",
  "usb=()",
  "xr-spatial-tracking=()"
].join(", ");
function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  headers.set("Permissions-Policy", PERMISSIONS_POLICY);
  if (!headers.has("Content-Security-Policy")) {
    headers.set("Content-Security-Policy", CSP);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
const server = {
  async fetch(request, ...rest) {
    const url = new URL(request.url);
    if (!shouldSkip(url.pathname) && /[A-Z]/.test(url.pathname)) {
      const target = new URL(url.toString());
      target.pathname = url.pathname.toLowerCase();
      return withSecurityHeaders(Response.redirect(target.toString(), 301));
    }
    const fetchHandler = createStartHandler({ handler: defaultStreamHandler });
    const response = await fetchHandler(request, ...rest);
    return withSecurityHeaders(response);
  }
};
export {
  server as default
};
