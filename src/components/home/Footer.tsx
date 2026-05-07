"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────────

const ABOUT_LINKS = [
    { label: "Nossa História", href: "/#sobre" },
    { label: "Contato", href: "/#contato" },
    { label: "Blog", href: "/blog" },
];

const LEGAL_LINKS = [
    { label: "FAQ", href: "/faq" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Cuidados", href: "/cuidados" },
    { label: "Privacidade", href: "/privacidade" },
];

const SOCIAL_LINKS = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

interface FooterColumnProps {
    title: string;
    links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div className="flex flex-col gap-5">
            <span
                className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "var(--rose-900)", fontFamily: "var(--font-body)" }}
            >
                {title}
            </span>
            <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                    <li key={label}>
                        <Link
                            href={href}
                            className="text-[13px] font-normal leading-snug transition-opacity duration-200 hover:opacity-50"
                            style={{ color: "var(--rose-800)", fontFamily: "var(--font-body)" }}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function NewsletterColumn() {
    const [email, setEmail] = useState("");

    return (
        <div className="flex flex-col gap-5 max-w-xs">
            <span
                className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "var(--rose-900)", fontFamily: "var(--font-body)" }}
            >
                Vamos Conectar
            </span>

            <p
                className="text-[13px] font-normal leading-relaxed"
                style={{ color: "var(--rose-700)", fontFamily: "var(--font-body)" }}
            >
                Assine nossa newsletter e ganhe{" "}
                <strong className="font-semibold">10% de desconto</strong> no
                primeiro pedido.
            </p>

            <div className="flex flex-col gap-1">
                <div
                    className="flex items-center justify-between pb-2"
                    style={{ borderBottom: "1px solid var(--rose-400)" }}
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu e-mail"
                        aria-label="Endereço de e-mail para newsletter"
                        className="flex-1 bg-transparent outline-none text-[13px] placeholder:opacity-50"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-body)",
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setEmail("")}
                        className="ml-4 text-[10px] font-semibold tracking-[0.18em] uppercase transition-opacity duration-200 hover:opacity-50 cursor-pointer"
                        style={{ color: "var(--rose-900)", fontFamily: "var(--font-body)" }}
                    >
                        Assinar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(innerRef.current, {
                autoAlpha: 0,
                y: 24,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: footerRef }
    );

    return (
        <footer
            ref={footerRef}
            className="relative w-full"
            style={{ background: "#f5e8f0" }}
        >
            <div ref={innerRef} style={{ padding: "64px 8% 0" }}>

                {/* Logo */}
                <div className="mb-12">
                    <Image
                        src="/images/Butterfly.png"
                        alt="Rutiely Fashion"
                        width={52}
                        height={52}
                        className="object-contain"
                    />
                </div>

                {/* 4-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16"
                    style={{ borderBottom: "1px solid var(--rose-300)" }}
                >
                    {/* Col 1 — Newsletter */}
                    <NewsletterColumn />

                    {/* Col 2 — Sobre */}
                    <FooterColumn title="Sobre" links={ABOUT_LINKS} />

                    {/* Col 3 — Legal */}
                    <FooterColumn title="Legal" links={LEGAL_LINKS} />

                    {/* Col 4 — Redes Sociais */}
                    <FooterColumn title="Redes Sociais" links={SOCIAL_LINKS} />
                </div>

                {/* Bottom strip — copyright */}
                <div className="flex items-center py-6">
                    <span
                        className="text-[11px] font-normal tracking-[0.08em]"
                        style={{ color: "var(--rose-500)", fontFamily: "var(--font-body)" }}
                    >
                        © 2026 Rutiely Fashion – Moda Feminina
                    </span>
                </div>

            </div>
        </footer>
    );
}
