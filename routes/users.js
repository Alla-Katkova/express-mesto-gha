const router = require('express').Router();
const {
  getUsersFromDB,
  getUserById,

  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsersFromDB);
// возвращает пользователя по _id
router.get('/:userId', getUserById);
// создаёт пользователя
//router.post('/', createUser);
// PATCH /users/me — обновляет профиль
router.patch('/me', editUserInfo);
// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
