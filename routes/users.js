const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validation');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', validationUserId, getUserById);
userRoutes.patch('/me', validationUpdateProfile, updateUser);
userRoutes.patch('/me/avatar', validationUpdateAvatar, updateAvatar);
userRoutes.get('/me', getCurrentUser);

module.exports = userRoutes;
