"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { type Product, productColors } from "@/data/products";
import { formatCurrency } from "@/lib/formatters";

gsap.registerPlugin(useGSAP);

interface OrderSummaryProps {
    product: Product;
    selectedColor: string;
    selectedSize: string;
    shippingCost: number;
    paymentMethod: string;
}

export default function OrderSummary({
    product,
    selectedColor,
    selectedSize,
    shippingCost,
    paymentMethod,
}: OrderSummaryProps) {
    const ref = useRef<HTMLDivElement>(null);
    const color = productColors.find((c) => c.name === selectedColor);
    const subtotal = product.priceValue;
    const pixDiscount = paymentMethod === "pix" ? subtotal * 0.05 : 0;
    const total = subtotal + shippingCost - pixDiscount;

    useGSAP(
        () => {
            gsap.from(ref.current, {
                autoAlpha: 0,
                x: 40,
                duration: 0.7,
                delay: 0.4,
                ease: "power3.out",
            });
        },
        { scope: ref }
    );

    return (
        <div ref={ref} className="lg:sticky lg:top-8">
            <h2
                className="text-[11px] font-normal tracking-[0.2em] uppercase"
                style={{
                    color: "var(--rose-800)",
                    fontFamily: "var(--font-julius)",
                    marginBottom: "24px",
                }}
            >
                Resumo do Pedido
            </h2>

            <div
                style={{
                    border: "1px solid #1a1a1a",
                    background: "rgba(255, 241, 252, 0.5)",
                }}
            >
                <div className="relative" style={{ height: "280px" }}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                </div>

                <div style={{ padding: "24px" }}>
                    <span
                        className="block text-[9px] font-normal tracking-[0.2em] uppercase"
                        style={{
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "8px",
                        }}
                    >
                        {product.subtitle}
                    </span>

                    <h3
                        className="text-sm font-normal tracking-[0.04em] uppercase leading-[1.4]"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        {product.title}
                    </h3>

                    <div
                        className="flex items-center gap-4"
                        style={{ marginTop: "16px" }}
                    >
                        {color && (
                            <div className="flex items-center gap-2">
                                <div
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "50%",
                                        background: color.hex,
                                        border: "1px solid var(--rose-300)",
                                    }}
                                />
                                <span
                                    className="text-[10px] tracking-[0.1em] uppercase"
                                    style={{
                                        color: "var(--rose-700)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    {selectedColor}
                                </span>
                            </div>
                        )}

                        {selectedSize && (
                            <div
                                className="flex items-center justify-center text-[10px] tracking-[0.1em]"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    border: "1px solid var(--rose-300)",
                                    color: "var(--rose-800)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                {selectedSize}
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            height: "1px",
                            background: "#1a1a1a",
                            margin: "20px 0",
                        }}
                    />

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <span
                                className="text-[10px] tracking-[0.1em] uppercase"
                                style={{
                                    color: "var(--rose-600)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                Subtotal
                            </span>
                            <span
                                className="text-[10px] tracking-[0.1em]"
                                style={{
                                    color: "var(--rose-800)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                {product.price}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span
                                className="text-[10px] tracking-[0.1em] uppercase"
                                style={{
                                    color: "var(--rose-600)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                Frete
                            </span>
                            <span
                                className="text-[10px] tracking-[0.1em] uppercase"
                                style={{
                                    color: shippingCost === 0 ? "#4a8c5c" : "var(--rose-800)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                {shippingCost === 0 ? "Grátis" : formatCurrency(shippingCost)}
                            </span>
                        </div>

                        {pixDiscount > 0 && (
                            <div className="flex justify-between">
                                <span
                                    className="text-[10px] tracking-[0.1em] uppercase"
                                    style={{
                                        color: "#4a8c5c",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    Desconto PIX (5%)
                                </span>
                                <span
                                    className="text-[10px] tracking-[0.1em]"
                                    style={{
                                        color: "#4a8c5c",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    - {formatCurrency(pixDiscount)}
                                </span>
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            height: "1px",
                            background: "#1a1a1a",
                            margin: "16px 0",
                        }}
                    />

                    <div className="flex justify-between items-baseline">
                        <span
                            className="text-[11px] font-normal tracking-[0.15em] uppercase"
                            style={{
                                color: "var(--rose-900)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            Total
                        </span>
                        <span
                            className="text-xl font-normal tracking-[0.02em]"
                            style={{
                                color: "var(--rose-900)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            {formatCurrency(total)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
