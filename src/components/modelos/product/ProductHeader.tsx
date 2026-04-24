import type { Product } from "@/data/products";

interface ProductHeaderProps {
    product: Product;
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
                    padding: "10px 18px",
                    color: "var(--rose-800)",
                    border: "1px solid var(--rose-300)",
                    background: "rgba(255, 241, 252, 0.6)",
                }}
            >
                Nova coleção · Frete grátis
            </span>

            {/* Subtitle */}
            <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                    fontFamily: "var(--font-julius)",
                    color: "var(--rose-500)",
                    marginTop: "28px",
                }}
            >
                {product.subtitle}
            </span>

            {/* Title */}
            <h1
                className="text-2xl md:text-[1.75rem] font-normal tracking-[0.04em] uppercase leading-[1.3]"
                style={{
                    fontFamily: "var(--font-julius)",
                    color: "var(--rose-900)",
                    marginTop: "14px",
                }}
            >
                {product.title}
            </h1>

            {/* Divider */}
            <div
                className="w-full"
                style={{
                    height: "1px",
                    background: "var(--rose-200)",
                    marginTop: "28px",
                    marginBottom: "28px",
                }}
            />

            {/* Price */}
            <div className="flex flex-col">
                <span
                    className="text-3xl font-normal tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-julius)", color: "var(--rose-900)" }}
                >
                    {product.price}
                </span>
                <span
                    className="text-[10px] tracking-[0.15em] uppercase"
                    style={{
                        fontFamily: "var(--font-julius)",
                        color: "var(--rose-600)",
                        marginTop: "12px",
                    }}
                >
                    3x de R$ {installment} sem juros
                </span>
            </div>
        </div>
    );
}
