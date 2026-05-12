import express from 'express';
import {getCount}from '../controllers/startingPage.js'
const startPageRouter=express.Router();
startPageRouter.get('/getCount',getCount);
export default startPageRouter
