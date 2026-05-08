"use client";

import { forwardRef } from "react";

/**
 * Full-bleed background video with a subtle dark gradient overlay
 * so the white text remains readable.
 */
const HeroBackground = forwardRef<HTMLDivElement>(
    function HeroBackground(_, ref) {
        return (
            <div
                ref={ref}
                className="absolute inset-0"
                style={{ visibility: "hidden" }}
            >
                {/* Editorial video — fill the entire section */}
                <video
                    src="/video-home/WhatsApp Video 2026-05-08 at 12.55.59.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Gradient overlay: lighter at center, darker toward edges */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.52) 100%)",
                    }}
                />
            </div>
        );
    }
);

export default HeroBackground;
