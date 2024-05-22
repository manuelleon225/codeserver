
import fetchProducts from "./modules/fetchProducts.js";
import printFilter from "./modules/printFilter.js";

//search-btn

fetchProducts("products","",1)


const searchSelector = document.querySelector("#search-btn");
searchSelector.addEventListener("click", printFilter);