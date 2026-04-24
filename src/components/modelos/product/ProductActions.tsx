"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { useCart, buildItemKey } from "@/lib/cart";

interface ProductActionsProps {
    product: Product;
    selectedSize: string;
}

export default function ProductActions({ product, selectedSize }: ProductActionsProps) {
    const router = useRouter();
    const { addItem, open } = useCart();
    const disabled = !selectedSize;

    const buildCartItem = () => ({
        key: buildItemKey(product.id, selectedSize),
        productId: product.id,
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        priceValue: product.priceValue,
        image: product.images[0],
        size: selectedSize,
    });

    const handleAddToBag = () => {
        if (disabled) return;
        addItem(buildCartItem());
        open();
    };

    const handleBuyNow = () => {
        if (disabled) return;
        addItem(buildCartItem());
        router.push("/checkout");
    };

    return (
        <div className="flex flex-col" style={{ gap: "14px" }}>
            <button
                type="button"
                onClick={handleAddToBag}
                disabled={disabled}
                className="group relative overflow-hidden text-[11px] font-normal tracking-[0.2em] uppercase cursor-pointer disabled:cursor-not-allowed"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "22px 28px",
                    background: disabled ? "var(--rose-300)" : "var(--rose-500)",
                    color: "#fff",
                    border: "none",
                }}
            >
                <span
                    className="absolute inset-0 translate-y-full group-enabled:group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    style={{ background: "var(--rose-800)" }}
                />
                <span
                    className="relative z-10 flex items-center justify-center"
                    style={{ gap: "14px" }}
                >
                    Adicionar à sacola
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </span>
            </button>

            <button
                type="button"
                onClick={handleBuyNow}
                disabled={disabled}
                className="group relative overflow-hidden text-[11px] font-normal tracking-[0.2em] uppercase cursor-pointer disabled:cursor-not-allowed"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "22px 28px",
                    background: "transparent",
                    color: disabled ? "var(--rose-400)" : "var(--rose-800)",
                    border: `1px solid ${disabled ? "var(--rose-300)" : "var(--rose-800)"}`,
                }}
            >
                <span
                    className="absolute inset-0 translate-y-full group-enabled:group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    style={{ background: "var(--rose-800)" }}
                />
                <span
                    className="relative z-10 flex items-center justify-center group-enabled:group-hover:text-[#FFF1FC] transition-colors duration-500"
                    style={{ gap: "14px" }}
                >
                    Comprar agora
                </span>
            </button>

            {disabled && (
                <span
                    className="text-[10px] tracking-[0.18em] uppercase text-center"
                    style={{
                        fontFamily: "var(--font-julius)",
                        color: "var(--rose-600)",
                        marginTop: "8px",
                    }}
                >
                    Selecione um tamanho para continuar
                </span>
            )}
        </div>
    );
}
