const socket = io();

const productsList = document.getElementById("products-list");
const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const price = Number(formData.get("price"));

  const nuevoProducto = {
    id: Date.now(), //Temporal
    title,
    price,
  };

  socket.emit("nuevoProducto", nuevoProducto);

  form.reset();
});

socket.on("productosActualizados", (producto) => {
  const li = document.createElement("li");
  li.dataset.id = producto.id;
  li.textContent = `${producto.title} - $${producto.price}`;
  productsList.appendChild(li);
});