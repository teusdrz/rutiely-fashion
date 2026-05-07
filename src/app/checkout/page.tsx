"use client";

import { useRef, useState, useMemo, Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/home/Navbar";
import CustomerForm from "@/components/checkout/CustomerForm";
import DeliverySection, { type DeliveryMethod } from "@/components/checkout/DeliverySection";
import PaymentSection, { type PaymentMethod } from "@/components/checkout/PaymentSection";
import { useCart } from "@/lib/cart/useCart";
import { calculateShipping, type ShippingResult } from "@/lib/shipping";
import { formatCurrency } from "@/lib/formatters";
import type { CartItem } from "@/lib/cart/types";

gsap.registerPlugin(useGSAP);

function ShoppingBagIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function CardIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
        </svg>
    );
}

const STEPS = [
    { label: "sacola", icon: <ShoppingBagIcon /> },
    { label: "identificacao", icon: <UserIcon /> },
    { label: "pagamento", icon: <CardIcon /> },
    { label: "confirmacao", icon: <CheckIcon /> },
];

function CheckoutStepper({ current }: { current: number }) {
    const labels = ["sacola", "identificação", "pagamento", "confirmação"];
    return (
        <div className="flex items-center justify-center" style={{ marginBottom: "56px" }}>
            {STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-2">
                        <div
                            style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                border: `1.5px solid ${i <= current ? "var(--rose-800)" : "#d1c4cc"}`,
                                background: i < current ? "var(--rose-800)" : i === current ? "rgba(255,241,252,0.8)" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: i < current ? "#fff" : i === current ? "var(--rose-800)" : "#b0a0a8",
                            }}
                        >
                            {step.icon}
                        </div>
                        <span
                            style={{
                                fontSize: "10px",
                                letterSpacing: "0.08em",
                                color: i === current ? "var(--rose-800)" : "#b0a0a8",
                                fontFamily: "var(--font-julius)",
                                fontWeight: i === current ? "600" : "400",
                            }}
                        >
                            {labels[i]}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div
                            style={{
                                height: "1.5px",
                                width: "72px",
                                background: i < current ? "var(--rose-800)" : "#e0d0d8",
                                marginBottom: "22px",
                                flexShrink: 0,
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

interface CartItemRowProps {
    item: CartItem;
    onUpdate: (key: string, qty: number) => void;
    onRemove: (key: string) => void;
}

function CartItemRow({ item, onUpdate, onRemove }: CartItemRowProps) {
    return (
        <div
            className="flex gap-5"
            style={{ padding: "24px 0", borderBottom: "1px solid #eee0e8" }}
        >
            <div
                style={{
                    width: "96px",
                    height: "128px",
                    flexShrink: 0,
                    position: "relative",
                    border: "1px solid #eee0e8",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top"
                    sizes="96px"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p
                        style={{
                            fontSize: "9px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "4px",
                        }}
                    >
                        {item.subtitle}
                    </p>
                    <h3
                        style={{
                            fontSize: "13px",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                            lineHeight: 1.4,
                        }}
                    >
                        {item.title}
                    </h3>
                    <p
                        style={{
                            fontSize: "11px",
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-dm-sans)",
                            marginTop: "4px",
                            letterSpacing: "0.04em",
                        }}
                    >
                        Tam. {item.size} &bull; {item.price}
                    </p>
                </div>

                <div className="flex items-center justify-between" style={{ marginTop: "12px" }}>
                    <div
                        className="flex items-center"
                        style={{ border: "1px solid #d8c8d0" }}
                    >
                        <button
                            onClick={() => onUpdate(item.key, item.quantity - 1)}
                            style={{
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                lineHeight: 1,
                                color: "var(--rose-700)",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            −
                        </button>
                        <span
                            style={{
                                width: "36px",
                                textAlign: "center",
                                fontSize: "13px",
                                color: "var(--rose-900)",
                                fontFamily: "var(--font-julius)",
                                borderLeft: "1px solid #d8c8d0",
                                borderRight: "1px solid #d8c8d0",
                                lineHeight: "32px",
                                display: "block",
                            }}
                        >
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdate(item.key, item.quantity + 1)}
                            style={{
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                lineHeight: 1,
                                color: "var(--rose-700)",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            +
                        </button>
                    </div>

                    <span
                        style={{
                            fontSize: "15px",
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        {formatCurrency(item.priceValue * item.quantity)}
                    </span>
                </div>

                <button
                    onClick={() => onRemove(item.key)}
                    style={{
                        alignSelf: "flex-start",
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        color: "var(--rose-400)",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans)",
                        padding: 0,
                        marginTop: "8px",
                    }}
                >
                    excluir da sacola
                </button>
            </div>
        </div>
    );
}

function CheckoutContent() {
    const router = useRouter();
    const { items, updateQuantity, removeItem, subtotal } = useCart();
    const containerRef = useRef<HTMLDivElement>(null);

    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");

    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null);

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const shippingCost = useMemo(() => {
        if (deliveryMethod === "pickup") return 0;
        return shippingResult?.cost ?? 0;
    }, [deliveryMethod, shippingResult]);

    const total = useMemo(
        () => subtotal + shippingCost,
        [subtotal, shippingCost]
    );

    const handleCalculateShipping = useCallback(() => {
        const clean = cep.replace(/\D/g, "");
        if (clean.length === 8) setShippingResult(calculateShipping(clean));
    }, [cep]);

    const validateForm = useCallback((): Record<string, string> => {
        const err: Record<string, string> = {};
        if (!customerName.trim() || customerName.trim().length < 3)
            err.name = "Nome completo é obrigatório";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            err.email = "E-mail inválido";
        if (phone.replace(/\D/g, "").length < 10)
            err.phone = "Telefone inválido";
        if (cpf.replace(/\D/g, "").length !== 11)
            err.cpf = "CPF inválido";
        if (deliveryMethod === "delivery") {
            if (cep.replace(/\D/g, "").length !== 8)
                err.cep = "CEP inválido";
            if (!address.trim())
                err.address = "Endereço é obrigatório";
            if (!addressNumber.trim())
                err.addressNumber = "Número é obrigatório";
            if (!neighborhood.trim())
                err.neighborhood = "Bairro é obrigatório";
            if (!city.trim())
                err.city = "Cidade é obrigatória";
            if (!shippingResult)
                err.shipping = "Calcule o frete antes de finalizar";
        }
        return err;
    }, [customerName, email, phone, cpf, deliveryMethod, cep, address, addressNumber, neighborhood, city, shippingResult]);

    const handleFinalize = useCallback(() => {
        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            const firstKey = Object.keys(validationErrors)[0];
            document
                .querySelector(`[data-field="${firstKey}"]`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const firstItem = items[0];
        const productTitle =
            items.length === 1
                ? firstItem.title
                : `${firstItem.title} e mais ${items.length - 1} ${items.length - 1 === 1 ? "item" : "itens"}`;
        const orderNumber = `RF-${Date.now().toString(36).toUpperCase()}`;

        const params = new URLSearchParams({
            orderNumber,
            productTitle,
            color: "",
            size: firstItem?.size ?? "",
            customerName: customerName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            cpf: cpf.trim(),
            deliveryMethod,
            cep: cep.trim(),
            address: address.trim(),
            addressNumber: addressNumber.trim(),
            complement: complement.trim(),
            neighborhood: neighborhood.trim(),
            city: city.trim(),
            total: total.toFixed(2),
            subtotal: subtotal.toFixed(2),
            shipping: shippingCost.toFixed(2),
            discount: "0.00",
        });

        router.push(`/checkout/confirmacao/${paymentMethod}?${params.toString()}`);
    }, [
        validateForm,
        items,
        paymentMethod,
        shippingCost,
        customerName,
        email,
        phone,
        cpf,
        deliveryMethod,
        cep,
        address,
        addressNumber,
        complement,
        neighborhood,
        city,
        total,
        subtotal,
        router,
    ]);

    useGSAP(
        () => {
            gsap.from(containerRef.current, {
                autoAlpha: 0,
                y: 20,
                duration: 0.7,
                ease: "power3.out",
            });
        },
        { scope: containerRef }
    );

    if (items.length === 0) {
        return (
            <div className="min-h-screen" style={{ background: "#FFF1FC" }}>
                <Navbar isVisible={true} />
                <div
                    className="flex flex-col items-center justify-center gap-6"
                    style={{ minHeight: "70vh" }}
                >
                    <span
                        style={{
                            fontSize: "13px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        Sua sacola está vazia
                    </span>
                    <Link
                        href="/modelos"
                        style={{
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--rose-800)",
                            fontFamily: "var(--font-julius)",
                            textDecoration: "underline",
                        }}
                    >
                        Continuar comprando
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: "#FFF1FC" }}>
            <Navbar isVisible={true} />

            <main
                ref={containerRef}
                className="mx-auto"
                style={{ maxWidth: "1100px", padding: "120px 5% 100px" }}
            >
                <CheckoutStepper current={0} />

                <div style={{ marginBottom: "8px" }}>
                    <h1
                        style={{
                            fontSize: "28px",
                            fontWeight: "400",
                            letterSpacing: "0.04em",
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                        }}
                    >
                        sacola
                    </h1>
                    <p
                        style={{
                            fontSize: "12px",
                            color: "var(--rose-500)",
                            fontFamily: "var(--font-dm-sans)",
                            marginTop: "6px",
                        }}
                    >
                        sua sacola tem{" "}
                        <strong style={{ color: "var(--rose-800)" }}>{items.length}</strong>{" "}
                        {items.length === 1 ? "item" : "itens"}
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12"
                    style={{ marginTop: "40px" }}
                >
                    <div>
                        <div style={{ borderTop: "1px solid #eee0e8" }}>
                            {items.map((item) => (
                                <CartItemRow
                                    key={item.key}
                                    item={item}
                                    onUpdate={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>

                        <div style={{ marginTop: "48px" }}>
                            <CustomerForm
                                name={customerName}
                                email={email}
                                phone={phone}
                                cpf={cpf}
                                errors={errors}
                                onNameChange={setCustomerName}
                                onEmailChange={setEmail}
                                onPhoneChange={setPhone}
                                onCpfChange={setCpf}
                            />
                        </div>

                        <div style={{ marginTop: "40px" }}>
                            <PaymentSection
                                method={paymentMethod}
                                onMethodChange={setPaymentMethod}
                            />
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-8 flex flex-col gap-6">
                        <DeliverySection
                            method={deliveryMethod}
                            cep={cep}
                            address={address}
                            addressNumber={addressNumber}
                            complement={complement}
                            neighborhood={neighborhood}
                            city={city}
                            shippingResult={shippingResult}
                            onMethodChange={setDeliveryMethod}
                            onCepChange={setCep}
                            onAddressChange={setAddress}
                            onAddressNumberChange={setAddressNumber}
                            onComplementChange={setComplement}
                            onNeighborhoodChange={setNeighborhood}
                            onCityChange={setCity}
                            onCalculateShipping={handleCalculateShipping}
                        />

                        <div
                            style={{
                                padding: "28px",
                                background: "rgba(255,241,252,0.6)",
                                border: "1px solid #eee0e8",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "var(--rose-800)",
                                    fontFamily: "var(--font-julius)",
                                    marginBottom: "20px",
                                }}
                            >
                                Resumo do Pedido
                            </h2>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            color: "var(--rose-600)",
                                            fontFamily: "var(--font-dm-sans)",
                                            letterSpacing: "0.04em",
                                        }}
                                    >
                                        Subtotal
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: "var(--rose-900)",
                                            fontFamily: "var(--font-julius)",
                                        }}
                                    >
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            color: "var(--rose-600)",
                                            fontFamily: "var(--font-dm-sans)",
                                            letterSpacing: "0.04em",
                                        }}
                                    >
                                        Frete
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: shippingCost === 0 ? "var(--rose-500)" : "var(--rose-900)",
                                            fontFamily: "var(--font-julius)",
                                        }}
                                    >
                                        {shippingCost === 0 ? "Grátis" : formatCurrency(shippingCost)}
                                    </span>
                                </div>

                                <div
                                    className="flex justify-between items-center"
                                    style={{
                                        borderTop: "1px solid #eee0e8",
                                        paddingTop: "16px",
                                        marginTop: "4px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            letterSpacing: "0.15em",
                                            textTransform: "uppercase",
                                            color: "var(--rose-800)",
                                            fontFamily: "var(--font-julius)",
                                        }}
                                    >
                                        Total
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "22px",
                                            color: "var(--rose-900)",
                                            fontFamily: "var(--font-julius)",
                                        }}
                                    >
                                        {formatCurrency(total)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleFinalize}
                            className="group relative w-full overflow-hidden text-[11px] font-normal tracking-[0.18em] uppercase cursor-pointer"
                            style={{
                                fontFamily: "var(--font-julius)",
                                padding: "22px",
                                background: "var(--rose-800)",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            <span
                                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                style={{ background: "var(--rose-900)" }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Finalizar Pedido
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>

                        {Object.keys(errors).length > 0 && (
                            <div
                                className="flex items-start gap-3"
                                style={{
                                    padding: "16px 20px",
                                    background: "rgba(180, 60, 60, 0.08)",
                                    border: "1px solid rgba(180, 60, 60, 0.2)",
                                }}
                            >
                                <div className="flex flex-col gap-1">
                                    {Object.values(errors).map((msg, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                fontSize: "10px",
                                                letterSpacing: "0.05em",
                                                color: "#b43c3c",
                                                fontFamily: "var(--font-dm-sans)",
                                            }}
                                        >
                                            {msg}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-2">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--rose-400)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span
                                style={{
                                    fontSize: "9px",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--rose-400)",
                                    fontFamily: "var(--font-julius)",
                                }}
                            >
                                Seus dados estão protegidos
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense>
            <CheckoutContent />
        </Suspense>
    );
}
