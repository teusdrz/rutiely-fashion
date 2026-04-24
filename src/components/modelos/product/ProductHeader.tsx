import type { Product } from "@/data/products";

interface ProductHeaderProps {
    product: Product;
}

function Stars({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-[3px]" aria-label={`Avaliação ${value} de 5`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < Math.round(value);
                return (
                    <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={filled ? "var(--rose-800)" : "none"}
                        stroke="var(--rose-800)"
                        strokeWidth="1.5"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            })}
        </div>
    );
}

export default function ProductHeader({ product }: ProductHeaderProps) {
    const installment = (product.priceValue / 3).toFixed(2).replace(".", ",");

    return (
        <div className="flex flex-col">
            {/* Badge */}
            <span
                className="self-start text-[9px] tracking-[0.22em] uppercase"
                style={{
                    fontFamily: "var(--font-julius)",
                    padding: "8px 14px",
                    color: "var(--rose-800)",
                    border: "1px solid var(--rose-300)",
                    background: "rgba(255, 241, 252, 0.6)",
                }}
            >
                Nova coleção · Frete grátis
            </span>

            {/* Subtitle */}
            <span
                className="text-[10px] tracking-[0.2em] uppercase mt-8"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-500)" }}
            >
                {product.subtitle}
            </span>

            {/* Title */}
            <h1
                className="text-2xl md:text-[1.75rem] font-normal tracking-[0.04em] uppercase leading-[1.25] mt-3"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
            >
                {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
                <Stars value={4} />
                <span
                    className="text-[10px] tracking-[0.15em] uppercase"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-700)" }}
                >
                    (29)
                </span>
            </div>
            <span
                className="text-[10px] tracking-[0.18em] uppercase mt-2"
                style={{ fontFamily: "var(--font-julius)", color: "var(--rose-600)" }}
            >
                Lindo demais ·{" "}
                <span className="underline underline-offset-4 cursor-pointer">Mais avaliações</span>
            </span>

            {/* Divider */}
            <div className="w-full my-6" style={{ height: "1px", background: "var(--rose-200)" }} />

            {/* Price */}
            <div className="flex flex-col">
                <span
                    className="text-3xl font-normal tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
                >
                    {product.price}
                </span>
                <span
                    className="text-[10px] tracking-[0.15em] uppercase mt-2"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-600)" }}
                >
                    3x de R$ {installment} sem juros
                </span>
            </div>
        </div>
    );
}
