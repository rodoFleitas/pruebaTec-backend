const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { APP_FRONTEND_URL } = process.env;
const routes = require("./routes/index.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: APP_FRONTEND_URL, credentials: true }));

app.use("/", routes);

app.use((req, res, next) => {
    res.status(404).json({
        error: "Not found"
    });
});

module.exports = app;
