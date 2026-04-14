"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const categories = [
    { name: "Vestidos", number: "01" },
    { name: "Camisetas", number: "02" },
    { name: "Conjuntos", number: "03" },
    { name: "Saias", number: "04" },
];

export default function CategoriesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    const butterflyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const nameRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const handleEnter = useCallback((index: number) => {
        const card = cardRefs.current[index];
        const name = nameRefs.current[index];
        const num = numberRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            y: -6,
            borderRadius: "14px",
            background: "rgba(255, 241, 252, 0.88)",
            boxShadow: "0 10px 35px rgba(74, 50, 56, 0.14)",
            duration: 0.6,
            ease: "power3.out",
        });
        gsap.to(name, { color: "#4a3238", duration: 0.5, ease: "power2.out" });
        gsap.to(num, { color: "#8c5f68", duration: 0.5, ease: "power2.out" });
    }, []);

    const handleLeave = useCallback((index: number) => {
        const card = cardRefs.current[index];
        const name = nameRefs.current[index];
        const num = numberRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            y: 0,
            borderRadius: "0px",
            background: "rgba(255, 241, 252, 0)",
            boxShadow: "0 0 0 rgba(74, 50, 56, 0)",
            duration: 0.5,
            ease: "power2.inOut",
        });
        gsap.to(name, { color: "#ffffff", duration: 0.4, ease: "power2.inOut" });
        gsap.to(num, { color: "rgba(255, 255, 255, 0.6)", duration: 0.4, ease: "power2.inOut" });
    }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 25%",
                    toggleActions: "play none none none",
                },
                defaults: { ease: "power3.out" },
            });

            tl.from(headingRef.current, {
                autoAlpha: 0,
                y: 60,
                duration: 0.9,
            });

            tl.from(
                butterflyRef.current,
                { autoAlpha: 0, rotate: -15, scale: 0.5, duration: 0.8 },
                "-=0.5"
            );

            const items = itemsRef.current?.children;
            if (items) {
                tl.from(
                    Array.from(items),
                    {
                        autoAlpha: 0,
                        y: 40,
                        duration: 0.6,
                        stagger: 0.15,
                    },
                    "-=0.4"
                );
            }

            gsap.to(butterflyRef.current, {
                y: -30,
                rotate: 6,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #BE9699 45%, #BC989A 73%, #584547 100%)",
                padding: "100px 0 120px",
            }}
        >
            <div className="relative" style={{ padding: "0 8%" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: "60px" }}>
                    <h2
                        ref={headingRef}
                        className="text-[1.75rem] md:text-5xl lg:text-[3.5rem] font-normal leading-[1.1] tracking-[0.02em] uppercase"
                        style={{ color: "#fff", fontFamily: "var(--font-julius)" }}
                    >
                        Encontre sua essência
                    </h2>

                    <div ref={butterflyRef} className="hidden lg:block">
                        <Image
                            src="/images/Butterfly.png"
                            alt=""
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div ref={itemsRef} className="flex flex-col">
                    {categories.map((category, index) => (
                        <Link
                            key={category.number}
                            href={`/modelos?categoria=${category.name.toLowerCase()}`}
                            className="cursor-pointer block"
                            style={{
                                borderTop: "1px solid rgba(255, 255, 255, 0.25)",
                                borderBottom: index === categories.length - 1
                                    ? "1px solid rgba(255, 255, 255, 0.25)"
                                    : "none",
                                textDecoration: "none",
                            }}
                            onMouseEnter={() => handleEnter(index)}
                            onMouseLeave={() => handleLeave(index)}
                        >
                            <div
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className="flex items-center justify-between"
                                style={{ padding: "28px 28px", margin: "4px 0" }}
                            >
                                <span
                                    ref={(el) => { nameRefs.current[index] = el; }}
                                    className="text-2xl md:text-3xl lg:text-[2rem] font-normal uppercase tracking-[0.04em]"
                                    style={{ fontFamily: "var(--font-julius)", color: "#fff" }}
                                >
                                    {category.name}
                                </span>
                                <span
                                    ref={(el) => { numberRefs.current[index] = el; }}
                                    className="text-lg font-normal"
                                    style={{ fontFamily: "var(--font-julius)", color: "rgba(255, 255, 255, 0.6)" }}
                                >
                                    {category.number}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
