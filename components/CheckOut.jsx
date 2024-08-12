import { useContext } from "react";
import { UserProgressContext } from "../store/UserProgressContextProvider";
import { CartContext } from "../store/CartContextProvider";
import { postOrders } from "../supabase/supabase";
import { useForm } from "react-hook-form";

function CheckOut() {
  const progressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleCheckout() {
    const newOrder = {
      item_description: cartCtx.cart
        .map((item) => `${item.name}*${item.quantity}pc`)
        .toString(),
      customer_name: getValues("name"),
      customer_email: getValues("email"),
      customer_phone: getValues("phone"),
      customer_address: getValues("address"),
    };

    console.log(newOrder);

    postOrders(newOrder);
    progressCtx.setProgress("success");
    cartCtx.success();
  }

  const { register, handleSubmit, getValues } = useForm();

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
        <form
          className="flex flex-col space-y-3 w-[50%] tracking-widest"
          onSubmit={handleSubmit(handleCheckout)}
        >
          <h1 className="text-stone-700 font-bold text-xl ">
            Your order amount:
            <span className="bg-amber-300 px-2 py-1 rounded-md">
              ${totalPrice}
            </span>
          </h1>
          <input
            className="px-4 py-2 bg-lime-200 text-stone-800 rounded-lg placeholder:text-opacity-20"
            placeholder="Fullname"
            {...register("name", { required: true })}
          ></input>
          <input
            className="px-4 py-2 bg-lime-200 text-stone-700 rounded-lg placeholder:text-opacity-20"
            placeholder="Email"
            {...register("email", { required: true })}
          ></input>
          <input
            className="px-4 py-2 bg-lime-200 text-stone-700 rounded-lg placeholder:text-opacity-20"
            placeholder="Phone"
            {...register("phone", { required: true })}
          ></input>
          <input
            className="px-4 py-2 bg-lime-200 text-stone-700 rounded-lg placeholder:text-opacity-20"
            placeholder="Address"
            {...register("address", { required: true })}
          ></input>
          <button
            type="submit"
            className="absolute right-5 bottom-5 bg-amber-300 text-stone-600 font-bold px-4 py-2 rounded-md hover:scale-110"
          >
            Submit Order
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default CheckOut;
