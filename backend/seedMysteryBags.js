import mongoose from "mongoose";
import "dotenv/config";
import foodModel from "./models/foodModel.js";

const sampleMysteryBags = [
  {
    name: "The Midnight Baker's Secret Stash",
    description: "A chef's secret surprise assortment of 3-4 handcrafted artisanal sweet & savory bakery treasures from today's fresh batch. What delicious treats will you unbox tonight?",
    price: 199,
    originalPrice: 650,
    category: "Cake",
    dietaryType: "Bakery",
    stock: 5,
    startTime: "9:00 PM",
    endTime: "11:45 PM",
    isMysteryBag: true,
    image: "mystery_bakery_box.png"
  },
  {
    name: "The Royal Midnight Mystery Feast",
    description: "An opulent, secret hot gourmet feast vault packed fresh from tonight's premium dinner rush. Could contain slow-cooked signature delicacies, grills, or royal specialties!",
    price: 249,
    originalPrice: 850,
    category: "Deserts",
    dietaryType: "Non-Veg",
    stock: 4,
    startTime: "9:00 PM",
    endTime: "11:45 PM",
    isMysteryBag: true,
    image: "mystery_nonveg_feast.png"
  },
  {
    name: "The Emerald Harvest Secret Box",
    description: "A wholesome culinary surprise crate packed with chef's handpicked vegetarian delicacies and slow-simmered rich specialties from tonight's kitchen. 100% green goodness!",
    price: 179,
    originalPrice: 580,
    category: "Salad",
    dietaryType: "Veg",
    stock: 6,
    startTime: "9:00 PM",
    endTime: "11:45 PM",
    isMysteryBag: true,
    image: "mystery_veg_box.png"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Remove previous mystery bags if any
    await foodModel.deleteMany({ isMysteryBag: true });

    // Insert new sample mystery bags
    const inserted = await foodModel.insertMany(sampleMysteryBags);
    console.log(`Successfully seeded ${inserted.length} Mystery Surplus Bags!`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
