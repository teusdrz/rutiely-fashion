import type { Product } from "./types";

const BASE = "/images/saias-modelos/saias";
const OFFER = "FRETE GRÁTIS ACIMA DE R$ 150";

export const saias: Product[] = [
    // ─── Saia Nova ────────────────────────────────────────────────────────────
    {
        id: 301,
        title: "Saia Midi",
        subtitle: "Elegância e feminilidade em cada detalhe",
        price: "R$ 89,99",
        priceValue: 89.99,
        images: [
            `${BASE}/WhatsApp%20Image%202026-05-07%20at%2015.31.01.jpeg`,
            `${BASE}/WhatsApp%20Image%202026-05-07%20at%2015.31.01%20(1).jpeg`,
        ],
        category: "saias",
        colors: [{ name: "Preto", hex: "#2a2a2a" }],
        offer: OFFER,
    },
];
