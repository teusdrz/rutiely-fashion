export interface Product {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    priceValue: number;
    images: string[];
    category: string;
}

const IMG_BASE = "/images/camisetas/modelo-camisetas";

export const products: Product[] = [
    {
        id: 1,
        title: "Camiseta Básica Branca",
        subtitle: "Clássico intemporal para o dia a dia",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [
            `${IMG_BASE}/camiseta-basica-branca/camiseta-branca-frente.png`,
            `${IMG_BASE}/camiseta-basica-branca/camiseta-branca-costa.png`,
        ],
        category: "camisetas",
    },
    {
        id: 2,
        title: "Camiseta Básica Preta",
        subtitle: "Essencial versátil para qualquer ocasião",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [
            `${IMG_BASE}/camiseta-basica-preta/camiseta-preta-frente.png`,
            `${IMG_BASE}/camiseta-basica-preta/camiseta-preta-costa.png`,
        ],
        category: "camisetas",
    },
    {
        id: 3,
        title: "Camiseta Básica Listrada",
        subtitle: "Estilo casual com personalidade",
        price: "R$ 64,90",
        priceValue: 64.9,
        images: [
            `${IMG_BASE}/camiseta-basica-listrada/camiseta-listrada-frente.png`,
            `${IMG_BASE}/camiseta-basica-listrada/camiseta-listrada-costa.png`,
        ],
        category: "camisetas",
    },
    {
        id: 4,
        title: "Camiseta Básica Verde",
        subtitle: "Cor vibrante com corte impecável",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [
            `${IMG_BASE}/camiseta-basica-verde/camiseta-verde-frente.png`,
            `${IMG_BASE}/camiseta-basica-verde/camiseta-verde-costa.png`,
        ],
        category: "camisetas",
    },
    {
        id: 5,
        title: "Blazer Cinza Estruturado",
        subtitle: "Sofisticação para todas as ocasiões",
        price: "R$ 149,90",
        priceValue: 149.9,
        images: [
            `${IMG_BASE}/camiseta-blazer-cinza/blazer-cinza-frente.png`,
            `${IMG_BASE}/camiseta-blazer-cinza/blazer-cinza-costa.png`,
        ],
        category: "blazers",
    },
];

export const productColors = [
    { name: "Rosê", hex: "#c9a0a5" },
    { name: "Nude", hex: "#d4b5a0" },
    { name: "Preto", hex: "#2a2a2a" },
];

export const productSizes = ["PP", "P", "M", "G", "GG"];
