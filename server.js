const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

const routes = require("./routes/index.route");

app.use(helmet());
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// enable pre-flight
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
// user `use` to ensure the get all http req
app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
