var express = require("express");
var app = express();
const port = process.env.PORT || 8080;
var mysql = require("mysql");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
var connection = mysql.createConnection(
  "mysql://bf5d2e72fc0f6e:9ff42661@eu-cdbr-west-02.cleardb.net/heroku_bf301392f212b2a?reconnect=true"
);
connection.connect();

app.get("/checkUser", (req, res) => {
  let sql =
    'CALL userCheck("' + req.query["email"] + '","' + req.query["pass"] + '")';
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }
    if (resultArray.length == 1) {
      res.json(resultArray[0]);
    } else {
      res.json();
    }
  });
});

app.get("/login", (req, res) => {
  let sql = `CALL login( ${req.query["sid"]} )`;
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }
    if (resultArray.length == 1) {
      res.json(resultArray[0]);
    } else {
      res.json();
    }
  });
});

app.get("/checkEmail", (req, res) => {
  let sql = `CALL checkMail("${req.query["email"]}" )`;
  console.log(sql);
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }
    if (resultArray.length == 1) {
      res.json(resultArray[0]["sID"]);
    } else {
      res.json();
    }
  });
});

app.post("/register", (req, res) => {
  let sql = `CALL register("${req.query["email"]}","${req.query["pass"]}","${req.query["name"]}","${req.query["addr"]}","${req.query["phone"]}",${req.query["age"]},"${req.query["gen"]}","${req.query["disc"]}","${req.query["country"]}","${req.query["qual"]}" )`;
  console.log(sql);
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }
    res.json({ success: true });
  });
});

app.get("/getAppliedScholarships", (req, res) => {
  let sql = `CALL getAppliedScholarships(${req.query["sid"]})`;
  console.log(sql);
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }

    res.json(resultArray);
  });
});

app.get("/scholarships", (req, res) => {
  let sql = `CALL scholarshipQuery(${req.query["sid"]})`;
  console.log(sql);
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }

    res.json(resultArray);
  });
});

app.post("/apply", (req, res) => {
  let sql = `CALL addApplication(${req.query["sid"]},${req.query["schid"]})`;
  console.log(sql);
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }

    res.json({ success: true });
  });
});

app.get("/getUniversity", (req, res) => {
  let sql = `CALL getUniversity(${req.query["uid"]})`;
  console.log(sql);
  connection.query(sql, true, (error, results, fields) => {
    var resultArray = Object.values(JSON.parse(JSON.stringify(results)))[0];
    if (error) {
      console.log("Error: ");
      return console.error(error.message);
    }

    res.json(resultArray);
  });
});
