"use client";

import { useRef } from "react";
import Link from "next/link";
import ProductCard from "@/components/modelos/ProductCard";
import { camisetas } from "@/data/camisetas";
import { vestidos } from "@/data/vestidos";

const featured = [
    camisetas[0],
    vestidos[0],
    camisetas[1],
    vestidos[3],
    camisetas[2],
    vestidos[5],
    camisetas[3],
    vestidos[1],
].filter(Boolean);

export default function FeaturedProductsSection() {
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!trackRef.current) return;
        const amount = trackRef.current.clientWidth * 0.75;
        trackRef.current.scrollBy({
            left: direction === "right" ? amount : -amount,
            behavior: "smooth",
        });
    };

    return (
        <>
            <style>{`
                .featured-section { padding: 0 8px 120px; }
                .featured-header { margin-bottom: 40px; }
                .featured-title { font-size: clamp(16px, 1.6vw, 22px); }
                .featured-track {
                    display: flex;
                    gap: 20px;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding-bottom: 4px;
                    scroll-snap-type: x mandatory;
                }
                .featured-track::-webkit-scrollbar { display: none; }
                .featured-track-item {
                    flex: 0 0 calc(25% - 15px);
                    min-width: 0;
                    scroll-snap-align: start;
                }
                .featured-nav-buttons { display: flex; }
                @media (max-width: 767px) {
                    .featured-section { padding: 0 16px 80px; }
                    .featured-header { margin-bottom: 28px; }
                    .featured-title { font-size: 13px; }
                    .featured-track { gap: 12px; }
                    .featured-track-item { flex: 0 0 calc(50% - 6px); }
                    .featured-nav-buttons { display: none; }
                }
            `}</style>
            <section
                style={{ width: "100%", boxSizing: "border-box" }}
                className="featured-section"
            >
                <div style={{ width: "100%" }}>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        className="featured-header"
                    >
                        <h2
                            className="featured-title"
                            style={{
                                fontFamily: "var(--font-julius)",
                                fontWeight: 400,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: "#2a1a1c",
                                margin: 0,
                            }}
                        >
                            Looks da Temporada
                        </h2>

                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="featured-nav-buttons">
                            <Link
                                href="/modelos"
                                style={{
                                    fontFamily: "var(--font-julius)",
                                    fontSize: "11px",
                                    fontWeight: 400,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "#7a5c5e",
                                    textDecoration: "none",
                                    marginRight: "8px",
                                }}
                            >
                                Ver todos
                            </Link>

                            <button
                                onClick={() => scroll("left")}
                                aria-label="Anterior"
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "100px",
                                    border: "1.5px solid rgba(74,50,56,0.22)",
                                    background: "transparent",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 12L6 8L10 4" stroke="#2a1a1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                aria-label="Próximo"
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "100px",
                                    border: "1.5px solid rgba(74,50,56,0.22)",
                                    background: "transparent",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 4L10 8L6 12" stroke="#2a1a1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={trackRef}
                        className="featured-track"
                    >
                        {featured.map((product) => (
                            <div
                                key={product.id}
                                className="featured-track-item"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
