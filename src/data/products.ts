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
        price: "R$ 59,90",
        priceValue: 59.9,
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
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [
            `${IMG_BASE}/camiseta-blazer-cinza/blazer-cinza-frente.png`,
            `${IMG_BASE}/camiseta-blazer-cinza/blazer-cinza-costa.png`,
        ],
        category: "blazers",
    },
    {
        id: 6,
        title: "Camiseta Azul",
        subtitle: "Cor marcante com caimento perfeito",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/CamisetAzul.jpeg`],
        category: "camisetas",
    },
    {
        id: 8,
        title: "Body Regata",
        subtitle: "Leveza e conforto para o dia a dia",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/BodyRegata.jpeg`],
        category: "bodies",
    },
    {
        id: 9,
        title: "Body Marrom",
        subtitle: "Tom terroso com acabamento refinado",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/BodyMarrom.jpeg`],
        category: "bodies",
    },
    {
        id: 10,
        title: "Body Branco",
        subtitle: "Clássico e versátil para combinar com tudo",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/BodyBranco.jpeg`],
        category: "bodies",
    },
    {
        id: 11,
        title: "Body Azul",
        subtitle: "Frescor e estilo em cor vibrante",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/BodyAzul.jpeg`],
        category: "bodies",
    },
    {
        id: 12,
        title: "Body Marrom Aberto",
        subtitle: "Decote moderno com toque sofisticado",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/BodyMarromAberto.jpeg`],
        category: "bodies",
    },
    {
        id: 13,
        title: "Camiseta Vermelha",
        subtitle: "Ousadia e personalidade no visual",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/CamisetaVermelha.jpeg`],
        category: "camisetas",
    },
    {
        id: 14,
        title: "Body Manga Longa",
        subtitle: "Conforto e elegância para dias mais frios",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/BodyMangaLonga.jpeg`],
        category: "bodies",
    },
    {
        id: 15,
        title: "Camiseta Bege",
        subtitle: "Tom neutro que combina com qualquer peça",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${IMG_BASE}/Camiseta-SemModelos/CamisetaBege.jpeg`],
        category: "camisetas",
    },
];

export const productColors = [
    { name: "Rosê", hex: "#c9a0a5" },
    { name: "Nude", hex: "#d4b5a0" },
    { name: "Preto", hex: "#2a2a2a" },
];

export const productSizes = ["38", "40", "42", "44"];
