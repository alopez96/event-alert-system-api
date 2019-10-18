const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const eventBrite = require('./controllers/eventbrite');

app.use(bodyParser.json());

var allowedOrigins = ['http://localhost:3000', 
            'https://event-alert-app.netlify.com'];

app.use(cors({
  origin: function(origin, callback){
    //allow requests with on origin
    //like mobile and curl requests
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The Cors policy for this site ' +
              'does not allow access from the specified origin';
      return callback(new Error(msg), false)
    }

    return callback(null, true);
  }
}))

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