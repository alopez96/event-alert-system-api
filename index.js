const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {res.send('It is working!')} );

app.listen(process.env.PORT || 3000, () => {
    if(process.env.PORT)
    console.log(`server is running  on port ${process.env.PORT}`);
  else
    console.log(`server is running  on port 3000`);
})