const axios = require('axios');
const keys = require('./../keys');

const oathString = 'Bearer '.concat(keys.eventbritekey);

//get list of categories from Eventbrite
async function getCategories (req, res) {
    //fetch data
    try {
        //get list of categories
        const response = await axios
              .get('https://www.eventbriteapi.com/v3/categories',
              {headers: { Authorization: oathString} });

        const data = await response.data.categories;
        res.json(data);

      } catch (error) {
        res.status(400).json('getCategories', error.response.status);
      }
}

//get list of subcategories from Eventbrite
async function getSubCategories (req, res) {    
    try {
        //get list of subcategories
        const response = await axios
              .get('https://www.eventbriteapi.com/v3/subcategories',
              {headers: { Authorization: oathString} });

        const data = await response.data.subcategories;
        res.json(data);

      } catch (error) {
        res.status(400).json('getSubCategories', error.response.status);
      }
}

//get events using category and location from Eventbrite
async function getEvents (req, res) {
    const { category_id, location } = req.params;
    console.log('location', location)
    try {
        //list public Events from Eventbrite.
        const response = await axios
              .get(`https://www.eventbriteapi.com/v3/events/search/?categories=${category_id}&location.address=${location}&location.within=50km&expand=venue`,
              {headers: { Authorization: oathString} });
                                    
        const data = await response.data;
        res.json(data);

      } catch (error) {
        res.status(400).json('getEvents ' + error);
      }
}

//get events using csubategory and location from Eventbrite
async function getEventsfromSubcategory (req, res) {
  const { category_id, location } = req.params;
  console.log('location', location)
  try {
      //list public Events from Eventbrite.
      const response = await axios
            .get(`https://www.eventbriteapi.com/v3/events/search/?subcategories=${category_id}&location.address=${location}&location.within=50km&expand=venue`,
            {headers: { Authorization: oathString} });
                                  
      const data = await response.data;
      res.json(data);

    } catch (error) {
      res.status(400).json('getEvents ' + error);
    }
}

module.exports = {
    getCategories,
    getSubCategories,
    getEvents,
    getEventsfromSubcategory
}