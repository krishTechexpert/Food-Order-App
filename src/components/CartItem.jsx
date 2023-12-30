import { currencyFormatter } from "../utills.js/formatting"
export default function CartItem({name,qty,price,onDecrease,onIncrease}){
  return (
    <li className="cart-item">
      <p>
        {name} - {qty} * {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions"> 
          <button onClick={onDecrease}>-</button>
          <span>{qty}</span>
          <button onClick={onIncrease}>+</button>
      </p>
    </li>
  )
}