const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();

const PORT = process.env.PORT || 3001;

// setup express so that it knows we're using handlebars as our
// template engine
app.engine("handlebars", engine({}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// THIS BREAKS EVERYTHING
// app.use(routes);

app.get("/", (req, res) => {
  //Serves the body of the page aka "home.handlebars" to the container //aka "main.handlebars"
  // layout property not necessary since it is default, but included for clarity
  res.render("home", { layout: "main" });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});