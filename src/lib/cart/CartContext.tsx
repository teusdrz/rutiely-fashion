"use client";

import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    type ReactNode,
} from "react";
import { cartReducer, getCartTotals, initialCartState } from "./reducer";
import type { CartItem } from "./types";

const STORAGE_KEY = "rutiely.cart.v1";

interface CartContextValue {
    items: CartItem[];
    isOpen: boolean;
    count: number;
    subtotal: number;
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (key: string) => void;
    updateQuantity: (key: string, quantity: number) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw) as CartItem[];
            if (Array.isArray(parsed)) dispatch({ type: "HYDRATE", payload: parsed });
        } catch {
            /* ignore corrupted storage */
        }
    }, []);

    // Persist items on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch {
            /* ignore quota errors */
        }
    }, [state.items]);

    // Lock body scroll while drawer is open
    useEffect(() => {
        if (state.isOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [state.isOpen]);

    const addItem = useCallback(
        (item: Omit<CartItem, "quantity">, quantity = 1) =>
            dispatch({ type: "ADD_ITEM", payload: item, quantity }),
        []
    );
    const removeItem = useCallback(
        (key: string) => dispatch({ type: "REMOVE_ITEM", payload: { key } }),
        []
    );
    const updateQuantity = useCallback(
        (key: string, quantity: number) =>
            dispatch({ type: "UPDATE_QUANTITY", payload: { key, quantity } }),
        []
    );
    const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
    const open = useCallback(() => dispatch({ type: "OPEN" }), []);
    const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
    const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);

    const { count, subtotal } = useMemo(() => getCartTotals(state.items), [state.items]);

    const value = useMemo<CartContextValue>(
        () => ({
            items: state.items,
            isOpen: state.isOpen,
            count,
            subtotal,
            addItem,
            removeItem,
            updateQuantity,
            clear,
            open,
            close,
            toggle,
        }),
        [state.items, state.isOpen, count, subtotal, addItem, removeItem, updateQuantity, clear, open, close, toggle]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
