import Cart from "./Cart.js";
const cart = new Cart();
function displayProduct (product){
    const imgSrc = `/images/${product.ref}.png`;
    const imgExists = fileExists(imgSrc);

    const newProduct = document.createElement('div');
    newProduct.className = 'product';
    newProduct.idName = 'cart-wrapper';
    const iconElement = imgExists ? `<img src="${imgSrc}" alt="Product Image">` : '<i class="mdi mdi-camera"></i>';
    newProduct.innerHTML = `
    <div class="photo">
        ${iconElement}
        <i class="product-add2cart mdi mdi-cart"></i>
    </div>
    <div class="details-top bigger">
        <p>#${product.ref}</p>
        <p>${product.prix.toFixed(2)} €</p>
    </div>
    <div class="details-description">
        <p>${product.description}</p>
    </div>
`;

    const addToCartBtn = newProduct.querySelector('.product-add2cart');
    addToCartBtn.addEventListener('click', () => {
        cart.addToCart(product);
        displayCart();
        generatCalc();
    });

    let insert = document.getElementById('product-list');
    insert.appendChild(newProduct);
}

function buildProductsList(products) {
    document.getElementById('product-list').innerHTML = '';
    products.forEach(product => {
        displayProduct(product);
    });
}

function displayCart() {
    console.log(cart.items);
    const currentCart = cart.items;

    const cartContainer = document.getElementById('cart-content');
    cartContainer.innerHTML = '';

    // Générer la table HTML contenant les produits du panier
    const tableHTML =`
        ${currentCart.map(item => `
        <tr>
            <td>${item.product.ref}</td>
            <td>x${item.qty}</td>
            <td>${(item.product.prix * item.qty).toFixed(2)}€</td>
        </tr>
        `).join('')}
    `;

    // Afficher la table HTML dans l'élément cartContainer
    cartContainer.innerHTML = `<table>${tableHTML}</table>`;

    const numberItems = document.getElementById('total-products');
    let nbItems = currentCart.reduce((acc, item) => acc + item.qty , 0);
    numberItems.innerHTML =`${nbItems}`;
    generatCalc();
}

function generatCalc() {
    let totalHtml = document.getElementById('cart-total');
    let items = cart.items;

    let total = items.reduce((acc, item) => acc + (item.qty * item.product.prix), 0);

    // Affichez le total dans l'élément HTML
    totalHtml.innerHTML = `${total.toFixed(2)} €`;
}

function fileExists(url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}

export { buildProductsList, displayCart };
