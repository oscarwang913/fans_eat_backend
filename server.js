const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 3000;

const routes = require("./routes/index.route");

const app = express();

app.use(helmet());
app.use(cors());
// enable pre-flight
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
// user `use` to ensure the get all http req
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
