const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(cors());
app.options('*', cors());


// routes
app.use('/alimentos', require('./routes/alimento.routes'));


// simple route
app.get("/", (req, res) => {
  res.json({ data: "This is the root page" });
});


const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
