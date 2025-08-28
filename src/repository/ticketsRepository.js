import { TicketsMongoDao } from "../dao/ticketsDbDao"

export class TicketRepository{
    constructor() {
        this.ticketDao = new TicketsMongoDao();
    }

    async createTicket(ticket) {
        return await this.ticketDao.create(ticket);
    }

    async getTicketById(id) {
        return await this.ticketDao.getById(id);
    }

    async getAllTickets() {
        return await this.ticketDao.getAll();
    }
}