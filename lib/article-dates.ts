import type { Article } from "@/lib/sanity/types";

function isValidArticleDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value)) return false;
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  const calendar = new Date(Date.UTC(year, month - 1, day));
  return calendar.getUTCFullYear() === year && calendar.getUTCMonth() === month - 1 &&
    calendar.getUTCDate() === day && Number.isFinite(Date.parse(value));
}

/** Use the first real date: editorial update, document timestamp, then publication. */
export function getArticleModifiedTime(article: Pick<Article, "dateModification" | "_updatedAt" | "datePublication">): string | undefined {
  return [article.dateModification, article._updatedAt, article.datePublication].find(isValidArticleDate);
}

export function formatArticleDate(date: string): string {
  if (!isValidArticleDate(date)) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris",
  });
}
