// Server.js manages incoming HTTPS requests and dynamically responds to them
// i.e., keeps the server runnign and handles new searches w/t restarting server

// server.js
const express = require('express');
const { scrapeZumperSearch } = require('./scraper');

const app = express();

const PORT = 3001;

app.get('/', async (req, res) => {
    const city = req.query.city || 'seattle-wa/fremont';
    maxRent = req.query.maxRent || '1950';
    const url = `https://www.zumperrentals.com/apartments-for-rent/${city}/under-${maxRent}`;
    try {
        const listings = await scrapeZumperSearch(url);
        res.json(listings);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({error: "An error has occured"});
    }
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})