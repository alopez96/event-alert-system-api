const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const eventBrite = require('./controllers/eventbrite');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev')); //debugging for HTTP requests

//route to main - used for testing
app.get('/', (req,res) => {res.send('It is working!')} );

//route to get list of categories from Eventbrite
app.get('/categories', (req, res) => { eventBrite.getCategories(req,res) });

//route to get list of subcategories from Eventbrite
app.get('/subcategories', (req, res) => { eventBrite.getSubCategories(req,res) });

//route to get events using category and location from Eventbrite
app.get('/events/:category_id&:location', (req, res) => { eventBrite.getEvents(req,res) });

//route to get events using subcategory and location from Eventbrite
app.get('/subevents/:category_id&:location', (req, res) => { eventBrite.getEventsfromSubcategory(req,res) });

app.listen(process.env.PORT || 3000, () => {
    if(process.env.PORT)
    console.log(`server is running  on port ${process.env.PORT}`);
  else
    console.log(`server is running  on port 3000`);
})