//const uuid = require('uuid');
import {v4 as uuid} from 'uuid';
import db from '../db/mongodb.mjs';


export const User = function(name, age) {
    this.name = name;
    this.age = age;
    this.id = uuid(); //v4 generates a random UUID
}

User.findAll = async function(query) {
    let collection = db.collection('users');
    let users = await collection.find().limit(50).toArray();
    return users;
}

User.findBy = async function(query) {
    let collection = db.collection('users');
    let user = await collection.findOne(query);
    return user;
}

User.update = async function(query, update) {
    let collection = db.collection('users');
    let result = await collection.updateOne(query, {$set: update});
    return result;
}

User.delete = async function(query) {
    let collection = db.collection('users');
    let result = await collection.deleteOne(query);
    return result;
}

User.prototype.save = async function() {
    let collection = db.collection('users');
    await collection.insertOne(this);
}

//module.exports = User; //commonJS syntax