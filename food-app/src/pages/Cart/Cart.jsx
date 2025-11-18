import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

  const { cartItem, food_list, removeFromCart,getCartTotal,url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
  if (cartItem[item._id] > 0) {
    return (
      <div key={item._id || index}>
        <div className='cart-item-title cart-items-item'>
          <img src={url + "/images/" + item.image} alt="" />
          <p>{item.name}</p>
          <p>₹{item.price}</p>
          <p>{cartItem[item._id]}</p>
          <p>₹{(item.price * cartItem[item._id])}</p>
          <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
        </div>
        <hr />
      </div>
    )
  }
})}

      </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getCartTotal()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getCartTotal()===0?"0":"50"}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getCartTotal()+(getCartTotal()===0?"":50)}</b>
              </div>
              
            </div>
            <button onClick={()=>navigate('/Order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a Promo code, Aply here</p>
              <div className='promocode-input'>
                <input type="text" placeholder='Enter your promo code' />
                <button>APPLY</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart
