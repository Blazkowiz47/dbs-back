var express = require("express");
var app = express();
const port = process.env.PORT || 8080;
var mysql = require("mysql");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var db_config = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "bf5d2e72fc0f6e",
  password: "9ff42661",
  database: "heroku_bf301392f212b2a",
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

// var connection = mysql.createConnection(
//   "mysql://bf5d2e72fc0f6e:9ff42661@eu-cdbr-west-02.cleardb.net/heroku_bf301392f212b2a?reconnect=true"
// );
// connection.connect();

app.get("/checkUser", (req, res) => {
  let sql = `CALL userCheck("${req.query["email"]}", "${req.query["pass"]}")`;
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
