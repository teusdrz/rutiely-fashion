import type { CartAction, CartItem, CartState } from "./types";

export const initialCartState: CartState = {
    items: [],
    isOpen: false,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "HYDRATE":
            return { ...state, items: action.payload };

        case "ADD_ITEM": {
            const qty = action.quantity ?? 1;
            const existing = state.items.find((i) => i.key === action.payload.key);
            const items: CartItem[] = existing
                ? state.items.map((i) =>
                    i.key === action.payload.key ? { ...i, quantity: i.quantity + qty } : i
                )
                : [...state.items, { ...action.payload, quantity: qty }];
            return { ...state, items };
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((i) => i.key !== action.payload.key),
            };

        case "UPDATE_QUANTITY": {
            const { key, quantity } = action.payload;
            if (quantity <= 0) {
                return { ...state, items: state.items.filter((i) => i.key !== key) };
            }
            return {
                ...state,
                items: state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
            };
        }

        case "CLEAR":
            return { ...state, items: [] };

        case "OPEN":
            return { ...state, isOpen: true };

        case "CLOSE":
            return { ...state, isOpen: false };

        case "TOGGLE":
            return { ...state, isOpen: !state.isOpen };

        default:
            return state;
    }
}

export function buildItemKey(productId: number, size: string): string {
    return `${productId}::${size}`;
}

export function getCartTotals(items: CartItem[]) {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = items.reduce((acc, i) => acc + i.priceValue * i.quantity, 0);
    return { count, subtotal };
}
