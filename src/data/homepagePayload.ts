import { resolveCampaignPayload, type CampaignId } from "../campaigns/campaigns";
import { featuredProducts, snackProducts, toyProducts } from "./products";
import type { SduiScreenPayload } from "../types/sdui";

export const serverHomepagePayload: SduiScreenPayload = {
  id: "home-v1",
  campaignId: "BACK_TO_SCHOOL",
  theme: {
    primary: "#FF9933",
    background: "#FFF5E6"
  },
  metadata: {
    generatedBy: "mock-server",
    contractVersion: 1
  },
  nodes: [
    {
      id: "hero-kiddo-minute-delivery",
      type: "BANNER_HERO",
      props: {
        eyebrow: "Kiddo live",
        title: "The best for your kiddo, delivered in minutes",
        subtitle: "Fresh snacks, baby care, toys, and daily essentials.",
        imageUrl:
          "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80",
        action: {
          type: "DEEP_LINK",
          payload: {
            url: "kiddo://snacks"
          }
        }
      },
      children: [
        {
          id: "hero-unknown-child",
          type: "TEXT_BADGE_V2",
          props: {
            text: "Unknown child node is intentionally ignored"
          }
        }
      ]
    },
    {
      id: "grid-featured-2x2",
      type: "PRODUCT_GRID_2X2",
      props: {
        title: "Fast picks for today",
        products: featuredProducts
      }
    },
    {
      id: "collection-snacks-under-99",
      type: "DYNAMIC_COLLECTION",
      props: {
        id: "snacks-under-99",
        title: "Snacks under ₹99",
        subtitle: "Horizontal FlashList nested in the home feed",
        products: snackProducts,
        itemWidth: 154
      }
    },
    {
      id: "collection-playtime",
      type: "DYNAMIC_COLLECTION",
      props: {
        id: "playtime",
        title: "Playtime essentials",
        subtitle: "Toys and activities picked for toddlers",
        products: toyProducts,
        itemWidth: 154
      }
    },
    {
      id: "unknown-server-node",
      type: "NEW_COMPONENT_V2",
      props: {
        shouldNotCrash: true
      }
    }
  ]
};

export const sampleCampaignPayloads: Record<CampaignId, SduiScreenPayload> = {
  BACK_TO_SCHOOL: resolveCampaignPayload({
    ...serverHomepagePayload,
    campaignId: "BACK_TO_SCHOOL"
  }),
  SUMMER_PLAYHOUSE: resolveCampaignPayload({
    ...serverHomepagePayload,
    campaignId: "SUMMER_PLAYHOUSE"
  }),
  MYSTERY_GIFT_CARNIVAL: resolveCampaignPayload({
    ...serverHomepagePayload,
    campaignId: "MYSTERY_GIFT_CARNIVAL"
  })
};

export const activeHomepagePayload = resolveCampaignPayload(serverHomepagePayload);
