
import { verify } from "crypto"
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "provide proper username"]
    },
    password: {
        type: String,
        required: [true, "provide proper password"]
    },
    email: {
        type: String,
        required: [true, "provide proper email address"]
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpirt:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)


export default User