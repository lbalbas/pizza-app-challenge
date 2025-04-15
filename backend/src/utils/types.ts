export interface Pizza {
    id: string,
    price: number,
    ingredients: string[]
}

export interface Orders {
    items: OrderItem[],
    total: number,
}

interface OrderItem {
    pizza: Pizza,
    qty: number,
}