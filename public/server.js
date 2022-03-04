const db_connection = require('./dbConnection')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app_routes=require('./routes/api');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use('/api',app_routes);
app.use(express.urlencoded({ extended: true} ));

db_connection.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})