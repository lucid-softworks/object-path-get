import { describe, expect, it } from "vitest";

import { getPath } from "../src/index.js";

describe("getPath", () => {
  it("reads dot, bracket, and symbol paths", () => {
    const symbol = Symbol("value");
    const source = { items: [{ meta: { "build.id": 42, [symbol]: "ready" } }] };

    expect(getPath(source, 'items[0].meta["build.id"]')).toBe(42);
    expect(getPath(source, ["items", 0, "meta", symbol])).toBe("ready");
    expect(getPath(source, "")).toBe(source);
  });

  it("preserves an own undefined value instead of using the fallback", () => {
    expect(getPath({ value: undefined }, "value", "fallback")).toBeUndefined();
  });

  it("uses the fallback for missing, inherited, or untraversable values", () => {
    const source = Object.create({ inherited: 1 }) as { nested: null };
    source.nested = null;

    expect(getPath(source, "missing", "fallback")).toBe("fallback");
    expect(getPath(source, "inherited", "fallback")).toBe("fallback");
    expect(getPath(source, "nested.value", "fallback")).toBe("fallback");
  });

  it("can traverse callable own properties", () => {
    const callable = Object.assign(() => undefined, { metadata: { id: 1 } });
    expect(getPath(callable, "metadata.id")).toBe(1);
  });
});
