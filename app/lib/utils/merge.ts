export function mergeWithFallback<T>(base: Partial<T> | null | undefined, fallback: T): T {
  const result = {} as T;
  for (const key in fallback) {
    const baseValue = base?.[key as keyof T];
    result[key as keyof T] = baseValue ?? fallback[key];
  }
  return result;
}