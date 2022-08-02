const express = require("express");
const mongoose = require("mongoose"); // a package for communicating with MongoDB
const Users = require("./users-db");
const Messages = require("./messages-db.js")

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!

// connecting to MongoDB
const mongoURL =
  "mongodb+srv://LinMengShi101:LinMengShi@cluster0.0musx.mongodb.net/Web-Chat"; // connection string

mongoose.set("useUnifiedTopology", true); // use Mongo's new connection drivers

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error(err));

// *********
// Routing
// *********
app.get("/", (req, res) => {
  res.write("<h1>Welcome to the NetApp server!</h1>");
  res.end();
});

app.get("/api/users", Users.getAll);

app.get("/api/users/:id", Users.getById);

app.post("/api/users", Users.createNew);

app.put("/api/users/:id", Users.update);

app.delete("/api/users/:id", Users.delete);


app.get("/api/messages", Messages.getAll);

app.get("/api/messages/:id", Messages.getById);

app.post("/api/messages", Messages.createNew);

app.put("/api/messages/:id", Messages.update);

app.delete("/api/messages/:id", Messages.delete);