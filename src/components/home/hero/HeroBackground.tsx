"use client";

import { forwardRef } from "react";
import Image from "next/image";

/**
 * Full-bleed background image with a subtle dark gradient overlay
 * so the white text remains readable over any photo.
 */
const HeroBackground = forwardRef<HTMLDivElement>(
    function HeroBackground(_, ref) {
        return (
            <div
                ref={ref}
                className="absolute inset-0"
                style={{ visibility: "hidden" }}
            >
                {/* Editorial photo — fill the entire section */}
                <Image
                    src="/images/hero-model.png"
                    alt="Modelo Rutiely Fashion"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
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
