function formatPrice(value) {
  if (value === null || value === void 0) return "—";
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    maximumFractionDigits: 0
  }).format(value);
}
function formatPriceRange(from, to) {
  if (from && to && from !== to) return `${formatPrice(from)} – ${formatPrice(to)} ₽`;
  if (from) return `от ${formatPrice(from)} ₽`;
  if (to) return `до ${formatPrice(to)} ₽`;
  return "Цена по запросу";
}
function formatDate(iso) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(iso));
}
function pluralize(n, forms) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
const specialistsWord = (n) => pluralize(n, ["специалист", "специалиста", "специалистов"]);
const reviewsWord = (n) => pluralize(n, ["отзыв", "отзыва", "отзывов"]);
const yearsWord = (n) => pluralize(n, ["год", "года", "лет"]);
export {
  formatPriceRange as a,
  formatDate as f,
  reviewsWord as r,
  specialistsWord as s,
  yearsWord as y
};
