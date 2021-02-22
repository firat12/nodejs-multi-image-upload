const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});