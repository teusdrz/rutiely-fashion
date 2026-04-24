"use client";

import { useCart } from "@/lib/cart";

export default function CartEmpty() {
    const { close } = useCart();

    return (
        <div
            className="flex flex-col items-center justify-center text-center flex-1"
            style={{ padding: "48px 32px", gap: "20px" }}
        >
            <div
                className="flex items-center justify-center"
                style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "999px",
                    background: "rgba(255, 241, 252, 0.8)",
                    border: "1px solid var(--rose-200)",
                }}
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--rose-700)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            </div>

            <h3
                className="text-[14px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
            >
                Sua sacola está vazia
            </h3>
            <p
                className="text-[10px] tracking-[0.18em] uppercase leading-[2]"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-600)", maxWidth: "260px" }}
            >
                Escolha uma peça e volte aqui para continuar sua compra.
            </p>

            <button
                type="button"
                onClick={close}
                className="group relative overflow-hidden text-[11px] tracking-[0.2em] uppercase cursor-pointer"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "16px 32px",
                    border: "1px solid var(--rose-800)",
                    color: "var(--rose-800)",
                    marginTop: "8px",
                }}
            >
                <span
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    style={{ background: "var(--rose-800)" }}
                />
                <span className="relative z-10 group-hover:text-[#FFF1FC] transition-colors duration-500">
                    Continuar comprando
                </span>
            </button>
        </div>
    );
}
