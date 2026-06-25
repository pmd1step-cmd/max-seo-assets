import { jsxs, jsx } from "react/jsx-runtime";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useRef, useState, useEffect, useCallback } from "react";
import { Bold, Italic, Underline as Underline$1, Strikethrough, Code, Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, ListChecks, Quote, Code2, Minus, Palette, Highlighter, Subscript as Subscript$1, Superscript as Superscript$1, Link, Image, Table as Table$1, Video, RemoveFormatting, Eraser, Undo2, Redo2 } from "lucide-react";
import { s as supabase, B as Button, m as cn } from "./router-BmDCopUW.js";
import { s as slugify } from "./slugify-DPRENmKe.js";
import { toast } from "sonner";
import { Node, mergeAttributes } from "@tiptap/core";
async function uploadToBucket(bucket, userId, file, prefix = "", seoName) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const slug = seoName ? slugify(seoName) : "";
  const uniq = Math.random().toString(36).slice(2, 8);
  const base = slug ? `${slug}-${uniq}` : `${Date.now()}-${uniq}`;
  const filename = `${prefix}${base}.${ext}`;
  const path = `${userId}/${filename}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
async function deleteFromBucket(bucket, publicUrl) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = publicUrl.slice(idx + marker.length);
  await supabase.storage.from(bucket).remove([path]);
}
const Iframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  selectable: true,
  draggable: false,
  addOptions() {
    return {
      HTMLAttributes: {
        class: "rounded-xl my-4 w-full aspect-video",
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: "true",
        loading: "lazy"
      }
    };
  },
  addAttributes() {
    return {
      src: { default: null }
    };
  },
  parseHTML() {
    return [{ tag: "iframe" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands() {
    return {
      setIframe: (options) => ({ tr, dispatch }) => {
        const { selection } = tr;
        const node = this.type.create(options);
        if (dispatch) tr.replaceRangeWith(selection.from, selection.to, node);
        return true;
      }
    };
  }
});
function toEmbedUrl(raw) {
  const url = raw.trim();
  if (!url) return null;
  const ytShort = url.match(/youtu\.be\/([\w-]{6,})/i);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  const ytWatch = url.match(/youtube\.com\/watch\?[^#]*v=([\w-]{6,})/i);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  const ytShorts = url.match(/youtube\.com\/shorts\/([\w-]{6,})/i);
  if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}`;
  const ytEmbed = url.match(/youtube\.com\/embed\/([\w-]{6,})/i);
  if (ytEmbed) return `https://www.youtube.com/embed/${ytEmbed[1]}`;
  const rt = url.match(/rutube\.ru\/(?:video|play\/embed)\/([\w-]+)/i);
  if (rt) return `https://rutube.ru/play/embed/${rt[1]}`;
  if (/vk\.com\/video_ext\.php/i.test(url)) return url;
  const vk = url.match(/vk\.com\/video(-?\d+)_(\d+)/i);
  if (vk) return `https://vk.com/video_ext.php?oid=${vk[1]}&id=${vk[2]}&hd=2`;
  const vkVideo = url.match(/vkvideo\.ru\/video(-?\d+)_(\d+)/i);
  if (vkVideo) return `https://vk.com/video_ext.php?oid=${vkVideo[1]}&id=${vkVideo[2]}&hd=2`;
  return null;
}
function RichTextEditor({
  value,
  onChange,
  userId,
  placeholder,
  enableVideo = false,
  bucket = "blog-media"
}) {
  const fileInputRef = useRef(null);
  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlDraft, setHtmlDraft] = useState(value);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener nofollow", target: "_blank" }
      }),
      ImageExtension.configure({
        HTMLAttributes: { class: "rounded-xl my-4" },
        allowBase64: true
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Напишите статью..."
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true, HTMLAttributes: { class: "tiptap-table" } }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      Subscript,
      Superscript,
      Iframe
    ],
    content: value,
    onUpdate: ({ editor: editor2 }) => {
      const html = editor2.getHTML();
      onChange(html);
      setHtmlDraft(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[320px] px-4 py-4 focus:outline-none"
      }
    }
  });
  useEffect(() => {
    if (!editor) return;
    if (!htmlMode && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
      setHtmlDraft(value);
    }
  }, [value, editor, htmlMode]);
  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL ссылки", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  const onPickImage = () => fileInputRef.current?.click();
  const onImageSelected = async (file) => {
    if (!editor) return;
    try {
      const url = await uploadToBucket(bucket, userId, file, "inline-");
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (e) {
      toast.error("Не удалось загрузить изображение");
      console.error(e);
    }
  };
  const insertVideo = useCallback(() => {
    if (!editor) return;
    const raw = window.prompt("Ссылка на видео (YouTube, VK, Rutube)", "https://");
    if (!raw) return;
    const src = toEmbedUrl(raw);
    if (!src) {
      toast.error("Поддерживаются только YouTube, VK Видео и Rutube");
      return;
    }
    editor.chain().focus().setIframe({ src }).run();
  }, [editor]);
  const setColor = useCallback(() => {
    if (!editor) return;
    const current = editor.getAttributes("textStyle").color ?? "#ffffff";
    const color = window.prompt("Цвет текста (hex)", current);
    if (!color) return;
    editor.chain().focus().setColor(color).run();
  }, [editor]);
  const setHighlight = useCallback(() => {
    if (!editor) return;
    const color = window.prompt("Цвет маркера (hex)", "#fde68a");
    if (!color) return;
    editor.chain().focus().toggleHighlight({ color }).run();
  }, [editor]);
  const insertTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);
  const toggleHtmlMode = () => {
    if (!editor) return;
    if (htmlMode) {
      editor.commands.setContent(htmlDraft || "", true);
      onChange(htmlDraft);
    } else {
      setHtmlDraft(editor.getHTML());
    }
    setHtmlMode((v) => !v);
  };
  if (!editor) return null;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-surface/40", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 flex flex-wrap items-center gap-1 border-b border-border bg-surface/95 backdrop-blur p-2 rounded-t-xl", children: [
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), title: "Жирный", children: /* @__PURE__ */ jsx(Bold, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), title: "Курсив", children: /* @__PURE__ */ jsx(Italic, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline"), title: "Подчёркнутый", children: /* @__PURE__ */ jsx(Underline$1, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike"), title: "Зачёркнутый", children: /* @__PURE__ */ jsx(Strikethrough, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleCode().run(), active: editor.isActive("code"), title: "Инлайн-код", children: /* @__PURE__ */ jsx(Code, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), title: "H1", children: /* @__PURE__ */ jsx(Heading1, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), title: "H2", children: /* @__PURE__ */ jsx(Heading2, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), title: "H3", children: /* @__PURE__ */ jsx(Heading3, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().setTextAlign("left").run(), active: editor.isActive({ textAlign: "left" }), title: "По левому", children: /* @__PURE__ */ jsx(AlignLeft, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().setTextAlign("center").run(), active: editor.isActive({ textAlign: "center" }), title: "По центру", children: /* @__PURE__ */ jsx(AlignCenter, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().setTextAlign("right").run(), active: editor.isActive({ textAlign: "right" }), title: "По правому", children: /* @__PURE__ */ jsx(AlignRight, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().setTextAlign("justify").run(), active: editor.isActive({ textAlign: "justify" }), title: "По ширине", children: /* @__PURE__ */ jsx(AlignJustify, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), title: "Список", children: /* @__PURE__ */ jsx(List, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), title: "Нумерованный", children: /* @__PURE__ */ jsx(ListOrdered, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleTaskList().run(), active: editor.isActive("taskList"), title: "Чек-лист", children: /* @__PURE__ */ jsx(ListChecks, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), title: "Цитата", children: /* @__PURE__ */ jsx(Quote, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock"), title: "Блок кода", children: /* @__PURE__ */ jsx(Code2, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().setHorizontalRule().run(), title: "Разделитель", children: /* @__PURE__ */ jsx(Minus, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: setColor, title: "Цвет текста", children: /* @__PURE__ */ jsx(Palette, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: setHighlight, active: editor.isActive("highlight"), title: "Маркер", children: /* @__PURE__ */ jsx(Highlighter, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleSubscript().run(), active: editor.isActive("subscript"), title: "Нижний индекс", children: /* @__PURE__ */ jsx(Subscript$1, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().toggleSuperscript().run(), active: editor.isActive("superscript"), title: "Верхний индекс", children: /* @__PURE__ */ jsx(Superscript$1, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: setLink, active: editor.isActive("link"), title: "Ссылка", children: /* @__PURE__ */ jsx(Link, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: onPickImage, title: "Изображение", children: /* @__PURE__ */ jsx(Image, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: insertTable, title: "Таблица 3×3", children: /* @__PURE__ */ jsx(Table$1, { size: 16 }) }),
      enableVideo && /* @__PURE__ */ jsx(ToolBtn, { onClick: insertVideo, title: "Видео (YouTube/VK/Rutube)", children: /* @__PURE__ */ jsx(Video, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().unsetAllMarks().run(), title: "Снять форматирование", children: /* @__PURE__ */ jsx(RemoveFormatting, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().clearNodes().run(), title: "Очистить блоки", children: /* @__PURE__ */ jsx(Eraser, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo(), title: "Отменить", children: /* @__PURE__ */ jsx(Undo2, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolBtn, { onClick: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo(), title: "Повторить", children: /* @__PURE__ */ jsx(Redo2, { size: 16 }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: htmlMode ? "default" : "ghost",
          size: "sm",
          onClick: toggleHtmlMode,
          className: "h-8 px-2 text-xs font-mono",
          title: "Редактировать HTML",
          children: htmlMode ? "Визуально" : "HTML"
        }
      )
    ] }),
    htmlMode ? /* @__PURE__ */ jsx(
      "textarea",
      {
        value: htmlDraft,
        onChange: (e) => {
          setHtmlDraft(e.target.value);
          onChange(e.target.value);
        },
        spellCheck: false,
        className: "w-full min-h-[320px] px-4 py-4 bg-transparent font-mono text-sm focus:outline-none resize-y",
        placeholder: "<p>HTML-разметка...</p>"
      }
    ) : /* @__PURE__ */ jsx(EditorContent, { editor }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) void onImageSelected(f);
          e.target.value = "";
        }
      }
    )
  ] });
}
function ToolBtn({
  children,
  onClick,
  active,
  disabled,
  title
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "sm",
      onClick,
      disabled,
      title,
      className: cn("h-8 w-8 p-0", active && "bg-primary/15 text-primary"),
      children
    }
  );
}
function Divider() {
  return /* @__PURE__ */ jsx("span", { className: "mx-1 h-5 w-px bg-border" });
}
export {
  RichTextEditor as R,
  deleteFromBucket as d,
  uploadToBucket as u
};
