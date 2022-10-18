const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();


const config = require('./config');


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


// routes
app.use('/alimentos', require('./routes/alimento.routes'));
app.use('/porciones', require('./routes/porcion.routes'));
app.use('/tiposingesta', require('./routes/tipoingesta.routes'));
app.use('/ingesta', require('./routes/ingesta.routes'));


// simple route
app.get("/", (req, res) => {
  res.json({ data: "This is the root page" });
});


const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
