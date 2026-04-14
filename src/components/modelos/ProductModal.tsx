"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { type Product, productColors, productSizes } from "@/data/products";

gsap.registerPlugin(useGSAP);

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const [selectedColor, setSelectedColor] = useState(productColors[0].name);
    const [selectedSize, setSelectedSize] = useState("");

    /* ── Close on Escape ── */
    useEffect(() => {
        if (!product) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [product, onClose]);

    /* ── Open animation ── */
    useGSAP(
        () => {
            if (!product) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                overlayRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.4 }
            );

            tl.fromTo(
                cardRef.current,
                { autoAlpha: 0, y: 60, scale: 0.95 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
                "-=0.2"
            );

            tl.fromTo(
                imageRef.current,
                { autoAlpha: 0, x: -40 },
                { autoAlpha: 1, x: 0, duration: 0.5 },
                "-=0.3"
            );

            tl.fromTo(
                infoRef.current,
                { autoAlpha: 0, x: 40 },
                { autoAlpha: 1, x: 0, duration: 0.5 },
                "-=0.4"
            );

            tl.fromTo(
                closeBtnRef.current,
                { autoAlpha: 0, rotate: -90 },
                { autoAlpha: 1, rotate: 0, duration: 0.4 },
                "-=0.3"
            );
        },
        { dependencies: [product] }
    );

    /* ── Close animation ── */
    const handleClose = useCallback(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power2.in" },
            onComplete: onClose,
        });

        tl.to(cardRef.current, { autoAlpha: 0, y: 40, scale: 0.97, duration: 0.35 });
        tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.25 }, "-=0.15");
    }, [onClose]);

    /* ── Overlay click ── */
    const handleOverlayClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === overlayRef.current) handleClose();
        },
        [handleClose]
    );

    if (!product) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                background: "rgba(74, 50, 56, 0.3)",
                padding: "24px",
                visibility: "hidden",
            }}
            onClick={handleOverlayClick}
        >
            <div
                ref={cardRef}
                className="relative flex flex-col lg:flex-row w-full overflow-hidden"
                style={{
                    maxWidth: "1050px",
                    maxHeight: "90vh",
                    background: "#FFF1FC",
                    boxShadow: "0 30px 80px rgba(74, 50, 56, 0.25)",
                    visibility: "hidden",
                }}
            >
                {/* ── Close button ── */}
                <button
                    ref={closeBtnRef}
                    onClick={handleClose}
                    className="absolute z-10 flex items-center justify-center cursor-pointer"
                    style={{
                        top: "20px",
                        right: "20px",
                        width: "44px",
                        height: "44px",
                        background: "rgba(255, 241, 252, 0.8)",
                        border: "1px solid var(--rose-200)",
                        visibility: "hidden",
                    }}
                    aria-label="Fechar"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--rose-800)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* ── Image side ── */}
                <div
                    ref={imageRef}
                    className="relative lg:w-[45%] flex-shrink-0"
                    style={{
                        minHeight: "400px",
                        visibility: "hidden",
                    }}
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                    />

                    {/* Sparkle decoration */}
                    <div
                        className="absolute pointer-events-none"
                        style={{ bottom: "20px", right: "20px" }}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 0 C16.8 6.4, 18.4 9.6, 20 12 C22.4 13.6, 25.6 15.2, 32 16 C25.6 16.8, 22.4 18.4, 20 20 C18.4 22.4, 16.8 25.6, 16 32 C15.2 25.6, 13.6 22.4, 12 20 C9.6 18.4, 6.4 16.8, 0 16 C6.4 15.2, 9.6 13.6, 12 12 C13.6 9.6, 15.2 6.4, 16 0Z"
                                fill="rgba(255, 241, 252, 0.6)"
                            />
                        </svg>
                    </div>
                </div>

                {/* ── Info side ── */}
                <div
                    ref={infoRef}
                    className="flex flex-col lg:w-[55%] overflow-y-auto"
                    style={{
                        padding: "48px 40px",
                        visibility: "hidden",
                    }}
                >
                    {/* Subtitle */}
                    <span
                        className="text-[10px] font-normal tracking-[0.2em] uppercase"
                        style={{
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "12px",
                        }}
                    >
                        {product.subtitle}
                    </span>

                    {/* Title */}
                    <h2
                        className="text-2xl md:text-3xl font-normal tracking-[0.04em] uppercase leading-[1.3]"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        {product.title}
                    </h2>

                    {/* Divider */}
                    <div
                        style={{
                            height: "1px",
                            background: "var(--rose-200)",
                            margin: "24px 0",
                        }}
                    />

                    {/* Price */}
                    <span
                        className="text-2xl font-normal tracking-[0.02em]"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        {product.price}
                    </span>

                    <span
                        className="text-[10px] font-normal tracking-[0.1em] uppercase"
                        style={{
                            color: "var(--rose-600)",
                            fontFamily: "var(--font-julius)",
                            marginTop: "6px",
                        }}
                    >
                        ou 3x de R$ 26,67 sem juros
                    </span>

                    {/* Color selector */}
                    <div style={{ marginTop: "32px" }}>
                        <span
                            className="block text-[10px] font-normal tracking-[0.15em] uppercase"
                            style={{
                                color: "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                                marginBottom: "14px",
                            }}
                        >
                            Cor selecionada: {selectedColor}
                        </span>

                        <div className="flex gap-3">
                            {productColors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className="relative cursor-pointer"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        background: color.hex,
                                        border: color.name === selectedColor
                                            ? "2px solid var(--rose-800)"
                                            : "2px solid transparent",
                                        outline: color.name === selectedColor
                                            ? "2px solid var(--rose-200)"
                                            : "none",
                                        outlineOffset: "2px",
                                    }}
                                    aria-label={`Cor ${color.name}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size selector */}
                    <div style={{ marginTop: "28px" }}>
                        <span
                            className="block text-[10px] font-normal tracking-[0.15em] uppercase"
                            style={{
                                color: "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                                marginBottom: "14px",
                            }}
                        >
                            {selectedSize ? `Tamanho: ${selectedSize}` : "Selecione um tamanho"}
                        </span>

                        <div className="flex gap-3">
                            {productSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className="flex items-center justify-center cursor-pointer text-[11px] font-normal tracking-[0.1em] uppercase transition-colors duration-300"
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        border: "1px solid var(--rose-300)",
                                        background: size === selectedSize ? "var(--rose-800)" : "transparent",
                                        color: size === selectedSize ? "#FFF1FC" : "var(--rose-800)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                    aria-label={`Tamanho ${size}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <p
                        className="text-[11px] font-normal leading-[2] tracking-[0.04em] uppercase"
                        style={{
                            color: "#555",
                            fontFamily: "var(--font-julius)",
                            marginTop: "28px",
                            maxWidth: "400px",
                        }}
                    >
                        Peça sofisticada e atemporal, confeccionada com tecido de alta qualidade.
                        Ideal para ocasiões especiais ou para elevar o seu dia a dia com elegância.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={() => {
                            if (!selectedSize || !product) return;
                            router.push(
                                `/checkout?productId=${product.id}&color=${encodeURIComponent(selectedColor)}&size=${selectedSize}`
                            );
                        }}
                        className="self-start group relative overflow-hidden text-[11px] font-normal tracking-[0.18em] uppercase cursor-pointer"
                        style={{
                            fontFamily: "var(--font-julius)",
                            padding: "18px 52px",
                            marginTop: "32px",
                            background: selectedSize ? "var(--rose-500)" : "var(--rose-300)",
                            color: "#fff",
                            border: "none",
                            pointerEvents: selectedSize ? "auto" : "none",
                        }}
                    >
                        <span
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            style={{ background: "var(--rose-800)" }}
                        />
                        <span className="relative z-10 flex items-center gap-3">
                            Comprar Agora
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
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
