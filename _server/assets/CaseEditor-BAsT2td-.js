import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useQueryClient, useSuspenseQuery, useQuery, useMutation } from "@tanstack/react-query";
import { ImageIcon, Loader2, Upload, Trash2, Info, X, Save } from "lucide-react";
import { toast } from "sonner";
import { c as categoriesQuery, k as caseTagsQuery, a1 as caseCategoryIdsQuery, a2 as caseTagIdsQuery, a3 as caseMediaQuery, s as supabase, a4 as Dialog, a5 as DialogContent, a6 as DialogHeader, a7 as DialogTitle, a8 as DialogDescription, B as Button } from "./router-CNZS40VR.js";
import { I as Input } from "./input-BvOhrzGG.js";
import { L as Label } from "./label-BgIj_Nb2.js";
import { S as Switch } from "./switch-BY5RaydG.js";
import { d as deleteFromBucket, u as uploadToBucket, R as RichTextEditor } from "./RichTextEditor-68OCTfG-.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
function CaseEditor({
  open,
  onOpenChange,
  specialistId,
  userId,
  editing
}) {
  const queryClient = useQueryClient();
  const isEdit = !!editing;
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: allTags } = useSuspenseQuery(caseTagsQuery());
  const { data: existingCategoryIds } = useQuery(
    caseCategoryIdsQuery(editing?.id ?? null)
  );
  const { data: existingTagIds } = useQuery(caseTagIdsQuery(editing?.id ?? null));
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [workDone, setWorkDone] = useState("");
  const [results, setResults] = useState("");
  const [resultsAnnouncement, setResultsAnnouncement] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [niche, setNiche] = useState("");
  const [taskType, setTaskType] = useState("");
  const [coverUrl, setCoverUrl] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(/* @__PURE__ */ new Set());
  const [selectedTagIds, setSelectedTagIds] = useState(/* @__PURE__ */ new Set());
  const [newTagInput, setNewTagInput] = useState("");
  const coverRef = useRef(null);
  const galleryRef = useRef(null);
  useEffect(() => {
    if (open) {
      setTitle(editing?.title ?? "");
      setTaskDescription(editing?.task_description ?? "");
      setWorkDone(editing?.work_done ?? "");
      setResults(editing?.results ?? "");
      setResultsAnnouncement(
        editing?.results_announcement ?? ""
      );
      setConclusion(editing?.conclusion ?? "");
      setNiche(editing?.niche ?? "");
      setTaskType(editing?.task_type ?? "");
      setCoverUrl(editing?.cover_url ?? null);
      setIsPublished(editing?.is_published ?? false);
      setMetaTitle(editing?.meta_title ?? "");
      setMetaDescription(editing?.meta_description ?? "");
      if (!editing) {
        setSelectedCategoryIds(/* @__PURE__ */ new Set());
        setSelectedTagIds(/* @__PURE__ */ new Set());
      }
    }
  }, [open, editing]);
  useEffect(() => {
    if (existingCategoryIds) setSelectedCategoryIds(new Set(existingCategoryIds));
  }, [existingCategoryIds]);
  useEffect(() => {
    if (existingTagIds) setSelectedTagIds(new Set(existingTagIds));
  }, [existingTagIds]);
  const addNewTag = async () => {
    const name = newTagInput.trim();
    if (!name) return;
    const tagSlug = slugify(name);
    const existing = allTags.find((t) => t.slug === tagSlug);
    if (existing) {
      setSelectedTagIds((s) => new Set(s).add(existing.id));
      setNewTagInput("");
      return;
    }
    const { data, error } = await supabase.from("case_tags").insert({ name, slug: tagSlug }).select().single();
    if (error) {
      toast.error("Не удалось создать тег");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["case-tags"] });
    setSelectedTagIds((s) => new Set(s).add(data.id));
    setNewTagInput("");
  };
  const { data: media = [] } = useQuery(caseMediaQuery(editing?.id ?? null));
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!title.trim()) throw new Error("Введите название");
      const announcement = resultsAnnouncement.trim();
      if (!announcement) throw new Error("Заполните «Анонс результатов»");
      if (announcement.length > 100)
        throw new Error("«Анонс результатов» не должен превышать 100 символов");
      const slug = isEdit ? editing.slug : `${slugify(title)}-${Math.random().toString(36).slice(2, 6)}`;
      let caseId;
      if (isEdit) {
        const { error } = await supabase.from("cases").update({
          title,
          task_description: taskDescription || null,
          work_done: workDone || null,
          results: results || null,
          results_announcement: announcement,
          conclusion: conclusion || null,
          niche: niche || null,
          task_type: taskType || null,
          cover_url: coverUrl,
          is_published: isPublished,
          meta_title: metaTitle.trim() || null,
          meta_description: metaDescription.trim() || null
        }).eq("id", editing.id);
        if (error) throw error;
        caseId = editing.id;
      } else {
        if (!specialistId) throw new Error("Не указан специалист");
        const { data, error } = await supabase.from("cases").insert({
          specialist_id: specialistId,
          slug,
          title,
          task_description: taskDescription || null,
          work_done: workDone || null,
          results: results || null,
          results_announcement: announcement,
          conclusion: conclusion || null,
          niche: niche || null,
          task_type: taskType || null,
          cover_url: coverUrl,
          is_published: isPublished,
          meta_title: metaTitle.trim() || null,
          meta_description: metaDescription.trim() || null
        }).select("id").single();
        if (error) throw error;
        caseId = data.id;
      }
      await supabase.from("case_categories").delete().eq("case_id", caseId);
      if (selectedCategoryIds.size > 0) {
        const rows = Array.from(selectedCategoryIds).map((category_id) => ({
          case_id: caseId,
          category_id
        }));
        const { error } = await supabase.from("case_categories").insert(rows);
        if (error) throw error;
      }
      await supabase.from("case_tag_pivot").delete().eq("case_id", caseId);
      if (selectedTagIds.size > 0) {
        const rows = Array.from(selectedTagIds).map((tag_id) => ({
          case_id: caseId,
          tag_id
        }));
        const { error } = await supabase.from("case_tag_pivot").insert(rows);
        if (error) throw error;
      }
      return caseId;
    },
    onSuccess: () => {
      toast.success(isEdit ? "Кейс обновлён" : "Кейс создан");
      queryClient.invalidateQueries({ queryKey: ["my-cases"] });
      queryClient.invalidateQueries({ queryKey: ["my-specialist"] });
      queryClient.invalidateQueries({ queryKey: ["cases-list"] });
      queryClient.invalidateQueries({ queryKey: ["case-category-ids"] });
      queryClient.invalidateQueries({ queryKey: ["case-tag-ids"] });
      onOpenChange(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const handleCover = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл больше 5 МБ");
      return;
    }
    setCoverUploading(true);
    try {
      if (coverUrl) await deleteFromBucket("case-media", coverUrl).catch(() => {
      });
      const url = await uploadToBucket("case-media", userId, file, "cover-");
      setCoverUrl(url);
      if (isEdit) {
        await supabase.from("cases").update({ cover_url: url }).eq("id", editing.id);
        queryClient.invalidateQueries({ queryKey: ["my-cases"] });
      }
      toast.success("Обложка загружена");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCoverUploading(false);
      if (coverRef.current) coverRef.current.value = "";
    }
  };
  const handleGallery = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editing) return;
    setGalleryUploading(true);
    try {
      const baseOrder = media.length;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name}: больше 5 МБ`);
          continue;
        }
        const url = await uploadToBucket("case-media", userId, file, "gal-");
        const { error } = await supabase.from("case_media").insert({
          case_id: editing.id,
          url,
          type: "image",
          order_index: baseOrder + i
        });
        if (error) throw error;
      }
      queryClient.invalidateQueries({ queryKey: ["case-media", editing.id] });
      toast.success("Изображения загружены");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGalleryUploading(false);
      if (galleryRef.current) galleryRef.current.value = "";
    }
  };
  const deleteMediaItem = async (id, url) => {
    try {
      await supabase.from("case_media").delete().eq("id", id);
      await deleteFromBucket("case-media", url).catch(() => {
      });
      queryClient.invalidateQueries({ queryKey: ["case-media", editing?.id] });
    } catch (err) {
      toast.error(err.message);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: isEdit ? "Редактировать кейс" : "Новый кейс" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Расскажите, какую задачу решали и каких результатов достигли." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Обложка" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-32 w-48 shrink-0 overflow-hidden rounded-lg border border-border bg-surface", children: coverUrl ? /* @__PURE__ */ jsx("img", { src: coverUrl, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(ImageIcon, { size: 32 }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: coverRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleCover
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => coverRef.current?.click(),
                disabled: coverUploading,
                children: [
                  coverUploading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Upload, {}),
                  "Загрузить"
                ]
              }
            ),
            coverUrl && /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: async () => {
                  await deleteFromBucket("case-media", coverUrl).catch(() => {
                  });
                  setCoverUrl(null);
                  if (isEdit) {
                    await supabase.from("cases").update({ cover_url: null }).eq("id", editing.id);
                    queryClient.invalidateQueries({ queryKey: ["my-cases"] });
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(Trash2, {}),
                  " Удалить"
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "JPG, PNG до 5 МБ" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: "Название *", value: title, onChange: setTitle }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { children: "Анонс результатов *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: resultsAnnouncement,
            onChange: (e) => setResultsAnnouncement(e.target.value.slice(0, 100)),
            maxLength: 100,
            placeholder: "Например: рост заявок на 47% за 2 месяца"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: "Краткий итог в одну строку. Не отображается на странице кейса." }),
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: resultsAnnouncement.length >= 100 ? "text-destructive" : void 0,
              children: [
                resultsAnnouncement.length,
                "/100"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Field, { label: "Ниша", value: niche, onChange: setNiche, placeholder: "E-commerce" }),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "Тип задачи",
            value: taskType,
            onChange: setTaskType,
            placeholder: "Настройка рекламы"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3 text-sm", children: [
        /* @__PURE__ */ jsx(Info, { size: 18, className: "mt-0.5 shrink-0 text-accent" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
          "Добавляйте в блоки ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "скриншоты" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "графики динамики" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "таблицы" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "видео" }),
          " и",
          " ",
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "ссылки на материалы" }),
          " — это укрепляет доверие к результатам кейса."
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        RichField,
        {
          label: "Задача",
          value: taskDescription,
          onChange: setTaskDescription,
          userId,
          placeholder: "Опишите, какую задачу решали и в каких условиях..."
        }
      ),
      /* @__PURE__ */ jsx(
        RichField,
        {
          label: "Что сделано",
          value: workDone,
          onChange: setWorkDone,
          userId,
          placeholder: "Этапы работы, инструменты, гипотезы — добавляйте скриншоты процесса..."
        }
      ),
      /* @__PURE__ */ jsx(
        RichField,
        {
          label: "Результаты (с цифрами)",
          value: results,
          onChange: setResults,
          userId,
          placeholder: "Конкретные цифры, графики до/после, таблицы метрик..."
        }
      ),
      /* @__PURE__ */ jsx(
        RichField,
        {
          label: "Вывод / эффект",
          value: conclusion,
          onChange: setConclusion,
          userId,
          placeholder: "Какой эффект получил клиент, что вы поняли по итогам..."
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Категории" }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Выберите тип задачи и нишу — кейс попадёт в эти разделы каталога /cases." })
        ] }),
        /* @__PURE__ */ jsx(
          CategoryPicker,
          {
            title: "Тип задачи",
            items: categories.filter((c) => c.type === "task"),
            selected: selectedCategoryIds,
            onToggle: (id) => setSelectedCategoryIds((s) => {
              const next = new Set(s);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            })
          }
        ),
        /* @__PURE__ */ jsx(
          CategoryPicker,
          {
            title: "Ниша",
            items: categories.filter((c) => c.type === "niche"),
            selected: selectedCategoryIds,
            onToggle: (id) => setSelectedCategoryIds((s) => {
              const next = new Set(s);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-lg border border-border bg-surface/40 p-4", children: [
        /* @__PURE__ */ jsx(Label, { children: "Теги" }),
        allTags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: allTags.map((t) => {
          const active = selectedTagIds.has(t.id);
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedTagIds((s) => {
                  const next = new Set(s);
                  if (next.has(t.id)) next.delete(t.id);
                  else next.add(t.id);
                  return next;
                });
              },
              className: `rounded-full border px-2.5 py-0.5 text-xs transition-colors ${active ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground hover:text-foreground"}`,
              children: [
                "#",
                t.name
              ]
            },
            t.id
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Новый тег...",
              value: newTagInput,
              onChange: (e) => setNewTagInput(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void addNewTag();
                }
              }
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => void addNewTag(), children: "Добавить" })
        ] })
      ] }),
      isEdit && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            "Галерея (",
            media.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: galleryRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: handleGallery
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => galleryRef.current?.click(),
              disabled: galleryUploading,
              children: [
                galleryUploading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Upload, {}),
                "Добавить"
              ]
            }
          )
        ] }),
        media.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-4", children: media.map((m) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative aspect-square overflow-hidden rounded-md border border-border bg-surface",
            children: [
              /* @__PURE__ */ jsx("img", { src: m.url, alt: "", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => deleteMediaItem(m.id, m.url),
                  className: "absolute right-1 top-1 rounded-md bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100",
                  "aria-label": "Удалить",
                  children: /* @__PURE__ */ jsx(X, { size: 14 })
                }
              )
            ]
          },
          m.id
        )) }),
        media.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Загрузите изображения, чтобы показать процесс и результат." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border bg-surface/50 p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Опубликовать" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Кейс будет виден на вашем профиле." })
        ] }),
        /* @__PURE__ */ jsx(Switch, { checked: isPublished, onCheckedChange: setIsPublished })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), children: "Отмена" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "gradient-bg",
          onClick: () => saveMutation.mutate(),
          disabled: saveMutation.isPending,
          children: [
            saveMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, {}),
            "Сохранить"
          ]
        }
      )
    ] })
  ] }) });
}
function Field({
  label,
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(Label, { children: label }),
    /* @__PURE__ */ jsx(Input, { value, onChange: (e) => onChange(e.target.value), placeholder })
  ] });
}
function RichField({
  label,
  value,
  onChange,
  userId,
  placeholder
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(Label, { children: label }),
    /* @__PURE__ */ jsx(
      RichTextEditor,
      {
        value,
        onChange,
        userId,
        placeholder,
        bucket: "case-media",
        enableVideo: true
      }
    )
  ] });
}
function CategoryPicker({
  title,
  items,
  selected,
  onToggle
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: items.map((c) => {
      const active = selected.has(c.id);
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onToggle(c.id),
          className: `rounded-full border px-2.5 py-0.5 text-xs transition-colors ${active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`,
          children: c.name
        },
        c.id
      );
    }) })
  ] });
}
export {
  CaseEditor as C
};
