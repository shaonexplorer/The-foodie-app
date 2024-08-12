import { createContext, useReducer } from "react";

export const CartContext = createContext();

function reducer(cart, action) {
  switch (action.type) {
    case "addItem": {
      const repeatItem = cart.find((items) => items.id === action.payload.id);
      if (repeatItem) {
        const index = cart.findIndex((items) => items === repeatItem);
        // console.log(cart[index].quantity);
        const updatedItem = {
          ...cart[index],
          quantity: cart[index].quantity + 1,
        };
        updatedItem.totalPrice = updatedItem.price * updatedItem.quantity;

        // const updatedCart = cart.filter((items) => items.id !== updatedItem.id);
        const updatedCart = [...cart];
        updatedCart[index] = updatedItem;
        return [...updatedCart];
      } else
        return [
          ...cart,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: 1,
            totalPrice: action.payload.price * 1,
          },
        ];
    }
    case "remove": {
      const index = cart.findIndex((items) => items.id === action.payload.id);
      const updatedItem = { ...cart[index] };
      if (updatedItem.quantity === 1) {
        let updatedCart = [...cart];
        updatedCart = cart.filter((items) => items.id !== updatedItem.id);
        return [...updatedCart];
      }
      updatedItem.quantity -= 1;
      updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
      const updatedCart = [...cart];
      updatedCart[index] = updatedItem;

      return [...updatedCart];
    }
    case "success": {
      return [];
    }
    default:
      break;
  }
}

function CartContextProvider({ children }) {
  const initialCart = [];
  const [cart, dispatch] = useReducer(reducer, initialCart);

  function addItem(item) {
    dispatch({ type: "addItem", payload: item });
  }

  function removeItem(item) {
    dispatch({ type: "remove", payload: item });
  }

  function success() {
    dispatch({ type: "success" });
  }

  const cartContext = { cart, addItem, removeItem, success };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;
