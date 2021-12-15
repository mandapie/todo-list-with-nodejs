var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todos-api'); // will automatically create a database based on the name set here if does not exist

mongoose.Promise = Promise; //use promisses

module.exports.Todo = require("./todo"); //require the todo.js file to get the Todo model