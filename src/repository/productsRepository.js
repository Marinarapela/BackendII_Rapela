
export class ProductsRepository{
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts() {
        return await this.dao.getAll();
    }

    async getProductById(id) {
        return await this.dao.getById(id);
    }

    async createProduct(product) {
        return await this.dao.create(product);
    }

    async updateProduct(id, product) {
        return await this.dao.update(id, product);
    }

    async deleteProduct(id) {
        return await this.dao.delete(id);
    }
}