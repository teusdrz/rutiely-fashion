"use client";

import { useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/home/Navbar";
import OrderRecap from "@/components/checkout/confirmacao/OrderRecap";

gsap.registerPlugin(useGSAP);

function generateBoletoCode(): string {
    const segments = Array.from({ length: 4 }, () =>
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("")
    );
    return segments.join(" ");
}

function getDueDate(): string {
    const date = new Date();
    let daysAdded = 0;
    while (daysAdded < 3) {
        date.setDate(date.getDate() + 1);
        const day = date.getDay();
        if (day !== 0 && day !== 6) daysAdded++;
    }
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function BoletoContent() {
    const searchParams = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const barcodeRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const recapRef = useRef<HTMLDivElement>(null);

    const orderNumber = searchParams.get("orderNumber") || "";
    const productTitle = searchParams.get("productTitle") || "";
    const color = searchParams.get("color") || "";
    const size = searchParams.get("size") || "";
    const total = parseFloat(searchParams.get("total") || "0");
    const subtotal = parseFloat(searchParams.get("subtotal") || "0");
    const shipping = parseFloat(searchParams.get("shipping") || "0");
    const discount = parseFloat(searchParams.get("discount") || "0");

    const [boletoCode] = useState(() => generateBoletoCode());
    const [dueDate] = useState(() => getDueDate());
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(boletoCode.replace(/\s/g, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = boletoCode.replace(/\s/g, "");
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    }, [boletoCode]);

    const handleConfirm = useCallback(() => {
        const message = `Olá! Realizei o pagamento via Boleto do pedido *${orderNumber}*. Gostaria de verificar o pagamento e combinar a retirada/entrega.`;
        const phone = "5511945630351";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    }, [orderNumber]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(barcodeRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.7, delay: 0.2 })
            .from(infoRef.current, { autoAlpha: 0, y: 30, duration: 0.6 }, "-=0.3")
            .from(recapRef.current, { autoAlpha: 0, x: 40, duration: 0.6 }, "-=0.3");
    }, { scope: containerRef });

    // Generate barcode bar widths for visual
    const barcodeBars = Array.from({ length: 60 }, (_, i) => ({
        width: [1, 2, 3][((i * 7 + 3) % 3)],
        gap: i % 4 === 3 ? 3 : 1,
    }));

    return (
        <div className="min-h-screen" style={{ background: "#FFF1FC" }}>
            <Navbar isVisible={true} />

            <main
                ref={containerRef}
                className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16"
                style={{ maxWidth: "1200px", padding: "128px 5% 100px" }}
            >
                <div>
                    {/* Header */}
                    <div style={{ marginBottom: "40px" }}>
                        <div className="flex items-center gap-3" style={{ marginBottom: "12px" }}>
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "var(--rose-100)",
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rose-800)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 4h2v16H2M6 4h1v16H6M10 4h2v16h-2M15 4h1v16h-1M19 4h3v16h-3" />
                                </svg>
                            </div>
                            <div>
                                <h1
                                    className="text-2xl md:text-3xl tracking-[0.06em] uppercase"
                                    style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)" }}
                                >
                                    Boleto Bancário
                                </h1>
                            </div>
                        </div>
                        <p
                            className="text-[12px] tracking-[0.02em] leading-[1.6]"
                            style={{ color: "var(--rose-600)", fontFamily: "var(--font-dm-sans)", maxWidth: "480px" }}
                        >
                            Seu boleto foi gerado com sucesso. Copie o código de barras ou baixe o boleto
                            para realizar o pagamento em qualquer banco, lotérica ou app bancário.
                        </p>
                    </div>

                    {/* Barcode Area */}
                    <div ref={barcodeRef} style={{ marginBottom: "32px" }}>
                        <div
                            style={{
                                border: "1px solid #1a1a1a",
                                background: "#fff",
                                padding: "40px 32px 32px",
                            }}
                        >
                            {/* Due date badge */}
                            <div
                                className="flex items-center gap-2"
                                style={{ marginBottom: "28px" }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rose-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                <span
                                    className="text-[10px] tracking-[0.15em] uppercase"
                                    style={{ color: "var(--rose-700)", fontFamily: "var(--font-julius)" }}
                                >
                                    Vencimento: {dueDate}
                                </span>
                            </div>

                            {/* Barcode visual */}
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    padding: "20px 0",
                                    marginBottom: "24px",
                                    overflow: "hidden",
                                }}
                            >
                                <div className="flex items-end" style={{ height: "80px", gap: "0px" }}>
                                    {barcodeBars.map((bar, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: `${bar.width}px`,
                                                height: `${60 + (i % 3) * 8}px`,
                                                background: "var(--rose-900)",
                                                marginRight: `${bar.gap}px`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Boleto Code */}
                            <div>
                                <label
                                    className="text-[9px] tracking-[0.2em] uppercase block"
                                    style={{
                                        color: "var(--rose-600)",
                                        fontFamily: "var(--font-julius)",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Linha Digitável
                                </label>
                                <div
                                    className="flex items-center gap-2"
                                    style={{
                                        border: "1px solid #1a1a1a",
                                        background: "var(--rose-50)",
                                        padding: "14px 16px",
                                    }}
                                >
                                    <span
                                        className="text-[12px] flex-1 select-all"
                                        style={{
                                            color: "var(--rose-800)",
                                            fontFamily: "monospace",
                                            letterSpacing: "0.08em",
                                            wordBreak: "break-all",
                                        }}
                                    >
                                        {boletoCode}
                                    </span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginTop: "16px" }}>
                                <button
                                    onClick={handleCopy}
                                    className="group relative overflow-hidden text-[11px] tracking-[0.18em] uppercase cursor-pointer"
                                    style={{
                                        fontFamily: "var(--font-julius)",
                                        padding: "18px",
                                        background: copied ? "#4a8c5c" : "var(--rose-800)",
                                        color: "#fff",
                                        border: "none",
                                        transition: "background 0.3s ease",
                                    }}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {copied ? (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                                Copiado!
                                            </>
                                        ) : (
                                            <>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" />
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                </svg>
                                                Copiar Código
                                            </>
                                        )}
                                    </span>
                                </button>

                                <button
                                    className="group relative overflow-hidden text-[11px] tracking-[0.18em] uppercase cursor-pointer"
                                    style={{
                                        fontFamily: "var(--font-julius)",
                                        padding: "18px",
                                        background: "transparent",
                                        color: "var(--rose-800)",
                                        border: "1px solid #1a1a1a",
                                    }}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                        </svg>
                                        Baixar Boleto
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div ref={infoRef}>
                        <h2
                            className="text-[11px] tracking-[0.2em] uppercase"
                            style={{
                                color: "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                                marginBottom: "20px",
                            }}
                        >
                            Onde pagar
                        </h2>

                        <div className="flex flex-col gap-4" style={{ marginBottom: "32px" }}>
                            {[
                                { icon: "🏦", text: "App do seu banco ou internet banking" },
                                { icon: "🏪", text: "Casas lotéricas" },
                                { icon: "🏧", text: "Caixas eletrônicos de qualquer banco" },
                                { icon: "📱", text: "Aplicativos de pagamento" },
                            ].map(({ icon, text }, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-sm flex-shrink-0">{icon}</span>
                                    <span
                                        className="text-[12px] leading-[1.6]"
                                        style={{
                                            color: "var(--rose-700)",
                                            fontFamily: "var(--font-dm-sans)",
                                        }}
                                    >
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Info box */}
                        <div
                            className="flex items-start gap-3"
                            style={{
                                padding: "16px 20px",
                                background: "rgba(74, 140, 92, 0.06)",
                                border: "1px solid rgba(74, 140, 92, 0.15)",
                                marginBottom: "32px",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a8c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ marginTop: "1px" }}>
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            <span
                                className="text-[11px] leading-[1.6]"
                                style={{ color: "#4a8c5c", fontFamily: "var(--font-dm-sans)" }}
                            >
                                Após o pagamento, a confirmação pode levar até 3 dias úteis.
                                Você receberá um e-mail quando o pagamento for identificado.
                            </span>
                        </div>

                        {/* Confirm button */}
                        <button
                            onClick={handleConfirm}
                            className="group relative w-full overflow-hidden text-[11px] tracking-[0.18em] uppercase cursor-pointer"
                            style={{
                                fontFamily: "var(--font-julius)",
                                padding: "22px",
                                background: "#4a8c5c",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            <span
                                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                style={{ background: "#3d7a4e" }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Já Realizei o Pagamento
                            </span>
                        </button>

                        <p
                            className="text-center text-[10px] tracking-[0.04em] leading-[1.6]"
                            style={{
                                color: "var(--rose-400)",
                                fontFamily: "var(--font-dm-sans)",
                                marginTop: "12px",
                            }}
                        >
                            A compensação do boleto pode levar até 3 dias úteis.
                        </p>
                    </div>
                </div>

                {/* Order Recap Sidebar */}
                <div ref={recapRef} className="lg:sticky lg:top-8">
                    <h2
                        className="text-[11px] tracking-[0.2em] uppercase"
                        style={{
                            color: "var(--rose-800)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "24px",
                        }}
                    >
                        Resumo do Pedido
                    </h2>
                    <OrderRecap
                        orderNumber={orderNumber}
                        productTitle={productTitle}
                        color={color}
                        size={size}
                        subtotal={subtotal}
                        shipping={shipping}
                        discount={discount}
                        total={total}
                    />

                    {/* Security badge */}
                    <div
                        className="flex items-center justify-center gap-2"
                        style={{ marginTop: "16px" }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--rose-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span
                            className="text-[9px] tracking-[0.1em] uppercase"
                            style={{ color: "var(--rose-400)", fontFamily: "var(--font-julius)" }}
                        >
                            Boleto verificado e seguro
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function BoletoPage() {
    return (
        <Suspense>
            <BoletoContent />
        </Suspense>
    );
}
