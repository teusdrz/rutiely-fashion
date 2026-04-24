"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import ProductHeader from "./ProductHeader";
import SizeSelector from "./SizeSelector";
import ProductActions from "./ProductActions";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedSize, setSelectedSize] = useState("");

    return (
        <div className="flex flex-col" style={{ gap: "44px" }}>
            <ProductHeader product={product} />

            <div
                className="w-full"
                style={{ height: "1px", background: "var(--rose-200)" }}
            />

            <SizeSelector selected={selectedSize} onSelect={setSelectedSize} />

            <ProductActions product={product} selectedSize={selectedSize} />

            {/* Description */}
            <div className="flex flex-col" style={{ gap: "18px", marginTop: "12px" }}>
                <span
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-800)" }}
                >
                    Descrição
                </span>
                <p
                    className="text-[11px] leading-[2.1] tracking-[0.05em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "#555" }}
                >
                    Peça sofisticada e atemporal, confeccionada com tecido de alta qualidade.
                    Ideal para ocasiões especiais ou para elevar o seu dia a dia com elegância.
                </p>
            </div>
        </div>
    );
}
