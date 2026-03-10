import express from "express";
import productsRouter from "../routes/products.router.js";
import cartsRouter from "../routes/cart.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Preentrega 1");
});

app.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});