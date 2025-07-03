const model = require("../model/task");
const { default: mongoose } = require("mongoose");
const { User } = require("../model/user");
const Task = model.Task;
exports.createTask = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.startDate ||
    !req.body.endDate
  ) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }
  const userId = req.body.userid;
  console.log(userId);
  const task = new Task(req.body);
  try {
    const doc = await task.save();

    await User.findByIdAndUpdate(userId, {
      $push: { tasks: task._id },
    });
    res.status(201).json(doc);
  } catch (error) {
    console.log({ error, doc: null });
    res.status(500).json({ message: "Failed to Make Task" });
  }
};
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};
exports.getTask = async (req, res) => {
  const id = req.params.id;
  const tasks = await Task.findById(id);
  res.json(tasks);
};
exports.updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Task.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
