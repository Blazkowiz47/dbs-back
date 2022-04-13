var express = require("express");
var app = express();
const port = 3000;
var mysql = require("mysql");

var connection = mysql.createConnection(
  "mysql://bf5d2e72fc0f6e:9ff42661@eu-cdbr-west-02.cleardb.net/heroku_bf301392f212b2a?reconnect=true"
);
connection.connect();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/checkUser", (req, res) => {
  let sql =
    'CALL userCheck("' + req.query["email"] + '","' + req.query["pass"] + '")';
  console.log(req.query["pass"]);
  console.log(sql);
  // console.log(req.params.pass);
  connection.query(sql, true, (error, results, fields) => {
    console.log("Results: ");
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (resultArray.length == 1) {
      res.json(resultArray[0]);
    }
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }
  });
});
