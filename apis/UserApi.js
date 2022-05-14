import express from 'express'
import User from '../models/Users.js';
const UserAPI = express.Router();

UserAPI.get("/", async(req, res) =>{
    const queryResult = await User.find();
    res.json(queryResult);
});

UserAPI.get("/:userName", async(req, res) => {
    const queryResult = await User.findOne(req.params);
    res.json(queryResult);
});

 UserAPI.post("/" , async(req, res) => {
    const {userName} = req.body;
    const countResult = await User.where({userName : userName}).count();
    if(countResult > 0){
        res.status(400).send();
        return;
    }
    const createUser = new User(req.body);
    createUser.save();
    res.status(201).send();
})

export default UserAPI;