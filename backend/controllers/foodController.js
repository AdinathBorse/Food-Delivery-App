import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";



// Create Food Item
const addFood = async (req, res) => {

   let image_fname = `${req.file.filename}`;

   const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_fname
   })
   try {
      await food.save();
      res.json({ success: true, message: "Food item added successfully" })
   } catch (err) {
      console.log(err)
      res.json({ success: false, message: "Error in adding food item" })
   }
}

//All Food Items
const listFood = async (req, res) => {
   try {
      const foods = await foodModel.find({});
      res.json({ success: true, data: foods });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
   }
}

//Remove food items
const removeFood = async (req, res) => {
   try {
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => { });

      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food item removed successfully" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error in removing food item" });
   }
}
export { addFood, listFood, removeFood };