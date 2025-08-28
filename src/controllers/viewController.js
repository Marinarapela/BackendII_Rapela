
export default class ViewController {
    constructor(viewService) {
        this.viewService = viewService;
    }

    renderProducts = async (req, res) => {
        try {
            const productsData = await this.viewService.getAllProducts(req.query);
            res.render("index", {
                title: "Productos",
                style: "index.css",
                products: JSON.parse(JSON.stringify(productsData.docs)),
                prevLink: { exist: !!productsData.prevLink, link: productsData.prevLink },
                nextLink: { exist: !!productsData.nextLink, link: productsData.nextLink }
            });
        } catch (err) {
            res.status(500).render("error", { message: err.message });
        }
    };

    renderRealtimeProducts = async (req, res) => {
        try {
            const productsData = await this.viewService.getAllProducts(req.query);
            res.render("realTimeProducts", {
                title: "Productos",
                style: "index.css",
                products: JSON.parse(JSON.stringify(productsData.docs))
            });
        } catch (err) {
            res.status(500).render("error", { message: err.message });
        }
    };

    renderCart = async (req, res) => {
        try {
            const products = await this.viewService.getCartProductsById(req.params.cid);
            res.render("cart", {
                title: "Carrito",
                style: "index.css",
                products: JSON.parse(JSON.stringify(products))
            });
        } catch (err) {
            res.render("notFound", { title: "Not Found", style: "index.css" });
        }
    };

    renderRegister = (req, res) => res.status(200).render("register");

    renderLogin = (req, res) => res.status(200).render("login");

    renderProfile = (req, res) => {
        const { first_name, email } = req.user;
        res.status(200).render("perfil", { nombre: first_name, email });
    };
}
