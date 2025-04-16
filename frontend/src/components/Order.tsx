import { OrderItems, Pizza } from "../utils/types";
import { api } from "../utils/api";
import { toast } from 'react-toastify';
export const Order = (_props: {
    order: OrderItems[],
    pizzas: Pizza[]
}) => {
    const { order, pizzas } = _props;

    const pizzaMap = new Map(pizzas.map(pizza => [pizza.id, pizza]));

    const submitOrder = async () => {
        try {
            const { data } = await api.post('/api/orders', { items: order });
            toast.success('Order placed successfully! Your order id is: ' + data.id);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-full mt-8 lg:mt-0 lg:w-3/12 text-stone-900 h-fit bg-stone-100 rounded-xl flex flex-col shadow-lg justify-between items-center p-4">
            <h1 className="text-center text-xl p-2 font-bold">Order Summary</h1>
            <div className="w-full h-full p-2 flex flex-col gap-12">
                <div>

                    {order.map((item) => {
                        const pizza = pizzaMap.get(item.pizza_id);
                        return (
                            <div key={item.pizza_id} className="flex justify-between">
                                <p>{pizza!.name}<span className="text-gray-600"> x {item.qty}</span></p>
                                <p>${item.qty * item.item_price}</p>
                            </div>
                        );
                    })}
                    <div className="flex justify-between">
                        <p className="font-bold">Total:</p>
                        <p className="font-bold">${order.reduce((total, item) => total + item.item_price * item.qty, 0)}</p>
                    </div>
                </div>
                <button onClick={submitOrder} className="py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer">Confirm Order</button>
            </div>
        </div>
    );
}