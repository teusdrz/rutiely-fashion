import Image from "next/image";
import Link from "next/link";

export default function ImageInfSection() {
    return (
        <>
            <style>{`
            .inf-section {
                width: 100%;
                padding: 120px 64px 120px;
                box-sizing: border-box;
            }
            .inf-inner {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: clamp(48px, 7vw, 112px);
                max-width: 1280px;
                margin: 0 auto;
            }
            .inf-image-wrap {
                flex-shrink: 0;
                border-radius: 40px;
                overflow: hidden;
                box-shadow: 0 12px 56px rgba(74,50,56,0.14), 0 2px 8px rgba(74,50,56,0.07);
                line-height: 0;
            }
            .inf-image {
                display: block;
                width: clamp(260px, 36vw, 520px);
                height: auto;
            }
            .inf-title {
                font-family: var(--font-body);
                font-size: clamp(36px, 4.2vw, 64px);
                font-weight: 800;
                line-height: 1.05;
                letter-spacing: -0.02em;
                color: #2a1a1c;
                margin: 0;
                text-transform: uppercase;
            }
            @media (max-width: 767px) {
                .inf-section {
                    padding: 64px 20px 80px;
                }
                .inf-inner {
                    flex-direction: column;
                    gap: 32px;
                    align-items: flex-start;
                }
                .inf-image {
                    width: 100%;
                }
                .inf-image-wrap {
                    width: 100%;
                    border-radius: 24px;
                }
                .inf-title {
                    font-size: 32px;
                }
            }
        `}</style>
            <section className="inf-section">
                <div className="inf-inner">
                    {/* Imagem à esquerda */}
                    <div className="inf-image-wrap">
                        <Image
                            src="/images/images-inf/WhatsApp Image 2026-05-06 at 17.59.14.jpeg"
                            alt="Paleta de cores Rutiely Fashion — Marrom, Barro, Caqui, Nude, Creme"
                            width={520}
                            height={640}
                            className="inf-image"
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
                        <h2 className="inf-title">
                            Nova Paleta<br />da Temporada
                        </h2>

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
        </>
    );
}
