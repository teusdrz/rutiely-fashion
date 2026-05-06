"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroBackground from "./hero/HeroBackground";
import HeroText from "./hero/HeroText";

gsap.registerPlugin(useGSAP);

interface HeroSectionProps {
    /** Triggered by LoadingScreen completion — starts the entrance animation */
    isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!isVisible) return;

            // ─── Set initial hidden states ──────────────────────────
            gsap.set(sectionRef.current, { autoAlpha: 0 });
            gsap.set(backgroundRef.current, { autoAlpha: 0, scale: 1.06 });
            gsap.set(textRef.current, { autoAlpha: 0, y: 32 });

            // ─── Entrance timeline ──────────────────────────────────
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.25,
            });

            tl
                // 1. Section becomes visible
                .to(sectionRef.current, { autoAlpha: 1, duration: 0.25 })

                // 2. Image fades in with a subtle Ken Burns zoom-out
                .to(
                    backgroundRef.current,
                    { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
                    "-=0.1"
                )

                // 3. Text rises into place
                .to(
                    textRef.current,
                    { autoAlpha: 1, y: 0, duration: 1.0 },
                    "-=0.9"
                );
        },
        { scope: sectionRef, dependencies: [isVisible] }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{
                height: "100svh",
                visibility: "hidden",
            }}
        >
            <HeroBackground ref={backgroundRef} />
            <HeroText ref={textRef} />
        </section>
    );
}
