import {useContext} from 'react';
import AppContext from "../store.js/AppContext";
import {currencyFormatter} from "../utills.js/formatting.js";
import Input from '../UI/Input.jsx';
import Button from '../UI/Button.jsx';
import UserProgressContext from "../store.js/UserProgressContext.jsx";
import Modal from '../UI/Modal.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

let requestConfig={
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  }
}

function Checkout(){
  const {cart,clearCartItem} = useContext(AppContext);
  const userProgressCtx= useContext(UserProgressContext);
  const {data,error,isLoading,sendRequest,clearData} = useHttp('http://localhost:3000/orders',requestConfig)

  function handleCloseCheckout(){
    userProgressCtx.hideCheckout()
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    clearCartItem();
    clearData();
  }

  function handleSubmit(event){
    event.preventDefault();


    let fd=new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({
      order:{
        items:cart,
        customer:data
      }
    }))
    
  }

  let actions = (<>
    <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
      <Button>Submit Order</Button>
  </>)

  if(isLoading){
    actions = <p>Sending order data...</p>
  }

  if(data && !error){
  return <Modal open={userProgressCtx.progress === 'checkout'} closeOnEscKey={handleFinish}>
    <h2>Success</h2>
    <p>Your order was submitted successfully</p>
    <p className='modal-actions'>
      <button onClick={handleFinish}>Okay</button>
    </p>
  </Modal>
}

  const totalPrice = cart && cart.reduce((total,item) =>total + item.price * item.qty,0)
  return <Modal open={userProgressCtx.progress === 'checkout'} closeOnEscKey={handleCloseCheckout}>
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
      <Input label="Full Name" type="text" id="name" />
      <Input label="E-mail Address" type="email" id="email" />
      <Input label="Street" type="text" id="street" />
      <div className='control-row'>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" /> 
      </div>
      {error && <Error title="failed to fetch" message={error} />}
      <p className='modal-actions'>
        {actions}
      </p>
    </form>
  </Modal>
}
export default Checkout;