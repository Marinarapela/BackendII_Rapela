import { productService } from '../services/productService.js'

const service = new productService();

export default class ProductController {


    getAll = async (req, res) => {
        try {
            const products = await service.getAllProducts(req.query)
            res.json({ status: "success", payload: products })
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message })
        }
    }

    getById = async (req, res) => {
        try {
            const product = await service.getProductById(req.params.id)
            res.json({ status: "success", payload: product })
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message })
        }
    }

    create = async (req, res) => {
        try {
            const newProduct = await service.createProduct(req.body)
            res.status(201).json({ status: "success", payload: newProduct })
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message })
        }
    }

// PUT /api/products/:id
    update = async (req, res) => {
        try {
            const updated = await service.updateProduct(req.params.id, req.body);
            res.json({ status: "success", payload: updated });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    };

    // DELETE /api/products/:id
    delete = async (req, res) => {
        try {
            const result = await service.deleteProduct(req.params.id);
            res.json({ status: "success", payload: result });
        } catch (err) {
            res.status(404).json({ status: "error", message: err.message });
        }
    };
}

