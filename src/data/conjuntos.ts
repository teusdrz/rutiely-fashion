import type { Product } from "./types";

const BASE = "/images/vestidos/modelos-vestidos";
const OFFER = "FRETE GRÁTIS ACIMA DE R$ 150";

export const conjuntos: Product[] = [
    // ─── Conjunto Branco ──────────────────────────────────────────────────────
    {
        id: 101,
        title: "Conjunto Branco",
        subtitle: "Cropped + saia combinando para um visual impecável",
        price: "R$ 239,99",
        priceValue: 239.99,
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
    // ─── Conjunto Marrom ──────────────────────────────────────────────────────
    {
        id: 102,
        title: "Conjunto Marrom",
        subtitle: "Cropped + saia em tom terroso com sofisticação feminina",
        price: "R$ 239,99",
        priceValue: 239.99,
        images: [
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.49.26.jpeg`,
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.49.27.jpeg`,
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.49.27%20(1).jpeg`,
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.51.01.jpeg`,
        ],
        category: "conjuntos",
        colors: [{ name: "Marrom", hex: "#7a5c3e" }],
        offer: OFFER,
    },
];
