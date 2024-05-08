import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const removeEverything = () => {
    Object.keys(cartItems).forEach(itemId => removeFromCart(itemId));
  };

  const hasItemsInCart = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0) > 0;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-header">
          <span>Items</span>
          <span>Title</span>
          <span>Price</span>
          <span>Total</span>
          <span>Remove</span>
        </div>
        <hr />
        {hasItemsInCart ? (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index} className="cart-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                  <span>₹{item.price * cartItems[item._id]}</span>
                  <span className='remove-icon' onClick={() => removeFromCart(item._id)}>x</span>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="cart-empty">
            <p>No items in cart.</p>
          </div>
        )}
        {/* {hasItemsInCart && (
          <button className="remove-everything-button" onClick={removeEverything}>
            Remove Everything
          </button>
        )} */}
      </div>
      <div className="cart-summary">
        <h2>Cart Totals</h2>
        <div className="summary-detail">
          <span>Subtotal</span>
          <span>₹{getTotalCartAmount()}</span>
        </div>
        <hr />
        <div className="summary-detail">
          <span>Delivery Fee</span>
          <span>₹{getTotalCartAmount() === 0 ? 0 : 5}</span>
        </div>
        <hr />
        <div className="summary-detail total">
          <strong>Total</strong>
          <strong>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</strong>
        </div>
        {hasItemsInCart && (
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        )}
      </div>
    </div>
  );
};

export default Cart;
