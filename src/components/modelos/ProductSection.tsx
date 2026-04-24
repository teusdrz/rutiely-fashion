"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import type { Product } from "@/data/types";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
    label: string;
    slug: string;
    items: Product[];
}

export default function ProductSection({ label, slug, items }: ProductSectionProps) {
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const handleEnter = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;
        gsap.to(card, { y: -8, duration: 0.5, ease: "power3.out" });
        const img = card.querySelector("img");
        if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
    }, []);

    const handleLeave = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" });
        const img = card.querySelector("img");
        if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
    }, []);

    if (items.length === 0) return null;

    return (
        <section
            data-section={slug}
            className="modelos-section"
            style={{ marginBottom: "100px" }}
        >
            <header
                className="modelos-section-header"
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "32px",
                    paddingBottom: "14px",
                    borderBottom: "1px solid rgba(74, 50, 56, 0.18)",
                }}
            >
                <h2
                    className="modelos-section-title text-[20px] md:text-[24px] font-normal tracking-[0.18em] uppercase"
                    style={{
                        color: "var(--rose-900)",
                        fontFamily: "var(--font-julius)",
                    }}
                >
                    {label}
                </h2>
                <span
                    className="modelos-section-count text-[11px] tracking-[0.14em] uppercase"
                    style={{
                        color: "var(--rose-700)",
                        fontFamily: "var(--font-julius)",
                    }}
                >
                    {String(items.length).padStart(2, "0")} peças
                </span>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 modelos-grid">
                {items.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        ref={(el) => {
                            cardRefs.current[index] = el;
                        }}
                        onEnter={() => handleEnter(index)}
                        onLeave={() => handleLeave(index)}
                    />
                ))}
            </div>
        </section>
    );
}
