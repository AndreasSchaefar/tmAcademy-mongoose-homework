const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);
router.get('/', articleController.getManyArticles);
router.get('/:articleId/', articleController.getOneArticle, (req, res) =>
  res.json(res.article)
);
router.put(
  '/:articleId/',
  articleController.getOneArticle,
  articleController.updateArticle
);
router.delete(
  '/:articleId',
  articleController.getOneArticle,
  articleController.deleteArticle
);

module.exports = router;
