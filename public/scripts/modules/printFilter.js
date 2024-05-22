import fetchProducts from "./fetchProducts.js";

export default async function printFilter(evento) {
  const categorySelect = document.getElementById("select-category").value;
  await fetchProducts("products", categorySelect);
}