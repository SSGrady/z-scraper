// Server.js manages incoming HTTPS requests and dynamically responds to them
// i.e., keeps the server runnign and handles new searches w/t restarting server

// server.js
const express = require('express');

const app = express();

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})