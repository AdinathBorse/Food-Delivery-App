import React from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'

import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
const Fooditem = ({ id, name, price, description, image }) => {

    
    const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-img' src={url+"/images/"+image} alt="" />
                {!cartItem[id]
                    ?<img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
                    :<div className='item-counter'>
                        <img onClick={()=>removeFromCart(id)}src={assets.remove_icon_red} alt=""></img>
                        <p>{cartItem[id]}</p>
                        <img onClick={()=>addToCart(id)}src={assets.add_icon_green} alt="" />
                    </div>
                }

            </div>
            <div className="food-item-info">
                <div className="food-item-food-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">₹{price}</p>
            </div>

        </div>             
    )
}

export default Fooditem
