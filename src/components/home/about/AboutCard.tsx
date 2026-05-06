import type { Feature } from "@/data/aboutFeatures";

function HangerIcon() {
    return (
        <svg
            width="52"
            height="68"
            viewBox="0 0 52 68"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M26 5 A5 5 0 0 0 21 10 L21 14 L31 14" />
            <path d="M4 34 L10 38 L6 63 L46 63 L42 38 L48 34" />
            <path d="M21 14 L4 34" />
            <path d="M31 14 L48 34" />
            <line x1="10" y1="48" x2="42" y2="48" />
        </svg>
    );
}

function NeedleIcon() {
    return (
        <svg
            width="52"
            height="62"
            viewBox="0 0 52 62"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 57 L38 9" />
            <path d="M38 9 L43 17" />
            <ellipse
                cx="18.5"
                cy="53"
                rx="3"
                ry="5.5"
                transform="rotate(-70 18.5 53)"
            />
            <path d="M13 61 Q6 48 17 37 Q28 26 22 15 Q18 7 25 3" />
        </svg>
    );
}

function FlowerIcon() {
    return (
        <svg
            width="56"
            height="56"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        >
            <circle cx="26" cy="26" r="5" />
            <ellipse cx="26" cy="13" rx="4.5" ry="8" />
            <ellipse
                cx="37"
                cy="19.5"
                rx="4.5"
                ry="8"
                transform="rotate(60 37 19.5)"
            />
            <ellipse
                cx="37"
                cy="32.5"
                rx="4.5"
                ry="8"
                transform="rotate(-60 37 32.5)"
            />
            <ellipse cx="26" cy="39" rx="4.5" ry="8" />
            <ellipse
                cx="15"
                cy="32.5"
                rx="4.5"
                ry="8"
                transform="rotate(60 15 32.5)"
            />
            <ellipse
                cx="15"
                cy="19.5"
                rx="4.5"
                ry="8"
                transform="rotate(-60 15 19.5)"
            />
        </svg>
    );
}

function RibbonIcon() {
    return (
        <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M26 26 Q10 16 6 6 Q14 10 26 20 Q38 10 46 6 Q42 16 26 26Z" />
            <path d="M26 26 Q10 36 6 46 Q14 42 26 32 Q38 42 46 46 Q42 36 26 26Z" />
            <circle cx="26" cy="26" r="3" />
        </svg>
    );
}

function CrownIcon() {
    return (
        <svg
            width="56"
            height="48"
            viewBox="0 0 56 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 38 L8 16 L20 28 L28 8 L36 28 L48 16 L50 38 Z" />
            <line x1="6" y1="43" x2="50" y2="43" />
            <circle cx="28" cy="8" r="2.5" />
            <circle cx="8" cy="16" r="2" />
            <circle cx="48" cy="16" r="2" />
        </svg>
    );
}

const ICON_MAP = {
    hanger: HangerIcon,
    needle: NeedleIcon,
    flower: FlowerIcon,
    ribbon: RibbonIcon,
    crown: CrownIcon,
} as const;

type Props = Feature;

export default function AboutCard({ icon, title, description }: Props) {
    const Icon = ICON_MAP[icon];

    return (
        <div
            className="flex flex-col items-center text-center"
            style={{
                flex: "0 0 calc(33.333% - 32px)",
                minWidth: "220px",
                gap: "20px",
                padding: "0 32px",
            }}
        >
            <div
                style={{
                    height: "72px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--rose-900)",
                }}
            >
                <Icon />
            </div>

            <h3
                className="font-body font-bold uppercase"
                style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    color: "var(--rose-900)",
                }}
            >
                {title}
            </h3>

            <p
                className="font-body"
                style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.8,
                    color: "var(--rose-700)",
                    maxWidth: "260px",
                    textAlign: "center",
                }}
            >
                {description}
            </p>
        </div>
    );
}
