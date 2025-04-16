export interface Pizza {
    id: string,
    name: string,
    price: number,
    ingredients: string[]
}

export interface Order {
    id: string
    items: OrderItems[],
    total: number,
}

export interface OrderItems {
    pizza: Pizza,
    qty: number,
    item_price: number
}