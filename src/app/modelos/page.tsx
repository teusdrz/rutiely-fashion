"use client";

import { useRef, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ModelosNavbar from "@/components/modelos/ModelosNavbar";
import ProductSection from "@/components/modelos/ProductSection";
import { categoryGroups } from "@/data/products";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ModelosContent() {
    const searchParams = useSearchParams();
    const categoriaParam = searchParams.get("categoria");

    const pageRef = useRef<HTMLDivElement>(null);
    const lineImageRef = useRef<HTMLDivElement>(null);
    const butterflyRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    const visibleGroups = useMemo(() => {
        if (!categoriaParam) return categoryGroups;
        return categoryGroups.filter((g) => g.slug === categoriaParam);
    }, [categoriaParam]);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

            tl.from(lineImageRef.current, { autoAlpha: 0, x: -80, duration: 1.2 });
            tl.from(titleRef.current, { autoAlpha: 0, y: 50, duration: 0.9 }, "-=0.7");
            tl.from(butterflyRef.current, { autoAlpha: 0, rotate: -15, scale: 0.5, duration: 0.8 }, "-=0.5");
            tl.from(subtitleRef.current, { autoAlpha: 0, y: 30, duration: 0.7 }, "-=0.4");

            const sections = sectionsRef.current?.querySelectorAll(".modelos-section");
            sections?.forEach((section) => {
                const header = section.querySelector(".modelos-section-header");
                if (header) {
                    gsap.from(header, {
                        autoAlpha: 0,
                        y: 30,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });
                }
                const cards = section.querySelectorAll(".modelos-grid > a");
                if (cards.length) {
                    gsap.from(cards, {
                        autoAlpha: 0,
                        y: 60,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    });
                }
            });

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
        { scope: pageRef, dependencies: [visibleGroups] }
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
                    .modelos-section { margin-bottom: 60px !important; }
                    .modelos-section-title { font-size: 16px !important; letter-spacing: 0.14em !important; }
                    .modelos-section-count { font-size: 9px !important; }
                }
                @media (max-width: 639px) {
                    .modelos-grid { gap: 14px !important; }
                    .modelos-grid .modelos-card-title { font-size: 10px !important; letter-spacing: 0.08em !important; }
                    .modelos-grid .modelos-card-subtitle { font-size: 8px !important; letter-spacing: 0.06em !important; margin-top: 3px !important; }
                    .modelos-grid .modelos-card-price { font-size: 11px !important; margin-top: 8px !important; }
                    .modelos-grid .modelos-card-info { padding-top: 10px !important; }
                    .modelos-grid .modelos-card-sparkle { width: 20px !important; height: 20px !important; bottom: 8px !important; right: 8px !important; }
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

                <div ref={sectionsRef}>
                    {visibleGroups.map((group) => (
                        <ProductSection
                            key={group.slug}
                            slug={group.slug}
                            label={group.label}
                            items={group.items}
                        />
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
                @media (max-width: 639px) {
                    .modelos-grid { gap: 14px !important; }
                    .modelos-grid .modelos-card-title { font-size: 10px !important; letter-spacing: 0.08em !important; }
                    .modelos-grid .modelos-card-subtitle { font-size: 8px !important; letter-spacing: 0.06em !important; margin-top: 3px !important; }
                    .modelos-grid .modelos-card-price { font-size: 11px !important; margin-top: 8px !important; }
                    .modelos-grid .modelos-card-info { padding-top: 10px !important; }
                    .modelos-grid .modelos-card-sparkle { width: 20px !important; height: 20px !important; bottom: 8px !important; right: 8px !important; }
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
                    className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 modelos-grid"
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
