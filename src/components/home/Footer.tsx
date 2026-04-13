"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const footerLinks = ["Início", "Sobre", "Contato", "Modelos"];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(contentRef.current, {
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: footerRef }
    );

    const scrollToTop = () => {
        gsap.to(window, { scrollTo: 0, duration: 1.2, ease: "power3.inOut" });
    };

    return (
        <footer
            ref={footerRef}
            className="relative w-full"
            style={{ background: "#FFF1FC", padding: "60px 0 40px" }}
        >
            <div
                ref={contentRef}
                className="flex items-center justify-between"
                style={{ padding: "0 8%" }}
            >
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/Butterfly.png"
                        alt="Rutiely Fashion"
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                    <div className="flex flex-col leading-tight">
                        <span
                            className="text-base font-normal tracking-[0.25em] uppercase"
                            style={{ color: "var(--rose-800)", fontFamily: "var(--font-julius)" }}
                        >
                            Rutiely Fashion
                        </span>
                        <span
                            className="text-[9px] font-normal tracking-[0.25em] uppercase"
                            style={{ color: "var(--rose-500)", fontFamily: "var(--font-julius)" }}
                        >
                            Moda Feminina
                        </span>
                    </div>
                </div>

                <ul className="hidden md:flex items-center gap-10">
                    {footerLinks.map((item) => (
                        <li key={item}>
                            <Link
                                href={`#${item.toLowerCase()}`}
                                className="text-[11px] font-normal tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-60"
                                style={{
                                    color: "var(--rose-700)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={scrollToTop}
                    className="flex items-center justify-center cursor-pointer transition-opacity duration-300 hover:opacity-60"
                    style={{
                        width: "44px",
                        height: "44px",
                        border: "1px solid var(--rose-400)",
                        background: "transparent",
                    }}
                    aria-label="Voltar ao topo"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--rose-700)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </button>
            </div>

            <div
                className="flex items-center justify-center"
                style={{
                    marginTop: "40px",
                    padding: "0 8%",
                    borderTop: "1px solid var(--rose-200)",
                    paddingTop: "20px",
                }}
            >
                <span
                    className="text-[10px] font-normal tracking-[0.1em] uppercase"
                    style={{ color: "var(--rose-400)", fontFamily: "var(--font-julius)" }}
                >
                    © 2025 Rutiely Fashion. Todos os direitos reservados.
                </span>
            </div>
        </footer>
    );
}
