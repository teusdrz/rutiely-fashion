"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { formatCurrency } from "@/lib/formatters";

gsap.registerPlugin(useGSAP);

export type PaymentMethod = "pix" | "boleto";

interface PaymentSectionProps {
    method: PaymentMethod;
    onMethodChange: (method: PaymentMethod) => void;
}

interface MethodOption {
    id: PaymentMethod;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
}

function PixIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="2" width="8" height="8" rx="1" />
            <rect x="14" y="2" width="8" height="8" rx="1" />
            <rect x="2" y="14" width="8" height="8" rx="1" />
            <path d="M14 14h4v4h-4zM22 14v4h-4M14 22h4" />
        </svg>
    );
}

function BoletoIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 4h2v16H2M6 4h1v16H6M10 4h2v16h-2M15 4h1v16h-1M19 4h3v16h-3" />
        </svg>
    );
}

export default function PaymentSection({
    method,
    onMethodChange,
}: PaymentSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(ref.current, {
                autoAlpha: 0,
                y: 30,
                duration: 0.6,
                delay: 0.5,
                ease: "power3.out",
            });
        },
        { scope: ref }
    );

    const methods: MethodOption[] = [
        {
            id: "pix",
            label: "PIX",
            description: "Aprovação instantânea",
            icon: <PixIcon />,
            badge: "5% OFF",
        },
        {
            id: "boleto",
            label: "Boleto Bancário",
            description: "Vencimento em 3 dias úteis",
            icon: <BoletoIcon />,
        },
    ];

    return (
        <div ref={ref} style={{ marginTop: "40px" }}>
            <h2
                className="text-[11px] font-normal tracking-[0.2em] uppercase"
                style={{
                    color: "var(--rose-800)",
                    fontFamily: "var(--font-julius)",
                    marginBottom: "28px",
                }}
            >
                Pagamento
            </h2>

            <div className="flex flex-col gap-3">
                {methods.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onMethodChange(opt.id)}
                        className="flex items-center gap-4 w-full cursor-pointer text-left transition-all duration-300"
                        style={{
                            padding: "20px",
                            border:
                                method === opt.id
                                    ? "2px solid var(--rose-800)"
                                    : "1px solid #1a1a1a",
                            background:
                                method === opt.id
                                    ? "rgba(107, 74, 82, 0.04)"
                                    : "transparent",
                        }}
                    >
                        <div
                            style={{
                                color:
                                    method === opt.id
                                        ? "var(--rose-800)"
                                        : "var(--rose-400)",
                            }}
                        >
                            {opt.icon}
                        </div>

                        <div className="flex-1">
                            <span
                                className="block text-[11px] tracking-[0.12em] uppercase"
                                style={{
                                    color:
                                        method === opt.id
                                            ? "var(--rose-900)"
                                            : "var(--rose-700)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                {opt.label}
                            </span>
                            <span
                                className="block text-[9px] tracking-[0.08em] uppercase"
                                style={{
                                    color: "var(--rose-500)",
                                    fontFamily: "var(--font-julius)",
                                    marginTop: "2px",
                                }}
                            >
                                {opt.description}
                            </span>
                        </div>

                        {opt.badge && (
                            <span
                                className="text-[9px] tracking-[0.1em] uppercase"
                                style={{
                                    padding: "4px 10px",
                                    background: "#4a8c5c",
                                    color: "#fff",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                {opt.badge}
                            </span>
                        )}

                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                border:
                                    method === opt.id
                                        ? "6px solid var(--rose-800)"
                                        : "2px solid var(--rose-300)",
                                flexShrink: 0,
                            }}
                        />
                    </button>
                ))}
            </div>

            {method === "pix" && (
                <div
                    style={{
                        marginTop: "24px",
                        padding: "24px",
                        border: "1px solid rgba(74, 140, 92, 0.15)",
                        background: "rgba(74, 140, 92, 0.04)",
                    }}
                >
                    <div className="flex items-center gap-3" style={{ marginBottom: "16px" }}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4a8c5c"
                            strokeWidth="2"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span
                            className="text-[10px] tracking-[0.1em] uppercase"
                            style={{
                                color: "#4a8c5c",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            5% de desconto aplicado automaticamente
                        </span>
                    </div>
                    <span
                        className="block text-[9px] tracking-[0.08em] uppercase"
                        style={{
                            color: "var(--rose-600)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        O QR Code PIX será gerado após a confirmação do pedido
                    </span>
                </div>
            )}

            {method === "boleto" && (
                <div
                    style={{
                        marginTop: "24px",
                        padding: "24px",
                        border: "1px solid #1a1a1a",
                    }}
                >
                    <div className="flex items-start gap-3">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--rose-500)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginTop: "2px", flexShrink: 0 }}
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <div>
                            <span
                                className="block text-[10px] tracking-[0.1em] uppercase"
                                style={{
                                    color: "var(--rose-800)",
                                    fontFamily: "var(--font-julius)",
                                    marginBottom: "6px",
                                }}
                            >
                                Informações sobre o Boleto
                            </span>
                            <span
                                className="block text-[9px] tracking-[0.05em] uppercase leading-[1.8]"
                                style={{
                                    color: "var(--rose-600)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                O boleto será gerado após a confirmação do pedido.
                                Vencimento em 3 dias úteis. O pedido será confirmado
                                após a compensação do pagamento (até 2 dias úteis).
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
