import ProductDao from "../dao/antique.dao";

class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  async createProduct(antique) {
    return this.dao.createProduct(antique);
  }

  async getProducts(page) {
    return this.dao.getProducts(page);
  }

  async getFilterProducts(page, value) {
    return this.dao.getFilterProducts(page, value);
  }

  async regexProduct(page, value) {
    return this.dao.regexProducts(page, value);
  }

  async getByPid(pid) {
    return this.dao.getByPid(pid);
  }
}

const Product = new ProductService(new ProductDao());
export default Product;
