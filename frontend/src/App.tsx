import { useState } from 'react';
import './App.css'
import { PizzaContainer } from './components/PizzaContainer'
import { OrderItems, Pizza } from './utils/types';

function App() {
  const [order, setOrder] = useState<OrderItems[]>([]);

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
      <h1 className="text-center text-3xl font-bold mt-20">PizzaApp</h1>
      <div className="flex flex-col lg:flex-row">
        <PizzaContainer addPizzaToOrder={addPizzaToOrder} />
      </div>
    </>
  )
}

export default App
