import express from 'express';
import db from '../db/mongodb.mjs'; //todo: move this to the model
import {Location} from '../models/location.model.js';
import {ObjectId} from 'mongodb';
 
const router = express.Router();

//GET /locations - returns all locations
router.get('/', async(req, res) => {
    let collection = db.collection('locations');
    let locations = await collection.find().limit(50).toArray();
    res.status(200).json({locations});
});

//GET /locations/:id - returns a single location by id
router.get('/:id', async(req, res) => {
    console.log(req.params);
    const location = await db.collection('locations').findOne({_id: new ObjectId(req.params.id)});
    res.status(200).json({locations: location});
});

//POST /locations - creates a new location
//you can also use nested routes to create a location for a specific user
//POST /users/:UserId/locations //todo
router.post('/', async(req, res) => {
    console.log(req.body);
    const {latitude, longitude, userId} = req.body;
    const location = new Location(latitude, longitude, userId);
    await db.collection('locations').insertOne(location);
    res.status(201).json({
        message: 'Location created'
    });
});

//PUT /locations/:id - updates a location by id
router.put('/:id', async(req, res) => {
    console.log(req.body);
    const {latitude, longitude} = req.body;
    const updateOptions = {};
    if(latitude) updateOptions.latitude = latitude;
    if(longitude) updateOptions.longitude = longitude;

    const result = await db.collection('locations').updateOne({_id: new ObjectId(req.params.id)}, {$set: updateOptions});
    console.log(result);
    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: 'Location not found'
        });
    }
    else if (result.modifiedCount === 0) {
        return res.status(200).json({
            message: 'Location not updated'
        });
    } else {
        return res.status(200).json({
            message: 'Location updated',
        });
    }
});

//DELETE /locations/:id - deletes a location by id 
router.delete('/:id', async(req, res) => {
    await db.collection('locations').deleteOne({_id: new ObjectId(req.params.id)});
    res.status(200).json({
        message: 'Location deleted',
    });
});

export default router;