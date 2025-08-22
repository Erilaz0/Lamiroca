import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const antiqueCollection = "antiques";
const antiqueScheme = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  year: { type: Number },
  country: { type: String },
  category: { type: String },
  price: { type: Number },
  images: [
    {
      image: { type: String },
    },
  ],
  height: { type: Number },
  width: { type: Number },
  weight: { type: Number },
  material: { type: String },
  state: { type: String },
  createdAt: { type: String },
  views: { type: Number },
  stock: { type: Number },
});

antiqueScheme.plugin(mongoosePaginate);
const model =
  mongoose.models.antiques || mongoose.model(antiqueCollection, antiqueScheme);
export default model;
