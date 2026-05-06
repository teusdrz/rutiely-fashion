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
        src: "/images/camisetas/modelo-camisetas/camiseta-branca/WhatsApp Image 2026-04-24 at 15.12.11.jpeg",
        alt: "Modelo usando blusa branca Rutiely",
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
        <section
            ref={sectionRef}
            className="w-full flex flex-col md:flex-row"
            style={{ minHeight: "80vh" }}
        >
            {looks.map((look, i) => (
                <div
                    key={look.label}
                    ref={(el) => { panelRefs.current[i] = el; }}
                    className="relative flex-1 overflow-hidden group"
                    style={{ minHeight: "70vh" }}
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
                            className="leading-none uppercase"
                            style={{
                                fontFamily: "var(--font-body)",
                                fontWeight: 700,
                                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
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
    );
}
