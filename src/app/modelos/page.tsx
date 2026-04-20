"use client";

import { useRef, useCallback, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ProductModal from "@/components/modelos/ProductModal";
import { products, type Product } from "@/data/products";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ModelosContent() {
    const searchParams = useSearchParams();
    const categoriaParam = searchParams.get("categoria");

    const pageRef = useRef<HTMLDivElement>(null);
    const lineImageRef = useRef<HTMLDivElement>(null);
    const butterflyRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = useMemo(() => {
        if (!categoriaParam) return products;
        return products.filter((p) => p.category === categoriaParam);
    }, [categoriaParam]);

    const navLinks = [
        { label: "Início", href: "/" },
        { label: "Sobre", href: "/#sobre" },
        { label: "Modelos", href: "/modelos" },
        { label: "Compras", href: "/#compras" },
    ];

    /* ── Card hover ── */
    const handleCardEnter = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;

        gsap.to(card, { y: -8, duration: 0.5, ease: "power3.out" });

        const img = card.querySelector("img");
        if (img) {
            gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        }
    }, []);

    const handleCardLeave = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (!card) return;

        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" });

        const img = card.querySelector("img");
        if (img) {
            gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
        }
    }, []);

    /* ── Animations ── */
    useGSAP(
        () => {
            /* Navbar */
            const navTl = gsap.timeline({ defaults: { ease: "power3.out" } });

            navTl.from(navRef.current, { autoAlpha: 0, y: -20, duration: 0.6 });
            navTl.from(logoRef.current, { autoAlpha: 0, x: -30, duration: 0.5 }, "-=0.3");

            const lis = linksRef.current?.querySelectorAll("li");
            if (lis) {
                navTl.from(Array.from(lis), { autoAlpha: 0, y: -15, duration: 0.4, stagger: 0.08 }, "-=0.3");
            }

            navTl.from(actionsRef.current, { autoAlpha: 0, x: 30, duration: 0.5 }, "-=0.3");

            /* Page content */
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.3,
            });

            tl.from(lineImageRef.current, { autoAlpha: 0, x: -80, duration: 1.2 });
            tl.from(titleRef.current, { autoAlpha: 0, y: 50, duration: 0.9 }, "-=0.7");
            tl.from(butterflyRef.current, { autoAlpha: 0, rotate: -15, scale: 0.5, duration: 0.8 }, "-=0.5");
            tl.from(subtitleRef.current, { autoAlpha: 0, y: 30, duration: 0.7 }, "-=0.4");

            const cards = gridRef.current?.children;
            if (cards) {
                tl.from(
                    Array.from(cards),
                    { autoAlpha: 0, y: 60, duration: 0.7, stagger: 0.15 },
                    "-=0.3"
                );
            }

            /* Parallax butterfly */
            gsap.to(butterflyRef.current, {
                y: -35,
                rotate: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        },
        { scope: pageRef }
    );

    return (
        <div ref={pageRef} className="relative min-h-screen" style={{ background: "#FFF1FC" }}>
            <style>{`
                @media (max-width: 767px) {
                    .modelos-line-image { display: none !important; }
                    .modelos-butterfly { right: 4% !important; top: 10% !important; }
                    .modelos-butterfly img { width: 80px !important; height: 80px !important; }
                    .modelos-nav { padding-left: 16px !important; padding-right: 16px !important; }
                    .modelos-nav-logo img { width: 36px !important; height: 36px !important; }
                    .modelos-content { padding: 120px 5% 60px !important; }
                }
            `}</style>
            {/* ── Navbar ── */}
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

                <div ref={actionsRef} className="flex items-center">
                    <Link
                        href="/#orcamento"
                        className="group relative font-body text-xs font-medium tracking-[0.2em] uppercase border overflow-hidden border-[var(--rose-800)]"
                        style={{ padding: "14px 40px", marginRight: "24px" }}
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
            </nav>

            {/* ── Decorative line ── */}
            <div
                ref={lineImageRef}
                className="absolute left-0 top-0 pointer-events-none modelos-line-image"
                style={{ width: "280px", height: "70%" }}
            >
                <Image
                    src="/images/Linha-Fashion.png"
                    alt=""
                    fill
                    className="object-contain object-left-top"
                />
            </div>

            {/* ── Decorative butterfly ── */}
            <div
                ref={butterflyRef}
                className="absolute pointer-events-none modelos-butterfly"
                style={{ right: "16%", top: "18%" }}
            >
                <Image
                    src="/images/Butterfly.png"
                    alt=""
                    width={140}
                    height={140}
                    className="object-contain"
                />
            </div>

            {/* ── Content ── */}
            <div className="relative modelos-content" style={{ padding: "180px 5% 100px" }}>
                {/* Title */}
                <h1
                    ref={titleRef}
                    className="text-center text-4xl md:text-5xl lg:text-[3.8rem] font-normal tracking-[0.06em] uppercase"
                    style={{
                        color: "var(--rose-900)",
                        fontFamily: "var(--font-julius)",
                        marginBottom: "32px",
                    }}
                >
                    Encontre aqui seu modelo
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="w-full text-center text-[12px] font-normal leading-[2.2] tracking-[0.08em] uppercase"
                    style={{
                        color: "#1a1a1a",
                        fontFamily: "var(--font-julius)",
                        maxWidth: "620px",
                        margin: "0 auto 80px",
                    }}
                >
                    Encontre o modelo ideal que traduz a sua personalidade e destaca a
                    sua essência única. Sinta-se livre para escolher a peça que vai te
                    acompanhar com confiança em cada passo.
                </p>

                {/* Product grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className="flex flex-col cursor-pointer"
                            onMouseEnter={() => handleCardEnter(index)}
                            onMouseLeave={() => handleCardLeave(index)}
                            onClick={() => setSelectedProduct(product)}
                        >
                            {/* Image */}
                            <div
                                className="relative w-full overflow-hidden"
                                style={{ aspectRatio: "3 / 4" }}
                            >
                                <Image
                                    src={product.images[0]}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />

                                {/* Sparkle */}
                                <div
                                    className="absolute pointer-events-none"
                                    style={{ bottom: "14px", right: "14px" }}
                                >
                                    <svg
                                        width="26"
                                        height="26"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 0 C16.8 6.4, 18.4 9.6, 20 12 C22.4 13.6, 25.6 15.2, 32 16 C25.6 16.8, 22.4 18.4, 20 20 C18.4 22.4, 16.8 25.6, 16 32 C15.2 25.6, 13.6 22.4, 12 20 C9.6 18.4, 6.4 16.8, 0 16 C6.4 15.2, 9.6 13.6, 12 12 C13.6 9.6, 15.2 6.4, 16 0Z"
                                            fill="rgba(255, 241, 252, 0.7)"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Product info */}
                            <div style={{ paddingTop: "16px" }}>
                                <h3
                                    className="text-[11px] font-normal tracking-[0.1em] uppercase leading-[1.6]"
                                    style={{
                                        color: "var(--rose-900)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    {product.title}
                                </h3>

                                <p
                                    className="text-[9px] font-normal tracking-[0.08em] uppercase"
                                    style={{
                                        color: "var(--rose-700)",
                                        fontFamily: "var(--font-julius)",
                                        marginTop: "4px",
                                    }}
                                >
                                    {product.subtitle}
                                </p>

                                <span
                                    className="block text-[12px] font-normal tracking-[0.05em]"
                                    style={{
                                        color: "var(--rose-900)",
                                        fontFamily: "var(--font-julius)",
                                        marginTop: "12px",
                                    }}
                                >
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}

export default function ModelosPage() {
    return (
        <Suspense>
            <ModelosContent />
        </Suspense>
    );
}
