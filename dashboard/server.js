const express = require("express");
const app = express();
const PORT = 3000;
const authRoute = require("./routes/auth");
const indexRoute = require("./routes/index");
const dashboardRoute = require("./routes/dashboard");
const session = require("express-session");
const passport = require("passport");
const db = require("./database/database");
const path = require("path");
const ejs = require("ejs");
const discordStrategy = require("./strategies/discord");

// DB
db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

app.use(
  session({
    secret: "ssaadfsfasfafgs",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    resave: false,
    name: "discord.oauth2",
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);
app.use(indexRoute);

// Ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server Is Running! PORT " + PORT));