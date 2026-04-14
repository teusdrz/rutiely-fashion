"use client";

import { useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/home/Navbar";

gsap.registerPlugin(useGSAP);

function SucessoContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const checkRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const orderNumber = searchParams.get("orderNumber") || "";
    const customerName = searchParams.get("customerName") || "";
    const method = searchParams.get("method") || "pix";

    const methodLabel = method === "pix" ? "PIX" : "Boleto Bancário";
    const methodMessage =
        method === "pix"
            ? "Seu pagamento via PIX foi confirmado e o pedido está sendo preparado."
            : "Seu boleto foi registrado. Após a compensação (até 3 dias úteis), seu pedido será preparado.";

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(checkRef.current, { autoAlpha: 0, scale: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 })
            .from(textRef.current, { autoAlpha: 0, y: 30, duration: 0.6 }, "-=0.2")
            .from(detailsRef.current, { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.2")
            .from(ctaRef.current, { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.2");

        // Checkmark draw animation
        const path = checkRef.current?.querySelector("#check-path") as SVGPathElement | null;
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            tl.to(path, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, 0.5);
        }
    }, { scope: containerRef });

    return (
        <div className="min-h-screen" style={{ background: "#FFF1FC" }}>
            <Navbar isVisible={true} />

            <main
                ref={containerRef}
                className="flex flex-col items-center justify-center"
                style={{ minHeight: "100vh", padding: "128px 5% 80px", textAlign: "center" }}
            >
                {/* Check circle */}
                <svg
                    ref={checkRef}
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    style={{ marginBottom: "40px" }}
                >
                    <circle cx="50" cy="50" r="46" stroke="#4a8c5c" strokeWidth="2" fill="rgba(74, 140, 92, 0.06)" />
                    <path
                        id="check-path"
                        d="M30 52 L44 66 L72 38"
                        stroke="#4a8c5c"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>

                {/* Text */}
                <div ref={textRef} style={{ marginBottom: "32px", maxWidth: "480px" }}>
                    <h1
                        className="text-2xl md:text-3xl tracking-[0.08em] uppercase"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "16px",
                        }}
                    >
                        Pedido Confirmado!
                    </h1>
                    <p
                        className="text-sm leading-[1.8]"
                        style={{ color: "var(--rose-700)", fontFamily: "var(--font-dm-sans)" }}
                    >
                        {customerName && (
                            <>
                                Obrigada, <strong style={{ color: "var(--rose-900)" }}>{customerName}</strong>!{" "}
                            </>
                        )}
                        {methodMessage}
                    </p>
                </div>

                {/* Order details card */}
                <div
                    ref={detailsRef}
                    style={{
                        border: "1px solid #1a1a1a",
                        background: "#fff",
                        padding: "32px 40px",
                        maxWidth: "380px",
                        width: "100%",
                        marginBottom: "40px",
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span
                                className="text-[9px] tracking-[0.2em] uppercase"
                                style={{ color: "var(--rose-500)", fontFamily: "var(--font-julius)" }}
                            >
                                Nº do Pedido
                            </span>
                            <span
                                className="text-[13px] tracking-[0.04em]"
                                style={{ color: "var(--rose-900)", fontFamily: "var(--font-dm-sans)", fontWeight: 600 }}
                            >
                                {orderNumber}
                            </span>
                        </div>

                        <div style={{ height: "1px", background: "#1a1a1a", opacity: 0.1 }} />

                        <div className="flex items-center justify-between">
                            <span
                                className="text-[9px] tracking-[0.2em] uppercase"
                                style={{ color: "var(--rose-500)", fontFamily: "var(--font-julius)" }}
                            >
                                Pagamento
                            </span>
                            <span
                                className="text-[12px] tracking-[0.04em]"
                                style={{ color: "var(--rose-700)", fontFamily: "var(--font-dm-sans)" }}
                            >
                                {methodLabel}
                            </span>
                        </div>

                        <div style={{ height: "1px", background: "#1a1a1a", opacity: 0.1 }} />

                        <div className="flex items-center justify-between">
                            <span
                                className="text-[9px] tracking-[0.2em] uppercase"
                                style={{ color: "var(--rose-500)", fontFamily: "var(--font-julius)" }}
                            >
                                Status
                            </span>
                            <span
                                className="flex items-center gap-2 text-[12px] tracking-[0.04em]"
                                style={{ color: "#4a8c5c", fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                            >
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4a8c5c", display: "inline-block" }} />
                                {method === "pix" ? "Confirmado" : "Aguardando compensação"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col items-center gap-3">
                    <button
                        onClick={() => router.push("/")}
                        className="group relative overflow-hidden text-[11px] tracking-[0.18em] uppercase cursor-pointer"
                        style={{
                            fontFamily: "var(--font-julius)",
                            padding: "20px 60px",
                            background: "var(--rose-800)",
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        <span
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                            style={{ background: "var(--rose-900)" }}
                        />
                        <span className="relative z-10">Voltar para a Loja</span>
                    </button>

                    <p
                        className="text-[10px] tracking-[0.04em]"
                        style={{ color: "var(--rose-400)", fontFamily: "var(--font-dm-sans)" }}
                    >
                        Um e-mail de confirmação foi enviado
                    </p>
                </div>
            </main>
        </div>
    );
}

export default function SucessoPage() {
    return (
        <Suspense>
            <SucessoContent />
        </Suspense>
    );
}
