import fs from "fs";

export default class CartManager {
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

  async createCart() {
    const carts = await this.#readFile();
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1;

    const newCart = { id, products: [] };
    carts.push(newCart);

    await this.#writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#readFile();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#readFile();
    const cart = carts.find(c => c.id === cid);

    if (!cart) return null;

    const product = cart.products.find(p => p.product === pid);

    if (product) {
      product.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.#writeFile(carts);
    return cart;
  }
}