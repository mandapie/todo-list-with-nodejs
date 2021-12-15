var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name cannot be blank"
    },
    completed : {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model('Todo', todoSchema); // compile into model (set to a variable)

module.exports = Todo;