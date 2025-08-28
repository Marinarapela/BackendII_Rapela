
import { CartMongoDao } from "../dao/cartDbDao.js";

export class CartRepository {
    #cartDao = new CartMongoDao();

    async getAllCarts() {
        return this.#cartDao.getAll();
    }

    async getCartById(cid) {
        return this.#cartDao.getById(cid);
    }

    async createCart() {
        return this.#cartDao.create({ products: [] });
    }

    async updateCart(cid, updateObj) {
        return this.#cartDao.update(cid, updateObj);
    }

    async deleteCart(cid) {
        return this.#cartDao.delete(cid);
    }
}
