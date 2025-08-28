import { usersMongoDao } from "../dao/usersDbDAO";

export class UsersRepository{
    #usersDao;

    constructor() {
        this.#usersDao = new usersMongoDao();
    }

    async getUsers() {
        return this.#usersDao.getAllUsers(); 
    }

    async getUserById(id) {
        return this.#usersDao.getById(id);
    }

    async updateUser(id, user) {
        return this.#usersDao.update(id, user);
    }

    async createUser(user) {
        return this.#usersDao.create(user);
    }

    async deleteUser(id) {
        return this.#usersDao.delete(id);
    }
}

