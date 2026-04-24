"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CartIcon from "@/components/cart/CartIcon";

gsap.registerPlugin(useGSAP);

const navLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Modelos", href: "/modelos" },
    { label: "Compras", href: "/#compras" },
];

export default function ModelosNavbar() {
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(navRef.current, { autoAlpha: 0, y: -20, duration: 0.6 });
        tl.from(logoRef.current, { autoAlpha: 0, x: -30, duration: 0.5 }, "-=0.3");

        const lis = linksRef.current?.querySelectorAll("li");
        if (lis) {
            tl.from(Array.from(lis), { autoAlpha: 0, y: -15, duration: 0.4, stagger: 0.08 }, "-=0.3");
        }

        tl.from(actionsRef.current, { autoAlpha: 0, x: 30, duration: 0.5 }, "-=0.3");
    });

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-10 py-4 lg:px-16 modelos-nav"
            style={{ background: "#FFF1FC" }}
        >
            <div ref={logoRef} className="flex items-center gap-4 modelos-nav-logo">
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

            <ul ref={linksRef} className="hidden md:flex items-center gap-14">
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

            <div ref={actionsRef} className="flex items-center" style={{ gap: "20px" }}>
                <Link
                    href="/#orcamento"
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

                <CartIcon />
            </div>
        </nav>
    );
}
