import type { ReactNode } from "react";

import { BannerHero } from "../components/BannerHero";
import { DynamicCollection } from "../components/DynamicCollection";
import { FullScreenOverlay } from "../components/FullScreenOverlay";
import { ProductGrid2x2 } from "../components/ProductGrid2x2";
import { isKnownComponentType } from "../renderer/nodeGuards";
import type { KnownComponentType, RegistryComponentProps, SduiNode } from "../types/sdui";

type RegistryEntry = (props: RegistryComponentProps<SduiNode>) => ReactNode;

const componentRegistry: Readonly<Partial<Record<KnownComponentType, RegistryEntry>>> = {
  BANNER_HERO: BannerHero as RegistryEntry,
  PRODUCT_GRID_2X2: ProductGrid2x2 as RegistryEntry,
  DYNAMIC_COLLECTION: DynamicCollection as RegistryEntry,
  FULL_SCREEN_OVERLAY: FullScreenOverlay as RegistryEntry
};

export const resolveRegistryComponent = (type: string): RegistryEntry | null => {
  if (!isKnownComponentType(type)) {
    return null;
  }

  return componentRegistry[type] ?? null;
};
