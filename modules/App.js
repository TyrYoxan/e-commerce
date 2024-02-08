import products from "./Product.js";
import {buildProductsList, displayCart} from './ui.js';
import {search} from "./Product.js";
import Cart from "./Cart.js";


function init() {
    const cart = new Cart();

    buildProductsList(products);
    displayCart();

    document.getElementById('product-search').onkeyup = function(event) {
        // Vérifiez si la touche enfoncée est "Entrée" (keyCode 13)
        if (event.keyCode === 13) {
            // Lancez la fonction search avec la valeur du champ de recherche
            const newList = search(document.getElementById('product-search').value);

            buildProductsList(newList);
        }
    };

    document.getElementById('empty-cart').onclick = function() {
        cart.emptyCart();
        location.reload();
    }

}

export { init };