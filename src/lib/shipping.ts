export interface ShippingResult {
    distance: number;
    cost: number;
    isFree: boolean;
    estimatedDays: number;
}

function cepToDistance(cep: string): number {
    const clean = cep.replace(/\D/g, "");
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
        hash = (hash << 5) - hash + clean.charCodeAt(i);
        hash |= 0;
    }
    return (Math.abs(hash) % 30) + 1;
}

export function calculateShipping(cep: string): ShippingResult {
    const distance = cepToDistance(cep);
    const isFree = distance <= 5;

    let cost = 0;
    if (!isFree) {
        if (distance <= 10) cost = 8;
        else if (distance <= 20) cost = 15;
        else cost = 25;
    }

    let estimatedDays = 1;
    if (distance > 5 && distance <= 10) estimatedDays = 2;
    else if (distance > 10 && distance <= 20) estimatedDays = 3;
    else if (distance > 20) estimatedDays = 5;

    return { distance, cost, isFree, estimatedDays };
}
