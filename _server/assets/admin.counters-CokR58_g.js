import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { s as supabase, B as Button } from "./router-Ame665Aj.js";
import { I as Input } from "./input-BFaOzrPc.js";
import { L as Label } from "./label-rmn-EVog.js";
import { T as Textarea } from "./textarea-C9NHj5PG.js";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-@tanstack-start-server-core-Cpfbehp8.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "./vendor-@tanstack-start-client-core-Y-xTaqa_.js";
import "./vendor-@tanstack-start-storage-context-DgH9hIJT.js";
import "@tanstack/router-core/ssr/client";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/server";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-BVrO7XJx.js";
import "./client.server-DNj-FA3T.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-label";
const DEFAULT_ROBOTS_TXT = "User-agent: *\nDisallow: /\n\nSitemap: https://maxexperts.ru/sitemap.xml\n";
async function fetchSiteSettings() {
  const { data, error } = await supabase.from("site_settings").select("id, metrika_code, verification_files, robots_txt, custom_head_code").limit(1).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Настройки сайта не инициализированы");
  const row = data;
  return {
    id: row.id,
    metrika_code: row.metrika_code ?? "",
    verification_files: Array.isArray(row.verification_files) ? row.verification_files : [],
    robots_txt: row.robots_txt && row.robots_txt.length > 0 ? row.robots_txt : DEFAULT_ROBOTS_TXT,
    custom_head_code: row.custom_head_code ?? ""
  };
}
function AdminCountersTab() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "site-settings"],
    queryFn: fetchSiteSettings
  });
  const [metrika, setMetrika] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("");
  const [customHead, setCustomHead] = useState("");
  useEffect(() => {
    if (data) {
      setMetrika(data.metrika_code);
      setRobotsTxt(data.robots_txt);
      setCustomHead(data.custom_head_code);
    }
  }, [data]);
  const saveCustomHead = useMutation({
    mutationFn: async (content) => {
      if (!data) throw new Error("Нет данных");
      const { error } = await supabase.from("site_settings").update({ custom_head_code: content }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Пользовательский код сохранён");
      qc.invalidateQueries({ queryKey: ["admin", "site-settings"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const saveRobots = useMutation({
    mutationFn: async (content) => {
      if (!data) throw new Error("Нет данных");
      const { error } = await supabase.from("site_settings").update({ robots_txt: content }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("robots.txt сохранён");
      qc.invalidateQueries({ queryKey: ["admin", "site-settings"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const saveMetrika = useMutation({
    mutationFn: async (code) => {
      if (!data) throw new Error("Нет данных");
      const { error } = await supabase.from("site_settings").update({ metrika_code: code }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Код Я.Метрики сохранён");
      qc.invalidateQueries({ queryKey: ["admin", "site-settings"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const updateFiles = useMutation({
    mutationFn: async (files) => {
      if (!data) throw new Error("Нет данных");
      const { error } = await supabase.from("site_settings").update({ verification_files: files }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "site-settings"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const handleFileUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !data) return;
    const newFiles = [];
    for (const file of Array.from(fileList)) {
      if (!file.name.endsWith(".html")) {
        toast.error(`Файл ${file.name} не .html — пропущен`);
        continue;
      }
      const content = await file.text();
      newFiles.push({ filename: file.name, content });
    }
    if (newFiles.length === 0) return;
    const map = /* @__PURE__ */ new Map();
    for (const f of data.verification_files) map.set(f.filename, f);
    for (const f of newFiles) map.set(f.filename, f);
    await updateFiles.mutateAsync(Array.from(map.values()));
    toast.success(`Загружено файлов: ${newFiles.length}`);
    e.target.value = "";
  };
  const handleDeleteFile = async (filename) => {
    if (!data) return;
    if (!confirm(`Удалить файл ${filename}?`)) return;
    const next = data.verification_files.filter((f) => f.filename !== filename);
    await updateFiles.mutateAsync(next);
    toast.success("Файл удалён");
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 28 }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-surface/40 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Яндекс.Метрика" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Вставьте полный код счётчика (включая теги ",
        /* @__PURE__ */ jsx("code", { children: "<script>" }),
        " и",
        " ",
        /* @__PURE__ */ jsx("code", { children: "<noscript>" }),
        "). Он будет добавлен в ",
        /* @__PURE__ */ jsx("code", { children: "<head>" }),
        " на всех страницах сайта."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "metrika", children: "Код счётчика" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "metrika",
            value: metrika,
            onChange: (e) => setMetrika(e.target.value),
            rows: 12,
            className: "font-mono text-xs",
            placeholder: "<!-- Yandex.Metrika counter -->\n<script>...<\/script>\n<!-- /Yandex.Metrika counter -->"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => saveMetrika.mutate(metrika),
            disabled: saveMetrika.isPending || metrika === (data?.metrika_code ?? ""),
            children: saveMetrika.isPending ? "Сохранение..." : "Сохранить"
          }
        ),
        metrika !== (data?.metrika_code ?? "") && /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setMetrika(data?.metrika_code ?? ""), children: "Отменить" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-surface/40 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Пользовательский код в <head>" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Произвольный HTML, который будет вставлен в ",
        /* @__PURE__ */ jsx("code", { children: "<head>" }),
        " на всех страницах сайта (мета-теги верификации, сторонние счётчики, pixel-теги и т.п.). Поддерживаются ",
        /* @__PURE__ */ jsx("code", { children: "<meta>" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "<link>" }),
        ",",
        " ",
        /* @__PURE__ */ jsx("code", { children: "<script>" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "<style>" }),
        " и др. Вставляйте только код из доверенных источников — он выполняется на всех страницах."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "custom-head", children: "Код для <head>" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "custom-head",
            value: customHead,
            onChange: (e) => setCustomHead(e.target.value),
            rows: 12,
            className: "font-mono text-xs",
            placeholder: '<meta name="google-site-verification" content="..." />\n<script>/* ваш код */<\/script>'
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => saveCustomHead.mutate(customHead),
            disabled: saveCustomHead.isPending || customHead === (data?.custom_head_code ?? ""),
            children: saveCustomHead.isPending ? "Сохранение..." : "Сохранить"
          }
        ),
        customHead !== (data?.custom_head_code ?? "") && /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setCustomHead(data?.custom_head_code ?? ""), children: "Отменить" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-surface/40 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Файлы верификации поисковых систем" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Загрузите HTML-файлы подтверждения прав (Яндекс.Вебмастер, Google Search Console и др.). Они будут доступны по адресу ",
        /* @__PURE__ */ jsx("code", { children: "https://maxexperts.ru/<имя_файла>.html" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs(
          Label,
          {
            htmlFor: "verification-upload",
            className: "flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-4 py-6 text-sm hover:bg-secondary",
            children: [
              /* @__PURE__ */ jsx(Upload, { size: 18 }),
              "Выбрать .html файлы для загрузки"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "verification-upload",
            type: "file",
            accept: ".html,text/html",
            multiple: true,
            className: "hidden",
            onChange: handleFileUpload
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: data && data.verification_files.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border rounded-md border border-border", children: data.verification_files.map((f) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "flex items-center justify-between gap-3 px-4 py-3",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: `/${f.filename}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "block truncate font-medium text-primary hover:underline",
                  children: [
                    "/",
                    f.filename
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: f.content.slice(0, 120) })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => handleDeleteFile(f.filename),
                "aria-label": "Удалить",
                children: /* @__PURE__ */ jsx(Trash2, { size: 16, className: "text-destructive" })
              }
            )
          ]
        },
        f.filename
      )) }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Файлы пока не загружены." }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-surface/40 p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "robots.txt" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Содержимое файла ",
        /* @__PURE__ */ jsx("code", { children: "/robots.txt" }),
        ". Управляет правилами индексации сайта поисковыми роботами. Изменения применяются сразу после сохранения (кеш до 5 минут)."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "robots", children: "Содержимое robots.txt" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "robots",
            value: robotsTxt,
            onChange: (e) => setRobotsTxt(e.target.value),
            rows: 12,
            className: "font-mono text-xs",
            placeholder: DEFAULT_ROBOTS_TXT
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => saveRobots.mutate(robotsTxt),
            disabled: saveRobots.isPending || robotsTxt === (data?.robots_txt ?? ""),
            children: saveRobots.isPending ? "Сохранение..." : "Сохранить"
          }
        ),
        robotsTxt !== (data?.robots_txt ?? "") && /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setRobotsTxt(data?.robots_txt ?? ""), children: "Отменить" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setRobotsTxt(DEFAULT_ROBOTS_TXT),
            disabled: robotsTxt === DEFAULT_ROBOTS_TXT,
            children: "Сбросить по умолчанию"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/robots.txt",
            target: "_blank",
            rel: "noreferrer",
            className: "ml-auto self-center text-sm text-primary hover:underline",
            children: "Открыть /robots.txt"
          }
        )
      ] })
    ] })
  ] });
}
const SplitComponent = AdminCountersTab;
export {
  SplitComponent as component
};
