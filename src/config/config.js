import dotenv from 'dotenv'
dotenv.config()

export const config = {
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    SECRET_SESSION: process.env.SECRET_SESSION,
}