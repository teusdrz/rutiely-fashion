"use client";

import { useRouter } from "next/navigation";

interface ProductActionsProps {
    productId: number;
    selectedSize: string;
}

export default function ProductActions({ productId, selectedSize }: ProductActionsProps) {
    const router = useRouter();
    const disabled = !selectedSize;

    const handleBuy = () => {
        if (disabled) return;
        router.push(`/checkout?productId=${productId}&size=${selectedSize}`);
    };

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={handleBuy}
                disabled={disabled}
                className="group relative overflow-hidden text-[11px] font-normal tracking-[0.2em] uppercase cursor-pointer disabled:cursor-not-allowed"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "18px 28px",
                    background: disabled ? "var(--rose-300)" : "var(--rose-500)",
                    color: "#fff",
                    border: "none",
                }}
            >
                <span
                    className="absolute inset-0 translate-y-full group-enabled:group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    style={{ background: "var(--rose-800)" }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                    Adicionar à sacola
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </span>
            </button>

            <button
                type="button"
                onClick={handleBuy}
                disabled={disabled}
                className="group relative overflow-hidden text-[11px] font-normal tracking-[0.2em] uppercase cursor-pointer disabled:cursor-not-allowed"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "18px 28px",
                    background: "transparent",
                    color: disabled ? "var(--rose-400)" : "var(--rose-800)",
                    border: `1px solid ${disabled ? "var(--rose-300)" : "var(--rose-800)"}`,
                }}
            >
                <span
                    className="absolute inset-0 translate-y-full group-enabled:group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    style={{ background: "var(--rose-800)" }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3 group-enabled:group-hover:text-[#FFF1FC] transition-colors duration-500">
                    Comprar agora
                </span>
            </button>

            {disabled && (
                <span
                    className="text-[10px] tracking-[0.18em] uppercase text-center"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-600)" }}
                >
                    Selecione um tamanho para continuar
                </span>
            )}
        </div>
    );
}
