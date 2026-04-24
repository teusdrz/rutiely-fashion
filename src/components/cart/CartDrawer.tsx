"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartFooter from "./CartFooter";

export default function CartDrawer() {
    const { items, isOpen, close } = useCart();
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, close]);

    return (
        <div
            aria-hidden={!isOpen}
            className="fixed inset-0 z-[60] pointer-events-none"
            style={{ transition: "background 300ms ease" }}
        >
            {/* Overlay */}
            <div
                onClick={close}
                className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
                    }`}
                style={{ background: "rgba(74, 50, 56, 0.42)" }}
            />

            {/* Panel */}
            <aside
                ref={panelRef}
                role="dialog"
                aria-label="Sacola de compras"
                className={`absolute top-0 right-0 h-full flex flex-col transition-transform duration-500 ease-out ${isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"
                    }`}
                style={{
                    width: "min(440px, 100vw)",
                    background: "#FFF1FC",
                    boxShadow: "-20px 0 60px rgba(74, 50, 56, 0.18)",
                }}
            >
                {/* Header */}
                <header
                    className="flex items-center justify-between"
                    style={{
                        padding: "24px 28px",
                        borderBottom: "1px solid var(--rose-200)",
                    }}
                >
                    <div className="flex flex-col" style={{ gap: "4px" }}>
                        <span
                            className="text-[9px] tracking-[0.22em] uppercase"
                            style={{ fontFamily: "var(--font-julius)", color: "var(--rose-500)" }}
                        >
                            Rutiely Fashion
                        </span>
                        <h2
                            className="text-[14px] tracking-[0.2em] uppercase"
                            style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
                        >
                            Sua sacola
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Fechar sacola"
                        className="cursor-pointer transition-opacity duration-200 hover:opacity-60"
                        style={{ padding: "6px" }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--rose-800)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                {/* Body */}
                {items.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <>
                        <ul
                            className="flex-1 overflow-y-auto"
                            style={{ padding: "0 28px" }}
                        >
                            {items.map((item) => (
                                <CartItem key={item.key} item={item} />
                            ))}
                        </ul>
                        <CartFooter />
                    </>
                )}
            </aside>
        </div>
    );
}
