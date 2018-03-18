'use strict';

const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS middleware
app.use(
  cors({
    exposedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Link",
      "Location"
    ]
  })
);

//Helmet Protection
app.use(helmet());
//Disables cache
app.use(helmet.noCache());

//Lower case query parameters
app.use((req, res, next) => {
  for (let key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

//informa que o serviço de dados do SAP está operacional
app.get("/", (req, res, next) => {
  res.status(200).json({
    sucess: true,
    message: "Sistema de Apoio a produção operacional"
  });
});

//Serve APIDoc
app.use("/docs", express.static(path.join(__dirname, "apidoc")));

routes(app);

module.exports = app;
