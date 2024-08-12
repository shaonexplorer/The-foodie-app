// import { useContext } from "react";
import { getMeals } from "../supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContextProvider";
import MealsItem from "./MealsItem";
import Cart from "./Cart";

import { PiShoppingCartThin } from "react-icons/pi";
import { SiKfc } from "react-icons/si";
import { UserProgressContext } from "../store/UserProgressContextProvider";
import CheckOut from "./CheckOut";
import Success from "./Success";

function Meals() {
  const { data, status, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: getMeals,
  });

  useEffect(() => {
    if (isLoading) setSearchedMeals(data);
  }, [isLoading, data]);

  const [searchVal, setSearchVal] = useState("");

  const [searchedMeals, setSearchedMeals] = useState();

  function handleSearch(e) {
    setSearchVal(e.target.value);
    setSearchedMeals(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  }

  const progressCtx = useContext(UserProgressContext);
  // console.log(progressCtx.progress);
  const cartctx = useContext(CartContext);
  // console.log(cartctx.cart);

  const totalItem = cartctx.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleCart() {
    progressCtx.setProgress("cart");
  }

  return (
    <div className="bg-stone-900 min-h-dvh">
      {progressCtx.progress === "cart" && <Cart />}
      {progressCtx.progress === "checkout" && <CheckOut />}
      {progressCtx.progress === "success" && <Success />}
      <div className="max-w-7xl p-12 mx-auto bg-stone-900">
        <div className="flex justify-between items-center mb-7">
          <div className="text-amber-400 text-9xl">
            <SiKfc />
          </div>
          <div className="flex items-center justify-between space-x-8">
            <div>
              <input
                className="px-5 py-2 rounded-l-full bg-stone-900 border border-r-0 border-amber-400 text-amber-400 placeholder:text-stone-400 text-center focus:outline-none text-lg"
                placeholder="e.g pizza"
                value={searchVal}
                onChange={(e) => handleSearch(e)}
              ></input>
              <button
                onClick={() => handleSearch()}
                className="rounded-r-full px-4 py-2 bg-amber-400 text-stone-800 border border-l-0 border-amber-400 font-bold text-lg"
              >
                Search
              </button>
            </div>

            <button
              className="relative bg-amber-400 rounded-full w-14 h-14 pl-2 text-4xl font-bold text-stone-800 hover:scale-110"
              onClick={() => handleCart()}
            >
              <div>
                {totalItem > 0 && (
                  <span className="absolute -top-4 -right-0 bg-red-600 rounded-full text-base w-6 h-6 text-white font-bold">
                    {totalItem}
                  </span>
                )}
                <PiShoppingCartThin />
              </div>
            </button>
          </div>
        </div>
        {isLoading && (
          // <div className="text-white text-2xl text-center tracking-widest">
          //   Fetching meals....
          // </div>
          <div className="flex justify-center items-center">
            <div
              className="text-white inline-block h-11 w-11 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              {/* <span className="text-white !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span> */}
            </div>
            <p className="text-white text-2xl tracking-widest ml-4">
              Loading Menu...
            </p>
          </div>
        )}
        {status === "success" && searchedMeals && searchVal && (
          <div className="grid grid-cols-3 gap-4">
            {searchedMeals.map((items) => (
              <MealsItem items={items} key={items.id} />
            ))}
          </div>
        )}
        {status === "success" && searchVal === "" && (
          <div className="grid grid-cols-3 gap-4">
            {data.map((items) => (
              <MealsItem key={items.id} items={items} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Meals;
