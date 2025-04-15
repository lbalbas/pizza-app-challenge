export interface Pizza {
    id: string,
    price: number,
    ingredients: string[]
}

export interface Order {
    id: string
    items: OrderItems[],
    total: number,
}

export interface OrderItems {
    pizza_id: string,
    qty: number,
    item_price: number
}