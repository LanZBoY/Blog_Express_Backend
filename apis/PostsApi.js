import express from 'express';
import { authMiddleware } from './AuthApi.js';
import Post from '../models/Post.js'

const postAPI = express.Router();

// 啟用驗證機制
postAPI.use('', authMiddleware);

postAPI.get('/', async(req, res) => {
    const {_id} = req.body;
    const resultList = await Post.find({createById : _id});
    res.send(resultList);
})

postAPI.post('/', async (req, res) => {
    if(!isValidPost(req.body)){
        res.status(400).send();
        return;
    }
    const {_id, title, content, userName} = req.body;
    const createPost = new Post({
        title: title,
        content: content,
        createById: _id,
        createByName: userName,
        createDate: Date.now()
    });
    await createPost.save();
    res.status(201).send();
});

function isValidPost(post){
    const {title, content} = post;
    if(title === null || title === undefined){
        return false;
    }
    if(content === null || content === undefined){
        return false;
    }
    return true;
}

export default postAPI;
