import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  res.send(await manager.getProducts());
});

router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await manager.getProductById(id);

  product ? res.send(product) : res.status(404).send({ error: "Producto no encontrado" });
});

router.post("/", async (req, res) => {
  const newProduct = await manager.addProduct(req.body);
  res.status(201).send(newProduct);
});

router.put("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const updated = await manager.updateProduct(id, req.body);

  updated ? res.send(updated) : res.status(404).send({ error: "Producto no encontrado" });
});

router.delete("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  await manager.deleteProduct(id);
  res.send({ message: "Producto eliminado" });
});

export default router;