var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000; // environment will provide port. 3000 is standard localhost.

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes); // todos.js will start with "/api/todos"

app.get('/', function(req, res) {
    res.send("Hi from root route");
});

// listen to a port
app.listen(PORT, function() {
    console.log("App is running on Port " + PORT);
});