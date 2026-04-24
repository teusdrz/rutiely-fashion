"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { productColors } from "@/data/products";
import ProductHeader from "./ProductHeader";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import ProductActions from "./ProductActions";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedColor, setSelectedColor] = useState(productColors[0].name);
    const [selectedSize, setSelectedSize] = useState("");

    return (
        <div className="flex flex-col gap-8">
            <ProductHeader product={product} />

            <div
                className="w-full"
                style={{ height: "1px", background: "var(--rose-200)" }}
            />

            <ColorSelector selected={selectedColor} onSelect={setSelectedColor} />

            <SizeSelector selected={selectedSize} onSelect={setSelectedSize} />

            <ProductActions productId={product.id} selectedSize={selectedSize} />

            {/* Description */}
            <div className="flex flex-col gap-4 mt-2">
                <span
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-800)" }}
                >
                    Descrição
                </span>
                <p
                    className="text-[11px] leading-[2] tracking-[0.04em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "#555" }}
                >
                    Peça sofisticada e atemporal, confeccionada com tecido de alta qualidade.
                    Ideal para ocasiões especiais ou para elevar o seu dia a dia com elegância.
                </p>
            </div>
        </div>
    );
}
