const router = require('express').Router();
const {
  getCardsFromDB,
  createCard,
  // deleteCard,
  // putLikeCard,
  // putDisLikeCard,
} = require('../controllers/cards');


// GET — возвращает все карточки
router.get('/', getCardsFromDB);
// POST — создаёт карточку
router.post('/', createCard);
// // DELETE — удаляет карточку по идентификатору
// router.delete('/:cardId', deleteCard);
// // PUT — поставить лайк карточке
// router.put('/:cardId/likes', putLikeCard);
// // DELETE — убрать лайк с карточки
// router.delete('/:cardId/likes', putDisLikeCard)

module.exports = router;