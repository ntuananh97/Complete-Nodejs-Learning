require('dotenv').config()
const express = require('express');
const webRouter = require('./routes/web');
const cors = require('cors');
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const configBodyParser = require('./config/bodyParser');

const port = process.env.PORT || 5000;
const app = express();

// cors
app.use(cors())

// config template
configViewEngine(app)

// init body parser
configBodyParser(app)

// Routes
app.use('/', webRouter);

const startApp = () => {
    app.listen(port, () => {
        console.log('Server run on: ' + port)
    })
}

// Connection
;( async () => {
    try {
        await connection();
        startApp()
    } catch (error) {
        console.log('Connection DB Error: ', error);
    }
})();

