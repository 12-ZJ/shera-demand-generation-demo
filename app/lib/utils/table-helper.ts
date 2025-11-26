export const paginateArray = <T,>(data: T[], pageIndex: number, pageSize: number): T[] => {
    const start = (pageIndex - 1) * pageSize;
    const end = Math.min(start + pageSize, data.length);
    return data.slice(start, end);
};

type SortType = "string" | "number" | "boolean" | "date";

export function sortBy<T>(
  data: T[],
  key: keyof T,
  type: SortType,
  asc: boolean
): T[] {
  return [...data].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    switch (type) {
      case "string": {
        const strA = String(valA ?? "");
        const strB = String(valB ?? "");
        return asc
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
      case "number": {
        const numA = Number(valA ?? 0);
        const numB = Number(valB ?? 0);
        return asc ? numA - numB : numB - numA;
      }
      case "boolean": {
        const boolA = Number(valA);
        const boolB = Number(valB);
        return asc ? boolA - boolB : boolB - boolA;
      }
      case "date": {
        const toTimestamp = (val: any) => {
          if (!val) return 0;
          const date = new Date(val);
          return isNaN(date.getTime()) ? 0 : date.getTime();
        };

        const dateA = toTimestamp(valA);
        const dateB = toTimestamp(valB);
        return asc ? dateA - dateB : dateB - dateA;
      }
      default:
        return 0;
    }
  });
}

export function sortByKeys<T>(
  data: T[],
  key1: keyof T,
  key2: keyof T,
  key3?: keyof T,
  asc: boolean = true
): T[] {
  return [...data].sort((a, b) => {
    const valA1 = a[key1];
    const valB1 = b[key1];

    let diff1 = 0;
    const isNumeric1A = !isNaN(Number(valA1));
    const isNumeric1B = !isNaN(Number(valB1));

    if (isNumeric1A && isNumeric1B) {
      diff1 = asc ? Number(valA1) - Number(valB1) : Number(valB1) - Number(valA1);
    } else {
      const strA1 = String(valA1 ?? "");
      const strB1 = String(valB1 ?? "");
      diff1 = asc
        ? strA1.localeCompare(strB1, undefined, { numeric: true })
        : strB1.localeCompare(strA1, undefined, { numeric: true });
    }

    if (diff1 !== 0) return diff1;

    const valA2 = String(a[key2] ?? "").toLowerCase();
    const valB2 = String(b[key2] ?? "").toLowerCase();
    const diff2 = valA2.localeCompare(valB2);
    if (diff2 !== 0 || !key3) return diff2;

    const valA3 = String(a[key3] ?? "").toLowerCase();
    const valB3 = String(b[key3] ?? "").toLowerCase();
    return valA3.localeCompare(valB3);
  });
}