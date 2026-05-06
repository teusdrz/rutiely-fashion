"use client";

import { useRef } from "react";

const ITEMS = Array.from({ length: 8 }, (_, i) => i);

const Item = () => (
    <span className="flex items-center gap-8 shrink-0">
        <span
            style={{
                fontFamily: "var(--font-cormorant, var(--font-display))",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                letterSpacing: "0.22em",
                color: "#f5ede8",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
            }}
        >
            Rutiely Fashion
        </span>
        <span
            aria-hidden="true"
            style={{
                fontSize: "0.55rem",
                color: "rgba(245, 237, 232, 0.5)",
                letterSpacing: 0,
            }}
        >
            ◆
        </span>
    </span>
);

export default function MarqueeBanner() {
    const trackRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="w-full overflow-hidden"
            style={{
                background: "var(--rose-900)",
                paddingTop: "22px",
                paddingBottom: "22px",
                marginTop: "100px",
            }}
        >
            <div
                ref={trackRef}
                className="flex"
                style={{ animation: "marquee-scroll 28s linear infinite" }}
            >
                {ITEMS.map((i) => (
                    <Item key={`a-${i}`} />
                ))}
                {ITEMS.map((i) => (
                    <Item key={`b-${i}`} />
                ))}
            </div>

            <style>{`
                @keyframes marquee-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
