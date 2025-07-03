const model = require("../model/user");

//the data is string so convert to json
const path = require("path");
const User = model.User;

exports.getAllUsers = async (req, res) => {
  const Users = await User.find();
  res.json(Users);
};

exports.getUser = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const Users = await User.findById(id).populate("tasks");
  res.json(Users);
};

exports.replace = async (req, res) => {
  const id = req.params.id;
  const doc = await User.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  res.status(201).json(doc);
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
