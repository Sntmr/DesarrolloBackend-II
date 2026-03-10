import { Router } from "express";
import CartManager from "../src/managers/CartManager.js";

const router = Router();
const manager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
  const cart = await manager.createCart();
  res.status(201).send(cart);
});

router.get("/:cid", async (req, res) => {
  const id = Number(req.params.cid);
  const cart = await manager.getCartById(id);

  cart ? res.send(cart) : res.status(404).send({ error: "Carrito no encontrado" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

  const cart = await manager.addProductToCart(cid, pid);

  cart ? res.send(cart) : res.status(404).send({ error: "Carrito no encontrado" });
});

export default router;