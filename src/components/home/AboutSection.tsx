"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const butterflyTopRef = useRef<HTMLDivElement>(null);
    const butterflyBottomRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none none",
                },
                defaults: { ease: "power3.out" },
            });

            tl.from(headingRef.current, {
                autoAlpha: 0,
                y: 50,
                duration: 0.8,
            });

            tl.from(
                textRef.current,
                { autoAlpha: 0, y: 30, duration: 0.7 },
                "-=0.4"
            );

            tl.from(
                imageRef.current,
                { autoAlpha: 0, x: 120, duration: 1.2, ease: "power2.out" },
                "-=0.5"
            );

            tl.from(
                butterflyTopRef.current,
                { autoAlpha: 0, rotate: -20, scale: 0.6, duration: 0.8 },
                "-=0.6"
            );

            tl.from(
                butterflyBottomRef.current,
                { autoAlpha: 0, rotate: 15, scale: 0.6, duration: 0.8 },
                "-=0.5"
            );

            gsap.to(imageRef.current, {
                y: -60,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            gsap.to(butterflyTopRef.current, {
                y: -40,
                rotate: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            gsap.to(butterflyBottomRef.current, {
                y: -50,
                rotate: -6,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ background: "#FFF1FC", paddingTop: "120px" }}
        >
            <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-0" style={{ padding: "6% 5%" }}>
                <div className="flex flex-col gap-10 lg:w-[50%]">
                    <h2
                        ref={headingRef}
                        className="text-4xl md:text-5xl lg:text-[3.2rem] font-normal leading-[1.2] tracking-[0] uppercase"
                        style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)", marginTop: "-40px" }}
                    >
                        Elegância e atitude
                        <br />
                        em um só estilo
                    </h2>

                    <p
                        ref={textRef}
                        className="text-[13px] font-normal leading-[1.8] tracking-[0] uppercase"
                        style={{ color: "#1a1a1a", maxWidth: "480px", marginTop: "180px", fontFamily: "var(--font-julius)" }}
                    >
                        A Rutiely Fashion nasceu do desejo de celebrar a beleza
                        única, a autenticidade e a força de cada mulher. Nossas
                        peças unem conforto e sofisticação, sendo cuidadosamente
                        pensadas para valorizar a sua essência em todos os
                        momentos.
                    </p>
                </div>

                <div className="relative lg:w-[50%] flex justify-center items-start" style={{ marginTop: "100px" }}>
                    <div
                        ref={butterflyTopRef}
                        className="absolute -top-8 -right-2 lg:right-4 z-10"
                    >
                        <Image
                            src="/images/Butterfly.png"
                            alt=""
                            width={120}
                            height={120}
                            className="object-contain"
                        />
                    </div>

                    <div
                        ref={imageRef}
                        className="relative w-full max-w-[420px] overflow-hidden"
                        style={{ boxShadow: "8px 8px 30px rgba(74, 50, 56, 0.25), -4px -4px 20px rgba(74, 50, 56, 0.08)" }}
                    >
                        <Image
                            src="/images/Rutiely.png"
                            alt="Rutiely - Fundadora da Rutiely Fashion"
                            width={420}
                            height={560}
                            className="w-full h-auto object-cover"
                            sizes="(max-width: 768px) 100vw, 420px"
                        />
                    </div>
                </div>

                <div
                    ref={butterflyBottomRef}
                    className="absolute bottom-12 left-8 lg:left-12"
                >
                    <Image
                        src="/images/Butterfly.png"
                        alt=""
                        width={140}
                        height={140}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
