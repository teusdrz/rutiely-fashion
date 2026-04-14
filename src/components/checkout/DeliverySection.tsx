"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { formatCEP, formatCurrency } from "@/lib/formatters";
import { type ShippingResult } from "@/lib/shipping";

gsap.registerPlugin(useGSAP);

export type DeliveryMethod = "pickup" | "delivery";

interface DeliverySectionProps {
    method: DeliveryMethod;
    cep: string;
    address: string;
    addressNumber: string;
    complement: string;
    neighborhood: string;
    city: string;
    shippingResult: ShippingResult | null;
    onMethodChange: (method: DeliveryMethod) => void;
    onCepChange: (value: string) => void;
    onAddressChange: (value: string) => void;
    onAddressNumberChange: (value: string) => void;
    onComplementChange: (value: string) => void;
    onNeighborhoodChange: (value: string) => void;
    onCityChange: (value: string) => void;
    onCalculateShipping: () => void;
}

const labelStyle: CSSProperties = {
    color: "var(--rose-600)",
    fontFamily: "var(--font-julius)",
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "4px",
    display: "block",
};

const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #1a1a1a",
    color: "var(--rose-900)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "13px",
    letterSpacing: "0.02em",
    outline: "none",
};

export default function DeliverySection({
    method,
    cep,
    address,
    addressNumber,
    complement,
    neighborhood,
    city,
    shippingResult,
    onMethodChange,
    onCepChange,
    onAddressChange,
    onAddressNumberChange,
    onComplementChange,
    onNeighborhoodChange,
    onCityChange,
    onCalculateShipping,
}: DeliverySectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(ref.current, {
                autoAlpha: 0,
                y: 30,
                duration: 0.6,
                delay: 0.35,
                ease: "power3.out",
            });
        },
        { scope: ref }
    );

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
                Entrega
            </h2>

            <div
                className="flex items-center gap-3"
                style={{
                    padding: "14px 20px",
                    background: "rgba(74, 140, 92, 0.06)",
                    border: "1px solid rgba(74, 140, 92, 0.15)",
                    marginBottom: "24px",
                }}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4a8c5c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16,8 20,8 23,11 23,16 16,16" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span
                    className="text-[10px] tracking-[0.1em] uppercase"
                    style={{
                        color: "#4a8c5c",
                        fontFamily: "var(--font-julius)",
                    }}
                >
                    Frete grátis para entregas em até 5km
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onMethodChange("pickup")}
                    className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300"
                    style={{
                        padding: "24px 16px",
                        border:
                            method === "pickup"
                                ? "2px solid var(--rose-800)"
                                : "1px solid #1a1a1a",
                        background:
                            method === "pickup"
                                ? "rgba(107, 74, 82, 0.04)"
                                : "transparent",
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                            method === "pickup"
                                ? "var(--rose-800)"
                                : "var(--rose-400)"
                        }
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span
                        className="text-[10px] tracking-[0.15em] uppercase"
                        style={{
                            color:
                                method === "pickup"
                                    ? "var(--rose-900)"
                                    : "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        Retirar na Loja
                    </span>
                    <span
                        className="text-[9px] tracking-[0.05em] uppercase"
                        style={{
                            color: "#4a8c5c",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        Grátis
                    </span>
                </button>

                <button
                    onClick={() => onMethodChange("delivery")}
                    className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300"
                    style={{
                        padding: "24px 16px",
                        border:
                            method === "delivery"
                                ? "2px solid var(--rose-800)"
                                : "1px solid #1a1a1a",
                        background:
                            method === "delivery"
                                ? "rgba(107, 74, 82, 0.04)"
                                : "transparent",
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                            method === "delivery"
                                ? "var(--rose-800)"
                                : "var(--rose-400)"
                        }
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16,8 20,8 23,11 23,16 16,16" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span
                        className="text-[10px] tracking-[0.15em] uppercase"
                        style={{
                            color:
                                method === "delivery"
                                    ? "var(--rose-900)"
                                    : "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        Pedir Entrega
                    </span>
                    <span
                        className="text-[9px] tracking-[0.05em] uppercase"
                        style={{
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        Calcular frete
                    </span>
                </button>
            </div>

            {method === "pickup" && (
                <div
                    style={{
                        marginTop: "24px",
                        padding: "20px",
                        border: "1px solid #1a1a1a",
                    }}
                >
                    <span
                        className="block text-[10px] tracking-[0.15em] uppercase"
                        style={{
                            color: "var(--rose-800)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "12px",
                        }}
                    >
                        Endereço para Retirada
                    </span>
                    <p
                        className="text-[12px] leading-[1.8]"
                        style={{
                            color: "var(--rose-700)",
                            fontFamily: "var(--font-dm-sans)",
                        }}
                    >
                        Av. Sousa Bandeira, 655c - Vila Nhocuné
                        <br />
                        São Paulo - SP, 03559-000
                    </p>
                    <div
                        className="flex items-center gap-2"
                        style={{ marginTop: "12px" }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--rose-500)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span
                            className="text-[9px] tracking-[0.1em] uppercase"
                            style={{
                                color: "var(--rose-500)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            Chegada: 55 min · 21 min
                        </span>
                    </div>
                    <div
                        className="flex items-center gap-2"
                        style={{ marginTop: "8px" }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--rose-500)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span
                            className="text-[9px] tracking-[0.1em] uppercase"
                            style={{
                                color: "var(--rose-500)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            (11) 94563-0351
                        </span>
                    </div>
                </div>
            )}

            {method === "delivery" && (
                <div style={{ marginTop: "24px" }}>
                    <div className="flex gap-3 items-end">
                        <div className="flex-1">
                            <label style={labelStyle}>CEP</label>
                            <input
                                type="text"
                                value={cep}
                                onChange={(e) =>
                                    onCepChange(formatCEP(e.target.value))
                                }
                                placeholder="00000-000"
                                style={inputStyle}
                            />
                        </div>
                        <button
                            onClick={onCalculateShipping}
                            className="text-[10px] tracking-[0.15em] uppercase cursor-pointer transition-opacity duration-300 hover:opacity-80"
                            style={{
                                fontFamily: "var(--font-julius)",
                                padding: "14px 28px",
                                background: "var(--rose-800)",
                                color: "#fff",
                                border: "none",
                                flexShrink: 0,
                            }}
                        >
                            Calcular
                        </button>
                    </div>

                    {shippingResult && (
                        <>
                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "20px",
                                    border: `1px solid ${shippingResult.isFree ? "rgba(74, 140, 92, 0.2)" : "#1a1a1a"}`,
                                    background: shippingResult.isFree
                                        ? "rgba(74, 140, 92, 0.04)"
                                        : "transparent",
                                }}
                            >
                                <div
                                    className="flex justify-between items-center"
                                    style={{ marginBottom: "12px" }}
                                >
                                    <span
                                        className="text-[10px] tracking-[0.1em] uppercase"
                                        style={{
                                            color: "var(--rose-700)",
                                            fontFamily: "var(--font-julius)",
                                        }}
                                    >
                                        Distância estimada: {shippingResult.distance}km
                                    </span>
                                    <span
                                        className="text-[11px] tracking-[0.1em] uppercase"
                                        style={{
                                            color: shippingResult.isFree
                                                ? "#4a8c5c"
                                                : "var(--rose-800)",
                                            fontFamily: "var(--font-julius)",
                                        }}
                                    >
                                        {shippingResult.isFree
                                            ? "Frete Grátis ✓"
                                            : formatCurrency(shippingResult.cost)}
                                    </span>
                                </div>

                                <span
                                    className="text-[9px] tracking-[0.1em] uppercase"
                                    style={{
                                        color: "var(--rose-500)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    Prazo estimado: {shippingResult.estimatedDays}{" "}
                                    dia{shippingResult.estimatedDays > 1 ? "s" : ""}{" "}
                                    útil{shippingResult.estimatedDays > 1 ? "eis" : ""}
                                </span>

                                {shippingResult.isFree && (
                                    <div
                                        className="flex items-center gap-2"
                                        style={{ marginTop: "10px" }}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#4a8c5c"
                                            strokeWidth="2"
                                        >
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        <span
                                            className="text-[9px] tracking-[0.08em] uppercase"
                                            style={{
                                                color: "#4a8c5c",
                                                fontFamily: "var(--font-julius)",
                                            }}
                                        >
                                            Você está na área de entrega gratuita!
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
                                style={{ marginTop: "20px" }}
                            >
                                <div className="md:col-span-2">
                                    <label style={labelStyle}>Endereço</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) =>
                                            onAddressChange(e.target.value)
                                        }
                                        placeholder="Rua, Avenida..."
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Número</label>
                                    <input
                                        type="text"
                                        value={addressNumber}
                                        onChange={(e) =>
                                            onAddressNumberChange(e.target.value)
                                        }
                                        placeholder="Nº"
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Complemento</label>
                                    <input
                                        type="text"
                                        value={complement}
                                        onChange={(e) =>
                                            onComplementChange(e.target.value)
                                        }
                                        placeholder="Apto, Bloco..."
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Bairro</label>
                                    <input
                                        type="text"
                                        value={neighborhood}
                                        onChange={(e) =>
                                            onNeighborhoodChange(e.target.value)
                                        }
                                        placeholder="Seu bairro"
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Cidade</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) =>
                                            onCityChange(e.target.value)
                                        }
                                        placeholder="Sua cidade"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
