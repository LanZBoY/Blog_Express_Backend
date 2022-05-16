import express from 'express'
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';
import config from '../config.js'
const AuthAPI = express.Router();

// middleware for checking field is null
AuthAPI.use('/login', (req, res, next) =>{
    console.log(req.body);
    const {userName, password} = req.body;
    const passList = [
        userName === undefined? false : true,
        password === undefined? false : true
    ];

    for(const pass of passList){
        if(pass === false){
            res.status(400).send();
            return
        }
    };
    next();
})

AuthAPI.post('/login', async(req, res) => {
    const resultUser = await User.findOne(req.body);
    if(resultUser === null){
        res.status(404).send();
        return
    }
    const {userName, password} = resultUser;
    const token = jwt.sign({_id : resultUser._id.toString() ,userName, password}, config["JWT_SECRET_KEY"], {expiresIn: 60 * 60});
    res.send({authorization: token});
});

AuthAPI.get('/isLogin', async(req, res) => {
    const authKey = req.headers["authorization"];
    try{
        jwt.verify(authKey, config["JWT_SECRET_KEY"]);
    }catch(err){
        res.status(403).send();
        return;
    }
    res.send();
});

const authMiddleware = function(req, res, next){
    const authKey = req.headers["authorization"];
    try{
        const user = jwt.verify(authKey, 
            config["JWT_SECRET_KEY"]);
        console.log(user);
        Object.assign(req.body, user);
    }catch(err){
        res.status(403).send();
        return;
    }
    next()
}

export {AuthAPI, authMiddleware};