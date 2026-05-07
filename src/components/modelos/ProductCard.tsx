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
