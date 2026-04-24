export interface CartItem {
    /** Unique identifier composed of productId + size */
    key: string;
    productId: number;
    title: string;
    subtitle: string;
    price: string;
    priceValue: number;
    image: string;
    size: string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

export type CartAction =
    | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity">; quantity?: number }
    | { type: "REMOVE_ITEM"; payload: { key: string } }
    | { type: "UPDATE_QUANTITY"; payload: { key: string; quantity: number } }
    | { type: "CLEAR" }
    | { type: "OPEN" }
    | { type: "CLOSE" }
    | { type: "TOGGLE" }
    | { type: "HYDRATE"; payload: CartItem[] };
