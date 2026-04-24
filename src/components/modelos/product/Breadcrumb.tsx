import Link from "next/link";

interface BreadcrumbProps {
    category: string;
    title: string;
}

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
    const items = [
        { label: "Início", href: "/" },
        { label: "Modelos", href: "/modelos" },
        { label: category, href: `/modelos?categoria=${category}` },
    ];

    return (
        <nav
            aria-label="Navegação"
            className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-julius)" }}
        >
            {items.map((item, i) => (
                <span key={item.href} className="flex items-center gap-2">
                    <Link
                        href={item.href}
                        className="underline underline-offset-4 transition-opacity duration-300 hover:opacity-60"
                        style={{ color: "var(--rose-700)" }}
                    >
                        {item.label}
                    </Link>
                    <span style={{ color: "var(--rose-400)" }}>{i < items.length ? "›" : ""}</span>
                </span>
            ))}
            <span style={{ color: "var(--rose-900)" }}>{title}</span>
        </nav>
    );
}
