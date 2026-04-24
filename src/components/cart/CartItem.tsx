"use client";

import Image from "next/image";
import { useCart, type CartItem as CartItemType } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <li
            className="flex"
            style={{
                gap: "18px",
                padding: "20px 0",
                borderBottom: "1px solid var(--rose-200)",
            }}
        >
            <div
                className="relative overflow-hidden flex-shrink-0"
                style={{
                    width: "84px",
                    height: "110px",
                    background: "rgba(255, 241, 252, 0.6)",
                }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="84px"
                    className="object-cover"
                />
            </div>

            <div className="flex-1 flex flex-col" style={{ gap: "6px" }}>
                <span
                    className="text-[9px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-500)" }}
                >
                    {item.subtitle}
                </span>
                <h3
                    className="text-[12px] tracking-[0.12em] uppercase leading-[1.4]"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
                >
                    {item.title}
                </h3>
                <span
                    className="text-[10px] tracking-[0.18em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-700)" }}
                >
                    Tamanho · {item.size}
                </span>

                <div
                    className="flex items-center justify-between"
                    style={{ marginTop: "10px" }}
                >
                    <div
                        className="flex items-center"
                        style={{
                            border: "1px solid var(--rose-300)",
                            borderRadius: "999px",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            aria-label="Diminuir quantidade"
                            className="cursor-pointer transition-opacity duration-200 hover:opacity-60"
                            style={{
                                width: "28px",
                                height: "28px",
                                color: "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            −
                        </button>
                        <span
                            className="text-[11px] tracking-[0.1em]"
                            style={{
                                minWidth: "24px",
                                textAlign: "center",
                                fontFamily: "var(--font-julius)",
                                color: "var(--rose-900)",
                            }}
                        >
                            {item.quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            aria-label="Aumentar quantidade"
                            className="cursor-pointer transition-opacity duration-200 hover:opacity-60"
                            style={{
                                width: "28px",
                                height: "28px",
                                color: "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            +
                        </button>
                    </div>

                    <span
                        className="text-[12px] tracking-[0.05em]"
                        style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
                    >
                        {formatCurrency(item.priceValue * item.quantity)}
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={() => removeItem(item.key)}
                aria-label={`Remover ${item.title} da sacola`}
                className="self-start cursor-pointer transition-opacity duration-200 hover:opacity-60"
                style={{ padding: "4px" }}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--rose-700)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>
        </li>
    );
}
