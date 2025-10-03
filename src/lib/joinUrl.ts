
/**
 * Joins base URL + relative path.
 * If the path is already absolute (http/https), returns it as is.
 */
export const joinUrl = (base: string, path?: string | null): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${base}${path}`;
};
