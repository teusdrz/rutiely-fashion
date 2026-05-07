"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import QRCode from "react-qr-code";
import Navbar from "@/components/home/Navbar";
import OrderRecap from "@/components/checkout/confirmacao/OrderRecap";

gsap.registerPlugin(useGSAP);

const PIX_EXPIRATION_MINUTES = 30;
const PIX_CNPJ_KEY = "41244558000108";
const PIX_CNPJ_DISPLAY = "41.244.558/0001-08";

function crc16(str: string): string {
    let crc = 0xffff;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
            crc &= 0xffff;
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
}

function buildPixPayload(): string {
    const guiField = `0014br.gov.bcb.pix`;
    const keyField = `01${String(PIX_CNPJ_KEY.length).padStart(2, "0")}${PIX_CNPJ_KEY}`;
    const inner = guiField + keyField;
    const merchantAccount = `26${String(inner.length).padStart(2, "0")}${inner}`;
    const name = "RUTIELY FASHION";
    const city = "SAO PAULO";
    const partial = [
        "000201",
        merchantAccount,
        "52040000",
        "5303986",
        "5802BR",
        `59${String(name.length).padStart(2, "0")}${name}`,
        `60${String(city.length).padStart(2, "0")}${city}`,
        "6304",
    ].join("");
    return partial + crc16(partial);
}

