import { useContext } from "react";
import { CartContext } from "../store/CartContextProvider";

function ItemQtyManager({ items }) {
  const cartctx = useContext(CartContext);

  const selectedItem = cartctx.cart.find((item) => item.id === items.id);
  return (
    <span className="flex justify-between items-center w-1/3">
      <button
        onClick={() => cartctx.removeItem(items)}
        className="bg-lime-400 rounded-full w-11 h-11 text-stone-800 text-5xl"
      >
        -
      </button>
      <p className="text-3xl text-lime-400">{selectedItem.quantity}</p>
      <button
        className="bg-lime-400 rounded-full w-11 h-11 text-stone-800 text-5xl"
        onClick={() => cartctx.addItem(items)}
      >
        +
      </button>
    </span>
  );
}

export default ItemQtyManager;
