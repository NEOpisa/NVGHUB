import { describe, expect, it } from "vitest";
import { buildVHalf } from "./vGeometry";

describe("brand geometry", () => {
  it("keeps the sharp silhouette within the source bounds without bevel spikes", () => {
    const parts = buildVHalf();
    parts.body.computeBoundingBox();
    const box = parts.body.boundingBox!;
    expect(box.min.x).toBeCloseTo((278 - 640) / 130);
    expect(box.max.x).toBeCloseTo(0);
    expect(box.min.y).toBeCloseTo(-(830 - 568) / 130);
    expect(box.max.y).toBeCloseTo(-(306 - 568) / 130);
    for (const geometry of [parts.body, ...parts.facets]) {
      expect(Array.from(geometry.getAttribute("position").array).every(Number.isFinite)).toBe(true);
      geometry.dispose();
    }
  });
  it("places accent faces ahead of the body to prevent coplanar flicker", () => {
    const parts = buildVHalf();
    parts.body.computeBoundingBox();
    for (const facet of parts.facets) {
      facet.computeBoundingBox();
      expect(facet.boundingBox!.min.z).toBeGreaterThan(parts.body.boundingBox!.max.z);
      facet.dispose();
    }
    parts.body.dispose();
  });
});
