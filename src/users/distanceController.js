import express from 'express';
import axios from 'axios';

const app = express();

const apiKey = 'AIzaSyBf-E7IYV265Lsur6suCP1_dz5R9wcLr_M';
const origin = ['Cloudwapp Technologies Private Limited,Indore,India']; //, '22.7286,75.8884'
const destination = ['Ayush Laad, B-727, near Pulak City, Pulak City, Silicon City, Indore, Madhya Pradesh 452012,India']; //, '22.6389,75.8308'

// const params = { 
//     origin: ['Industry House,Indore,India'],
//     destination: ['Silicon City,Indore,India'],
//     key : apiKey,
// };

export const calculateDistance = async (req, res) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`, { });

        // const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?', {
            // params
        // });

        const rows = response.data;
        const distance = rows.routes[0].legs[0].distance;
        const duration = rows.routes[0].legs[0].duration;

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while calculating distance');
    }
};
