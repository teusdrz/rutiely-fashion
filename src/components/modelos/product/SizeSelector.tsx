"use client";

import { productSizes } from "@/data/products";

interface SizeSelectorProps {
    selected: string;
    onSelect: (size: string) => void;
}

export default function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
    return (
        <div className="flex flex-col">
            <span
                className="text-[10px] tracking-[0.18em] uppercase"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-800)" }}
            >
                {selected ? `Tamanho selecionado: ${selected}` : "Selecione um tamanho"}
            </span>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
                {productSizes.map((size) => {
                    const active = size === selected;
                    return (
                        <button
                            key={size}
                            type="button"
                            onClick={() => onSelect(size)}
                            className="flex items-center justify-center cursor-pointer text-[11px] font-normal tracking-[0.1em] uppercase transition-colors duration-300"
                            style={{
                                width: "52px",
                                height: "44px",
                                borderRadius: "999px",
                                border: `1px solid ${active ? "var(--rose-800)" : "var(--rose-300)"}`,
                                background: active ? "var(--rose-800)" : "transparent",
                                color: active ? "#FFF1FC" : "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                            }}
                            aria-pressed={active}
                            aria-label={`Tamanho ${size}`}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between mt-5">
                <span
                    className="text-[10px] tracking-[0.18em] uppercase underline underline-offset-4 cursor-pointer"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-700)" }}
                >
                    Confira seu tamanho
                </span>
                <span
                    className="text-[10px] tracking-[0.18em] uppercase underline underline-offset-4 cursor-pointer"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-700)" }}
                >
                    Guia de medidas
                </span>
            </div>
        </div>
    );
}
