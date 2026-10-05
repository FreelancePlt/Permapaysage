/** Normalize our editorial punctuation for display, without changing URLs, IDs or CMS documents. */
const EDITORIAL_FIELDS = new Set([
  "titre", "title", "resume", "description", "aPropos", "alt", "legende", "text", "texte",
  "question", "reponse", "nom", "auteur", "label", "valeur", "paragrapheLocal",
  "distanceDepuisVallet", "delaiIntervention",
]);

export function normalizeCmsEditorialContent<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeCmsEditorialContent(item)) as T;
  }
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      typeof item === "string" && EDITORIAL_FIELDS.has(key)
        ? item.replace(/\s*\u2014\s*/g, " : ")
        : normalizeCmsEditorialContent(item),
    ]),
  ) as T;
}
