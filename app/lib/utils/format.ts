export const formatCurrency = (amount: number, options?: { locale?: string; currencySymbol?: string }) => {
  const locale = options?.locale || "th-TH";
  const currencySymbol = options?.currencySymbol ?? "฿";

  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)} ${currencySymbol}`;
};

export function formatDate(
  value: Date | string | null,
  format: string = "DD/MM/YYYY",
  emptyValue: string = ""
) {
  if (!value) return emptyValue;

  const date = new Date(value);
  if (isNaN(date.getTime())) return emptyValue;

  const day = date.toLocaleString("en-GB", { day: "2-digit", timeZone: "Asia/Bangkok" });
  const month = date.toLocaleString("en-GB", { month: "2-digit", timeZone: "Asia/Bangkok" });
  const year = date.toLocaleString("en-GB", { year: "numeric", timeZone: "Asia/Bangkok" });

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year)
}

export function formatDateTime(value: Date | string | null, emptyValue: string = "") {
  if (!value) return emptyValue;

  const date = new Date(value);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

export const truncateText = (text: string | undefined, maxLength: number = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};