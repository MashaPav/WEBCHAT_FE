const mongoose = require("mongoose");

// a Schema is a way of defining how our data looks like in MongoDB
// Supported types are:
// String, Number, Date,
// Buffer (for storing binary data), Boolean and ObjectId.
// _id is added automatically
const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: Date, // this will always be Date.now()
    picURL: String
  });;

// exporting the schema
module.exports.messageSchema = messageSchema;

// a Model is a function used to create a Class definition (not an instance!)
// based on the Schema.
// this class also helps us to communicate with the DB
// 1st parameter is the singular upperCased name of the *collection* in the DB (messages -> Message)
// 2nd parameter is the schema
let Message = mongoose.model("Message", messageSchema); // Message is a class

module.exports.getAll = (req, res) => {
    // model.find() without parameters, returns all objects in a collection
    // https://mongoosejs.com/docs/api.html#model_Model.find
    Message.find().then((result) => res.json(result));
};

module.exports.getById = (req, res) => {
    Message.findById(req.params.id)
      .then((message) => {
        if (message) {
          res.json(message);
        } else {
          res.status(404).send(`404: message #${req.params.id} wasn't found`);
        }
      })
      .catch((err) => {
        res.status(404).send("Ilegal parameter");
      });
  };
  
  module.exports.createNew = (req, res) => {
    // creating a new message based on our request
    let message = new Message({
      // creating an instance of our model
      text: req.body.text,
      date: Date.now(),
      picURL: req.body.picURL
    });
  
    message
      .save()
      .then((message) => res.status(201).json(message))
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Internal server error: ${err}`); // 500 = internal server error
      });
  };
  
  module.exports.update = (req, res) => {
    Message.findById(req.params.id).then((message) => {
      if (message) {
        message.text = req.body.text;
        message.date = req.body.date;
        message.picURL = req.body.picURL;
  
        message
          .save()
          .then((message) => {
            if (message) {
              res.json(message);
            }
          })
          .catch((err) => {
            // TODO: investigate error
            res.status(500).send(`internal server error: ${err}`);
          });
      } else {
        res
          .status(404)
          .send(`404: message #${req.params.id} wasn't found and cannot be updated`);
      }
    });
  };
  
  module.exports.delete = (req, res) => {
    Message.findByIdAndRemove(req.params.id)
      .then((message) => {
        if (message) {
          res.json(message);
        } else {
          res
            .status(404)
            .send(
              `404: message #${req.params.id} wasn't found and cannot be deleted`
            );
        }
      })
      .catch((err) => {
        // TODO: investigate error
        res.status(500).send(`internal server error: ${err}`);
      });
  };