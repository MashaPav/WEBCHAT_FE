
module.exports.getAll = (req, res) => {
    res.json(users);
}

module.exports.getUserId = (req, res) => {
    let user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send(`404: user #${req.params.id} wasn't found`);
    }
}

module.exports.createNewUser = (req, res) => {
    let newUser = {
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      picURL: req.body.picURL,
    };
  
    // creating a new ID
    let latestId = users[users.length - 1].id;
    newUser.id = latestId + 1;
    users.push(newUser);
  
    res.status(201).json(newUser); // 201 = created
  }

module.exports.updateUser = (req, res) => {
    let updatedUser = users.find((u) => u.id === parseInt(req.params.id));
  
    if (updatedUser) {
      updatedUser.userName = req.body.userName;
      updatedUser.phoneNumber = req.body.phoneNumber;
      updatedUser.firstName = req.body.firstName;
      updatedUser.lastName = req.body.lastName;
      updatedUser.picURL = req.body.picURL;
  
      res.json(updatedUser);
    } else {
      res
        .status(404)
        .send(`404: user #${req.params.id} wasn't found and cannot be updated`);
    }
  }

  module.exports.deleteUser = (req, res) => {
    let user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      let idx = users.indexOf(user);
      users.splice(idx, 1); // deleting the user by array index
      res.json(user);
    } else {
      res
        .status(404)
        .send(`404: user #${req.params.id} wasn't found and cannot be deleted`);
    }
  }