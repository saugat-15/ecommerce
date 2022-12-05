const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
  },
  {
    collection: "Products",
  }
);

const productsModel = mongoose.model("productsModel", productsSchema);
module.exports = productsModel;
