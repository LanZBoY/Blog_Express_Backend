import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    "userName": String,
    "password": String
});

const User = mongoose.model("users", userSchema);

export default User;