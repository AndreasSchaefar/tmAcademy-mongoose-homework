const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser, (req, res) => {
  res.json(res.user);
});

router.post('/', userController.createUser);

router.delete('/:userId', userController.getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({work: true});
  } catch (e) {
    res.status(500).json({message: e.message});
  }
});

router.put(
  '/:userId',
  userController.getUser,
  userController.updateUser,
  (req, res) => {
    res.json({work: true});
  },
);

module.exports = router;
