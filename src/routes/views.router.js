import { Router } from "express";

const router = Router();

// Productos de Prueba
let products = [
  { id: 1, title: "Producto 1", price: 100 },
  { id: 2, title: "Producto 2", price: 200 },
];

router.get("/", (req, res) => {
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products });
});

export default router;