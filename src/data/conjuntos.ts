import type { Product } from "./types";

const BASE = "/Conjuntos";

export const conjuntos: Product[] = [
    {
        id: 101,
        title: "Conjunto Blazer",
        subtitle: "Elegância estruturada para looks marcantes",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${BASE}/ConjuntoBlazer.jpeg`],
        category: "conjuntos",
    },
    {
        id: 102,
        title: "Conjunto Blazer e Calça",
        subtitle: "Alfaiataria moderna com pegada feminina",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${BASE}/ConjuntoBlazerCalca.jpeg`],
        category: "conjuntos",
    },
];
