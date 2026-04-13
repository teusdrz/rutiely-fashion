"use client";

import { useRef } from "react";
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
    const linksRef = useRef<HTMLUListElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!isVisible) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            gsap.set(navRef.current, { autoAlpha: 0, y: -20 });
            gsap.set(logoRef.current, { autoAlpha: 0, x: -30 });
            gsap.set("li", { autoAlpha: 0, y: -15 });
            gsap.set(actionsRef.current, { autoAlpha: 0, x: 30 });

            tl.to(navRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
            });

            tl.to(
                logoRef.current,
                {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.5,
                },
                "-=0.3"
            );

            tl.to(
                "li",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.08,
                },
                "-=0.3"
            );

            tl.to(
                actionsRef.current,
                {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.5,
                },
                "-=0.3"
            );
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
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-4 lg:px-16"
            style={{ visibility: "hidden", background: "#FFF1FC" }}
        >
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

            <ul
                ref={linksRef}
                className="hidden md:flex items-center gap-14"
            >
                {navLinks.map((item) => (
                    <li key={item.label} style={{ visibility: "hidden" }}>
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
                    style={{
                        padding: "14px 40px",
                        marginRight: "24px",
                    }}
                >
                    <span
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                        style={{ background: "var(--rose-800)" }}
                    />
                    <span
                        className="relative z-10 text-[#4A3238] group-hover:text-[#FFF1FC] transition-colors duration-500"
                    >
                        Orçamento
                    </span>
                </Link>
                <button
                    className="flex flex-col items-center justify-center gap-[5px] w-8 h-8 ml-6 md:hidden"
                    aria-label="Menu"
                >
                    <span
                        className="block w-6 h-[1.5px] transition-transform duration-300"
                        style={{ background: "var(--rose-800)" }}
                    />
                    <span
                        className="block w-4 h-[1.5px] transition-transform duration-300"
                        style={{ background: "var(--rose-800)" }}
                    />
                </button>
            </div>
        </nav>
    );
}
