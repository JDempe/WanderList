const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { extendDefaultFields } = require("./models/Session");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
app.engine("handlebars", engine({}));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Set up sessions with cookies
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

// Set up Express.js to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
// load the views
app.use(express.static(__dirname + "/views"));

// Render the landing page
app.get("/", (req, res) => {
  res.render("landing-page", {
    layout: "main",
    styles: ["landing-page"],
    scripts: ["landing-page"],
    user: {
      id: req.session.user_id,
      isLoggedIn: req.session.logged_in
    }
  });
});
app.use(routes);

//404 handler should come last
app.use((req, res) => {
  res.status(404).render('404page', {
    layout: 'main',
    styles: ['404'],
    title: 'Page Not Found'
  });
});

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});