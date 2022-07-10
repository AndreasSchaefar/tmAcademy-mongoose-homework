module.exports = {
  createArticle,
  getManyArticles,
  getOneArticle,
  updateArticle,
  deleteArticle,
};

const User = require('../models/user');
const Article = require('../models/article');

async function createArticle(req, res) {
  const article = new Article({...req.body});
  const {owner} = article;
  if (!owner) {
    return res.status(404).json({message: 'Such owner does not exist'});
  }
  try {
    const user = await User.findById(owner);

    await Article.create(article);

    user.numberOfArticles += 1;
    await user.save();

    res.json(article);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
}

async function getOneArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.articleId).populate('owner');
    if (!article) {
      return res.status(404).json({
        message: `Can not find article with id ${req.params.articleId}`,
      });
    }
  } catch (e) {
    return res.status(500).json({message: e.message});
  }
  res.article = article;
  next();
}

async function getManyArticles(req, res) {
  try {
    const query = req.query;
    const articles = await Article.find(query).populate('owner');
    res.json(articles);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
}

async function updateArticle(req, res) {
  try {
    res.article = Object.assign(res.article, req.body);
    await res.article.save();
    res.json(res.article);
  } catch (e) {
    return res.status(500).json({message: e.message});
  }
}

async function deleteArticle(req, res) {
  try {
    await res.article.remove();
    res.json({work: true});
  } catch (e) {
    return res.status(400).json({message: e.message});
  }
}
