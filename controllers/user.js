module.exports = {createUser, getUser, updateUser, deleteUser};

const User = require('../models/user');

async function createUser(req, res) {
  const user = new User({
    ...req.body,
  });
  try {
    await user.save();
    res.json(user);
  } catch (e) {
    return res.status(400).json({message: e.message});
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

async function updateUser(req, res) {
  try {
    res.user = Object.assign(res.user, req.body);
    await res.user.save();
    res.json(res.user);
  } catch (e) {
    return res.status(500).json({message: e.message});
  }
}

async function deleteUser(req, res) {
  try {
    await res.user.remove();
    res.json({work: true});
  } catch (e) {
    return res.status(400).json({message: e.message});
  }
}
