import * as Linking from "expo-linking";

import { addProductToCart } from "../store/cartStore";
import type { ActionDispatcher, AddToCartAction, DeepLinkAction, UnknownAction } from "../types/actions";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isAddToCartAction = (action: UnknownAction): action is AddToCartAction =>
  action.type === "ADD_TO_CART" &&
  isRecord(action.payload) &&
  typeof action.payload.id === "string" &&
  action.payload.id.length > 0;

const isDeepLinkAction = (action: UnknownAction): action is DeepLinkAction =>
  action.type === "DEEP_LINK" &&
  isRecord(action.payload) &&
  typeof action.payload.url === "string" &&
  action.payload.url.length > 0;

export const handleAction: ActionDispatcher = (action) => {
  if (!action || !isRecord(action)) {
    return;
  }

  if (isAddToCartAction(action)) {
    addProductToCart(action.payload.id);
    return;
  }

  if (isDeepLinkAction(action)) {
    void Linking.openURL(action.payload.url).catch(() => undefined);
  }
};
