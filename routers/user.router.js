import express from 'express';
//import db from '../db/mongodb.mjs'; //we're moving this to the model
import {User} from '../models/user.model.js';


//const express = require('express');
const router = express.Router();

//DB collection mock
//const users = ["John", "Jane", "Doe"];

//GET /users - returns all users
router.get('/', async(req, res) => { //we have to use async/await here because we are using mongodb async methods
    let collection = db.collection('users');
    //let users = await collection.find().limit(50).toArray();
    let users = await User.findAll();
    res.status(200).json({users});
});

//GET /users/:id - returns a single user by id
router.get('/:id', async(req, res) => {
    console.log(req.params);
    //const user = await db.collection('users').findOne({id: req.params.id});
    const user = await User.findBy({id: req.params.id});
    //const user = users.filter(user => { return user.id === req.params.id }); //mock
    res.status(200).json({users: user});
});

//POST /users - creates a new user
router.post('/', async(req, res) => {
    console.log(req.body);
    const {name, age} = req.body;
    const user = new User(name, age);
    //await db.collection('users').insertOne(user);
    await user.save();
    //users.push(new User(name, age)); //mock
    res.status(201).json({
        message: 'User created'
    });
});

//PUT /users/:id - updates a user by id
router.put('/:id', async(req, res) => {
    //const update = `User ${Math.floow(Math.random()*100)}`;
    //users[req.params.id] = update; //mock
    console.log(req.body);
    const {name, age} = req.body;
    const updateOptions = {};
    if(name) updateOptions.name = name;
    if(age) updateOptions.age = age;

    const result = await User.update({id: req.params.id}, updateOptions);
    //const result = await db.collection('users').updateOne({id: req.params.id}, {$set: {"name": name, "age": age}}); //updateOptions
    console.log(result);
    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    else if (result.modifiedCount === 0) {
        return res.status(200).json({
            message: 'User not updated'
        });
    } else {
        return res.status(200).json({
            message: 'User updated',
        });
    }
});

//DELETE /users/:id - deletes a user by id
router.delete('/:id', async(req, res) => {
    //users.splice(req.params.id, 1); //mock
    User.delete({id: req.params.id});
    res.status(200).json({
        message: 'User deleted',
    });
});

//module.exports = router; //commonJS syntax
export default router; //ES6 syntax