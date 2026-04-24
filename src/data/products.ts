export type { Product } from "./types";

import type { Product } from "./types";
import { camisetas } from "./camisetas";
import { conjuntos } from "./conjuntos";
import { vestidos } from "./vestidos";

export { camisetas } from "./camisetas";
export { conjuntos } from "./conjuntos";
export { vestidos } from "./vestidos";

export const products: Product[] = [...camisetas, ...conjuntos, ...vestidos];

export const productColors = [
    { name: "Rosê", hex: "#c9a0a5" },
    { name: "Nude", hex: "#d4b5a0" },
    { name: "Preto", hex: "#2a2a2a" },
];

export const productSizes = ["38", "40", "42", "44"];

export interface CategoryGroup {
    slug: string;
    label: string;
    items: Product[];
}

export const categoryGroups: CategoryGroup[] = [
    { slug: "camisetas", label: "Camisetas", items: camisetas },
    { slug: "conjuntos", label: "Conjuntos", items: conjuntos },
    { slug: "vestidos", label: "Vestidos", items: vestidos },
];
