import {createContext,useReducer} from 'react';

const  AppContext =createContext({
  //products:[],
  cart:[],
  addCartItem:(product) => {},
  removeCartItem:(productId) => {} 
})


function cartReducer(state,action){
  if(action.type=== 'ADD_ITEM'){
    const updatedItems = [...state.cart];

    // check product already exits in cart
    const existingCartItemIndex =updatedItems && updatedItems.findIndex(item => item.id === action.payload.id);

    const existingCartItem =  updatedItems[existingCartItemIndex];

    // yes item present
    if(existingCartItem){

    const UpdateItem = {
      ...existingCartItem,
      qty:existingCartItem.qty+1
    }
    updatedItems[existingCartItemIndex]=UpdateItem;
    }else {
      updatedItems.push({...action.payload,qty:1})
    }

    return {
      ...state,
      cart:updatedItems
    }
  }
  if(action.type==='REMOVE_ITEM'){
    const updatedCart = [...state.cart];
    const existingCartItemIndex =updatedCart && updatedCart.findIndex(item => item.id === action.payload.Id);

    const selectedCartItem =  updatedCart[existingCartItemIndex]
    if(selectedCartItem.qty ===1){
      updatedCart.splice(existingCartItemIndex,1)
    }else{
      const updateCartItem ={
        ...selectedCartItem,
        qty:selectedCartItem.qty--
      }
      updatedCart[existingCartItemIndex]=updateCartItem;
    }

    return {...state,cart:updatedCart}
  }
  return state
}

export function AppContextProvider({children}){
    const [cartItems,dispatchCartAction] = useReducer(cartReducer,{
      cart:[]
    });

    function addToCartFn(item){
      dispatchCartAction({type:'ADD_ITEM',payload:item})
    }

    function removeCartItemFn(productId){
      dispatchCartAction({type:'REMOVE_ITEM',payload:{Id:productId}})

    }

    const cartContext = {
      cart:cartItems.cart,
      addCartItem:addToCartFn,
      removeCartItem:removeCartItemFn
    }

  return (<AppContext.Provider value={cartContext}>{children}</AppContext.Provider>)
}

export default AppContext;
