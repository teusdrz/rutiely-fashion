import type { Product } from "./types";

const BASE = "/images/vestidos/modelos-vestidos";
const OFFER = "FRETE GRÁTIS ACIMA DE R$ 150";

export const conjuntos: Product[] = [
    // ─── Conjunto Branco ──────────────────────────────────────────────────────
    {
        id: 101,
        title: "Conjunto Branco",
        subtitle: "Cropped + saia combinando para um visual impecável",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.24.jpeg`,
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.25.jpeg`,
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.25%20(1).jpeg`,
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.25%20(2).jpeg`,
        ],
        category: "conjuntos",
        colors: [{ name: "Branco", hex: "#f0ede8" }],
        offer: OFFER,
    },
];
