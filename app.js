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

app.listen(port, () => console.log('Listening on port: ' + port));

// Paths
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));


// Routes
app.get('/', (req, res) => res.sendfile('index.html'));

app.get('/create', function (req, res)
{
  var sqlStatement = "INSERT INTO tools (name, size, manufacturer, description) VALUES ('" + encodeURI(req.query.name) + "','" + encodeURI(req.query.size) + "','" + encodeURI(req.query.manufacturer) + "','" + encodeURI(req.query.description) + "');";

  executeQuery(sqlStatement);

  refreshPage(res);
});

app.get('/retrieve', function (req, res)
{
  var sqlStatement = "SELECT * FROM tools";

  executeQuery(sqlStatement);

  refreshPage(res);
});

app.get('/update', function (req, res)
{
  var sqlStatement = "UPDATE tools SET name='" + encodeURI(req.query.name) + "', size='" + encodeURI(req.query.size) + "', manufacturer='" + encodeURI(req.query.manufacturer) + "', description='" + encodeURI(req.query.description) + "' WHERE id='" + req.query.id + "';";

  executeQuery(sqlStatement);

  refreshPage(res);
});

app.get('/delete', function (req, res)
{
  var sqlStatement = "DELETE FROM tools WHERE id='" + req.query.id + "';";

  executeQuery(sqlStatement);

  refreshPage(res);
});

function executeQuery(sqlStatement)
{
  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err)
    {
      throw err
    }
    else
    {
      console.log('Executed: ', rows);
    }
  });
}

function refreshPage(res)
{
  sqlStatement = "SELECT * FROM tools";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Retrieved all records: ', rows)

    res.json(rows);
  });
}

// For testing purposes
if (debug)
{
  var url = 'http://localhost:3000';
  var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  require('child_process').exec(start + ' ' + url);
}

