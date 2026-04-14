export interface Product {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    priceValue: number;
    image: string;
}

export const products: Product[] = [
    {
        id: 1,
        title: "Conjunto de Alfaiataria Premium em Tom Rosê",
        subtitle: "Elegância e versatilidade em uma só peça",
        price: "R$ 80,00",
        priceValue: 80,
        image: "/images/Modelo.png",
    },
    {
        id: 2,
        title: "Conjunto de Alfaiataria Premium em Tom Rosê",
        subtitle: "Elegância e versatilidade em uma só peça",
        price: "R$ 80,00",
        priceValue: 80,
        image: "/images/Modelo.png",
    },
    {
        id: 3,
        title: "Conjunto de Alfaiataria Premium em Tom Rosê",
        subtitle: "Elegância e versatilidade em uma só peça",
        price: "R$ 80,00",
        priceValue: 80,
        image: "/images/Modelo.png",
    },
    {
        id: 4,
        title: "Conjunto de Alfaiataria Premium em Tom Rosê",
        subtitle: "Elegância e versatilidade em uma só peça",
        price: "R$ 80,00",
        priceValue: 80,
        image: "/images/Modelo.png",
    },
];

export const productColors = [
    { name: "Rosê", hex: "#c9a0a5" },
    { name: "Nude", hex: "#d4b5a0" },
    { name: "Preto", hex: "#2a2a2a" },
];

export const productSizes = ["PP", "P", "M", "G", "GG"];
