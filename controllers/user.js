module.exports = {getArticles, createUser, getUser, updateUser, deleteUser};

const User = require('../models/user');
const Article = require('../models/article');

async function getArticles(req, res) {
  try {
    const user = res.user;
    const articles = await Article.find({owner: user._id});
    if (!articles) {
      return res.json({
        message: `User with id ${user._id} does not have articles yet`,
      });
    }
    res.json(articles);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
}

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
    await Article.deleteMany({owner: res.user._id});
    await res.user.remove();
    res.json({work: true});
  } catch (e) {
    return res.status(400).json({message: e.message});
  }
}
