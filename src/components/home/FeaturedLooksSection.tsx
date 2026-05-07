"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const looks = [
    {
        label: "Camisetas",
        sub: "confira",
        href: "/modelos",
        src: "/images/camisetas/modelo-camisetas/camiseta-marrom/WhatsApp Image 2026-04-24 at 15.12.55.jpeg",
        alt: "Modelo usando camiseta marrom Rutiely",
    },
    {
        label: "Vestidos",
        sub: "confira",
        href: "/modelos",
        src: "/images/vestidos/modelos-vestidos/Vestido-Preto/WhatsApp Image 2026-05-06 at 17.40.55.jpeg",
        alt: "Modelo usando vestido preto Rutiely",
    },
    {
        label: "Conjuntos",
        sub: "confira",
        href: "/modelos",
        src: "/images/camisetas/modelo-camisetas/camiseta-bege/WhatsApp Image 2026-04-24 at 15.12.25.jpeg",
        alt: "Modelo usando conjunto bege Rutiely",
    },
];

export default function FeaturedLooksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            panelRefs.current.forEach((panel, i) => {
                gsap.from(panel, {
                    autoAlpha: 0,
                    y: 40,
                    duration: 0.9,
                    ease: "power3.out",
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <>
            <style>{`
                .looks-section { min-height: 80vh; margin-top: 80px; }
                .looks-panel { min-height: 70vh; }
                .looks-label { font-size: clamp(1.8rem, 3.5vw, 2.8rem); }
                @media (max-width: 767px) {
                    .looks-section { margin-top: 56px; }
                    .looks-panel { min-height: 52vh; }
                    .looks-label { font-size: 1.9rem; }
                }
            `}</style>
            <section
                ref={sectionRef}
                className="w-full flex flex-col md:flex-row looks-section"
            >
                {looks.map((look, i) => (
                    <div
                        key={look.label}
                        ref={(el) => { panelRefs.current[i] = el; }}
                        className="relative flex-1 overflow-hidden group looks-panel"
                    >
                        <Image
                            src={look.src}
                            alt={look.alt}
                            fill
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
                            }}
                        />

                        <Link
                            href={look.href}
                            className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 transition-all duration-300"
                            style={{ padding: "0 6% 7%" }}
                        >
                            <span
                                className="leading-none uppercase looks-label"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    letterSpacing: "0.01em",
                                }}
                            >
                                {look.label}
                            </span>
                            <span
                                className="uppercase tracking-widest"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 400,
                                    fontSize: "0.75rem",
                                    color: "rgba(255,255,255,0.85)",
                                    letterSpacing: "0.18em",
                                }}
                            >
                                {look.sub}
                            </span>
                        </Link>
                    </div>
                ))}
            </section>
        </>
    );
}
