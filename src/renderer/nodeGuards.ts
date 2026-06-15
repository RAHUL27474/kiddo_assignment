import type { KnownComponentType, SduiNode } from "../types/sdui";

const KNOWN_COMPONENT_TYPES = new Set<string>([
  "BANNER_HERO",
  "PRODUCT_GRID_2X2",
  "DYNAMIC_COLLECTION",
  "FULL_SCREEN_OVERLAY"
]);

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isSduiNode = (value: unknown): value is SduiNode =>
  isRecord(value) && typeof value.id === "string" && typeof value.type === "string";

export const isKnownComponentType = (type: string): type is KnownComponentType =>
  KNOWN_COMPONENT_TYPES.has(type);

export const isOverlayNode = (node: SduiNode): boolean => node.type === "FULL_SCREEN_OVERLAY";

export const getNodeKey = (node: SduiNode, index: number): string =>
  `${node.type}:${node.id || index}`;

export const toNodeArray = (value: unknown): SduiNode[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isSduiNode);
};