function PixContent() {
    const searchParams = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const recapRef = useRef<HTMLDivElement>(null);

    const orderNumber = searchParams.get("orderNumber") || "";
    const productTitle = searchParams.get("productTitle") || "";
    const color = searchParams.get("color") || "";
    const size = searchParams.get("size") || "";
    const total = parseFloat(searchParams.get("total") || "0");
    const subtotal = parseFloat(searchParams.get("subtotal") || "0");
    const shipping = parseFloat(searchParams.get("shipping") || "0");
    const discount = parseFloat(searchParams.get("discount") || "0");
    const customerName = searchParams.get("customerName") || "";
    const customerPhone = searchParams.get("phone") || "";
    const customerCpf = searchParams.get("cpf") || "";
    const deliveryMethod = searchParams.get("deliveryMethod") || "pickup";
    const address = searchParams.get("address") || "";
    const addressNumber = searchParams.get("addressNumber") || "";
    const complement = searchParams.get("complement") || "";
    const neighborhood = searchParams.get("neighborhood") || "";
    const city = searchParams.get("city") || "";
    const cep = searchParams.get("cep") || "";

    const [pixCode] = useState(() => buildPixPayload());
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState(PIX_EXPIRATION_MINUTES * 60);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isExpired = timeLeft <= 0;

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(pixCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = pixCode;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    }, [pixCode]);

    const handleConfirmPayment = useCallback(() => {
        const isDelivery = deliveryMethod === "delivery";
        const addressLine = isDelivery
            ? `${address}, ${addressNumber}${complement ? ` - ${complement}` : ""}, ${neighborhood}, ${city} - CEP: ${cep}`
            : "Retirada na loja";

        const message = [
            `🛍️ *Novo Pedido - Rutiely Fashion*`,
            ``,
            `*Pedido:* ${orderNumber}`,
            `*Produto:* ${productTitle}`,
            `*Cor:* ${color} | *Tamanho:* ${size}`,
            ``,
            `👤 *Dados do Cliente*`,
            `*Nome:* ${customerName}`,
            `*Telefone:* ${customerPhone}`,
            `*CPF:* ${customerCpf}`,
            ``,
            `📦 *Entrega/Retirada*`,
            `*Modalidade:* ${isDelivery ? "Entrega" : "Retirada na loja"}`,
            ...(isDelivery ? [`*Endereço:* ${addressLine}`] : []),
            ``,
            `💰 *Valores*`,
            `*Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}`,
            ...(discount > 0 ? [`*Desconto PIX (5%):* -R$ ${discount.toFixed(2).replace(".", ",")}`] : []),
            ...(isDelivery ? [`*Frete:* R$ ${shipping.toFixed(2).replace(".", ",")}`] : []),
            `*Total:* R$ ${total.toFixed(2).replace(".", ",")}`,
            ``,
            `✅ Pagamento realizado via *PIX*. Por favor, confirme o recebimento e ${isDelivery ? "combine a entrega" : "avise quando o pedido estiver pronto para retirada"}.`,
        ].join("\n");

        const rutiPhone = "5511945630351";
        window.open(`https://wa.me/${rutiPhone}?text=${encodeURIComponent(message)}`, "_blank");
    }, [orderNumber, productTitle, color, size, customerName, customerPhone, customerCpf, deliveryMethod, address, addressNumber, complement, neighborhood, city, cep, subtotal, discount, shipping, total]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(qrRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.7, delay: 0.2 })
            .from(infoRef.current, { autoAlpha: 0, y: 30, duration: 0.6 }, "-=0.3")
            .from(recapRef.current, { autoAlpha: 0, x: 40, duration: 0.6 }, "-=0.3");
    }, { scope: containerRef });

    return (
        <div className="min-h-screen" style={{ background: "#FFF1FC" }}>
            <Navbar isVisible={true} />

            <main
                ref={containerRef}
                className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16"
                style={{ maxWidth: "1200px", padding: "128px 5% 100px" }}
            >
                <div>
                    {/* Header */}
                    <div style={{ marginBottom: "40px" }}>
                        <div className="flex items-center gap-3" style={{ marginBottom: "12px" }}>
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "var(--rose-100)",
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rose-800)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="8" height="8" rx="1" />
                                    <rect x="14" y="2" width="8" height="8" rx="1" />
                                    <rect x="2" y="14" width="8" height="8" rx="1" />
                                    <path d="M14 14h4v4h-4zM22 14v4h-4M14 22h4" />
                                </svg>
                            </div>
                            <div>
                                <h1
                                    className="text-2xl md:text-3xl tracking-[0.06em] uppercase"
                                    style={{ color: "var(--rose-900)", fontFamily: "var(--font-julius)" }}
                                >
                                    Pagamento PIX
                                </h1>
                            </div>
                        </div>
                        <p
                            className="text-[12px] tracking-[0.02em] leading-[1.6]"
                            style={{ color: "var(--rose-600)", fontFamily: "var(--font-dm-sans)", maxWidth: "480px" }}
                        >
                            Escaneie o QR Code ou copie o código PIX abaixo para realizar o pagamento.
                            Após a confirmação, seu pedido será processado automaticamente.
                        </p>
                    </div>

                    {/* QR Code Area */}
                    <div ref={qrRef} style={{ marginBottom: "32px" }}>
                        <div
                            className="flex flex-col items-center"
                            style={{
                                border: "1px solid #1a1a1a",
                                background: "#fff",
                                padding: "40px 32px 32px",
                            }}
                        >
                            {/* Timer */}
                            <div
                                className="flex items-center gap-2"
                                style={{ marginBottom: "24px" }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isExpired ? "#b43c3c" : "var(--rose-600)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span
                                    className="text-[10px] tracking-[0.15em] uppercase"
                                    style={{
                                        color: isExpired ? "#b43c3c" : "var(--rose-700)",
                                        fontFamily: "var(--font-julius)",
                                    }}
                                >
                                    {isExpired
                                        ? "Código expirado"
                                        : `Expira em ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
                                </span>
                            </div>

                            {/* QR Code */}
                            <div
                                style={{
                                    marginBottom: "24px",
                                    position: "relative",
                                    padding: "12px",
                                    background: "#fff",
                                    border: "1px solid #eee0e8",
                                    opacity: isExpired ? 0.4 : 1,
                                    transition: "opacity 0.3s",
                                }}
                            >
                                <QRCode
                                    value={pixCode}
                                    size={200}
                                    fgColor="#3b1a2a"
                                    bgColor="#ffffff"
                                />
                                {isExpired && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{ background: "rgba(255,255,255,0.85)" }}
                                    >
                                        <span
                                            className="text-[10px] tracking-[0.1em] uppercase"
                                            style={{ color: "#b43c3c", fontFamily: "var(--font-julius)" }}
                                        >
                                            Expirado
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Chave PIX */}
                            <div className="w-full" style={{ maxWidth: "400px", marginBottom: "16px" }}>
                                <label
                                    className="text-[9px] tracking-[0.2em] uppercase block"
                                    style={{
                                        color: "var(--rose-600)",
                                        fontFamily: "var(--font-julius)",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Chave PIX (CNPJ)
                                </label>
                                <div
                                    style={{
                                        border: "1px solid #d8c8d0",
                                        background: "#fff",
                                        padding: "12px 16px",
                                        letterSpacing: "0.08em",
                                        fontSize: "14px",
                                        color: "var(--rose-900)",
                                        fontFamily: "var(--font-julius)",
                                        textAlign: "center",
                                    }}
                                >
                                    {PIX_CNPJ_DISPLAY}
                                </div>
                            </div>

                            {/* PIX Copia e Cola */}
                            <div className="w-full" style={{ maxWidth: "400px" }}>
                                <label
                                    className="text-[9px] tracking-[0.2em] uppercase block"
                                    style={{
                                        color: "var(--rose-600)",
                                        fontFamily: "var(--font-julius)",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Código PIX Copia e Cola
                                </label>
                                <div
                                    className="flex items-center gap-2"
                                    style={{
                                        border: "1px solid #1a1a1a",
                                        background: "var(--rose-50)",
                                        padding: "12px 16px",
                                    }}
                                >
                                    <span
                                        className="text-[11px] flex-1 truncate select-all"
                                        style={{
                                            color: "var(--rose-800)",
                                            fontFamily: "monospace",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        {pixCode}
                                    </span>
                                </div>
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                disabled={isExpired}
                                className="group relative w-full overflow-hidden text-[11px] tracking-[0.18em] uppercase cursor-pointer"
                                style={{
                                    fontFamily: "var(--font-julius)",
                                    padding: "18px",
                                    marginTop: "16px",
                                    maxWidth: "400px",
                                    background: copied ? "#4a8c5c" : "var(--rose-800)",
                                    color: "#fff",
                                    border: "none",
                                    opacity: isExpired ? 0.5 : 1,
                                    transition: "background 0.3s ease",
                                }}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {copied ? (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            Código Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                            </svg>
                                            Copiar Código PIX
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div ref={infoRef}>
                        <h2
                            className="text-[11px] tracking-[0.2em] uppercase"
                            style={{
                                color: "var(--rose-800)",
                                fontFamily: "var(--font-julius)",
                                marginBottom: "20px",
                            }}
                        >
                            Como pagar
                        </h2>

                        <div className="flex flex-col gap-4" style={{ marginBottom: "40px" }}>
                            {[
                                { step: "01", text: "Abra o app do seu banco ou instituição financeira" },
                                { step: "02", text: "Escolha a opção de pagamento via PIX" },
                                { step: "03", text: "Escaneie o QR Code ou cole o código copiado" },
                                { step: "04", text: "Confirme o pagamento e aguarde a aprovação" },
                            ].map(({ step, text }) => (
                                <div key={step} className="flex items-start gap-4">
                                    <span
                                        className="text-[10px] tracking-[0.1em] flex-shrink-0"
                                        style={{
                                            color: "var(--rose-400)",
                                            fontFamily: "var(--font-julius)",
                                            width: "24px",
                                        }}
                                    >
                                        {step}
                                    </span>
                                    <span
                                        className="text-[12px] leading-[1.6]"
                                        style={{
                                            color: "var(--rose-700)",
                                            fontFamily: "var(--font-dm-sans)",
                                        }}
                                    >
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Confirm payment button */}
                        <button
                            onClick={handleConfirmPayment}
                            className="group relative w-full overflow-hidden text-[11px] tracking-[0.18em] uppercase cursor-pointer"
                            style={{
                                fontFamily: "var(--font-julius)",
                                padding: "22px",
                                background: "#4a8c5c",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            <span
                                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                style={{ background: "#3d7a4e" }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                Já Realizei o Pagamento
                            </span>
                        </button>

                        <p
                            className="text-center text-[10px] tracking-[0.04em] leading-[1.6]"
                            style={{
                                color: "var(--rose-400)",
                                fontFamily: "var(--font-dm-sans)",
                                marginTop: "12px",
                            }}
                        >
                            A confirmação do pagamento pode levar alguns segundos.
                            Você receberá um e-mail de confirmação.
                        </p>
                    </div>
                </div>

                {/* Order Recap Sidebar */}
                <div ref={recapRef} className="lg:sticky lg:top-8">
                    <h2
                        className="text-[11px] tracking-[0.2em] uppercase"
                        style={{
                            color: "var(--rose-800)",
                            fontFamily: "var(--font-julius)",
                            marginBottom: "24px",
                        }}
                    >
                        Resumo do Pedido
                    </h2>
                    <OrderRecap
                        orderNumber={orderNumber}
                        productTitle={productTitle}
                        color={color}
                        size={size}
                        subtotal={subtotal}
                        shipping={shipping}
                        discount={discount}
                        total={total}
                    />

                    {/* Security badge */}
                    <div
                        className="flex items-center justify-center gap-2"
                        style={{ marginTop: "16px" }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--rose-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span
                            className="text-[9px] tracking-[0.1em] uppercase"
                            style={{ color: "var(--rose-400)", fontFamily: "var(--font-julius)" }}
                        >
                            Pagamento seguro via PIX
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function PixPage() {
    return (
        <Suspense>
            <PixContent />
        </Suspense>
    );
}
