"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface NavbarProps {
    isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useGSAP(
        () => {
            if (!isVisible) return;
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            gsap.set(navRef.current, { autoAlpha: 0, y: -20 });
            gsap.set(logoRef.current, { autoAlpha: 0, x: -30 });
            gsap.set(actionsRef.current, { autoAlpha: 0, x: 30 });
            tl.to(navRef.current, { autoAlpha: 1, y: 0, duration: 0.6 });
            tl.to(logoRef.current, { autoAlpha: 1, x: 0, duration: 0.5 }, "-=0.3");
            tl.to(actionsRef.current, { autoAlpha: 1, x: 0, duration: 0.5 }, "-=0.3");
        },
        { scope: navRef, dependencies: [isVisible] }
    );

    const navLinks = [
        { label: "Início", href: "/" },
        { label: "Sobre", href: "/#sobre" },
        { label: "Modelos", href: "/modelos" },
        { label: "Compras", href: "/#compras" },
    ];

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-40"
                style={{ visibility: "hidden", background: "#FFF1FC" }}
            >
                {/* ═══════════════════════════════════════════════
                    DESKTOP — >=1024px — NÃO MEXER
                ═══════════════════════════════════════════════ */}
                <div className="hidden lg:flex items-center justify-between px-16 py-4">
                    <div
                        ref={logoRef}
                        className="flex items-center gap-4"
                        style={{ visibility: "hidden" }}
                    >
                        <Image
                            src="/images/Butterfly.png"
                            alt="Rutiely Fashion"
                            width={64}
                            height={64}
                            className="object-contain"
                        />
                        <Link href="/" className="flex flex-col leading-tight">
                            <span
                                className="font-display text-xl font-semibold tracking-[0.25em] uppercase"
                                style={{ color: "var(--rose-800)" }}
                            >
                                Rutiely Fashion
                            </span>
                            <span
                                className="font-body text-[10px] font-medium tracking-[0.25em] uppercase"
                                style={{ color: "var(--rose-500)" }}
                            >
                                Moda Feminina
                            </span>
                        </Link>
                    </div>

                    <ul className="flex items-center gap-14">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="font-body text-xs font-medium tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-60"
                                    style={{ color: "var(--rose-700)" }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div
                        ref={actionsRef}
                        className="flex items-center"
                        style={{ visibility: "hidden" }}
                    >
                        <Link
                            href="#orcamento"
                            className="group relative font-body text-xs font-medium tracking-[0.2em] uppercase border overflow-hidden border-[var(--rose-800)]"
                            style={{ padding: "14px 40px" }}
                        >
                            <span
                                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                style={{ background: "var(--rose-800)" }}
                            />
                            <span className="relative z-10 text-[#4A3238] group-hover:text-[#FFF1FC] transition-colors duration-500">
                                Orçamento
                            </span>
                        </Link>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════
                    MOBILE — <1024px — Navbar compacta
                    Logo + Orçamento (botão) + Hamburger
                ═══════════════════════════════════════════════ */}
                <div className="flex lg:hidden items-center justify-between px-4 py-2.5">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/Butterfly.png"
                            alt="Rutiely Fashion"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                        <Link href="/" className="flex flex-col leading-tight">
                            <span
                                className="font-display text-[13px] font-semibold tracking-[0.08em] uppercase"
                                style={{ color: "var(--rose-800)" }}
                            >
                                Rutiely Fashion
                            </span>
                            <span
                                className="font-body text-[6px] font-medium tracking-[0.08em] uppercase"
                                style={{ color: "var(--rose-500)" }}
                            >
                                Moda Feminina
                            </span>
                        </Link>
                    </div>

                    {/* Orçamento + Hamburger */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="#orcamento"
                            className="font-body text-[9px] font-semibold tracking-[0.15em] uppercase border px-3 py-1.5"
                            style={{
                                color: "var(--rose-800)",
                                borderColor: "var(--rose-800)",
                            }}
                        >
                            Orçamento
                        </Link>

                        <button
                            onClick={toggleMobile}
                            className="relative flex items-center justify-center w-9 h-9"
                            aria-label="Menu"
                        >
                            <span
                                className="absolute block w-[18px] h-[1.5px] transition-all duration-300"
                                style={{
                                    background: "var(--rose-800)",
                                    transform: mobileOpen ? "rotate(45deg)" : "translateY(-4px)",
                                }}
                            />
                            <span
                                className="absolute block w-3 h-[1.5px] transition-all duration-300"
                                style={{
                                    background: "var(--rose-800)",
                                    opacity: mobileOpen ? 0 : 1,
                                }}
                            />
                            <span
                                className="absolute block w-[18px] h-[1.5px] transition-all duration-300"
                                style={{
                                    background: "var(--rose-800)",
                                    transform: mobileOpen ? "rotate(-45deg)" : "translateY(4px)",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════════
                MOBILE FULLSCREEN MENU — Cobre tela inteira
            ═══════════════════════════════════════════════ */}
            <div
                className="fixed inset-0 lg:hidden flex flex-col transition-all duration-500"
                style={{
                    background: "linear-gradient(170deg, #FFF1FC 0%, #fdf2f4 40%, #f5dce1 100%)",
                    opacity: mobileOpen ? 1 : 0,
                    pointerEvents: mobileOpen ? "auto" : "none",
                    zIndex: 50,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Header do menu — Brand + Close */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/Butterfly.png"
                            alt=""
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                        <span
                            className="font-display text-[13px] font-semibold tracking-[0.08em] uppercase"
                            style={{ color: "var(--rose-800)" }}
                        >
                            Rutiely Fashion
                        </span>
                    </div>
                    <button
                        onClick={closeMobile}
                        className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
                        style={{ background: "rgba(107, 74, 82, 0.06)" }}
                        aria-label="Fechar menu"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="var(--rose-700)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        >
                            <line x1="2" y1="2" x2="14" y2="14" />
                            <line x1="14" y1="2" x2="2" y2="14" />
                        </svg>
                    </button>
                </div>

                {/* Separador */}
                <div
                    className="mx-8"
                    style={{
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, var(--rose-200), transparent)",
                    }}
                />

                {/* Links centralizados — área principal */}
                <div className="flex-1 flex flex-col items-center justify-center px-8">
                    <ul className="flex flex-col items-center gap-2">
                        {navLinks.map((item, i) => (
                            <li key={item.label} className="w-full">
                                <Link
                                    href={item.href}
                                    onClick={closeMobile}
                                    className="group flex flex-col items-center py-4 transition-all duration-300"
                                >
                                    <span
                                        className="font-display text-2xl font-medium tracking-[0.12em] uppercase transition-all duration-300 group-active:scale-95"
                                        style={{ color: "var(--rose-800)" }}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className="block mt-1 h-[1px] w-0 group-hover:w-12 transition-all duration-500"
                                        style={{ background: "var(--rose-400)" }}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom — Orçamento CTA + butterfly watermark */}
                <div className="px-8 pb-10">
                    <div
                        className="mb-6"
                        style={{
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, var(--rose-200), transparent)",
                        }}
                    />

                    <Link
                        href="#orcamento"
                        onClick={closeMobile}
                        className="group relative flex items-center justify-center w-full overflow-hidden border transition-colors duration-500"
                        style={{
                            padding: "16px 0",
                            borderColor: "var(--rose-800)",
                        }}
                    >
                        <span
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            style={{ background: "var(--rose-800)" }}
                        />
                        <span
                            className="relative z-10 font-body text-xs font-semibold tracking-[0.25em] uppercase group-hover:text-[#FFF1FC] transition-colors duration-500"
                            style={{ color: "var(--rose-800)" }}
                        >
                            Solicitar Orçamento
                        </span>
                    </Link>

                    <div className="flex items-center justify-center mt-5 gap-2 opacity-25">
                        <Image
                            src="/images/Butterfly.png"
                            alt=""
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                        <span
                            className="font-body text-[8px] tracking-[0.2em] uppercase"
                            style={{ color: "var(--rose-600)" }}
                        >
                            Moda Feminina
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
