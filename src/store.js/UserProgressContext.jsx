import { createContext,useState } from "react";

const UserProgressContext = createContext({
  progress: '', // cart or checkout
  showCart:() => {},
  hideCart:() => {},
  showCheckout:() => {},
  hideCheckout:() => {}
})


export function UserProgressContextProvider({children}){
  const [userProgress,setUserProgress]=useState('')

  function showCartFn(){
    setUserProgress('cart')
  }
  function hideCartFn(){
    setUserProgress('')
  }
  function showCheckoutFn(){
    setUserProgress('checkout')
  }
  function hideCheckoutFn(){
    setUserProgress('')
  }

  const userProgressCtx = {
    progress:userProgress,
    showCart:showCartFn,
    hideCart:hideCartFn,
    showCheckout:showCheckoutFn,
    hideCheckout:hideCheckoutFn
  }

  return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;