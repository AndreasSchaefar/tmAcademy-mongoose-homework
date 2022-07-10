const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);

router.get('/:userId', userController.getUser, (req, res) =>
  res.json(res.user)
);

router.put('/:userId', userController.getUser, userController.updateUser);

router.delete('/:userId', userController.getUser, userController.deleteUser);

module.exports = router;
