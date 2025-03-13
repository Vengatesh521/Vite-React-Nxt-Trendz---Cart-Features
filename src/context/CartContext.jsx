import { createContext, useContext } from "react";

const CartContext = createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
});

export const useCartContext = () => useContext(CartContext);

export default CartContext;
