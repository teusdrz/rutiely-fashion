import type { Product } from "./types";

const BASE = "/images/vestidos/modelos-vestidos";

export const vestidos: Product[] = [
    {
        id: 201,
        title: "Vestido Branco Clássico",
        subtitle: "Pureza e elegância para qualquer ocasião",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.24.jpeg`,
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.25.jpeg`,
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.25%20(1).jpeg`,
            `${BASE}/Vestido-Branca/WhatsApp%20Image%202026-05-06%20at%2017.49.25%20(2).jpeg`,
        ],
        category: "vestidos",
    },
    {
        id: 202,
        title: "Vestido Branco Fluido",
        subtitle: "Leveza e movimento em cada detalhe",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/Vestido-Branca2/WhatsApp%20Image%202026-05-06%20at%2017.51.03.jpeg`,
            `${BASE}/Vestido-Branca2/WhatsApp%20Image%202026-05-06%20at%2017.51.03%20(1).jpeg`,
            `${BASE}/Vestido-Branca2/WhatsApp%20Image%202026-05-06%20at%2017.51.03%20(2).jpeg`,
        ],
        category: "vestidos",
    },
    {
        id: 203,
        title: "Vestido Marrom",
        subtitle: "Tom terroso com sofisticação feminina",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.49.26.jpeg`,
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.49.27.jpeg`,
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.49.27%20(1).jpeg`,
            `${BASE}/%20Vestido-Marrom/WhatsApp%20Image%202026-05-06%20at%2017.51.01.jpeg`,
        ],
        category: "vestidos",
    },
    {
        id: 204,
        title: "Vestido Preto",
        subtitle: "Clássico atemporal para ocasiões especiais",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/Vestido-Preto/WhatsApp%20Image%202026-05-06%20at%2017.40.55.jpeg`,
            `${BASE}/Vestido-Preto/WhatsApp%20Image%202026-05-06%20at%2017.40.55%20(1).jpeg`,
            `${BASE}/Vestido-Preto/WhatsApp%20Image%202026-05-06%20at%2017.40.56.jpeg`,
        ],
        category: "vestidos",
    },
    {
        id: 205,
        title: "Vestido Preto Elegante",
        subtitle: "Sofisticação noturna com corte impecável",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/Vestido-Preto2/WhatsApp%20Image%202026-05-06%20at%2017.51.04.jpeg`,
            `${BASE}/Vestido-Preto2/WhatsApp%20Image%202026-05-06%20at%2017.51.04%20(1).jpeg`,
            `${BASE}/Vestido-Preto2/WhatsApp%20Image%202026-05-06%20at%2017.51.04%20(2).jpeg`,
        ],
        category: "vestidos",
    },
    {
        id: 206,
        title: "Vestido Roxo",
        subtitle: "Cor vibrante que exala personalidade e charme",
        price: "R$ 89,90",
        priceValue: 89.9,
        images: [
            `${BASE}/Vestido-roxo/WhatsApp%20Image%202026-05-06%20at%2017.40.56%20(1).jpeg`,
        ],
        category: "vestidos",
    },
];
