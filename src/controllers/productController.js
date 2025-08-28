
export default class ProductController {
    constructor(productService) {
        this.productService = productService
    }

    getAll = async (req, res) => {
        try {
            const products = await this.productService.getAllProducts(req.query)
            res.json({ status: "success", payload: products })
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message })
        }
    }

    getById = async (req, res) => {
        try {
            const product = await this.productService.getProductById(req.params.id)
            res.json({ status: "success", payload: product })
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message })
        }
    }

    create = async (req, res) => {
        try {
            const newProduct = await this.productService.createProduct(req.body)
            res.status(201).json({ status: "success", payload: newProduct })
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message })
        }
    }

// PUT /api/products/:id
    update = async (req, res) => {
        try {
            const updated = await this.productService.updateProduct(req.params.id, req.body);
            res.json({ status: "success", payload: updated });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    };

    // DELETE /api/products/:id
    delete = async (req, res) => {
        try {
            const result = await this.productService.deleteProduct(req.params.id);
            res.json({ status: "success", payload: result });
        } catch (err) {
            res.status(404).json({ status: "error", message: err.message });
        }
    };
}

