import { connectMongoDB } from "./connection";

const { default: model } = require("./model/antique");
let limit = 12;

class ProductDao {
  constructor() {}

  async createProduct(antique) {
    connectMongoDB();
    return model.create(antique);
  }

  async getProducts(page) {
    connectMongoDB();
    return model.paginate({}, { page: page, limit: limit });
  }

  async getFilterProducts(page, value) {
    connectMongoDB();
    return model.paginate({ category: value }, { page: page, limit: limit });
  }

  async regexProducts(page, value) {
    return model.paginate(
      {
        $or: [
          { name: { $regex: value, $options: "i" } }, // Buscar en el campo "name"
          { description: { $regex: value, $options: "i" } }, // Buscar en "description"
          { category: { $regex: value, $options: "i" } }, // Buscar en "category"
        ],
      },
      { limit, page }
    );
  }

  async getByPid(pid) {
    return model.findOne({ _id: pid });
  }
}

export default ProductDao;
