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
                className="product-card group flex flex-col"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                style={{ textDecoration: "none" }}
            >
                {/* ── Imagem ─────────────────────────────────────────── */}
                {/*
                  * Técnica padding-bottom (mais confiável que aspect-ratio
                  * dentro de containers overflow-x: auto / flex scroll).
                  * paddingBottom: "133.33%" = proporção 3:4 (w × 4/3)
                  */}
                <div
                    className="product-card-img-wrap"
                    style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "133.33%",
                        overflow: "hidden",
                        background: "#f2ede9",
                    }}
                >
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        style={{
                            transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                        }}
                    />
                </div>

                {/* ── Info ──────────────────────────────────────────── */}
                <div
                    className="modelos-card-info"
                    style={{ paddingTop: "14px", paddingBottom: "6px" }}
                >
                    {/* Título — max 2 linhas */}
                    <h3
                        className="modelos-card-title"
                        style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                            lineHeight: 1.5,
                            color: "#1a1a1a",
                            fontFamily: "var(--font-julius)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            margin: 0,
                        }}
                    >
                        {product.title}
                    </h3>

                    {/* Swatches de cor */}
                    {product.colors && product.colors.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                marginTop: "9px",
                            }}
                        >
                            {product.colors.slice(0, 4).map((color) => (
                                <span
                                    key={color.hex}
                                    title={color.name}
                                    style={{
                                        display: "inline-block",
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        background: color.hex,
                                        border: "1.5px solid rgba(0,0,0,0.14)",
                                        flexShrink: 0,
                                    }}
                                />
                            ))}
                            {product.colors.length > 4 && (
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: "#777",
                                        fontFamily: "var(--font-body)",
                                        letterSpacing: "0.04em",
                                    }}
                                >
                                    +{product.colors.length - 4} cores
                                </span>
                            )}
                        </div>
                    )}

                    {/* Preço */}
                    <p
                        className="modelos-card-price"
                        style={{
                            fontSize: "15px",
                            fontWeight: 400,
                            letterSpacing: "0.04em",
                            color: "#1a1a1a",
                            fontFamily: "var(--font-julius)",
                            marginTop: "10px",
                            marginBottom: 0,
                        }}
                    >
                        {product.price}
                    </p>

                    {/* Oferta */}
                    {product.offer && (
                        <p
                            className="modelos-card-offer"
                            style={{
                                fontSize: "10px",
                                color: "#8a6060",
                                fontFamily: "var(--font-body)",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginTop: "4px",
                                marginBottom: 0,
                            }}
                        >
                            {product.offer}
                        </p>
                    )}
                </div>
            </Link>
        );
    }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
