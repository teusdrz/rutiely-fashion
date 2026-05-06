"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/cart/CartIcon";

gsap.registerPlugin(useGSAP);

interface NavbarProps {
    isVisible: boolean;
}

const NAV_LINKS = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/#sobre" },
];

export default function Navbar({ isVisible }: NavbarProps) {
    const pillRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchWrapRef = useRef<HTMLDivElement>(null);

    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSearch = useCallback(() => {
        setSearchOpen((v) => {
            if (!v) setTimeout(() => searchInputRef.current?.focus(), 120);
            return !v;
        });
    }, []);

    const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useGSAP(() => {
        if (!isVisible) return;

        gsap.set(pillRef.current, { autoAlpha: 0, y: -28, scale: 0.96 });
        gsap.set(logoRef.current, { autoAlpha: 0, x: -16 });
        gsap.set(actionsRef.current, { autoAlpha: 0, x: 16 });

        const linkEls = linksRef.current
            ? Array.from(linksRef.current.children)
            : [];
        gsap.set(linkEls, { autoAlpha: 0, y: -8 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.4 });
        tl.to(pillRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 });
        tl.to(logoRef.current, { autoAlpha: 1, x: 0, duration: 0.5 }, "-=0.35");
        tl.to(linkEls, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.3");
        tl.to(actionsRef.current, { autoAlpha: 1, x: 0, duration: 0.45 }, "-=0.3");
    }, [isVisible]);

    useGSAP(() => {
        if (!searchWrapRef.current) return;
        gsap.to(searchWrapRef.current, {
            width: searchOpen ? 180 : 0,
            opacity: searchOpen ? 1 : 0,
            duration: 0.4,
            ease: "power3.inOut",
        });
    }, [searchOpen]);

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-40 flex justify-center"
                style={{ paddingTop: "20px", pointerEvents: "none" }}
            >
                <div
                    ref={pillRef}
                    className="flex items-center justify-between"
                    style={{
                        pointerEvents: "auto",
                        background: "rgba(255,255,255,0.97)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        borderRadius: "100px",
                        boxShadow: "0 4px 28px rgba(74,50,56,0.13), 0 1px 4px rgba(74,50,56,0.07)",
                        padding: "10px 20px 10px 16px",
                        gap: "32px",
                        visibility: "hidden",
                        width: "clamp(320px, 72vw, 860px)",
                    }}
                >
                    <div ref={logoRef} style={{ visibility: "hidden" }}>
                        <Link href="/" className="flex items-center gap-2.5 shrink-0">
                            <Image
                                src="/images/Butterfly.png"
                                alt="Rutiely Fashion"
                                width={36}
                                height={36}
                                className="object-contain"
                            />
                            <span
                                style={{
                                    fontFamily: "var(--font-cormorant, var(--font-display))",
                                    fontWeight: 600,
                                    fontSize: "1.05rem",
                                    letterSpacing: "0.18em",
                                    color: "var(--rose-800)",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Rutiely Fashion
                            </span>
                        </Link>
                    </div>

                    <ul
                        ref={linksRef}
                        className="hidden md:flex items-center flex-1 justify-center"
                        style={{ gap: "36px", listStyle: "none" }}
                    >
                        {NAV_LINKS.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="relative group font-body text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300"
                                    style={{ color: "var(--rose-700)" }}
                                >
                                    {item.label}
                                    <span
                                        className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300"
                                        style={{ background: "var(--rose-500)" }}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div
                        ref={actionsRef}
                        className="flex items-center shrink-0"
                        style={{ gap: "8px", visibility: "hidden" }}
                    >
                        <div className="flex items-center gap-1.5">
                            <div
                                ref={searchWrapRef}
                                className="overflow-hidden"
                                style={{ width: 0, opacity: 0 }}
                            >
                                <input
                                    ref={searchInputRef}
                                    type="search"
                                    placeholder="Buscar..."
                                    onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                                    className="w-full bg-transparent outline-none font-body text-[12px] tracking-[0.08em]"
                                    style={{
                                        color: "var(--rose-800)",
                                        borderBottom: "1px solid var(--rose-300)",
                                        paddingBottom: "2px",
                                    }}
                                />
                            </div>

                            <button
                                onClick={toggleSearch}
                                aria-label="Buscar"
                                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-rose-50"
                                style={{ color: "var(--rose-700)" }}
                            >
                                {searchOpen ? (
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                                        <line x1="1" y1="1" x2="14" y2="14" />
                                        <line x1="14" y1="1" x2="1" y2="14" />
                                    </svg>
                                ) : (
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="7.5" cy="7.5" r="5" />
                                        <line x1="11.5" y1="11.5" x2="15" y2="15" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <CartIcon />

                        <button
                            onClick={toggleMobile}
                            aria-label="Menu"
                            className="flex md:hidden flex-col items-center justify-center w-9 h-9 gap-[5px]"
                        >
                            <span
                                className="block h-[1.5px] transition-all duration-300 origin-center"
                                style={{
                                    width: "18px",
                                    background: "var(--rose-800)",
                                    transform: mobileOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                                }}
                            />
                            <span
                                className="block h-[1.5px] transition-all duration-300"
                                style={{
                                    width: "12px",
                                    background: "var(--rose-800)",
                                    opacity: mobileOpen ? 0 : 1,
                                    alignSelf: "flex-start",
                                    marginLeft: "3px",
                                }}
                            />
                            <span
                                className="block h-[1.5px] transition-all duration-300 origin-center"
                                style={{
                                    width: "18px",
                                    background: "var(--rose-800)",
                                    transform: mobileOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className="fixed inset-0 md:hidden flex flex-col z-50 transition-all duration-500"
                style={{
                    background: "linear-gradient(160deg, #FFF1FC 0%, #f5dce1 100%)",
                    opacity: mobileOpen ? 1 : 0,
                    pointerEvents: mobileOpen ? "auto" : "none",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                    <Link href="/" onClick={closeMobile} className="flex items-center gap-2">
                        <Image src="/images/Butterfly.png" alt="" width={28} height={28} className="object-contain" />
                        <span
                            style={{
                                fontFamily: "var(--font-cormorant, var(--font-display))",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                letterSpacing: "0.14em",
                                color: "var(--rose-800)",
                                textTransform: "uppercase",
                            }}
                        >
                            Rutiely Fashion
                        </span>
                    </Link>
                    <button
                        onClick={closeMobile}
                        aria-label="Fechar menu"
                        className="flex items-center justify-center w-10 h-10 rounded-full"
                        style={{ background: "rgba(107,74,82,0.07)" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--rose-700)" strokeWidth="1.6" strokeLinecap="round">
                            <line x1="1" y1="1" x2="13" y2="13" />
                            <line x1="13" y1="1" x2="1" y2="13" />
                        </svg>
                    </button>
                </div>

                <div className="mx-6 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--rose-200), transparent)" }} />

                <ul className="flex-1 flex flex-col items-center justify-center gap-2" style={{ listStyle: "none" }}>
                    {NAV_LINKS.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                onClick={closeMobile}
                                className="block py-4 font-display text-3xl font-medium tracking-[0.1em] uppercase transition-opacity duration-200 active:opacity-60"
                                style={{ color: "var(--rose-800)" }}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center pb-10 opacity-20">
                    <Image src="/images/Butterfly.png" alt="" width={32} height={32} className="object-contain" />
                </div>
            </div>
        </>
    );
}
