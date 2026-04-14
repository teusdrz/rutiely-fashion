"use client";

import { formatCurrency } from "@/lib/formatters";

interface OrderRecapProps {
    orderNumber: string;
    productTitle: string;
    color: string;
    size: string;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
}

export default function OrderRecap({
    orderNumber,
    productTitle,
    color,
    size,
    subtotal,
    shipping,
    discount,
    total,
}: OrderRecapProps) {
    return (
        <div
            style={{
                border: "1px solid #1a1a1a",
                background: "rgba(255, 241, 252, 0.5)",
                padding: "28px",
            }}
        >
            <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
                <span
                    className="text-[9px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--rose-500)", fontFamily: "var(--font-julius)" }}
                >
                    Pedido
                </span>
                <span
                    className="text-[11px] tracking-[0.1em] font-medium"
                    style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)" }}
                >
                    {orderNumber}
                </span>
            </div>

            <h3
                className="text-sm tracking-[0.04em] uppercase leading-[1.4]"
                style={{
                    color: "var(--rose-900)",
                    fontFamily: "var(--font-julius)",
                    marginBottom: "8px",
                }}
            >
                {productTitle}
            </h3>

            <div className="flex items-center gap-3" style={{ marginBottom: "20px" }}>
                <span
                    className="text-[10px] tracking-[0.1em] uppercase"
                    style={{ color: "var(--rose-600)", fontFamily: "var(--font-julius)" }}
                >
                    {color}
                </span>
                <span
                    className="text-[10px] tracking-[0.1em]"
                    style={{ color: "var(--rose-400)", fontFamily: "var(--font-julius)" }}
                >
                    •
                </span>
                <span
                    className="text-[10px] tracking-[0.1em] uppercase"
                    style={{ color: "var(--rose-600)", fontFamily: "var(--font-julius)" }}
                >
                    Tam. {size}
                </span>
            </div>

            <div style={{ height: "1px", background: "#1a1a1a", margin: "0 0 16px" }} />

            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--rose-600)", fontFamily: "var(--font-julius)" }}>
                        Subtotal
                    </span>
                    <span className="text-[10px] tracking-[0.1em]" style={{ color: "var(--rose-800)", fontFamily: "var(--font-julius)" }}>
                        {formatCurrency(subtotal)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "var(--rose-600)", fontFamily: "var(--font-julius)" }}>
                        Frete
                    </span>
                    <span
                        className="text-[10px] tracking-[0.1em] uppercase"
                        style={{ color: shipping === 0 ? "#4a8c5c" : "var(--rose-800)", fontFamily: "var(--font-julius)" }}
                    >
                        {shipping === 0 ? "Grátis" : formatCurrency(shipping)}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-[10px] tracking-[0.1em] uppercase" style={{ color: "#4a8c5c", fontFamily: "var(--font-julius)" }}>
                            Desconto PIX (5%)
                        </span>
                        <span className="text-[10px] tracking-[0.1em]" style={{ color: "#4a8c5c", fontFamily: "var(--font-julius)" }}>
                            - {formatCurrency(discount)}
                        </span>
                    </div>
                )}
            </div>

            <div style={{ height: "1px", background: "#1a1a1a", margin: "16px 0" }} />

            <div className="flex justify-between items-baseline">
                <span
                    className="text-[11px] tracking-[0.15em] uppercase"
                    style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)" }}
                >
                    Total
                </span>
                <span
                    className="text-xl tracking-[0.02em]"
                    style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)" }}
                >
                    {formatCurrency(total)}
                </span>
            </div>
        </div>
    );
}
