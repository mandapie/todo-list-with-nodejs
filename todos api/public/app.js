$(document).ready(function() {
    $.getJSON("/api/todos").then(addTodos); // load all todos
    
    $("#todoInput").keypress(function(event) {
        if (event.which === 13) {
            createTodo();
        }
    });
    
    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });
    
    $(".list").on("click", "span", function(evt){
        evt.stopPropagation();
        deleteTodo($(this).parent());
    });
});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    
    if (todo.completed) {
        newTodo.addClass("done");
    }
    
    $(".list").append(newTodo);
}

function createTodo() {
    var obj = { name: $("#todoInput").val() };
    
    $.post("/api/todos", obj)
    .then(function(newTodo) {
        addTodo(newTodo);
        $("#todoInput").val("");
    }).catch(function(err) {
        console.log(err);
    });
}

function updateTodo(todo) {
    var id = todo.data("id");
    var isDone = !todo.data("completed");
    var obj = { completed: isDone };
    
    $.ajax({
        method: "PUT",
        url: "/api/todos/" + id,
        data: obj
    }).then(function() {
        todo.data("completed", isDone);
        todo.toggleClass("done");
    }).catch(function(err) {
        console.log(err);
    });
}

function deleteTodo(todo) {
    var id = todo.data("id");
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + id
    }).then(function() {
        todo.remove();
    }).catch(function(err) {
        console.log(err);
    });
}