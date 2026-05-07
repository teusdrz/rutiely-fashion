export interface ProductColor {
    name: string;
    hex: string;
}

export interface Product {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    priceValue: number;
    images: string[];
    category: string;
    colors?: ProductColor[];
    offer?: string;
}
