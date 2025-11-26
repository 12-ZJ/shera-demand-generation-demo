import dayjs from "dayjs";

export function formatNumber(value: number | string, digit?: number, sign: string = ""): string {
  if (value === null || value === undefined || value === "") return "";

  const num = typeof value === "number" ? value : Number.parseFloat(value.toString().replace(/,/g, ""));
  if (Number.isNaN(num)) return "";

  return sign + num.toLocaleString("en-US", {
    useGrouping: true,
    minimumFractionDigits: digit ?? 0,
    maximumFractionDigits: digit ?? 20,
  });
}

export function formatDecimal(value: string | number, digit: number = 2): number {
  if (value === "" || value === null || value === undefined) return 0;

  const num = typeof value === "number" ? value : Number.parseFloat(value);
  if (Number.isNaN(num)) return 0;

  const factor = Math.pow(10, digit);
  return Math.round(num * factor) / factor;
}

export function formatTime(value: string | null, emptyValue: string = "") {
  return value ? dayjs(`${dayjs().format("YYYY-MM-DD")}T${value}`).tz("Asia/Bangkok").format("HH:mm") : emptyValue;
}

export function formatDate(value: Date | string | null, format: string = "DD/MM/YYYY", emptyValue: string = "") {
  return value ? dayjs(value).tz("Asia/Bangkok").format(format) : emptyValue;
}

export function formatDateTime(value: Date | string | null, emptyValue: string = "") {
  return value ? dayjs(value).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm:ss") : emptyValue;
}