export type AddToCartAction = {
  type: "ADD_TO_CART";
  payload: {
    id: string;
  };
};

export type DeepLinkAction = {
  type: "DEEP_LINK";
  payload: {
    url: string;
  };
};

export type SduiAction = AddToCartAction | DeepLinkAction;

export type UnknownAction = {
  type?: unknown;
  payload?: unknown;
};

export type ActionDispatcher = (action: SduiAction | UnknownAction | null | undefined) => void;
