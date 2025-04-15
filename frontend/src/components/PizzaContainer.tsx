import { Pizza } from "../utils/types.ts";

export const PizzaContainer = (_props: {
    addPizzaToOrder: (pizza: Pizza) => void,
    pizzas: Pizza[]
}) => {
    const { addPizzaToOrder, pizzas } = _props;

    if (pizzas.length === 0) {
        return <h1>Loading...</h1>;
    }

    return (
        <main className="w-full">
            <h1 className="text-center text-2xl font-bold">Menu</h1>
            <div className="flex flex-wrap justify-between">
                {pizzas.map((pizza) => (
                    <article className="border-gray-200 border p-4 rounded-xl shadow-md flex flex-col w-64 justify-between" key={pizza.id}>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-lg font-bold">{pizza.name}</h2>
                                <span className="text-gray-600">${pizza.price}</span>
                            </div>
                            <div className="pb-2">
                                <h3>Ingredients</h3>
                                <p className="text-gray-600">{pizza.ingredients.join(', ')}</p>
                            </div>
                        </div>

                        <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer" onClick={() => addPizzaToOrder(pizza)}>Add to order</button>
                    </article>
                ))}
            </div>
        </main>
    )
}