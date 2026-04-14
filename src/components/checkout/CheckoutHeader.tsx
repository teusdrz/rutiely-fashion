"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

export default function CheckoutHeader() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(headerRef.current, {
                autoAlpha: 0,
                y: -20,
                duration: 0.6,
                ease: "power3.out",
            });
        },
        { scope: headerRef }
    );

    return (
        <header
            ref={headerRef}
            className="flex items-center justify-between px-8 py-5 lg:px-16"
            style={{ borderBottom: "1px solid var(--rose-200)" }}
        >
            <Link
                href="/modelos"
                className="flex items-center gap-2 text-[11px] font-normal tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-60"
                style={{
                    color: "var(--rose-700)",
                    fontFamily: "var(--font-julius)",
                }}
            >
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
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Voltar
            </Link>

            <Link href="/" className="flex items-center gap-3">
                <Image
                    src="/images/Butterfly.png"
                    alt="Rutiely Fashion"
                    width={40}
                    height={40}
                    className="object-contain"
                />
                <span
                    className="font-display text-lg font-semibold tracking-[0.25em] uppercase hidden sm:block"
                    style={{ color: "var(--rose-800)" }}
                >
                    Rutiely Fashion
                </span>
            </Link>

            <div className="flex items-center gap-2">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--rose-500)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                </svg>
                <span
                    className="text-[10px] tracking-[0.1em] uppercase"
                    style={{ color: "var(--rose-500)", fontFamily: "var(--font-julius)" }}
                >
                    Compra Segura
                </span>
            </div>
        </header>
    );
}
