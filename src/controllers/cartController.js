export default class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    getById = async (req, res) => {
        try {
            const result = await this.cartService.getProductsFromCartByID(req.params.cid);
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const result = await this.cartService.createCart();
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    addProduct = async (req, res) => {
        try {
            const result = await this.cartService.addProductByID(req.params.cid, req.params.pid);
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const result = await this.cartService.deleteProductByID(req.params.cid, req.params.pid);
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    updateAllProducts = async (req, res) => {
        try {
            const result = await this.cartService.updateAllProducts(req.params.cid, req.body.products);
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const result = await this.cartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity);
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };

    deleteAllProducts = async (req, res) => {
        try {
            const result = await this.cartService.deleteAllProducts(req.params.cid);
            res.send({ status: 'success', payload: result });
        } catch (error) {
            res.status(400).send({ status: 'error', message: error.message });
        }
    };
}