export type FeatureIcon = "hanger" | "needle" | "flower" | "ribbon" | "crown";

export type Feature = {
    icon: FeatureIcon;
    title: string;
    description: string;
};

export const ABOUT_FEATURES: Feature[] = [
    {
        icon: "hanger",
        title: "Estilo Exclusivo",
        description:
            "Cada peça é selecionada para realçar sua personalidade única, unindo tendência e atemporalidade em um só look.",
    },
    {
        icon: "needle",
        title: "Costura Impecável",
        description:
            "Tecidos nobres e acabamentos precisos garantem elegância e conforto que persistem a cada uso.",
    },
    {
        icon: "flower",
        title: "Feita para Você",
        description:
            "Moda feminina pensada para todas as ocasiões, celebrando a essência e a força única de cada mulher.",
    },
    {
        icon: "ribbon",
        title: "Detalhes que Encantam",
        description:
            "Laços, rendas e acabamentos exclusivos que transformam cada peça em uma experiência sensorial única.",
    },
    {
        icon: "crown",
        title: "Você Merece o Melhor",
        description:
            "Qualidade premium e atendimento personalizado para que cada cliente se sinta verdadeiramente especial.",
    },
];
