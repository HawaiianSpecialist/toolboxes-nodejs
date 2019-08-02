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

app.get('/retrieve', function (req, res)
{
  var sqlStatement = "SELECT * FROM tools";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Retrieved all records: ', rows)

    res.json(rows);

  })
});

app.get('/update', function (req, res)
{  
  var sqlStatement = "UPDATE tools SET name='" + escape(req.query.name) + "', size='" + escape(req.query.size) + "', manufacturer='" + escape(req.query.manufacturer) + "', description='" + escape(req.query.description) + "' WHERE id='" + req.query.id + "';";
  console.log(sqlStatement);
  console.log("-------------" + req.query);

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Retrieved all records: ', rows)

  });

  sqlStatement = "SELECT * FROM tools";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Retrieved all records: ', rows)

    res.json(rows);
  });
});

app.get('/delete', function (req, res)
{
  var sqlStatement = "DELETE FROM tools WHERE id='" + req.query.id + "';";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Deleted record: ', rows)
  })

  sqlStatement = "SELECT * FROM tools";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Retrieved all records: ', rows)

    res.json(rows);

  })

});

app.listen(port, () => console.log('Listening on port ${port}'));

function add(query)
{
  // Parse query
  var sqlStatement = "INSERT INTO tools (name, size, manufacturer, description) VALUES ('" + escape(query.name) + "', '" + escape(query.size) + "', '" + escape(query.manufacturer) + "', '" + escape(query.description) + "')";

  connection.query(sqlStatement, function (err, rows, fields)
  {
    if (err) throw err

    console.log('Added ', rows)
  })

  console.log("finished");
}

function retrieveRecord()
{
  var statement = "";

  connection.query(statement, function (err, rows, fields)
  {
    if (err) throw err

    console.log(rows);

    return rows;
  });
}

function updateRecord()
{

}

function deleteRecord()
{

}

// For testing purposes
if (debug)
{
  var url = 'http://localhost:3000';
  var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  require('child_process').exec(start + ' ' + url);
}

