import type { Product } from "./types";

const BASE = "/Conjuntos";
const OFFER = "FRETE GRÁTIS ACIMA DE R$ 150";

export const conjuntos: Product[] = [
    {
        id: 101,
        title: "Conjunto Blazer",
        subtitle: "Elegância estruturada para looks marcantes",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${BASE}/ConjuntoBlazer.jpeg`],
        category: "conjuntos",
        colors: [{ name: "Nude", hex: "#c8a882" }],
        offer: OFFER,
    },
    {
        id: 102,
        title: "Conjunto Blazer e Calça",
        subtitle: "Alfaiataria moderna com pegada feminina",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${BASE}/ConjuntoBlazerCalca.jpeg`],
        category: "conjuntos",
        colors: [{ name: "Preto", hex: "#2a2a2a" }],
        offer: OFFER,
    },
];
