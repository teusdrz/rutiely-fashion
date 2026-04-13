"use client";

import { forwardRef } from "react";

interface SparkleIconProps {
    className?: string;
    width?: number;
    height?: number;
}

const SparkleIcon = forwardRef<SVGSVGElement, SparkleIconProps>(
    ({ className, width = 32, height = 32 }, ref) => {
        return (
            <svg
                ref={ref}
                className={className}
                width={width}
                height={height}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16 0 C16.8 6.4, 18.4 9.6, 20 12 C22.4 13.6, 25.6 15.2, 32 16 C25.6 16.8, 22.4 18.4, 20 20 C18.4 22.4, 16.8 25.6, 16 32 C15.2 25.6, 13.6 22.4, 12 20 C9.6 18.4, 6.4 16.8, 0 16 C6.4 15.2, 9.6 13.6, 12 12 C13.6 9.6, 15.2 6.4, 16 0Z"
                    fill="#e8b4bd"
                    fillOpacity="0.7"
                />
            </svg>
        );
    }
);

SparkleIcon.displayName = "SparkleIcon";

export default SparkleIcon;
