require("dotenv").config();
const http = require("http");
const app = require("./src/app.js");
const { connectToDB } = require("./src/connection");

const { PORT } = process.env;

const port = PORT || 5000;

const server = http.createServer(app);

connectToDB()
  .then(() => {
    console.log("--> DB connected");

    server.listen(port, () => {
      console.log(`--> Server listening at port ${port}`);
    });
  })
  .catch((e) => console.log(e));
