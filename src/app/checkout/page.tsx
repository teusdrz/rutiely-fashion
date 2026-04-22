"use client";

import { useRef, useState, useMemo, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/home/Navbar";
import OrderSummary from "@/components/checkout/OrderSummary";
import CustomerForm from "@/components/checkout/CustomerForm";
import DeliverySection, { type DeliveryMethod } from "@/components/checkout/DeliverySection";
import PaymentSection, { type PaymentMethod } from "@/components/checkout/PaymentSection";
import { products, productColors, productSizes } from "@/data/products";
import { calculateShipping, type ShippingResult } from "@/lib/shipping";
import { formatCurrency } from "@/lib/formatters";

gsap.registerPlugin(useGSAP);

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const productId = Number(searchParams.get("productId")) || 1;
    const selectedColor = searchParams.get("color") || productColors[0].name;
    const selectedSize = searchParams.get("size") || productSizes[2];

    const product = useMemo(
        () => products.find((p) => p.id === productId) || products[0],
        [productId]
    );

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

    const shippingCost = useMemo(() => {
        if (deliveryMethod === "pickup") return 0;
        return shippingResult?.cost ?? 0;
    }, [deliveryMethod, shippingResult]);

    const handleCalculateShipping = () => {
        const clean = cep.replace(/\D/g, "");
        if (clean.length === 8) {
            setShippingResult(calculateShipping(clean));
        }
    };

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = useCallback((): Record<string, string> => {
        const newErrors: Record<string, string> = {};

        if (!customerName.trim() || customerName.trim().length < 3)
            newErrors.name = "Nome completo é obrigatório";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "E-mail inválido";
        if (phone.replace(/\D/g, "").length < 10)
            newErrors.phone = "Telefone inválido";
        if (cpf.replace(/\D/g, "").length !== 11)
            newErrors.cpf = "CPF inválido";

        if (deliveryMethod === "delivery") {
            if (cep.replace(/\D/g, "").length !== 8)
                newErrors.cep = "CEP inválido";
            if (!address.trim())
                newErrors.address = "Endereço é obrigatório";
            if (!addressNumber.trim())
                newErrors.addressNumber = "Número é obrigatório";
            if (!neighborhood.trim())
                newErrors.neighborhood = "Bairro é obrigatório";
            if (!city.trim())
                newErrors.city = "Cidade é obrigatória";
            if (!shippingResult)
                newErrors.shipping = "Calcule o frete antes de finalizar";
        }

        return newErrors;
    }, [customerName, email, phone, cpf, deliveryMethod, cep, address, addressNumber, neighborhood, city, shippingResult]);

    const handleFinalize = useCallback(() => {
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            const firstErrorKey = Object.keys(validationErrors)[0];
            const el = document.querySelector(`[data-field="${firstErrorKey}"]`);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const subtotal = product.priceValue;
        const pixDiscount = paymentMethod === "pix" ? subtotal * 0.05 : 0;
        const total = subtotal + shippingCost - pixDiscount;
        const orderNumber = `RF-${Date.now().toString(36).toUpperCase()}`;

        const params = new URLSearchParams({
            orderNumber,
            productId: String(product.id),
            productTitle: product.title,
            color: selectedColor,
            size: selectedSize,
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
            discount: pixDiscount.toFixed(2),
        });

        router.push(`/checkout/confirmacao/${paymentMethod}?${params.toString()}`);
    }, [validateForm, product, paymentMethod, shippingCost, selectedColor, selectedSize, customerName, email, router]);

    useGSAP(
        () => {
            gsap.from(titleRef.current, {
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
            });
        },
        { scope: formRef }
    );

    return (
        <div className="min-h-screen" style={{ background: "#FFF1FC" }}>
            <Navbar isVisible={true} />

            <main
                className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16"
                style={{
                    maxWidth: "1200px",
                    padding: "128px 5% 100px",
                }}
            >
                <div ref={formRef}>
                    <h1
                        ref={titleRef}
                        className="text-2xl md:text-3xl font-normal tracking-[0.06em] uppercase"
                        style={{
                            color: "var(--rose-900)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "48px",
                        }}
                    >
                        Finalizar Compra
                    </h1>

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

                    <PaymentSection
                        method={paymentMethod}
                        onMethodChange={setPaymentMethod}
                    />

                    <button
                        ref={buttonRef}
                        onClick={handleFinalize}
                        className="group relative w-full overflow-hidden text-[11px] font-normal tracking-[0.18em] uppercase cursor-pointer"
                        style={{
                            fontFamily: "var(--font-julius)",
                            padding: "22px",
                            marginTop: "48px",
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
                                marginTop: "16px",
                                padding: "16px 20px",
                                background: "rgba(180, 60, 60, 0.08)",
                                border: "1px solid rgba(180, 60, 60, 0.2)",
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#b43c3c"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="flex-shrink-0"
                                style={{ marginTop: "2px" }}
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v4M12 16h.01" />
                            </svg>
                            <div className="flex flex-col gap-1">
                                {Object.values(errors).map((msg, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] tracking-[0.05em]"
                                        style={{
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

                    <div
                        className="flex items-center justify-center gap-2"
                        style={{ marginTop: "16px" }}
                    >
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
                            className="text-[9px] tracking-[0.1em] uppercase"
                            style={{
                                color: "var(--rose-400)",
                                fontFamily: "var(--font-julius)",
                            }}
                        >
                            Seus dados estão protegidos
                        </span>
                    </div>
                </div>

                <OrderSummary
                    product={product}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    shippingCost={shippingCost}
                    paymentMethod={paymentMethod}
                />
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
