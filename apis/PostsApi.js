import express from 'express';
import { authMiddleware } from './AuthApi.js';
import Post from '../models/Post.js'

const postAPI = express.Router();

// 啟用驗證機制
postAPI.use('', authMiddleware);

postAPI.get('', (req, res) => {
    res.send();
})

postAPI.post('',(req, res) => {
    res.send();
});


export default postAPI;