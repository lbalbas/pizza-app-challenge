import './App.css'
import '/pizza-vector.svg';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify'
import { PizzaContainer } from './components/PizzaContainer'
import { OrderItems, Pizza } from './utils/types';
import { Order } from './components/Order';
import { api } from './utils/api';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [order, setOrder] = useState<OrderItems[]>([]);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await api.get('/api/pizzas');
        setLoading(false);
        setPizzas(data);
      } catch (err) {
        console.error('Failed to load pizzas:', err);
      }
    };
    fetchPizzas();
  }, []);

  const addPizzaToOrder = (pizza: Pizza) => {
    if (order.find((item) => item.pizza.id === pizza.id)) {
      setOrder(order.map((item) => {
        if (item.pizza.id === pizza.id) {
          return { ...item, qty: item.qty + 1, item_price: item.item_price + pizza.price };
        }
        return item;
      }));
    } else {
      setOrder([...order, { pizza: pizza, qty: 1, item_price: pizza.price }]);
    }
  }

  if (loading) {
    return (
      <div className="w-[100svw] h-[100svh] flex justify-center items-center">
        <LoadingSpinner />
      </div>);
  }

  return (
    <div className="w-full max-w-[1920px] flex justify-center mx-auto py-4">
      <div className="w-11/12 flex flex-col lg:flex-row justify-between">
        <div>
          <h1 className="text-center text-3xl lg:text-4xl font-bold mb-4 text-stone-900 flex items-center gap-2"> <img src="/pizza-vector.svg" className="w-16 h-16" alt="Pizza Illust" />PizzaApp</h1>
          <PizzaContainer pizzas={pizzas} addPizzaToOrder={addPizzaToOrder} />
        </div>
        <Order setOrder={setOrder} order={order} />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
