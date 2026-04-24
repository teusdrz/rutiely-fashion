"use client";

import { productColors } from "@/data/products";

interface ColorSelectorProps {
    selected: string;
    onSelect: (colorName: string) => void;
}

export default function ColorSelector({ selected, onSelect }: ColorSelectorProps) {
    return (
        <div className="flex flex-col">
            <span
                className="text-[10px] tracking-[0.18em] uppercase"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-800)" }}
            >
                Cor selecionada:{" "}
                <span style={{ color: "var(--rose-900)" }}>{selected}</span>
            </span>

            <div className="flex items-center gap-3 mt-4">
                {productColors.map((color) => {
                    const active = color.name === selected;
                    return (
                        <button
                            key={color.name}
                            type="button"
                            onClick={() => onSelect(color.name)}
                            className="relative cursor-pointer transition-transform duration-300 hover:scale-[1.05]"
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: color.hex,
                                boxShadow: active
                                    ? "0 0 0 2px #FFF1FC, 0 0 0 3px var(--rose-800)"
                                    : "0 0 0 1px var(--rose-300)",
                            }}
                            aria-label={`Cor ${color.name}`}
                            aria-pressed={active}
                        />
                    );
                })}
            </div>
        </div>
    );
}
