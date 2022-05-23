const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema(
{
    series: {type: String},
    description: {type: String},
    price: {type: Number},
    inStock: {type: Boolean},
    cylinder: {type: Number},
    color: {type: String},
}
);

module.exports = mongoose.model("product", productSchema);
