import { TicketModel } from "./models/ticketModel"

export class TicketsMongoDao {
    async create(ticket) {
        const newTicket = await TicketModel.create(ticket);
        return newTicket.toJSON();
    }

    async getById(id) {
        return TicketModel.findById(id).populate('purchaser').populate('products.product');
    }

    async getAll() {
        return TicketModel.find().populate('purchaser').populate('products.product');
    }
}
