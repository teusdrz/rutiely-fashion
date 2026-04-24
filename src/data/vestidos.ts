import type { Product } from "./types";

const BASE = "/Vestidos";

export const vestidos: Product[] = [
    {
        id: 201,
        title: "Vestido Preto",
        subtitle: "Clássico atemporal para ocasiões especiais",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${BASE}/VestidoPreto.jpeg`],
        category: "vestidos",
    },
    {
        id: 202,
        title: "Vestido Preto Fluido",
        subtitle: "Movimento e sofisticação em cada detalhe",
        price: "R$ 59,90",
        priceValue: 59.9,
        images: [`${BASE}/VestidoPreto2.jpeg`],
        category: "vestidos",
    },
];
