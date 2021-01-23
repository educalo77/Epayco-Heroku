const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./src/routes/index");
require("dotenv").config();
const passport = require("./src/passport/passport");
var pg = require('pg');
pg.defaults.ssl = true;

const connectionString = 'postgres://hohflvpytjwvpj:d3fdb2563dc47aafe7a75702458d5810ae135577bd5fc3b39029793d395bf033@ec2-52-54-174-5.compute-1.amazonaws.com:5432/dnm2rj006h1k3';

const { Client } = require('pg');

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

client.connect();

client.query('SELECT * FROM users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const port = process.env.PORT || 5432;
const app = express();

app.name = "API";

app.use(bodyParser.urlencoded({
  extended: true,
  limit: "50mb"
}));
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());

app.all("*", function (req, res, next) {
  passport.authenticate("bearer", function (err, user) {
    if (err) return next(err);
    if (user) {
      req.user = user;
    }
    return next();
  })(req, res, next);
}); 

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = app;