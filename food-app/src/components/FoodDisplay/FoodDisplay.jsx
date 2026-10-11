import React from 'react'
import './FoodDisplay.css'  
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import Fooditem from '../Fooditem/Fooditem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h2>Delicious Foods for You</h2>
        <div className="food-item-list">    
            {food_list.map((item,index)=>{
                if (item.isMysteryBag) return null;
                // normalize category strings to avoid mismatches from casing/whitespace
                const cat = (category || "").toString().trim().toLowerCase();
                const itemCat = (item.category || "").toString().trim().toLowerCase();
                if (cat === 'all' || cat === itemCat) {
                  return <Fooditem key={item._id || index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                }
                return null;
              })}
        </div>
    </div>
  )
}

export default FoodDisplay
