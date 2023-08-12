const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  editUserData,
  editUserAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsers);
// возвращает пользователя по _id
router.get('/:userId', getUserById);
// создаёт пользователя
router.post('/', createUser);
// PATCH /users/me — обновляет профиль
router.patch('./me', editUserData);
// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
