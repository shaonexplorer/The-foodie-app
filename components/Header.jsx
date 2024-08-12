import { useState } from "react";
import Cart from "./Cart";

import { PiShoppingCartThin } from "react-icons/pi";
import { SiKfc } from "react-icons/si";

function Header() {
  const [showCart, setShowCart] = useState(false);
  function handleCart() {
    setShowCart((value) => !value);
  }
  return (
    <>
      <nav className=" bg-stone-900 px-7">
        <div className="max-w-7xl mx-auto flex justify-between items-center space-x-6">
          <div className="text-amber-400 text-9xl">
            <SiKfc />
          </div>

          <div className="flex justify-end items-center mb-7">
            <input
              className="px-5 py-2 rounded-l-lg bg-stone-900 border border-amber-400 text-amber-400 w-[50%] placeholder:text-stone-400 text-center focus:outline-none text-lg"
              placeholder="search menu, e.g pizza"
            ></input>
            <button className="rounded-r-lg px-4 py-2 bg-amber-400 text-stone-800 border border-amber-400 font-bold text-lg">
              Search
            </button>

            <button
              className=" bg-amber-400 rounded-full w-14 h-14 pl-2 text-4xl font-bold text-stone-800 hover:scale-110"
              onClick={() => handleCart()}
            >
              <div>
                <PiShoppingCartThin />
              </div>
            </button>
          </div>

          {/* <div>
            <button
              className=" bg-amber-400 rounded-full w-14 h-14 pl-2 text-4xl font-bold text-stone-800 hover:scale-110"
              onClick={() => handleCart()}
            >
              <div>
                <PiShoppingCartThin />
              </div>
            </button>
           
          </div> */}
        </div>
      </nav>

      {showCart && <Cart />}
    </>
  );
}

export default Header;
