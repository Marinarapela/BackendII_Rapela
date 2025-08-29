import { usersMongoDao as DAO } from "../dao/usersDbDAO.js"

class userService{
    constructor(dao){
        this.dao=new dao()
    }

    async getUsers(){
        return await this.dao.get()
    }

    async getUserById (id){
        return await this.dao.getBy({_id:id})
    }

    async getUserByEmail(email){
        return await this.dao.getByEmail(email)
    }
}

export const userService = new userService (DAO)