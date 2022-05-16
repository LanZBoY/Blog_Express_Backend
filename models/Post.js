import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createDate: Date,
    createById: String,
    createByName:String
});

const Post = mongoose.model('posts', postSchema);

export default Post;