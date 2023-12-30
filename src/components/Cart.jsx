import Modal from "../UI/Modal";
import {useContext} from 'react';
import AppContext from "../store.js/AppContext";
import {currencyFormatter} from "../utills.js/formatting.js";
import UserProgressContext from "../store.js/UserProgressContext.jsx";
import Button from "../UI/Button";
import CartItem from "./CartItem.jsx";
function Cart(){
  const {cart,removeCartItem,addCartItem} = useContext(AppContext);
  const userProgressCtx= useContext(UserProgressContext)
  const totalPrice = cart && cart.reduce((total,item) =>total + item.price * item.qty,0)

  function handleCloseCart(){
    userProgressCtx.hideCart();
  }


  return  <Modal open={userProgressCtx.progress === 'cart'} className="cart">
              <h2>Cart</h2>
            <ul>
              {cart && cart.map(item => {
                return <CartItem key={item.id} name={item.name} price={item.price} qty={item.qty} onIncrease = {() =>addCartItem(item)} 
                onDecrease = {() => removeCartItem(item.id)}
                />
              })}
            </ul>
            <p className="cart-total">Total Amount:{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
              <Button textOnly onClick={handleCloseCart}>Close</Button>
              <Button onClick={handleCloseCart}>Go to Checkout</Button>
            </p>
          </Modal>
}
export default Cart;