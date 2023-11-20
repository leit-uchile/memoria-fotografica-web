export const removeAccents = (value?: string) => {
  return value?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
};

export function sanitizeText(text?: string) {
  return text
    ?.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.substring(0, n) + "..." : str;
}

export const getPrefix = (alias: string) => {
  return sanitizeText(alias)?.replace(/\s/g, "").slice(0, 3).toLowerCase();
};

export const dateToISO = (date: string) => {
  return date.split("/").reverse().join("-");
}
