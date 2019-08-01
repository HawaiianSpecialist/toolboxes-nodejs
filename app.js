const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "toolboxes",
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
  var sqlStatement = "INSERT INTO tools (toolName, toolSize, toolManufacturer, toolDescription) VALUES ('" + query.toolName + "', '" + query.toolSize + "', '" + query.toolManufacturer + "', '" + query.toolDescription + "')";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('The solution is: ', rows[0])
  })

  console.log("finished");
}
