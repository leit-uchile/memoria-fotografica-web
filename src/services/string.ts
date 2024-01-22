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

export const isoToDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
