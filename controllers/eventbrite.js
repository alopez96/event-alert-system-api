const axios = require('axios');
const keys = require('./../keys');

async function getCategories (req, res) {
    //fetch data
    try {
        const oathString = 'Bearer '.concat(keys.eventbritekey);
        //get list of categories
        const response = await axios.get('https://www.eventbriteapi.com/v3/categories',
                                    {headers: { Authorization: oathString} });

        const data = await response.data.categories;
        res.json(data);

      } catch (error) {
        res.status(400).json('error getting categories', error.response.status);
      }
}

async function getEvents (req, res) {
    const { category_id } = req.body;
    console.log('category', category_id)
    //fetch data
    try {
        const oathString = 'Bearer '.concat(keys.eventbritekey);
        //list public Events from Eventbrite.
        const response = await axios.get(`https://www.eventbriteapi.com/v3/events/search/?categories=${category_id}`,
                                    {headers: { Authorization: oathString} });
                                    
        const data = await response.data;
        res.json(data)

      } catch (error) {
        res.status(400).json('getEvents ' + error);
      }
}

module.exports = {
    getCategories,
    getEvents
}