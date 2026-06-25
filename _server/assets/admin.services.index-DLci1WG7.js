import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { R as Reveal } from "./reveal-DgmX_e-h.js";
import { useQueryClient, useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ChevronRight, Check, Circle, Plus, Search, GripVertical, Pencil, Copy, ExternalLink, Trash2 } from "lucide-react";
import { useSensors, useSensor, PointerSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { t as cn, aq as adminServicesQuery, B as Button } from "./router-CyH3Aow0.js";
import { r as reorderServices, d as duplicateService, c as changeStatus, a as deleteService } from "./serviceMutations-DCWF8b9C.js";
import { I as Input } from "./input-Ce-z85pn.js";
import { C as Checkbox } from "./checkbox-CenndVtP.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-hCw8p8xk.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DvSFi_Iu.js";
import { L as Label } from "./label-DuvBccng.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "./theme-D1_WM6m3.js";
import "./vendor-tanstack-BWAKEtDn.js";
import "seroval";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/react-router/ssr/server";
import "zod";
import "@radix-ui/react-dialog";
import "./sitemap.server-D1SW1H7j.js";
import "./client.server-DEjuL_WB.js";
import "@tanstack/zod-adapter";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-select";
import "@radix-ui/react-alert-dialog";
import "@radix-ui/react-label";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const STATUS_LABEL = {
  draft: "Черновик",
  published: "Опубликовано",
  archived: "Архив"
};
const STATUS_CLASSES = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-primary/15 text-primary",
  archived: "bg-destructive/15 text-destructive"
};
function AdminServicesTab() {
  const qc = useQueryClient();
  const { data: services } = useSuspenseQuery(adminServicesQuery());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(/* @__PURE__ */ new Set());
  const [toDelete, setToDelete] = useState(null);
  const [orderedIds, setOrderedIds] = useState(null);
  const list = useMemo(() => {
    let arr = services;
    if (statusFilter !== "all") arr = arr.filter((s) => s.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (s) => s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
      );
    }
    if (orderedIds && statusFilter === "all" && !search.trim()) {
      const map = new Map(arr.map((s) => [s.id, s]));
      return orderedIds.map((id) => map.get(id)).filter((x) => !!x);
    }
    return arr;
  }, [services, search, statusFilter, orderedIds]);
  const reorderMut = useMutation({
    mutationFn: reorderServices,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "services"] }),
    onError: (e) => {
      toast.error(e.message);
      setOrderedIds(null);
    }
  });
  const duplicateMut = useMutation({
    mutationFn: duplicateService,
    onSuccess: () => {
      toast.success("Услуга продублирована");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const statusMut = useMutation({
    mutationFn: ({ ids, status }) => changeStatus(ids, status),
    onSuccess: (_d, vars) => {
      toast.success(`Изменено: ${vars.ids.length}`);
      setSelected(/* @__PURE__ */ new Set());
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const deleteMut = useMutation({
    mutationFn: ({
      id,
      mode,
      target
    }) => deleteService(id, mode, target),
    onSuccess: () => {
      toast.success("Готово");
      setToDelete(null);
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      qc.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (e) => toast.error(e.message)
  });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const ids = list.map((s) => s.id);
    const oldIdx = ids.indexOf(String(active.id));
    const newIdx = ids.indexOf(String(over.id));
    const next = arrayMove(ids, oldIdx, newIdx);
    setOrderedIds(next);
    reorderMut.mutate(next);
  };
  const toggleAll = () => {
    if (selected.size === list.length) setSelected(/* @__PURE__ */ new Set());
    else setSelected(new Set(list.map((s) => s.id)));
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const dndEnabled = statusFilter === "all" && !search.trim();
  return /* @__PURE__ */ jsxs(Reveal, { y: 8, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Услуги" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Всего: ",
          services.length
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "gradient-bg", children: /* @__PURE__ */ jsxs(Link, { to: "/admin/services/new", children: [
        /* @__PURE__ */ jsx(Plus, {}),
        " Добавить услугу"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[220px] max-w-sm", children: [
        /* @__PURE__ */ jsx(Search, { size: 15, className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Поиск по названию или slug",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: (v) => setStatusFilter(v), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Все статусы" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "published", children: "Опубликовано" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "draft", children: "Черновик" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "archived", children: "Архив" })
        ] })
      ] }),
      selected.size > 0 && /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
          "Действия (",
          selected.size,
          ")"
        ] }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
          /* @__PURE__ */ jsx(
            DropdownMenuItem,
            {
              onClick: () => statusMut.mutate({ ids: Array.from(selected), status: "published" }),
              children: "Опубликовать"
            }
          ),
          /* @__PURE__ */ jsx(
            DropdownMenuItem,
            {
              onClick: () => statusMut.mutate({ ids: Array.from(selected), status: "draft" }),
              children: "Снять с публикации"
            }
          ),
          /* @__PURE__ */ jsx(
            DropdownMenuItem,
            {
              onClick: () => statusMut.mutate({ ids: Array.from(selected), status: "archived" }),
              children: "В архив"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-surface/40", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[40px_24px_1fr_1.2fr_120px_60px_140px_120px] items-center gap-3 border-b border-border bg-muted/30 px-4 py-3 text-xs font-semibold uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsx("div", {}),
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: selected.size > 0 && selected.size === list.length,
            onCheckedChange: toggleAll
          }
        ),
        /* @__PURE__ */ jsx("div", { children: "Название" }),
        /* @__PURE__ */ jsx("div", { children: "URL" }),
        /* @__PURE__ */ jsx("div", { children: "Статус" }),
        /* @__PURE__ */ jsx("div", { children: "Порядок" }),
        /* @__PURE__ */ jsx("div", { children: "Изменено" }),
        /* @__PURE__ */ jsx("div", { className: "text-right", children: "Действия" })
      ] }),
      /* @__PURE__ */ jsx(
        DndContext,
        {
          sensors,
          collisionDetection: closestCenter,
          onDragEnd: dndEnabled ? handleDragEnd : void 0,
          children: /* @__PURE__ */ jsx(SortableContext, { items: list.map((s) => s.id), strategy: verticalListSortingStrategy, children: list.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-12 text-center text-sm text-muted-foreground", children: "Услуг нет" }) : list.map((s) => /* @__PURE__ */ jsx(
            ServiceRow,
            {
              service: s,
              selected: selected.has(s.id),
              onToggle: () => toggleOne(s.id),
              onDuplicate: () => duplicateMut.mutate(s.id),
              onDelete: () => setToDelete(s),
              dndEnabled
            },
            s.id
          )) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      DeleteServiceDialog,
      {
        service: toDelete,
        services,
        onClose: () => setToDelete(null),
        onConfirm: (mode, target) => toDelete && deleteMut.mutate({ id: toDelete.id, mode, target }),
        isPending: deleteMut.isPending
      }
    )
  ] });
}
function ServiceRow({
  service,
  selected,
  onToggle,
  onDuplicate,
  onDelete,
  dndEnabled
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: service.id,
    disabled: !dndEnabled
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: "grid grid-cols-[40px_24px_1fr_1.2fr_120px_60px_140px_120px] items-center gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-muted/20",
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            ...attributes,
            ...listeners,
            type: "button",
            disabled: !dndEnabled,
            title: dndEnabled ? "Перетащить" : "Сортировка доступна без фильтров",
            className: "flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30",
            children: /* @__PURE__ */ jsx(GripVertical, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsx(Checkbox, { checked: selected, onCheckedChange: onToggle }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "truncate font-medium", children: service.name || "(без названия)" }),
          service.short_description && /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-muted-foreground", children: service.short_description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "truncate font-mono text-xs text-muted-foreground", children: [
          "/uslugi/",
          service.slug
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[service.status]}`,
            children: STATUS_LABEL[service.status]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: service.sort_order }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: service.updated_at ? new Date(service.updated_at).toLocaleDateString("ru-RU") : "—" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "icon", title: "Редактировать", children: /* @__PURE__ */ jsx(Link, { to: "/admin/services/$serviceId", params: { serviceId: service.id }, children: /* @__PURE__ */ jsx(Pencil, { size: 15 }) }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: onDuplicate,
              title: "Дублировать",
              children: /* @__PURE__ */ jsx(Copy, { size: 15 })
            }
          ),
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "icon", title: "Просмотр на сайте", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: `/uslugi/${service.slug}`,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx(ExternalLink, { size: 15 })
            }
          ) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: onDelete,
              title: "Удалить",
              className: "text-destructive hover:text-destructive",
              children: /* @__PURE__ */ jsx(Trash2, { size: 15 })
            }
          )
        ] })
      ]
    }
  );
}
function DeleteServiceDialog({
  service,
  services,
  onClose,
  onConfirm,
  isPending
}) {
  const [mode, setMode] = useState("archive");
  const [target, setTarget] = useState("/max-dlya-biznesa");
  const [confirm2, setConfirm2] = useState(false);
  if (!service) return null;
  return /* @__PURE__ */ jsx(AlertDialog, { open: !!service, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxs(AlertDialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
        "Удалить услугу «",
        service.name,
        "»?"
      ] }),
      /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Выберите способ удаления." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 py-2", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/30", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            checked: mode === "archive",
            onChange: () => setMode("archive"),
            className: "mt-1"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Перенос в архив" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Страница недоступна на сайте, данные сохранены, можно восстановить." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/30", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            checked: mode === "redirect",
            onChange: () => setMode("redirect"),
            className: "mt-1"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Удалить с 301-редиректом" }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "/uslugi/",
            service.slug,
            " → выбранный адрес. Защищает SEO."
          ] }),
          mode === "redirect" && /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-1.5", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Перенаправить на:" }),
            /* @__PURE__ */ jsxs(Select, { value: target, onValueChange: setTarget, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "/max-dlya-biznesa", children: "Хаб /max-dlya-biznesa" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "/specialists", children: "Каталог специалистов" }),
                services.filter((s) => s.id !== service.id && s.status === "published").map((s) => /* @__PURE__ */ jsxs(SelectItem, { value: `/uslugi/${s.slug}`, children: [
                  "/uslugi/",
                  s.slug
                ] }, s.id))
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3 rounded-lg border border-destructive/30 p-3 hover:bg-destructive/5", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            checked: mode === "hard",
            onChange: () => setMode("hard"),
            className: "mt-1"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-destructive", children: "Полное удаление" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Необратимо. Появится 404, входящие SEO-ссылки сломаются." }),
          mode === "hard" && /* @__PURE__ */ jsxs("label", { className: "mt-2 flex items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: confirm2,
                onCheckedChange: (v) => setConfirm2(!!v)
              }
            ),
            "Я понимаю последствия"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsx(AlertDialogCancel, { onClick: onClose, children: "Отмена" }),
      /* @__PURE__ */ jsx(
        AlertDialogAction,
        {
          onClick: () => onConfirm(mode, mode === "redirect" ? target : void 0),
          disabled: isPending || mode === "hard" && !confirm2,
          className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          children: isPending ? "..." : "Подтвердить"
        }
      )
    ] })
  ] }) });
}
const SplitComponent = AdminServicesTab;
export {
  SplitComponent as component
};
