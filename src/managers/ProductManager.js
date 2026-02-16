import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async #readFile() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async #writeFile(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getProducts() {
    return await this.#readFile();
  }

  async getProductById(id) {
    const products = await this.#readFile();
    return products.find(p => p.id === id);
  }

  async addProduct(product) {
    const products = await this.#readFile();
    const id = products.length ? products[products.length - 1].id + 1 : 1;

    const newProduct = { id, ...product };
    products.push(newProduct);

    await this.#writeFile(products);
    return newProduct;
  }

  async updateProduct(id, data) {
    const products = await this.#readFile();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...data, id };

    await this.#writeFile(products);
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.#readFile();
    const filtered = products.filter(p => p.id !== id);

    await this.#writeFile(filtered);
    return true;
  }
}