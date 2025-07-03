const jwt = require("jsonwebtoken");
const model = require("../model/user");
const bcrypt = require("bcrypt");
const User = model.User;
const fs = require("fs");
const privateKey = fs.readFileSync("./private.key", "utf-8");
exports.signUp = async (req, res) => {
  console.log("HI");
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password, 10);

  user.token = token;
  user.password = hash;
  try {
    const doc = await user.save();
    console.log({ err: null, doc }); // Indicate no error
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.error({ err, doc: null }); // Log the error
    res.status(500).json({ error: "Failed to Create User" }); // Send an error response
  }
};

exports.login = async (req, res) => {
  console.log("hi");
  try {
    const doc = await User.findOne({ email: req.body.email });
    console.log(doc);
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email, id: doc._id }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      doc.save();
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
