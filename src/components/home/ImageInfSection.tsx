import Image from "next/image";
import Link from "next/link";

export default function ImageInfSection() {
    return (
        <section
            style={{
                width: "100%",
                padding: "120px 64px 120px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(48px, 7vw, 112px)",
                    maxWidth: "1280px",
                    margin: "0 auto",
                }}
            >
                {/* Imagem à esquerda — tile com border-radius, tamanho natural */}
                <div
                    style={{
                        flexShrink: 0,
                        borderRadius: "40px",
                        overflow: "hidden",
                        boxShadow:
                            "0 12px 56px rgba(74,50,56,0.14), 0 2px 8px rgba(74,50,56,0.07)",
                        lineHeight: 0,
                    }}
                >
                    <Image
                        src="/images/images-inf/WhatsApp Image 2026-05-06 at 17.59.14.jpeg"
                        alt="Paleta de cores Rutiely Fashion — Marrom, Barro, Caqui, Nude, Creme"
                        width={520}
                        height={640}
                        style={{
                            display: "block",
                            width: "clamp(260px, 36vw, 520px)",
                            height: "auto",
                        }}
                        quality={95}
                    />
                </div>

                {/* Texto à direita */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    {/* Título grande bold — igual à referência */}
                    <h2
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(36px, 4.2vw, 64px)",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            color: "#2a1a1c",
                            margin: 0,
                            textTransform: "uppercase",
                        }}
                    >
                        Nova Paleta<br />da Temporada
                    </h2>

                    {/* Parágrafo */}
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "clamp(14px, 1.05vw, 16px)",
                            fontWeight: 400,
                            lineHeight: 1.75,
                            color: "#7a5c5e",
                            margin: 0,
                            maxWidth: "440px",
                        }}
                    >
                        Tons exclusivos Marrom, Barro, Caqui, Nude e Creme — curados para
                        valorizar cada composição da estação. Tecidos de alta qualidade
                        combinados com paletas que funcionam juntas do zero ao look completo.
                    </p>

                    {/* Link sublinhado — igual à referência */}
                    <Link
                        href="/modelos"
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            fontWeight: 500,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#2a1a1c",
                            textDecoration: "underline",
                            textUnderlineOffset: "5px",
                            textDecorationThickness: "1px",
                        }}
                    >
                        Descobrir a Coleção
                    </Link>
                </div>
            </div>
        </section>
    );
}
