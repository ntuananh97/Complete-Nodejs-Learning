require('dotenv').config()
const express = require('express');
const webRouter = require('./routes/web');
const configViewEngine = require('./config/viewEngine');

const port = process.env.PORT || 5000;
const app = express();

// config template
configViewEngine(app)

// Routes
app.use('/', webRouter)

app.listen(port, () => {
    console.log('Server run on: ' + port)
})