// Turn off for production
var debug = true;

const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "Server",
  user: "toolbox",
  password: "toolbox",
  database: "toolboxes"
});

connection.connect(function (err)
{
  if (err)
  {
    throw err;
  }
  else
  {
    console.log("Connected!");
  }
});



// Routes
app.get('/', (req, res) => res.sendfile('index.html'))

app.get('/add', function (req, res)
{
  add(req.query);
  console.log(req.query);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function add(query)
{
  // Parse query
  var sqlStatement = "INSERT INTO tools (name, size, manufacturer, description) VALUES ('" + query.name + "', '" + query.size + "', '" + query.manufacturer + "', '" + query.description + "')";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('The solution is: ', rows[0])
  })

  console.log("finished");
}

function getTools()
{
  var statement = "";

  connection.query(statement, function(err, rows, fields)
  {
    if(err) throw err

    console.log(rows);

    return rows;
  });
}

// For testing purposes
if (debug)
{
  var url = 'http://localhost:3000';
  var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  require('child_process').exec(start + ' ' + url);
}

