import { useEffect, useState } from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify'
import { PizzaContainer } from './components/PizzaContainer'
import { OrderItems, Pizza } from './utils/types';
import { Order } from './components/Order';
import { api } from './utils/api';

function App() {
  const [order, setOrder] = useState<OrderItems[]>([]);
  const [pizzas, setPizzas] = useState<Pizza[]>([]); // Lift state up

  // Move your pizza fetching logic here
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await api.get('/api/pizzas');
        setPizzas(data);
      } catch (err) {
        console.error('Failed to load pizzas:', err);
      }
    };
    fetchPizzas();
  }, []);

  const addPizzaToOrder = (pizza: Pizza) => {
    if (order.find((item) => item.pizza_id === pizza.id)) {
      setOrder(order.map((item) => {
        if (item.pizza_id === pizza.id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      }));
    } else {
      setOrder([...order, { pizza_id: pizza.id, qty: 1, item_price: pizza.price }]);
    }
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-8">PizzaApp</h1>
      <div className="flex flex-col lg:flex-row">
        <Order pizzas={pizzas} order={order} />
        <PizzaContainer pizzas={pizzas} addPizzaToOrder={addPizzaToOrder} />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
