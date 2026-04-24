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
