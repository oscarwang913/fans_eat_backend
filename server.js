const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const routes = require("./routes/index.route");
app.use(helmet());
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
};

app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
// user `use` to ensure the get all http req
app.use(allowCrossDomain);
app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
