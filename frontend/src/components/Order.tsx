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
            const OrderSuccessToast = () => (
                <div className="text-sm">
                    <h3 className="font-bold text-green-700">Order Placed Successfully!</h3>
                    <p className="mt-1">Order ID: <span className="font-mono">{data.id}</span></p>
                    <div className="mt-2 border-t pt-2">
                        {data.items.map((item: OrderItems) => (
                            <div key={item.pizza.id} className="flex justify-between">
                                <span>{item.pizza.name} × {item.qty}</span>
                                <span>${(item.item_price).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 font-bold border-t pt-2 flex justify-between">
                        <span>Total:</span>
                        <span>${data.items.reduce((total: number, item: OrderItems) => total + item.item_price, 0).toFixed(2)}</span>
                    </div>
                </div>
            );

            toast.success(OrderSuccessToast, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOrder([]);
        } catch (err) {
            console.error(err);
            toast.error('Failed to place order, check console for more details.');
        }
    }
    const decreaseItemQty = (item: OrderItems) => {
        if (item.qty > 1) {
            setOrder(order.map((OrderItem) => {
                if (OrderItem != item)
                    return OrderItem;
                else {
                    return { ...item, qty: item.qty - 1, item_price: item.item_price - item.pizza.price };
                }
            }))
        } else {
            item.qty--
            setOrder(order.filter((OrderItem) => OrderItem.qty > 0))
        }
    }


    return (
        <div className="w-full mt-8 lg:mt-0 lg:w-3/12 text-stone-900 h-fit bg-stone-100 rounded-xl flex flex-col shadow-lg justify-between items-center p-4">
            <h1 className="text-center text-xl p-2 font-bold">Order Summary</h1>
            <div className="w-full h-full p-2 flex flex-col gap-12">
                <div className="mt-2 border-t border-gray-300 pt-2">

                    {order.map((item) =>
                        <div key={item.pizza.id} className="group relative flex justify-between items-center">
                            <div className="absolute hidden group-hover:flex items-center top-0 -left-3 w-4">
                                <button className="font-bold text-red-400 cursor-pointer text-xl flex items-center" onClick={() => decreaseItemQty(item)}>-</button>
                            </div>
                            <p>{item.pizza.name}<span className="text-gray-600"> x {item.qty}</span></p>
                            <p>${item.item_price}</p>
                        </div>
                    )}
                    <div className="flex justify-between mt-2 border-gray-300 border-t pt-2">
                        <p className="font-bold">Total:</p>
                        <p className="font-bold">${order.reduce((total, item) => total + item.item_price, 0)}</p>
                    </div>
                </div>
                <button onClick={submitOrder} className="py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer">Confirm Order</button>
            </div>
        </div>
    );
}