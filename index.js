import express from "express";
import mongoose from "mongoose";
import UserAPI from './apis/UserApi.js'
import config from "./config.js";
import {AuthAPI, authMiddleware} from "./apis/AuthApi.js";


const app = express();

// 初始化
mongoose.connect(config['MongoDB_URL'])

app.use(express.json());
app.use('/auth', AuthAPI);
app.use('/users', UserAPI);
app.use('/', authMiddleware);

app.listen(3000);