import userModel from "../models/userModel.js";


//add item to user category
const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.body.itemId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
const removeFromCart = async (req,res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.body.itemId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({success:true,message:"Removed From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
};


//fetch user cart data 
//fetch user cart data 
const getCart = async (req,res) => {
    try {
        const userId = req.user.userId;  // FIX HERE

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"}) 
    }
};


export{addToCart,removeFromCart,getCart};