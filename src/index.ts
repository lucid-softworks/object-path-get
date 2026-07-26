import { parseObjectPath } from "@lucid-softworks/object-path-parse";

export type ObjectPath = string | readonly PropertyKey[];

/** Read own properties along a path, returning a fallback when traversal fails. */
export function getPath<TFallback = undefined>(
  value: unknown,
  path: ObjectPath,
  fallback?: TFallback,
): unknown | TFallback {
  const segments = typeof path === "string" ? parseObjectPath(path) : path;
  let current = value;

  for (const segment of segments) {
    if (
      current === null ||
      (typeof current !== "object" && typeof current !== "function") ||
      !Object.hasOwn(current, segment)
    ) {
      return fallback as TFallback;
    }

    current = Reflect.get(current, segment);
  }

  return current;
}
