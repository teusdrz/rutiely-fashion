"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const fields = [
    { label: "Seu Nome", name: "firstName", type: "text" },
    { label: "Sobrenome", name: "lastName", type: "text" },
    { label: "Telefone", name: "phone", type: "tel" },
    { label: "Email", name: "email", type: "email" },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineImageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const butterflyTopRef = useRef<HTMLDivElement>(null);
    const butterflyBottomRef = useRef<HTMLDivElement>(null);

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

            tl.from(lineImageRef.current, {
                autoAlpha: 0,
                x: -80,
                duration: 1.2,
            });

            tl.from(
                titleRef.current,
                { autoAlpha: 0, y: 40, duration: 0.8 },
                "-=0.7"
            );

            tl.from(
                dividerRef.current,
                { autoAlpha: 0, scaleX: 0, transformOrigin: "left center", duration: 0.7 },
                "-=0.4"
            );

            tl.from(
                descRef.current,
                { autoAlpha: 0, y: 25, duration: 0.7 },
                "-=0.3"
            );

            const formChildren = formRef.current?.children;
            if (formChildren) {
                tl.from(
                    Array.from(formChildren),
                    { autoAlpha: 0, y: 30, duration: 0.5, stagger: 0.1 },
                    "-=0.3"
                );
            }

            tl.from(
                butterflyTopRef.current,
                { autoAlpha: 0, rotate: -15, scale: 0.5, duration: 0.8 },
                "-=0.8"
            );

            tl.from(
                butterflyBottomRef.current,
                { autoAlpha: 0, rotate: 10, scale: 0.5, duration: 0.8 },
                "-=0.6"
            );

            gsap.to(butterflyTopRef.current, {
                y: -35,
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
                y: -45,
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
            style={{ background: "#FFF1FC", marginTop: "-1px" }}
        >
            <style>{`
                .contact-section-inner { padding: 300px 0 100px; }
                @media (max-width: 767px) {
                    .contact-section-inner { padding: 100px 0 60px; }
                    .contact-content-wrapper { margin-left: 0 !important; padding: 0 6% !important; }
                    .contact-text-col { margin-left: 0 !important; }
                    .contact-line-image { display: none !important; }
                    .contact-butterfly-top { right: 2% !important; top: 2% !important; width: 100px; height: 100px; }
                    .contact-butterfly-top img { width: 100px !important; height: 100px !important; }
                    .contact-butterfly-bottom { left: 5% !important; bottom: 3% !important; width: 80px; height: 80px; }
                    .contact-butterfly-bottom img { width: 80px !important; height: 80px !important; }
                }
            `}</style>
            <div className="contact-section-inner">
                <div
                    ref={lineImageRef}
                    className="absolute left-0 pointer-events-none contact-line-image"
                    style={{ width: "280px", top: "-60px", height: "85%" }}
                >
                    <Image
                        src="/images/Linha-Fashion.png"
                        alt=""
                        fill
                        className="object-contain object-left-top"
                    />
                </div>

                <div
                    ref={butterflyTopRef}
                    className="absolute pointer-events-none contact-butterfly-top"
                    style={{ right: "5%", top: "8%" }}
                >
                    <Image
                        src="/images/Butterfly.png"
                        alt=""
                        width={160}
                        height={160}
                        className="object-contain"
                    />
                </div>

                <div
                    ref={butterflyBottomRef}
                    className="absolute pointer-events-none contact-butterfly-bottom"
                    style={{ left: "25%", bottom: "6%" }}
                >
                    <Image
                        src="/images/Butterfly.png"
                        alt=""
                        width={140}
                        height={140}
                        className="object-contain"
                        style={{ transform: "scaleX(-1)" }}
                    />
                </div>

                <div className="relative contact-content-wrapper" style={{ padding: "0 8%", marginLeft: "280px" }}>
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        <div className="flex flex-col lg:w-[40%] contact-text-col" style={{ paddingTop: "20px", marginLeft: "-80px" }}>
                            <h2
                                ref={titleRef}
                                className="text-4xl md:text-5xl lg:text-[3.2rem] font-normal tracking-[0.08em] uppercase"
                                style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)" }}
                            >
                                Contato
                            </h2>

                            <div
                                ref={dividerRef}
                                className="flex items-center gap-3"
                                style={{ marginTop: "24px", marginBottom: "28px" }}
                            >
                                <div
                                    className="flex-1"
                                    style={{ height: "1px", background: "#000000" }}
                                />
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </div>

                            <p
                                ref={descRef}
                                className="text-[13px] font-normal leading-[2] tracking-[0] uppercase"
                                style={{
                                    color: "#1a1a1a",
                                    fontFamily: "var(--font-julius)",
                                    maxWidth: "380px",
                                }}
                            >
                                Ficou com alguma dúvida ou quer saber
                                <br />
                                mais sobre nossos produtos? Entre em
                                <br />
                                contato conosco! Estamos prontos para
                                <br />
                                te atender com carinho e atenção.
                            </p>
                        </div>

                        <form
                            ref={formRef}
                            className="flex flex-col gap-6 lg:w-[55%]"
                            onSubmit={(e) => e.preventDefault()}
                            style={{ paddingTop: "20px" }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {fields.map((field) => (
                                    <div key={field.name} className="flex flex-col gap-2">
                                        <label
                                            htmlFor={field.name}
                                            className="text-[11px] font-normal tracking-[0.15em] uppercase"
                                            style={{
                                                color: "#000000",
                                                fontFamily: "var(--font-julius)",
                                            }}
                                        >
                                            {field.label}
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            className="w-full bg-transparent outline-none text-sm font-normal"
                                            style={{
                                                borderBottom: "1px solid #000000",
                                                padding: "10px 0",
                                                color: "var(--rose-900)",
                                                fontFamily: "var(--font-julius)",
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="comments"
                                    className="text-[11px] font-normal tracking-[0.15em] uppercase"
                                    style={{
                                        color: "#000000",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    Comentários
                                </label>
                                <textarea
                                    id="comments"
                                    name="comments"
                                    rows={4}
                                    className="w-full bg-transparent outline-none text-sm font-normal resize-none"
                                    style={{
                                        borderBottom: "1px solid #000000",
                                        padding: "10px 0",
                                        color: "var(--rose-900)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="self-start group relative overflow-hidden text-[12px] font-normal tracking-[0.2em] uppercase cursor-pointer"
                                style={{
                                    fontFamily: "var(--font-julius)",
                                    padding: "16px 48px",
                                    marginTop: "12px",
                                    background: "var(--rose-500)",
                                    color: "#fff",
                                    border: "none",
                                    letterSpacing: "0.15em",
                                }}
                            >
                                <span
                                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                    style={{ background: "var(--rose-800)" }}
                                />
                                <span className="relative z-10 flex items-center gap-3">
                                    Enviar
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
