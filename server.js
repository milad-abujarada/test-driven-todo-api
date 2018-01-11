// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var data = {
              todos : [
                        { _id: 1, task: 'Laundry', description: 'Wash clothes' },
                        { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
                        { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
                      ]
            };
/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */
var counter = 3;
app.get('/api/todos/search', function search(req, res) {

   var matches = {todos:[]};
   for(let i = 0; i < data.todos.length; i++){
    if (data.todos[i].task.includes(req.query.q)){
      matches.todos.push(data.todos[i]);
    };
   };
   res.json(matches);
});

app.get('/api/todos', function index(req, res) {
  res.json(data);
});

app.post('/api/todos', function create(req, res) {
  counter++;
   let newTodo = {
    _id : counter,
    task: req.body.task,
    description: req.body.description
   };
   data.todos.push(newTodo);
   res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  var found = false, index = -1;
   while(!found){
    index++;
    if(data.todos[index]._id === parseInt(req.params.id)){
    found = true;
    res.json(data.todos[index]);
   };
 };
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var updatedTodo = {
    _id: parseInt(req.params.id),
    task: req.body.task,
    description: req.body.description
   };
    var found = false, index = -1;
   while(!found){
    index++;
    if(data.todos[index]._id === parseInt(req.params.id)){
    data.todos[index] = updatedTodo;
    found = true;
    res.json(data.todos[index]);
   };
 };
   data.todos[parseInt(req.params.id) - 1].task = req.body.task;
   data.todos[parseInt(req.params.id) - 1].description = req.body.description;
   res.json(updatedTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var found = false, index = -1;
   while(!found){
    index++;
    if(data.todos[index]._id === parseInt(req.params.id)){
      console.log(index);
      found = true;
    };

   }
   var deletedToDo = data.todos[index];
   data.todos.splice(index, 1);
   res.json(deletedToDo);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
