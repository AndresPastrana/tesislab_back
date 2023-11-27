export function filterNonNullKeys<T extends Record<string, any>>(
  obj: T
): Omit<T, keyof { [K in keyof T]: null | undefined }> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  ) as Omit<T, keyof { [K in keyof T]: null | undefined }>;
}
