import { ProductsRepository } from "../repository/productsRepository.js";
import { CartRepository } from "../repository/cartRepository.js";

export class ViewService {
    constructor() {
        this.productsRepository = new ProductsRepository();
        this.cartRepository = new CartRepository();
    }

    async getAllProducts(query) {
        return this.productsRepository.getProducts(query);
    }

    async getCartProductsById(cid) {
        const cart = await this.cartRepository.getCartById(cid);
        if (!cart) throw new Error(`El carrito ${cid} no existe!`);
        return cart.products;
    }
}
