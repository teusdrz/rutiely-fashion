"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import SparkleIcon from "../home/SparkleIcon";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const sparkleRef = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(containerRef.current, {
                        autoAlpha: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete,
                    });
                },
            });

            gsap.set(imageRef.current, {
                autoAlpha: 0,
                scale: 0.85,
                transformOrigin: "center center",
            });

            gsap.set(sparkleRef.current, {
                autoAlpha: 0,
                scale: 0,
                rotation: -45,
                transformOrigin: "center center",
            });

            tl.to(imageRef.current, {
                autoAlpha: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
            });

            tl.to(
                sparkleRef.current,
                {
                    autoAlpha: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(2)",
                },
                "-=0.4"
            );

            tl.to(
                imageRef.current,
                {
                    y: -6,
                    duration: 0.8,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: 1,
                },
                "+=0.2"
            );

            tl.to(
                sparkleRef.current,
                {
                    scale: 1.15,
                    duration: 0.5,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: 1,
                },
                "<"
            );
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "#FFF1FC" }}
        >
            <div ref={imageRef} className="mt-12">
                <Image
                    src="/images/Butterfly.png"
                    alt="Rutiely Fashion"
                    width={280}
                    height={280}
                    priority
                    className="object-contain"
                />
            </div>
            <SparkleIcon
                ref={sparkleRef}
                className="absolute bottom-8 right-8"
                width={24}
                height={24}
            />
        </div>
    );
}
