import {
  backToSchoolProducts,
  mysteryGiftProducts,
  summerPlayhouseProducts
} from "../data/products";
import type {
  DynamicCollectionNode,
  FullScreenOverlayNode,
  FullScreenOverlayProps,
  SduiScreenPayload
} from "../types/sdui";
import type { ThemePayload } from "../types/theme";

export type CampaignId = "BACK_TO_SCHOOL" | "SUMMER_PLAYHOUSE" | "MYSTERY_GIFT_CARNIVAL";

interface CampaignConfig {
  id: CampaignId;
  name: string;
  theme: ThemePayload;
  extraCollection: DynamicCollectionNode;
  overlay: FullScreenOverlayNode;
}

export const DEFAULT_CAMPAIGN_ID: CampaignId = "BACK_TO_SCHOOL";

const campaignOverlay = (
  id: string,
  key: Extract<FullScreenOverlayProps["animation"], { kind: "local" }>
): FullScreenOverlayNode => ({
  id,
  type: "FULL_SCREEN_OVERLAY",
  props: {
    animation: key,
    opacity: 0.72,
    speed: 1
  }
});

export const campaignConfigs: Record<CampaignId, CampaignConfig> = {
  BACK_TO_SCHOOL: {
    id: "BACK_TO_SCHOOL",
    name: "Back To School",
    theme: {
      primary: "#F6C945",
      background: "#FFF8D9",
      surface: "#FFFFFF",
      text: "#263238",
      mutedText: "#667085",
      border: "#ECD990",
      accent: "#2563EB"
    },
    extraCollection: {
      id: "campaign-extra-lunchboxes-bags",
      type: "DYNAMIC_COLLECTION",
      props: {
        id: "lunchboxes-bags",
        title: "Lunchboxes & Bags",
        subtitle: "Backpack-ready picks for the first bell",
        products: backToSchoolProducts,
        itemWidth: 158
      }
    },
    overlay: campaignOverlay("campaign-overlay-paper-airplane", {
      kind: "local",
      key: "paper-airplane"
    })
  },
  SUMMER_PLAYHOUSE: {
    id: "SUMMER_PLAYHOUSE",
    name: "Summer Playhouse",
    theme: {
      primary: "#1EA7D7",
      background: "#E9F8FF",
      surface: "#FFFFFF",
      text: "#11384A",
      mutedText: "#5F7480",
      border: "#B9E4F5",
      accent: "#FFB84D"
    },
    extraCollection: {
      id: "campaign-extra-beach-toys",
      type: "DYNAMIC_COLLECTION",
      props: {
        id: "beach-toys",
        title: "Beach Toys",
        subtitle: "Buckets, floaters, and outdoor play",
        products: summerPlayhouseProducts,
        itemWidth: 158
      }
    },
    overlay: campaignOverlay("campaign-overlay-water-splash", {
      kind: "local",
      key: "water-splash"
    })
  },
  MYSTERY_GIFT_CARNIVAL: {
    id: "MYSTERY_GIFT_CARNIVAL",
    name: "Mystery Gift Carnival",
    theme: {
      primary: "#D92D20",
      background: "#FFF1F0",
      surface: "#FFFFFF",
      text: "#351515",
      mutedText: "#75605D",
      border: "#F3B7B0",
      accent: "#FEC84B"
    },
    extraCollection: {
      id: "campaign-extra-mystery-gifts",
      type: "DYNAMIC_COLLECTION",
      props: {
        id: "mystery-gifts",
        title: "Mystery Gifts",
        subtitle: "Surprise drops and coupon reveals",
        products: mysteryGiftProducts,
        itemWidth: 158
      }
    },
    overlay: campaignOverlay("campaign-overlay-confetti", {
      kind: "local",
      key: "confetti"
    })
  }
};

export const isCampaignId = (value: unknown): value is CampaignId =>
  typeof value === "string" && value in campaignConfigs;

export const resolveCampaignPayload = (payload: SduiScreenPayload): SduiScreenPayload => {
  const campaignId = isCampaignId(payload.campaignId) ? payload.campaignId : DEFAULT_CAMPAIGN_ID;
  const config = campaignConfigs[campaignId];
  const baseNodes = payload.nodes.filter(
    (node) => node.type !== "FULL_SCREEN_OVERLAY" && !node.id.startsWith("campaign-extra-")
  );

  return {
    ...payload,
    campaignId: config.id,
    theme: config.theme,
    nodes: [...baseNodes, config.extraCollection, config.overlay],
    metadata: {
      ...(payload.metadata ?? {}),
      resolvedCampaignName: config.name
    }
  };
};
