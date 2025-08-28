import { CartRepository } from "../repository/cartRepository.js";

export class CartService {
    constructor(productService) {
        this.productService = productService;
        this.cartRepository = new CartRepository();
    }

    async getAllCarts() {
        return this.cartRepository.getAllCarts();
    }

    async getProductsFromCartByID(cid) {
        const cart = await this.cartRepository.getCartById(cid);
        if (!cart) throw new Error(`El carrito ${cid} no existe!`);
        return cart;
    }

    async createCart() {
        return this.cartRepository.createCart();
    }

    async addProductByID(cid, pid) {
        await this.productService.getProductByID(pid);

        const cart = await this.cartRepository.getCartById(cid);
        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        const index = cart.products.findIndex(item => item.product._id.toString() === pid);
        if (index !== -1) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this.cartRepository.updateCart(cid, { products: cart.products });
        return this.getProductsFromCartByID(cid);
    }

    async deleteProductByID(cid, pid) {
        await this.productService.getProductByID(pid);

        const cart = await this.cartRepository.getCartById(cid);
        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        const newProducts = cart.products.filter(item => item.product._id.toString() !== pid);
        await this.cartRepository.updateCart(cid, { products: newProducts });

        return this.getProductsFromCartByID(cid);
    }

    async updateAllProducts(cid, products) {
        for (const p of products) {
            await this.productService.getProductByID(p.product);
        }

        await this.cartRepository.updateCart(cid, { products });
        return this.getProductsFromCartByID(cid);
    }

    async updateProductByID(cid, pid, quantity) {
        if (!quantity || isNaN(parseInt(quantity))) throw new Error("Cantidad inválida!");

        await this.productService.getProductByID(pid);

        const cart = await this.cartRepository.getCartById(cid);
        if (!cart) throw new Error(`El carrito ${cid} no existe!`);

        const index = cart.products.findIndex(item => item.product._id.toString() === pid);
        if (index === -1) throw new Error(`El producto ${pid} no existe en el carrito ${cid}!`);

        cart.products[index].quantity = parseInt(quantity);
        await this.cartRepository.updateCart(cid, { products: cart.products });

        return this.getProductsFromCartByID(cid);
    }

    async deleteAllProducts(cid) {
        await this.cartRepository.updateCart(cid, { products: [] });
        return this.getProductsFromCartByID(cid);
    }
}
