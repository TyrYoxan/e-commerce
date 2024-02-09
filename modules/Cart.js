class Cart {
    constructor() {
        // Initialise le contenu du panier comme un tableau vide ou récupère-le du localStorage s'il existe
        this.loadCartFromLocalStorage();
        console.log(this.items);
    }

    addToCart(product) {
        const existingItem = this.items.find(item => item.product.ref === product.ref);

        if (existingItem) {
            existingItem.qty++;
        } else {
            this.items.push({ product: product, qty: 1 });
        }

        this.updateLocalStorage();
    }

    emptyCart() {
        this.items = [];
        localStorage.removeItem('cartItems');
    }

    updateLocalStorage() {
        localStorage.clear();
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cartItems');
        this.items = savedCart ? JSON.parse(savedCart) : [];

        // Vérifier si le produit est déjà présent dans le panier et incrémenter sa quantité
        this.items.forEach(item => {
            item.qty = this.items.filter(cartItem => cartItem.product.ref === item.product.ref)
                .reduce((totalQty, cartItem) => totalQty + cartItem.qty, 0);
        });
    }

}

export default Cart;
