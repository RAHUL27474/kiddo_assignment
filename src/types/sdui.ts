import type { ReactNode } from "react";
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";

import type { SduiAction } from "./actions";
import type { Product, ProductCollection } from "./product";
import type { ThemePayload } from "./theme";

export type KnownComponentType =
  | "BANNER_HERO"
  | "PRODUCT_GRID_2X2"
  | "DYNAMIC_COLLECTION"
  | "FULL_SCREEN_OVERLAY";

export interface BaseSduiNode<TType extends string = string, TProps = unknown> {
  id: string;
  type: TType;
  props?: TProps;
  children?: SduiNode[];
}

export interface BannerHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  action?: SduiAction;
}

export interface ProductGrid2x2Props {
  title: string;
  products: [Product, Product, Product, Product] | Product[];
}

export interface DynamicCollectionProps extends ProductCollection {
  itemWidth?: number;
}

export type OverlayAnimation =
  | {
      kind: "local";
      key: "paper-airplane" | "water-splash" | "confetti";
    }
  | {
      kind: "remote";
      uri: string;
    };

export interface FullScreenOverlayProps {
  animation: OverlayAnimation;
  opacity?: number;
  speed?: number;
}

export type BannerHeroNode = BaseSduiNode<"BANNER_HERO", BannerHeroProps>;
export type ProductGrid2x2Node = BaseSduiNode<"PRODUCT_GRID_2X2", ProductGrid2x2Props>;
export type DynamicCollectionNode = BaseSduiNode<"DYNAMIC_COLLECTION", DynamicCollectionProps>;
export type FullScreenOverlayNode = BaseSduiNode<"FULL_SCREEN_OVERLAY", FullScreenOverlayProps>;

export type KnownSduiNode =
  | BannerHeroNode
  | ProductGrid2x2Node
  | DynamicCollectionNode
  | FullScreenOverlayNode;

export type SduiNode = KnownSduiNode | BaseSduiNode<string, unknown>;

export interface SduiScreenPayload {
  id: string;
  theme: ThemePayload;
  nodes: SduiNode[];
  campaignId?: string;
  metadata?: Record<string, unknown>;
}

export interface RenderNodeOptions {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}

export interface RegistryComponentProps<TNode extends SduiNode = KnownSduiNode> {
  node: TNode;
  renderNode: (node: unknown, options?: RenderNodeOptions) => ReactNode;
  renderChildren: (children: unknown) => ReactNode;
}

export type RegistryComponent<TNode extends SduiNode = KnownSduiNode> = (
  props: RegistryComponentProps<TNode>
) => ReactNode;
