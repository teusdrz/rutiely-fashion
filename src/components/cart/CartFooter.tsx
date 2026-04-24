"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";

export default function CartFooter() {
    const { subtotal, count, close } = useCart();

    return (
        <div
            className="flex flex-col"
            style={{
                padding: "24px 28px 28px",
                borderTop: "1px solid var(--rose-200)",
                background: "#FFF1FC",
                gap: "18px",
            }}
        >
            <div className="flex items-center justify-between">
                <span
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-700)" }}
                >
                    Subtotal ({count} {count === 1 ? "item" : "itens"})
                </span>
                <span
                    className="text-[16px] tracking-[0.05em]"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
                >
                    {formatCurrency(subtotal)}
                </span>
            </div>

            <span
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-600)" }}
            >
                Frete e cupons calculados no checkout
            </span>

            <Link
                href="/checkout"
                onClick={close}
                className="group relative overflow-hidden text-[11px] tracking-[0.2em] uppercase text-center cursor-pointer"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "20px 28px",
                    background: "var(--rose-500)",
                    color: "#fff",
                }}
            >
                <span
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    style={{ background: "var(--rose-800)" }}
                />
                <span className="relative z-10">Finalizar compra</span>
            </Link>
        </div>
    );
}
