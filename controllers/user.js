module.exports = {getUser, getUsers, createUser, updateUser};

const User = require('../models/user');

async function createUser(req, res, next) {
  const user = new User({
    ...req.body,
  });
  try {
    await user.save();
    res.status(201).json({work: true});
  } catch (e) {
    res.status(400).json({message: e.message});
  }
}

async function updateUser(req, res, next) {
  try {
    res.user = Object.assign(res.user, req.body);
    await res.user.save();
  } catch (e) {
    return res.status(500).json({message: e.message});
  }

  next();
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
}

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({message: `Can not find user with id ${req.params.userId}`});
    }
  } catch (e) {
    return res.status(500).json({message: e.message});
  }
  res.user = user;
  next();
}
