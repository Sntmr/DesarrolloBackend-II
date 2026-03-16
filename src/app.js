import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("nuevoProducto", (producto) => {
    io.emit("productosActualizados", producto);
  });
});

app.set("io", io);

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});