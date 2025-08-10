import mongoose from "mongoose"

    //* Defino el Schema

    const userSchema = new mongoose.Schema ({
        first_name: {
            type: String,
            required: true,
            index: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age:{
            type: Number,
        },
        password:{
            type: String,
            required: true,
        },
        cart:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts'
        },
        role:{
            type: String,
            default: 'user',
        }
    })

export default mongoose.model("User", userSchema)