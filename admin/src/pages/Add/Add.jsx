import React from 'react'
import './Add.css'
import { assets } from '../../../../food-app/src/assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';





const Add = ({url}) => {

 // const url = "http://localhost:4000";
  const [Image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  const formData = new FormData();
  // backend expects the file field name to be 'image' (multer upload.single('image'))
  formData.append('image', Image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upld flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={Image ? URL.createObjectURL(Image) : assets.upload_area} alt="upload preview" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} accept="image/*" type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter product name' />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-product-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-button'>ADD</button>
      </form>

    </div>
  )
}

export default Add
