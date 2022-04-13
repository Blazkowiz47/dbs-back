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
  let sql = "SELECT count(*) from information_schema.COLUMNS";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    // res.json(result);
    // console.log(result);
    // console.log("-----------");
    console.log(result[0]);
  });
  res.json({ message: "ok" });
});
