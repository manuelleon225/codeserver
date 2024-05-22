import printProductCards from "./printProductCards.js";

export default async function fetchProducts(id, split, page) {
  try {
    console.log(id, split, page);
    let res = await fetch(`/api/products/paginate?category=${split}&page=${page}`);
    res = await res.json();

    const prev = document.querySelector("#prev");
    if (res.info.prevPage) {
      prev.innerHTML = '<button class="btn btn-primary" id="prevB">Prev Page</button>';
    } else {
      prev.innerHTML = '';
    }

    const next = document.querySelector("#next");
    if (res.info.nextPage) {
      next.innerHTML = '<button class="btn btn-primary" id="nextB">Next Page</button>';
    } else {
      next.innerHTML = '';
    }

    printProductCards(res.response, id);

    const nextButton = document.querySelector("#nextB");
    if (nextButton) {
      nextButton.addEventListener("click", () => fetchProducts(id, split, res.info.nextPage));
    }

    const prevButton = document.querySelector("#prevB");
    if (prevButton) {
      prevButton.addEventListener("click", () => fetchProducts(id, split, res.info.prevPage));
    }

  } catch (error) {
    console.error(error);
  }
}
