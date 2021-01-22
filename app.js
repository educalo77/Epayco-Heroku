const port = process.env.PG_PORT || 5432;
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./src/routes/index");
const path = require("path");

const app = express();

app.name = "API";

app.use(bodyParser.urlencoded({
  extended: true,
  limit: "50mb"
}));
app.use(bodyParser.json({
  limit: "50mb"
}));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/", routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = app;