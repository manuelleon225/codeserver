export default function createProductCard(product) {
    return `
    <div class="col mb-4">
    <div class="card">
        <img src="${product.photo}" class="card-img-top img-fluid h-100" alt="product-photo">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Category: ${product.category}</p>
            <p class="card-text">Price: $${product.price}</p>
            <p class="card-text">Stock: ${product.stock}</p>
            <p class="card-text">ID: ${product._id}</p>
        </div>
        <div class="card-footer">
            <a href="/search/${product._id}">
                <button class="btn btn-primary w-100">Add to cart</button>
            </a>
        </div>
    </div>
</div>
    `;
  }


  