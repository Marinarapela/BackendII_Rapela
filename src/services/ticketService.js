import { TicketRepository } from '../repository/ticketsRepository.js';
import { cartModel } from '../dao/models/cartModel.js';
import productModel from '../dao/models/productModel.js';
import { nanoid } from 'nanoid';

export class TicketService {
    constructor() {
        this.ticketsRepository = new TicketRepository();
    }

    async purchaseCart(userId, cartId) {
        const cart = await cartModel.findById(cartId).populate('products.product');
        if (!cart) throw new Error(`Carrito ${cartId} no encontrado`);

        let totalAmount = 0;
        const purchasedProducts = [];
        const remainingProducts = [];

        // Verificar stock
        for (const item of cart.products) {
            if (item.quantity <= item.product.stock) {
                purchasedProducts.push({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price
                });
                totalAmount += item.quantity * item.product.price;

                // Reducir stock
                await productModel.findByIdAndUpdate(item.product._id, {
                    $inc: { stock: -item.quantity }
                });
            } else {
                remainingProducts.push(item); // No se puede comprar por falta de stock
            }
        }

        // Actualizar carrito con los productos que no se pudieron comprar
        cart.products = remainingProducts;
        await cart.save();

        if (purchasedProducts.length === 0) {
            throw new Error("No hay productos disponibles para comprar");
        }

        // Generar ticket
        const ticket = {
            code: nanoid(10),
            purchaser: userId,
            amount: totalAmount,
            products: purchasedProducts
        };

        return await this.ticketsRepository.createTicket(ticket);
    }

    async getTicketById(id) {
        return await this.ticketsRepository.getTicketById(id);
    }

    async getAllTickets() {
        return await this.ticketsRepository.getAllTickets();
    }
}
