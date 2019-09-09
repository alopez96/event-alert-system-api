const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const eventBrite = require('./controllers/eventbrite');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev')); //debugging for HTTP requests

app.get('/', (req,res) => {res.send('It is working!')} );

app.get('/categories', (req, res) => { eventBrite.getCategories(req,res) });

app.get('/subcategories', (req, res) => { eventBrite.getSubCategories(req,res) });

app.get('/events', (req, res) => { eventBrite.getEvents(req,res) });

app.listen(process.env.PORT || 3000, () => {
    if(process.env.PORT)
    console.log(`server is running  on port ${process.env.PORT}`);
  else
    console.log(`server is running  on port 3000`);
})