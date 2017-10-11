const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');
const queries = require('./sql_queries');

const app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname + "/views"));
app.use(express.static(__dirname + '/views'));

//Important!!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
   const provinces = await queries.getProvinces();
   const food = await queries.getFoodCombos();
   res.render("index", {provinces, food})
});

app.post('/api/check_user', async (req, res) => {
    const fullName = await queries.getFullName(req.body.first_name, req.body.last_name);
    (fullName.length > 0) ? res.send(fullName) : res.send("N");
});

app.post('/api/new_order', (req, res) => {
   let order = req.body;
   queries.sendNewOrder(order);
   res.end();
});

app.listen(process.env.PORT || 3000, () => {
   console.log("Listening on port 3000...");
});