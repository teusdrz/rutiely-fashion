"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutCard from "./about/AboutCard";
import { ABOUT_FEATURES } from "@/data/aboutFeatures";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!cardsRef.current) return;
            const cards = Array.from(cardsRef.current.children);

            gsap.from(cards, {
                autoAlpha: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.18,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="sobre"
            ref={sectionRef}
            style={{
                background: "#FFF1FC",
                padding: "160px 5% 140px",
            }}
        >
            <div
                ref={cardsRef}
                className="flex flex-wrap items-start justify-center"
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    gap: "60px 0",
                }}
            >
                {ABOUT_FEATURES.map((feature) => (
                    <AboutCard key={feature.title} {...feature} />
                ))}
            </div>
        </section>
    );
}
