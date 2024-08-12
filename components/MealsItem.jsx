import { useContext } from "react";
import { CartContext } from "../store/CartContextProvider";
import ItemQtyManager from "../ui/ItemQtyManager";

function MealsItem({ items }) {
  const cartctx = useContext(CartContext);
  const incart = cartctx.cart.find((item) => item.id === items.id);

  return (
    <div
      className="bg-stone-950 flex items-center flex-col rounded-xl overflow-hidden shadow-xl"
      key={items.id}
    >
      <img className=" w-full" src={items.image}></img>
      <h2 className="text-slate-300 font-bold text-2xl text-center mt-4 capitalize">
        {items.name}
      </h2>
      <p className="text-amber-300 text-center text-xl font-bold mt-4">
        ${items.price}
      </p>
      <p className="text-stone-300 text-center mt-7 mb-7 px-4 font-raleway">
        {items.description}
      </p>
      <div className="mt-auto mb-7 w-full flex justify-center">
        {incart ? (
          <ItemQtyManager items={items} />
        ) : (
          <button
            onClick={() => {
              cartctx.addItem(items);
            }}
            className=" px-4 py-2 rounded-lg bg-amber-400 w-1/2 font-semibold hover:scale-110"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default MealsItem;
