"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { formatCPF, formatPhone } from "@/lib/formatters";

gsap.registerPlugin(useGSAP);

interface CustomerFormProps {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    errors?: Record<string, string>;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onCpfChange: (value: string) => void;
}

const labelStyle: CSSProperties = {
    color: "var(--rose-600)",
    fontFamily: "var(--font-julius)",
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "4px",
    display: "block",
};

const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #1a1a1a",
    color: "var(--rose-900)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "13px",
    letterSpacing: "0.02em",
    outline: "none",
};

export default function CustomerForm({
    name,
    email,
    phone,
    cpf,
    errors = {},
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onCpfChange,
}: CustomerFormProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(ref.current, {
                autoAlpha: 0,
                y: 30,
                duration: 0.6,
                delay: 0.2,
                ease: "power3.out",
            });
        },
        { scope: ref }
    );

    return (
        <div ref={ref}>
            <h2
                className="text-[11px] font-normal tracking-[0.2em] uppercase"
                style={{
                    color: "var(--rose-800)",
                    fontFamily: "var(--font-julius)",
                    marginBottom: "28px",
                }}
            >
                Seus Dados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="md:col-span-2" data-field="name">
                    <label style={labelStyle}>Nome Completo</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Seu nome completo"
                        style={{
                            ...inputStyle,
                            borderBottomColor: errors.name ? "#b43c3c" : "#1a1a1a",
                        }}
                    />
                    {errors.name && <span className="text-[10px] mt-1 block" style={{ color: "#b43c3c", fontFamily: "var(--font-dm-sans)" }}>{errors.name}</span>}
                </div>

                <div data-field="email">
                    <label style={labelStyle}>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder="seu@email.com"
                        style={{
                            ...inputStyle,
                            borderBottomColor: errors.email ? "#b43c3c" : "#1a1a1a",
                        }}
                    />
                    {errors.email && <span className="text-[10px] mt-1 block" style={{ color: "#b43c3c", fontFamily: "var(--font-dm-sans)" }}>{errors.email}</span>}
                </div>

                <div data-field="phone">
                    <label style={labelStyle}>Telefone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => onPhoneChange(formatPhone(e.target.value))}
                        placeholder="(00) 00000-0000"
                        style={{
                            ...inputStyle,
                            borderBottomColor: errors.phone ? "#b43c3c" : "#1a1a1a",
                        }}
                    />
                    {errors.phone && <span className="text-[10px] mt-1 block" style={{ color: "#b43c3c", fontFamily: "var(--font-dm-sans)" }}>{errors.phone}</span>}
                </div>

                <div className="md:col-span-2" data-field="cpf">
                    <label style={labelStyle}>CPF</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => onCpfChange(formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        style={{
                            ...inputStyle,
                            borderBottomColor: errors.cpf ? "#b43c3c" : "#1a1a1a",
                        }}
                    />
                    {errors.cpf && <span className="text-[10px] mt-1 block" style={{ color: "#b43c3c", fontFamily: "var(--font-dm-sans)" }}>{errors.cpf}</span>}
                </div>
            </div>
        </div>
    );
}
