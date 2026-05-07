"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Tipos ────────────────────────────────────────────────────────────────────
type CardLayout = "half" | "full";

interface CategoryItem {
    id: string;
    label: string;
    subtitle: string;
    description?: string;
    cta: string;
    href: string;
    image: string;
    layout: CardLayout;
}

// ─── Dados das categorias ─────────────────────────────────────────────────────
const CATEGORIES: CategoryItem[] = [
    {
        id: "vestidos",
        label: "Vestidos",
        subtitle: "COLEÇÃO 2026",
        cta: "VER COLEÇÃO",
        href: "/modelos?categoria=vestidos",
        image: "/images/vestidos/modelos-vestidos/Vestido-Preto/WhatsApp Image 2026-05-06 at 17.40.55.jpeg",
        layout: "half",
    },
    {
        id: "camisetas",
        label: "Camisetas",
        subtitle: "BASICS & STYLE",
        cta: "VER COLEÇÃO",
        href: "/modelos?categoria=camisetas",
        image: "/images/camisetas/modelo-camisetas/camiseta-bege/WhatsApp Image 2026-04-24 at 15.12.25.jpeg",
        layout: "half",
    },
    {
        id: "conjuntos",
        label: "Conjuntos",
        subtitle: "COORDENADOS",
        description: "Looks completos para todas as ocasiões.",
        cta: "EXPLORAR",
        href: "/modelos?categoria=conjuntos",
        image: "/Conjuntos/ConjuntoBlazer.jpeg",
        layout: "full",
    },
    {
        id: "saias",
        label: "Saias",
        subtitle: "NOVAS PEÇAS",
        cta: "VER COLEÇÃO",
        href: "/modelos?categoria=saias",
        image: "/images/vestidos/modelos-vestidos/Vestido-Branca/WhatsApp Image 2026-05-06 at 17.49.24.jpeg",
        layout: "full",
    },
];

// ─── Sub-componente: CategoryCard ─────────────────────────────────────────────
interface CardProps {
    item: CategoryItem;
    cardRef: (el: HTMLDivElement | null) => void;
}

function CategoryCard({ item, cardRef }: CardProps) {
    const isHalf = item.layout === "half";

    return (
        <div
            ref={cardRef}
            className={isHalf ? "col-span-2 md:col-span-1" : "col-span-2"}
            style={{
                borderRadius: "16px",
                height: isHalf ? "clamp(340px, 50vw, 520px)" : "clamp(300px, 35vw, 420px)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Link
                href={item.href}
                className="group block w-full h-full relative"
                style={{ display: "block", width: "100%", height: "100%", position: "relative" }}
            >
                {/* Imagem de fundo */}
                <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes={isHalf ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
                />

                {/* Overlay gradiente */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.60) 100%)",
                    }}
                />

                {/* Conteúdo centralizado */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                    style={{ padding: "40px 36px" }}
                >
                    <p
                        style={{
                            fontSize: "11px",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.72)",
                            marginBottom: "12px",
                            fontFamily: "var(--font-body)",
                            fontWeight: 400,
                        }}
                    >
                        {item.subtitle}
                    </p>

                    <h3
                        style={{
                            fontSize: isHalf
                                ? "clamp(2.8rem, 4.5vw, 4.8rem)"
                                : "clamp(3rem, 5vw, 5.5rem)",
                            fontFamily: "var(--font-display)",
                            fontWeight: 400,
                            color: "#ffffff",
                            lineHeight: 1,
                            letterSpacing: "0.02em",
                            marginBottom: item.description ? "14px" : "32px",
                            textTransform: "uppercase",
                        }}
                    >
                        {item.label}
                    </h3>

                    {item.description && (
                        <p
                            style={{
                                fontSize: "14px",
                                color: "rgba(255,255,255,0.78)",
                                fontFamily: "var(--font-body)",
                                marginBottom: "32px",
                                maxWidth: "420px",
                                lineHeight: 1.6,
                            }}
                        >
                            {item.description}
                        </p>
                    )}

                    {/* Botão outline */}
                    <span
                        className="group-hover:bg-white/10"
                        style={{
                            display: "inline-block",
                            border: "1px solid rgba(255,255,255,0.72)",
                            color: "#ffffff",
                            padding: "13px 34px",
                            fontSize: "11px",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-body)",
                            borderRadius: "2px",
                            transition: "background 0.3s ease, border-color 0.3s ease",
                        }}
                    >
                        {item.cta}
                    </span>
                </div>
            </Link>
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function CategoriesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            gsap.from(headingRef.current, {
                autoAlpha: 0,
                y: 50,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    toggleActions: "play none none none",
                },
            });

            gsap.from(
                cardRefs.current.filter(Boolean),
                {
                    autoAlpha: 0,
                    y: 48,
                    duration: 0.75,
                    stagger: 0.14,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 62%",
                        toggleActions: "play none none none",
                    },
                }
            );

        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            style={{
                background: "#FFF1FC",
                padding: "100px 0 120px",
            }}
        >
            <div
                style={{
                    padding: "0 20px",
                    maxWidth: "1440px",
                    margin: "0 auto",
                }}
            >
                {/* Cabeçalho da seção */}
                <h2
                    ref={headingRef}
                    style={{
                        fontFamily: "var(--font-julius)",
                        fontSize: "clamp(1.6rem, 3vw, 3rem)",
                        fontWeight: 400,
                        color: "#4a3238",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginBottom: "28px",
                    }}
                >
                    Encontre sua essência
                </h2>

                {/* Bento grid: 2 colunas no desktop, 1 coluna no mobile */}
                <div
                    className="grid grid-cols-2"
                    style={{ gap: "10px" }}
                >
                    {CATEGORIES.map((item, i) => (
                        <CategoryCard
                            key={item.id}
                            item={item}
                            cardRef={(el) => { cardRefs.current[i] = el; }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
