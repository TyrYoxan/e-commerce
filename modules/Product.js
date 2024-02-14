class Product {
    constructor(ref, prix, description) {
        this.ref = ref;
        this.prix = prix;
        this.description = description;
    }
}

const products = [
    new Product ('LOL',10.00,'Jeu league of legend'),
    new Product ('Palworld',30.00,'Jeu Palworld'),
    new Product ('The Witcher 3',29.99,'Jeu The Witcher: Wild Hunt')
]

function search(keyword){
    const matchingProducts = products.filter(product => {

        return product.ref.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase());
    });

    return matchingProducts;
}

export default products;
export { search };