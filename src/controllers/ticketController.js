import { TicketService } from '../services/ticketService.js';

export default class TicketController {
    constructor() {
        this.ticketService = new TicketService();
    }

    purchaseCart = async (req, res) => {
        try {
            const ticket = await this.ticketService.purchaseCart(req.user._id, req.params.cid);
            res.status(201).json({ status: "success", payload: ticket });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }

    getTicketById = async (req, res) => {
        try {
            const ticket = await this.ticketService.getTicketById(req.params.tid);
            res.status(200).json({ status: "success", payload: ticket });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }

    getAllTickets = async (req, res) => {
        try {
            const tickets = await this.ticketService.getAllTickets();
            res.status(200).json({ status: "success", payload: tickets });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }
}
