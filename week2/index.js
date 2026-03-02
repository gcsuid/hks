// This code sets up a simple Express.js HTTP server with endpoints for demonstration and basic todo handling.
// Features:
// - Serves a greeting at the root ('/') endpoint.
// - Provides a '/say' endpoint that returns a JSON message.
// - Accepts POST requests at '/todos' and '/postcheck', logging the request body (for todo storage/checking).
// - Uses body-parser middleware to parse JSON request bodies.
// This is a starting point for a todo app backend, where todos can be sent to the server and processed.
const express = require('express');
const app = express();
const pot = 3000;  
const body = require("body-parser");
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/',  function(req, res)  {
  res.send('<h1> Hello, World! </h1>');
});
``
app.listen(pot);
//simple http server
// todo that uders store todos in server

app.get('/say', function(req,res){
    res.json("My name is sheila!")
});


app.post('/todos', function(req,res){
    //console.log(req.headers["headers"])
    console.log(req.body) 
})


app.post('/postcheck', (req,res) => {
    console.log(req.body)
    res.send("Hello")
})
