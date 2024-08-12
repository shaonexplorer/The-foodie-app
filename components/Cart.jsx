import { useContext } from "react";
import { CartContext } from "../store/CartContextProvider";
import { UserProgressContext } from "../store/UserProgressContextProvider";

function Cart() {
  const cartctx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm ">
      <dialog
        open
        className="bg-amber-200 shadow-xl w-[50%] rounded-3xl relative top-[30%] h-1/2 p-10 z-50 flex justify-center items-center"
      >
        <button
          className="absolute top-1 right-1 pr-3 text-5xl hover:scale-110"
          onClick={() => progressCtx.setProgress("")}
        >
          &#215;
        </button>
        {cartctx.cart.length > 0 && (
          <div>
            <ul className="bg-lime-200 px-4 py-2 rounded-xl divide-y-[1px] divide-stone-600 w-[90%]">
              {cartctx.cart.map((items) => (
                <li
                  className="text-stone-700 text-2xl my-2 pt-2"
                  key={items.id}
                >
                  <div className="flex justify-between">
                    <div className="flex w-96">
                      <div>
                        <span>{items.name}</span> <span>&#215;</span>
                        <span>{items.quantity}pc</span>
                      </div>

                      <span className="ml-auto">
                        <button
                          onClick={() => cartctx.removeItem(items)}
                          className="bg-lime-400 rounded-full w-6 h-6 hover:scale-110"
                        >
                          -
                        </button>

                        <span> {items.quantity}</span>

                        <button
                          className="bg-lime-400 rounded-full w-6 h-6 hover:scale-110"
                          onClick={() => cartctx.addItem(items)}
                        >
                          +
                        </button>
                      </span>
                    </div>

                    <span className="flex justify-evenly w-40">
                      <span> ${items.totalPrice}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => progressCtx.setProgress("checkout")}
              className="absolute right-5 bottom-5 bg-amber-300 text-stone-600 font-bold px-4 py-2 rounded-md hover:scale-110 tracking-wider"
            >
              Proceed to checkout
            </button>
          </div>
        )}
        {cartctx.cart.length === 0 && (
          <div>
            <p className="bg-red-200 rounded-lg px-4 py-2 text-xl text-red-500">
              Your cart is empty.Please add item to cart
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default Cart;
