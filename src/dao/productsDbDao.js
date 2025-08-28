import productModel from './models/productModel.js'

export class productsMongoDao{
    constructor(){}

    async getAll(){

        return await productModel.find().lean()
    }

    async getById(id){

        return productModel.findById (id)
    }

    async create (product){
        let newProduct=await productModel.create(product)
        return newProduct.toJSON()
    }

    async update(id, product) {
        return await productModel.findByIdAndUpdate(id, product, { new: true })
    }

    async delete(id) {
        return await productModel.findByIdAndDelete(id)
    }
}