const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { extendDefaultFields } = require("./models/Session");

const app = express();

const PORT = process.env.PORT || 3001;

// setup express so that it knows we're using handlebars as our
// template engine
app.engine("handlebars", engine({}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Express middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    table: 'Session', 
    extendDefaultFields: extendDefaultFields,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(routes);

app.get("/", (req, res) => {
  //Serves the body of the page aka "landing-page.hbs" to the container //aka "main.hbs"
  // layout property not necessary since it is default, but included for clarity
  res.render("landing-page", {
    layout: "main",
    style: "./css/landing-page.css",
    script: "./js/landing-page.js",
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});