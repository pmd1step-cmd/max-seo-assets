import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useQueryClient, useSuspenseQuery, useQuery, useMutation } from "@tanstack/react-query";
import { X, Loader2, Upload, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { o as blogCategoriesQuery, p as blogTagsQuery, a8 as postTagIdsQuery, a9 as adminSpecialistsQuery, s as supabase, a3 as Dialog, a4 as DialogContent, a5 as DialogHeader, a6 as DialogTitle, a7 as DialogDescription, B as Button } from "./router-jfBiQfL2.js";
import { I as Input } from "./input-DB5C-fnv.js";
import { T as Textarea } from "./textarea-C3zkWYLH.js";
import { L as Label } from "./label-B2YS-AsT.js";
import { S as Switch } from "./switch-BvINDfta.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BF1mCGdS.js";
import { d as deleteFromBucket, R as RichTextEditor, u as uploadToBucket } from "./RichTextEditor-CvKra5LW.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
const NONE = "__none__";
function calcReadingMinutes(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
function BlogPostEditor({ open, onOpenChange, specialistId, userId, editing, allowAuthorPick = false }) {
  const queryClient = useQueryClient();
  const isEdit = !!editing;
  const { data: categories } = useSuspenseQuery(blogCategoriesQuery());
  const { data: tags } = useSuspenseQuery(blogTagsQuery());
  const { data: existingTagIds } = useQuery(postTagIdsQuery(editing?.id ?? null));
  const { data: adminSpecialists } = useQuery({
    ...adminSpecialistsQuery(),
    enabled: allowAuthorPick && open && !isEdit
  });
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(NONE);
  const [coverUrl, setCoverUrl] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState(/* @__PURE__ */ new Set());
  const [newTagInput, setNewTagInput] = useState("");
  const [faq, setFaq] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [pickedAuthorId, setPickedAuthorId] = useState("");
  const fileRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    if (editing) {
      setTitle(editing.title);
      setSlug(editing.slug);
      setExcerpt(editing.excerpt ?? "");
      setContent(editing.content);
      setCategoryId(editing.category_id ?? NONE);
      setCoverUrl(editing.cover_url);
      setIsPublished(editing.is_published);
      setMetaTitle(editing.meta_title ?? "");
      setMetaDescription(editing.meta_description ?? "");
      const rawFaq = Array.isArray(editing.faq) ? editing.faq : [];
      setFaq(
        rawFaq.map((it) => ({
          question: typeof it?.question === "string" ? it.question : "",
          answer: typeof it?.answer === "string" ? it.answer : ""
        })).filter((it) => it.question || it.answer)
      );
    } else {
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCategoryId(NONE);
      setCoverUrl(null);
      setIsPublished(false);
      setMetaTitle("");
      setMetaDescription("");
      setSelectedTagIds(/* @__PURE__ */ new Set());
      setPickedAuthorId("");
      setFaq([]);
    }
  }, [open, editing]);
  useEffect(() => {
    if (existingTagIds) setSelectedTagIds(new Set(existingTagIds));
  }, [existingTagIds]);
  useEffect(() => {
    if (!isEdit && title) setSlug(slugify(title));
  }, [title, isEdit]);
  const handleCover = async (file) => {
    setUploading(true);
    try {
      if (coverUrl) await deleteFromBucket("blog-media", coverUrl).catch(() => {
      });
      const url = await uploadToBucket("blog-media", userId, file, "cover-", title || slug || "post");
      setCoverUrl(url);
    } catch (e) {
      toast.error("Не удалось загрузить обложку");
      console.error(e);
    } finally {
      setUploading(false);
    }
  };
  const addNewTag = async () => {
    const name = newTagInput.trim();
    if (!name) return;
    const tagSlug = slugify(name);
    const existing = tags.find((t) => t.slug === tagSlug);
    if (existing) {
      setSelectedTagIds((s) => new Set(s).add(existing.id));
      setNewTagInput("");
      return;
    }
    const { data, error } = await supabase.from("blog_tags").insert({ name, slug: tagSlug }).select().single();
    if (error) {
      toast.error("Не удалось создать тег");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
    setSelectedTagIds((s) => new Set(s).add(data.id));
    setNewTagInput("");
  };
  const saveMut = useMutation({
    mutationFn: async () => {
      if (!title.trim()) throw new Error("Введите заголовок");
      if (!slug.trim()) throw new Error("Введите slug");
      if (!content.trim() || content === "<p></p>") throw new Error("Напишите статью");
      const basePayload = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        cover_url: coverUrl,
        category_id: categoryId === NONE ? null : categoryId,
        is_published: isPublished,
        published_at: isPublished ? editing?.published_at ?? (/* @__PURE__ */ new Date()).toISOString() : null,
        reading_minutes: calcReadingMinutes(content),
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        // FAQ: оставляем только заполненные пары (и вопрос, и ответ должны быть непустыми).
        faq: faq.map((it) => ({ question: it.question.trim(), answer: it.answer.trim() })).filter((it) => it.question && it.answer)
      };
      const payload = specialistId ? { ...basePayload, author_specialist_id: specialistId } : basePayload;
      let postId;
      if (isEdit && editing) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
        if (error) throw error;
        postId = editing.id;
      } else {
        const authorId = specialistId ?? (allowAuthorPick ? pickedAuthorId : "");
        if (!authorId) throw new Error("Выберите автора статьи");
        const { data, error } = await supabase.from("blog_posts").insert({ ...basePayload, author_specialist_id: authorId }).select("id").single();
        if (error) throw error;
        postId = data.id;
      }
      await supabase.from("blog_post_tags").delete().eq("post_id", postId);
      if (selectedTagIds.size > 0) {
        const rows = Array.from(selectedTagIds).map((tag_id) => ({ post_id: postId, tag_id }));
        await supabase.from("blog_post_tags").insert(rows);
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? "Статья обновлена" : "Статья создана");
      queryClient.invalidateQueries({ queryKey: ["my-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      onOpenChange(false);
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: isEdit ? "Редактировать статью" : "Новая статья" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Статьи попадают на /blog после публикации." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-5 mt-4", children: [
      allowAuthorPick && !isEdit && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Автор статьи *" }),
        /* @__PURE__ */ jsxs(Select, { value: pickedAuthorId, onValueChange: setPickedAuthorId, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Выберите специалиста" }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: (adminSpecialists ?? []).map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id, children: s.name ?? s.email ?? s.id }, s.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Заголовок *" }),
        /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Как настроить таргет в МАКС..." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Краткое описание" }),
        /* @__PURE__ */ jsx(Textarea, { value: excerpt, onChange: (e) => setExcerpt(e.target.value), rows: 2, placeholder: "1–2 предложения для превью." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Категория" }),
          /* @__PURE__ */ jsxs(Select, { value: categoryId, onValueChange: setCategoryId, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Выберите категорию" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: NONE, children: "Без категории" }),
              categories.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.name }, c.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Обложка" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            coverUrl ? /* @__PURE__ */ jsxs("div", { className: "relative h-16 w-28 overflow-hidden rounded-md border border-border", children: [
              /* @__PURE__ */ jsx("img", { src: coverUrl, alt: "", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    void deleteFromBucket("blog-media", coverUrl).catch(() => {
                    });
                    setCoverUrl(null);
                  },
                  className: "absolute right-1 top-1 rounded-full bg-background/80 p-0.5",
                  children: /* @__PURE__ */ jsx(X, { size: 12 })
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => fileRef.current?.click(), disabled: uploading, children: [
              uploading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Upload, {}),
              "Загрузить"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleCover(f);
                  e.target.value = "";
                }
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Теги" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 flex flex-wrap gap-2", children: tags.map((t) => {
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
              className: `rounded-full border px-2.5 py-0.5 text-xs ${active ? "border-accent bg-accent/15 text-accent" : "border-border text-muted-foreground"}`,
              children: [
                "#",
                t.name
              ]
            },
            t.id
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
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
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Контент *" }),
        /* @__PURE__ */ jsx(RichTextEditor, { value: content, onChange: setContent, userId })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "FAQ под статьёй" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Вопрос → ответ. Пустые пары не сохраняются. Поддерживается микроразметка FAQPage." })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => setFaq((f) => [...f, { question: "", answer: "" }]),
              children: [
                /* @__PURE__ */ jsx(Plus, {}),
                " Добавить вопрос"
              ]
            }
          )
        ] }),
        faq.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Нет вопросов. Нажмите «Добавить вопрос», чтобы создать." }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faq.map((item, i) => /* @__PURE__ */ jsx("div", { className: "rounded-md border border-border bg-background/40 p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                value: item.question,
                maxLength: 300,
                placeholder: "Вопрос",
                onChange: (e) => setFaq((f) => f.map((it, idx) => idx === i ? { ...it, question: e.target.value } : it))
              }
            ),
            /* @__PURE__ */ jsx(
              RichTextEditor,
              {
                value: item.answer,
                onChange: (html) => setFaq((f) => f.map((it, idx) => idx === i ? { ...it, answer: html } : it)),
                userId,
                placeholder: "Ответ"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => setFaq((f) => f.filter((_, idx) => idx !== i)),
              title: "Удалить вопрос",
              children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] }) }, i)) })
      ] }),
      allowAuthorPick && /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-border bg-surface/40 p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Meta Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: metaTitle,
              onChange: (e) => setMetaTitle(e.target.value),
              placeholder: "Если пусто — используется заголовок статьи",
              maxLength: 255
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Рекомендуется до 60 символов." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Meta Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: metaDescription,
              onChange: (e) => setMetaDescription(e.target.value),
              rows: 2,
              placeholder: "Если пусто — используется краткое описание (excerpt)",
              maxLength: 500
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Рекомендуется до 160 символов." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border bg-surface/40 p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Опубликовать" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Статья появится в /blog" })
        ] }),
        /* @__PURE__ */ jsx(Switch, { checked: isPublished, onCheckedChange: setIsPublished })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 border-t border-border pt-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Отмена" }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => saveMut.mutate(), disabled: saveMut.isPending, children: [
          saveMut.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, {}),
          "Сохранить"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  BlogPostEditor as B
};
