const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);
userRoutes.get('/me', getCurrentUser);

module.exports = userRoutes;
