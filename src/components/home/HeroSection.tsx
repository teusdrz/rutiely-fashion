"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface HeroSectionProps {
    isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            if (!isVisible) return;

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.3,
            });

            gsap.set(sectionRef.current, { autoAlpha: 0 });
            gsap.set(headingRef.current, { autoAlpha: 0, y: 40 });
            gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
            gsap.set(imageRef.current, { autoAlpha: 0, scale: 0.95, x: 40 });
            gsap.set(footerRef.current, { autoAlpha: 0, y: 20 });
            gsap.set(arrowRef.current, { autoAlpha: 0, y: -10 });

            tl.to(sectionRef.current, {
                autoAlpha: 1,
                duration: 0.4,
            });

            tl.to(headingRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
            });

            tl.to(
                ctaRef.current,
                { autoAlpha: 1, y: 0, duration: 0.6 },
                "-=0.4"
            );

            tl.to(
                imageRef.current,
                { autoAlpha: 1, scale: 1, x: 0, duration: 1, ease: "power2.out" },
                "-=0.6"
            );

            tl.to(
                footerRef.current,
                { autoAlpha: 1, y: 0, duration: 0.6 },
                "-=0.4"
            );

            tl.to(
                arrowRef.current,
                { autoAlpha: 1, y: 0, duration: 0.5 },
                "-=0.3"
            );

            gsap.to(arrowRef.current, {
                y: 6,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 2.5,
            });
        },
        { scope: sectionRef, dependencies: [isVisible] }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen flex flex-col overflow-hidden"
            style={{ background: "#FFF1FC", visibility: "hidden" }}
        >
            <div className="flex flex-1 pt-24" style={{ paddingLeft: "5%", paddingRight: "3%" }}>
                <div className="flex flex-col justify-center lg:w-[55%] gap-10 pb-20" style={{ paddingLeft: "4%" }}>
                    <h1
                        ref={headingRef}
                        className="text-2xl md:text-3xl lg:text-[1.85rem] font-normal leading-[1.4] tracking-[0.12em] uppercase whitespace-normal"
                        style={{ color: "var(--rose-800)", visibility: "hidden", maxWidth: "720px", fontFamily: "var(--font-julius)" }}
                    >
                        Borboleta em traços finos simboliza a transformação e a
                        beleza inerentes à moda feminina
                    </h1>
                    <a
                        ref={ctaRef}
                        href="#colecao"
                        className="inline-flex items-center justify-center gap-3 self-start font-body text-sm font-medium tracking-[0.15em] uppercase rounded-md transition-all duration-300 hover:brightness-110"
                        style={{
                            background: "linear-gradient(135deg, var(--rose-400), var(--rose-600))",
                            color: "var(--white)",
                            visibility: "hidden",
                            padding: "14px 40px",
                        }}
                    >
                        Saiba mais
                        <span className="text-base">→</span>
                    </a>
                </div>

                <div
                    ref={imageRef}
                    className="hidden lg:flex lg:w-[45%] justify-center items-center"
                    style={{ visibility: "hidden" }}
                >
                    <div
                        className="relative w-full max-w-[480px] h-[65vh] rounded-xl overflow-hidden"
                        style={{ boxShadow: "0 20px 60px rgba(74, 50, 56, 0.2)" }}
                    >
                        <Image
                            src="/images/hero-model.png"
                            alt="Modelo vestindo trench coat rosé"
                            fill
                            priority
                            className="object-cover object-top"
                            sizes="420px"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
                <div
                    ref={footerRef}
                    className="absolute left-10 lg:left-16 flex items-center gap-4"
                    style={{ visibility: "hidden" }}
                >
                    <Image
                        src="/images/Butterfly.png"
                        alt=""
                        width={32}
                        height={32}
                        className="object-contain opacity-50"
                    />
                    <p
                        className="font-body text-[11px] font-medium tracking-[0.12em] uppercase leading-relaxed"
                        style={{ color: "var(--rose-600)" }}
                    >
                        Conforto e cor em perfeita harmonia.
                        <br />
                        Elegância é a sua voz mais autêntica
                    </p>
                </div>

                <span
                    ref={arrowRef}
                    className="text-3xl font-light select-none"
                    style={{ color: "var(--rose-700)", visibility: "hidden" }}
                >
                    ↓
                </span>
            </div>
        </section>
    );
}
