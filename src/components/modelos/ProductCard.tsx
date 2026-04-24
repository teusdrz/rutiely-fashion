"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import type { Product } from "@/data/types";

interface ProductCardProps {
    product: Product;
    onEnter?: () => void;
    onLeave?: () => void;
}

const ProductCard = forwardRef<HTMLAnchorElement, ProductCardProps>(
    ({ product, onEnter, onLeave }, ref) => {
        return (
            <Link
                href={`/modelos/${product.id}`}
                ref={ref}
                className="flex flex-col cursor-pointer"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
            >
                <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "3 / 4" }}
                >
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div
                        className="absolute pointer-events-none modelos-card-sparkle"
                        style={{ bottom: "14px", right: "14px" }}
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 0 C16.8 6.4, 18.4 9.6, 20 12 C22.4 13.6, 25.6 15.2, 32 16 C25.6 16.8, 22.4 18.4, 20 20 C18.4 22.4, 16.8 25.6, 16 32 C15.2 25.6, 13.6 22.4, 12 20 C9.6 18.4, 6.4 16.8, 0 16 C6.4 15.2, 9.6 13.6, 12 12 C13.6 9.6, 15.2 6.4, 16 0Z"
                                fill="rgba(255, 241, 252, 0.7)"
                            />
                        </svg>
                    </div>
                </div>

                <div className="modelos-card-info" style={{ paddingTop: "16px" }}>
                    <h3
                        className="modelos-card-title text-[11px] font-normal tracking-[0.1em] uppercase leading-[1.6]"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        {product.title}
                    </h3>

                    <p
                        className="modelos-card-subtitle text-[9px] font-normal tracking-[0.08em] uppercase"
                        style={{
                            color: "var(--rose-700)",
                            fontFamily: "var(--font-julius)",
                            marginTop: "4px",
                        }}
                    >
                        {product.subtitle}
                    </p>

                    <span
                        className="modelos-card-price block text-[12px] font-normal tracking-[0.05em]"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                            marginTop: "12px",
                        }}
                    >
                        {product.price}
                    </span>
                </div>
            </Link>
        );
    }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
