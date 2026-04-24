"use client";

import { useRef, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ModelosNavbar from "@/components/modelos/ModelosNavbar";
import { products } from "@/data/products";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ModelosContent() {
    const searchParams = useSearchParams();
    const categoriaParam = searchParams.get("categoria");

    const pageRef = useRef<HTMLDivElement>(null);
    const lineImageRef = useRef<HTMLDivElement>(null);
    const butterflyRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const filteredProducts = useMemo(() => {
        if (!categoriaParam) return products;
        return products.filter((p) => p.category === categoriaParam);
    }, [categoriaParam]);

    const handleCardEnter = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;
        gsap.to(card, { y: -8, duration: 0.5, ease: "power3.out" });
        const img = card.querySelector("img");
        if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
    }, []);

    const handleCardLeave = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" });
        const img = card.querySelector("img");
        if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
    }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

            tl.from(lineImageRef.current, { autoAlpha: 0, x: -80, duration: 1.2 });
            tl.from(titleRef.current, { autoAlpha: 0, y: 50, duration: 0.9 }, "-=0.7");
            tl.from(butterflyRef.current, { autoAlpha: 0, rotate: -15, scale: 0.5, duration: 0.8 }, "-=0.5");
            tl.from(subtitleRef.current, { autoAlpha: 0, y: 30, duration: 0.7 }, "-=0.4");

            const cards = gridRef.current?.children;
            if (cards) {
                tl.from(Array.from(cards), { autoAlpha: 0, y: 60, duration: 0.7, stagger: 0.15 }, "-=0.3");
            }

            gsap.to(butterflyRef.current, {
                y: -35,
                rotate: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        },
        { scope: pageRef }
    );

    return (
        <div ref={pageRef} className="relative min-h-screen" style={{ background: "#FFF1FC" }}>
            <style>{`
                @media (max-width: 767px) {
                    .modelos-line-image { display: none !important; }
                    .modelos-butterfly { right: 4% !important; top: 10% !important; }
                    .modelos-butterfly img { width: 80px !important; height: 80px !important; }
                    .modelos-nav { padding-left: 16px !important; padding-right: 16px !important; }
                    .modelos-nav-logo img { width: 36px !important; height: 36px !important; }
                    .modelos-content { padding: 120px 5% 60px !important; }
                }
            `}</style>

            <ModelosNavbar />

            <div
                ref={lineImageRef}
                className="absolute left-0 top-0 pointer-events-none modelos-line-image"
                style={{ width: "280px", height: "70%" }}
            >
                <Image
                    src="/images/Linha-Fashion.png"
                    alt=""
                    fill
                    className="object-contain object-left-top"
                />
            </div>

            <div
                ref={butterflyRef}
                className="absolute pointer-events-none modelos-butterfly"
                style={{ right: "16%", top: "18%" }}
            >
                <Image
                    src="/images/Butterfly.png"
                    alt=""
                    width={140}
                    height={140}
                    className="object-contain"
                />
            </div>

            <div className="relative modelos-content" style={{ padding: "180px 5% 100px" }}>
                <h1
                    ref={titleRef}
                    className="text-center text-4xl md:text-5xl lg:text-[3.8rem] font-normal tracking-[0.06em] uppercase"
                    style={{
                        color: "var(--rose-900)",
                        fontFamily: "var(--font-julius)",
                        marginBottom: "32px",
                    }}
                >
                    Encontre aqui seu modelo
                </h1>

                <p
                    ref={subtitleRef}
                    className="w-full text-center text-[12px] font-normal leading-[2.2] tracking-[0.08em] uppercase"
                    style={{
                        color: "#1a1a1a",
                        fontFamily: "var(--font-julius)",
                        maxWidth: "620px",
                        margin: "0 auto 80px",
                    }}
                >
                    Encontre o modelo ideal que traduz a sua personalidade e destaca a
                    sua essência única. Sinta-se livre para escolher a peça que vai te
                    acompanhar com confiança em cada passo.
                </p>

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {filteredProducts.map((product, index) => (
                        <Link
                            key={product.id}
                            href={`/modelos/${product.id}`}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="flex flex-col cursor-pointer"
                            onMouseEnter={() => handleCardEnter(index)}
                            onMouseLeave={() => handleCardLeave(index)}
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
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />

                                <div
                                    className="absolute pointer-events-none"
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

                            <div style={{ paddingTop: "16px" }}>
                                <h3
                                    className="text-[11px] font-normal tracking-[0.1em] uppercase leading-[1.6]"
                                    style={{
                                        color: "var(--rose-900)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    {product.title}
                                </h3>

                                <p
                                    className="text-[9px] font-normal tracking-[0.08em] uppercase"
                                    style={{
                                        color: "var(--rose-700)",
                                        fontFamily: "var(--font-julius)",
                                        marginTop: "4px",
                                    }}
                                >
                                    {product.subtitle}
                                </p>

                                <span
                                    className="block text-[12px] font-normal tracking-[0.05em]"
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
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ModelosPage() {
    return (
        <Suspense>
            <ModelosContent />
        </Suspense>
    );
}
