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

app.get("/", (req, res) => {
  let sql = "CALL userCheck(sushrut@gmail.com , pasdfe, ?)";
  connection.query(sql, true, (error, results, fields) => {
    console.log(results);
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
  });

  res.json({ message: "ok" });
});
