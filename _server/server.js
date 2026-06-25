import { c as createStartHandler, d as defaultStreamHandler } from "./assets/vendor-tanstack-DybHzttP.js";
import "react/jsx-runtime";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "react";
import "@tanstack/react-router";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
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
    const isHead = request.method === "HEAD";
    const effectiveRequest = isHead ? new Request(request.url, {
      method: "GET",
      headers: request.headers,
      redirect: request.redirect
      // body/credentials у HEAD нет — пересоздаём минимально.
    }) : request;
    const response = await fetchHandler(effectiveRequest, ...rest);
    const secured = withSecurityHeaders(response);
    if (isHead) {
      try {
        await secured.clone().arrayBuffer();
      } catch {
      }
      return new Response(null, {
        status: secured.status,
        statusText: secured.statusText,
        headers: secured.headers
      });
    }
    return secured;
  }
};
export {
  server as default
};
