export default function createProductCard(product, user) {
    let buttonAdapted;
    if(user !== undefined){
      if ((user.role === 2 || user.role === "PREM")) {
        if(product.supplier_id === user._id){
          buttonAdapted = `
            <a href="/search/${product._id}">
              <button class="btn btn-secondary w-100">Manage</button>
            </a>
          `;
        } else {
          buttonAdapted = `
            <a href="/search/${product._id}">
              <button class="btn btn-primary w-100">Add to cart</button>
            </a>
          `;
        }
      } else if((user.role === 0 || user.role === "ADMIN")){
        buttonAdapted = `
          <a href="/search/${product._id}">
            <button class="btn btn-secondary w-100">Manage</button>
          </a>
        `;
      } else if((user.role === 1 || user.role === "USER")){
        buttonAdapted = `
          <a href="/search/${product._id}">
            <button class="btn btn-primary w-100">Add to cart</button>
          </a>
        `;
      }
    } else {
      buttonAdapted = `
        <a href="/search/${product._id}">
          <button class="btn btn-primary w-100">Add to cart</button>
        </a>
      `;
    }
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
            ${buttonAdapted}
        </div>
    </div>
</div>
    `;
  }


  