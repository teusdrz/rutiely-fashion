"use client";

import { useCart } from "@/lib/cart";

interface CartIconProps {
    variant?: "light" | "dark";
}

export default function CartIcon({ variant = "dark" }: CartIconProps) {
    const { count, open } = useCart();
    const color = variant === "light" ? "#FFF1FC" : "var(--rose-800)";

    return (
        <button
            type="button"
            onClick={open}
            aria-label={`Abrir sacola${count > 0 ? ` com ${count} itens` : ""}`}
            className="relative flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:opacity-70"
            style={{ width: "40px", height: "40px" }}
        >
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {count > 0 && (
                <span
                    className="absolute flex items-center justify-center text-[9px] font-semibold tracking-[0.05em]"
                    style={{
                        top: "2px",
                        right: "2px",
                        minWidth: "16px",
                        height: "16px",
                        padding: "0 4px",
                        borderRadius: "999px",
                        background: "var(--rose-800)",
                        color: "#FFF1FC",
                        fontFamily: "var(--font-julius)",
                    }}
                >
                    {count > 9 ? "9+" : count}
                </span>
            )}
        </button>
    );
}
