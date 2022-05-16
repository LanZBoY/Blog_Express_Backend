import express from "express";
import mongoose from "mongoose";
import UserAPI from './apis/UserApi.js'
import config from "./config.js";
import {AuthAPI} from "./apis/AuthApi.js";
import PostAPI from "./apis/PostsApi.js";


const app = express();

// 初始化MongoDB參數
mongoose.connect(config['MongoDB_URL'])

app.use(express.json());
app.use('/auth', AuthAPI);
app.use('/users', UserAPI);
app.use('/posts', PostAPI);

app.listen(3000);