const express = require("express");
const http = require("http");
const logger = require("morgan");
// const cors = require("cors");
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const routes = require("./routes/index.route");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.use(cors());
// app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));
// user `use` to ensure the get all http req
app.use("/api", routes);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
