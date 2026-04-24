"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const close = useCallback(() => setLightboxIndex(null), []);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [lightboxIndex, close]);

    const isSingle = images.length === 1;

    return (
        <>
            <div
                className={`grid gap-3 ${isSingle ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
            >
                {images.map((src, i) => (
                    <button
                        type="button"
                        key={src}
                        onClick={() => setLightboxIndex(i)}
                        className="relative overflow-hidden group cursor-zoom-in"
                        style={{
                            aspectRatio: isSingle ? "3 / 4" : "3 / 4",
                            background: "#fff",
                            border: "1px solid var(--rose-200)",
                        }}
                        aria-label={`Ampliar imagem ${i + 1}`}
                    >
                        <Image
                            src={src}
                            alt={`${title} - imagem ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority={i === 0}
                        />

                        <span
                            className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none"
                            style={{
                                padding: "6px 10px",
                                background: "rgba(255, 241, 252, 0.85)",
                                backdropFilter: "blur(4px)",
                                border: "1px solid var(--rose-200)",
                            }}
                        >
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--rose-800)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                            <span
                                className="text-[9px] tracking-[0.15em] uppercase"
                                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-800)" }}
                            >
                                {i === 0 ? "Frente" : i === 1 ? "Costas" : `Vista ${i + 1}`}
                            </span>
                        </span>
                    </button>
                ))}
            </div>

            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    style={{ background: "rgba(0, 0, 0, 0.92)" }}
                    onClick={close}
                >
                    <div className="relative w-full h-[90vh] max-w-[720px]">
                        <Image
                            src={images[lightboxIndex]}
                            alt={title}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>

                    <button
                        type="button"
                        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center cursor-pointer"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.3)",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            close();
                        }}
                        aria-label="Fechar visualização"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
