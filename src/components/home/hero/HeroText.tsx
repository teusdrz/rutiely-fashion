"use client";

import { forwardRef } from "react";

/**
 * Centered editorial text overlay — brand name + subtitle,
 * inspired by the full-bleed fashion hero aesthetic.
 */
const HeroText = forwardRef<HTMLDivElement>(function HeroText(_, ref) {
    return (
        <div
            ref={ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center select-none px-6"
            style={{ visibility: "hidden" }}
        >
            {/* ─── Brand name ─────────────────────────────────────── */}
            <h1
                style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(3.2rem, 11vw, 10.5rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    margin: 0,
                }}
            >
                Rutiely
            </h1>

            {/* ─── Thin horizontal rule between name and sub-word ─── */}
            <div
                aria-hidden
                style={{
                    width: "clamp(120px, 28vw, 360px)",
                    height: "1px",
                    background: "rgba(255,255,255,0.45)",
                    margin: "clamp(14px, 2.2vw, 26px) 0",
                }}
            />

            {/* ─── Fashion — same family, lighter weight ───────────── */}
            <p
                style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontStyle: "normal",
                    fontSize: "clamp(0.9rem, 2.8vw, 2.4rem)",
                    letterSpacing: "0.55em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.92)",
                    margin: 0,
                }}
            >
                Fashion
            </p>

            {/* ─── Subtitle ────────────────────────────────────────── */}
            <p
                style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "clamp(0.58rem, 1vw, 0.8rem)",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.62)",
                    marginTop: "clamp(22px, 3.6vw, 42px)",
                }}
            >
                Moda Feminina Exclusiva
            </p>
        </div>
    );
});

export default HeroText;
