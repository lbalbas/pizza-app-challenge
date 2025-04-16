import { OrderItems } from "../utils/types";
import { api } from "../utils/api";
import { toast } from 'react-toastify';
export const Order = (_props: {
    order: OrderItems[],
    setOrder: React.Dispatch<React.SetStateAction<OrderItems[]>>
}) => {
    const { order, setOrder } = _props;

    const submitOrder = async () => {
        try {
            const { data } = await api.post('/api/orders', { items: order });
            toast.success('Order placed successfully! Your order id is: ' + data.id);
            setOrder([]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-full mt-8 lg:mt-0 lg:w-3/12 text-stone-900 h-fit bg-stone-100 rounded-xl flex flex-col shadow-lg justify-between items-center p-4">
            <h1 className="text-center text-xl p-2 font-bold">Order Summary</h1>
            <div className="w-full h-full p-2 flex flex-col gap-12">
                <div>

                    {order.map((item) =>
                        <div key={item.pizza.id} className="flex justify-between">
                            <p>{item.pizza.name}<span className="text-gray-600"> x {item.qty}</span></p>
                            <p>${item.item_price}</p>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <p className="font-bold">Total:</p>
                        <p className="font-bold">${order.reduce((total, item) => total + item.item_price, 0)}</p>
                    </div>
                </div>
                <button onClick={submitOrder} className="py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer">Confirm Order</button>
            </div>
        </div>
    );
}