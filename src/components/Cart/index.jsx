import { useState } from "react";
import Popup from "reactjs-popup";
import { useCartContext } from "../../context/CartContext";
import CartItem from "../CartItem";
import CartSummary from "../CartSummary";
import EmptyCartView from "../EmptyCartView";
import Header from "../Header";
import "./index.css";

const Cart = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { cartList, removeAllCartItems } = useCartContext();

  const togglePopup = () => setIsPopupOpen((prev) => !prev);

  const handlePaymentChange = (e) => setSelectedPayment(e.target.value);

  const confirmOrder = () => {
    setShowSuccessMessage(true);
    setIsPopupOpen(false);
  };

  const onRemoveAllItems = () => removeAllCartItems();

  const totalItems = cartList.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-heading">My Cart</h1>
        {cartList.length === 0 ? (
          <EmptyCartView />
        ) : (
          <>
            <div className="remove-all-container">
              <button
                type="button"
                className="remove-all-button"
                onClick={onRemoveAllItems}
              >
                Remove All
              </button>
            </div>
            <div className="cart-items-container">
              <ul className="cart-list">
                {cartList.map((eachItem) => (
                  <CartItem key={eachItem.id} cartItemDetails={eachItem} />
                ))}
              </ul>
              <CartSummary />
              <p data-testid="cart-items-count">{totalItems} Items in cart</p>
              <button
                type="button"
                className="checkout-button"
                data-testid="checkout"
                onClick={togglePopup}
              >
                Checkout
              </button>
            </div>
            <Popup open={isPopupOpen} modal onClose={togglePopup}>
              <div className="popup-container">
                <h3>Select Payment Method</h3>
                <div className="payment-options">
                  <label>
                    <input type="radio" value="Card" disabled />
                    Card
                  </label>
                  <label>
                    <input type="radio" value="Net Banking" disabled />
                    Net Banking
                  </label>
                  <label>
                    <input type="radio" value="UPI" disabled />
                    UPI
                  </label>
                  <label>
                    <input type="radio" value="Wallet" disabled />
                    Wallet
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Cash on Delivery"
                      checked={selectedPayment === "Cash on Delivery"}
                      onChange={handlePaymentChange}
                    />
                    Cash on Delivery
                  </label>
                </div>
                <div className="order-summary">
                  <p>Total Items: {totalItems}</p>
                  <p>Total Price: ₹{totalPrice}</p>
                </div>
                <button
                  type="button"
                  className="confirm-button"
                  disabled={selectedPayment !== "Cash on Delivery"}
                  onClick={confirmOrder}
                >
                  Confirm Order
                </button>
              </div>
            </Popup>
            {showSuccessMessage && (
              <p className="success-message">
                Your order has been placed successfully!
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
