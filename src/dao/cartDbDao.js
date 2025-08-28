import { cartModel } from "../models/cartModel.js";

export class CartMongoDao {
    async getAll() {
        return cartModel.find().lean();
    }

    async getById(id) {
        return cartModel.findById(id).populate("products.product");
    }

    async create(cart) {
        const newCart = await cartModel.create(cart);
        return newCart.toJSON();
    }

    async update(id, updateObj) {
        return cartModel.findByIdAndUpdate(id, updateObj, { new: true });
    }

    async delete(id) {
        return cartModel.findByIdAndDelete(id);
    }
}
