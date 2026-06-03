const THEME_COOKIE = "maxexperts-theme";
const THEME_LS_KEY = "maxexperts-theme";
function parseThemeFromCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]+)`));
  if (!match) return null;
  const v = decodeURIComponent(match[1]);
  return v === "light" || v === "dark" ? v : null;
}
function resolveClientTheme() {
  if (typeof document === "undefined") return "light";
  const fromCookie = parseThemeFromCookie(document.cookie);
  if (fromCookie) return fromCookie;
  try {
    const ls = localStorage.getItem(THEME_LS_KEY);
    if (ls === "light" || ls === "dark") return ls;
  } catch {
  }
  return "light";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_LS_KEY, theme);
    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  } catch {
  }
}
export {
  THEME_COOKIE as T,
  applyTheme as a,
  resolveClientTheme as r
};
