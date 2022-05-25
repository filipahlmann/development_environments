const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let modelsSchema = new Schema(
{
    series: {type: String},
    description: {type: String},
    price: {type: Number},
    inStock: {type: Boolean},
    cylinder: {type: Number},
    color: {type: String},
}
);

module.exports = mongoose.model("models", modelsSchema);
