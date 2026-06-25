import { jsxs, jsx } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { R as Reveal } from "./reveal-DmyFqgA4.js";
import { Eye, Star, Inbox, FileText } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { U as mySpecialistQuery, aw as myDailyViewsQuery, X as myApplicationsQuery, W as myCasesQuery } from "./router-CuqCsxv6.js";
import "react";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-Cfs02Iui.js";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
import "sonner";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
function StatsTab({ userId }) {
  const { data: spec } = useSuspenseQuery(mySpecialistQuery(userId));
  const { data: daily } = useSuspenseQuery(myDailyViewsQuery(spec?.id ?? null));
  const { data: apps } = useSuspenseQuery(myApplicationsQuery(spec?.id ?? null));
  const { data: cases } = useSuspenseQuery(myCasesQuery(spec?.id ?? null));
  if (!spec) return null;
  const total30 = daily.reduce((acc, d) => acc + d.views, 0);
  const newApps = apps.filter((a) => a.status === "new").length;
  const chartData = daily.map((d) => ({
    day: format(new Date(d.day), "d MMM", { locale: ru }),
    views: d.views
  }));
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(Eye, {}),
          label: "Просмотров (30д)",
          value: total30.toLocaleString("ru-RU"),
          sub: `Всего: ${spec.views_count.toLocaleString("ru-RU")}`
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(Star, {}),
          label: "Рейтинг",
          value: spec.rating.toFixed(1),
          sub: `${spec.reviews_count} отзывов`
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(Inbox, {}),
          label: "Заявок всего",
          value: apps.length.toString(),
          sub: `${newApps} новых`
        }
      ),
      /* @__PURE__ */ jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsx(FileText, {}),
          label: "Кейсов",
          value: cases.length.toString(),
          sub: `${cases.filter((c) => c.is_published).length} опубликовано`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Просмотры профиля за 30 дней" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: chartData, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "viewsGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.62 0.21 280)", stopOpacity: 0.5 }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.62 0.21 280)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(1 0 0 / 0.06)" }),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            dataKey: "day",
            tick: { fill: "oklch(0.65 0.04 280)", fontSize: 11 },
            tickLine: false,
            axisLine: false,
            interval: Math.max(0, Math.floor(chartData.length / 8) - 1)
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            tick: { fill: "oklch(0.65 0.04 280)", fontSize: 11 },
            tickLine: false,
            axisLine: false,
            allowDecimals: false,
            width: 32
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            contentStyle: {
              background: "oklch(0.21 0.04 280)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              borderRadius: 8,
              fontSize: 12
            },
            labelStyle: { color: "oklch(0.97 0.01 280)" }
          }
        ),
        /* @__PURE__ */ jsx(
          Area,
          {
            type: "monotone",
            dataKey: "views",
            stroke: "oklch(0.62 0.21 280)",
            strokeWidth: 2,
            fill: "url(#viewsGrad)"
          }
        )
      ] }) }) }),
      total30 === 0 && /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-muted-foreground", children: "Опубликуйте профиль, чтобы начать получать просмотры." })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary", children: icon }),
      /* @__PURE__ */ jsx("span", { className: "text-xs", children: label })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 text-3xl font-extrabold", children: value }),
    sub && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
export {
  StatsTab
};
