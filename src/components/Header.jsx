import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import { useContext,useState } from "react";
import AppContext from "../store.js/AppContext";
import UserProgressContext from "../store.js/UserProgressContext";
import Modal from "../UI/Modal";
function Header(){
  const {cart}= useContext(AppContext)
  const userProgressCtx = useContext(UserProgressContext);
  const totalItems = cart.length>0 && cart.reduce((res,item) => res + item.qty,0)

  function handleShowCart(){
    if(totalItems !=0){
      userProgressCtx.showCart()
    }
    
  }

  return <header id="main-header">
    <div id="title">
      <img src={logoImg}/>
      <h1> React Food</h1>
    </div>
    <nav>
      <Button onClick={handleShowCart} textOnly>cart({totalItems ? totalItems : 0})</Button>
    </nav>

  </header>
}
export default Header;