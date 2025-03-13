import CartItem from "../CartItem";
import { useCartContext } from "../../context/CartContext";
import "./index.css";

const CartListView = () => {
  const { cartList } = useCartContext();

  return (
    <ul className="cart-list">
      {cartList.map((eachCartItem) => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  );
};

export default CartListView;
