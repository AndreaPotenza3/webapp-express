const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieControllers')

// INDEX
router.get('/', movieController.index)
// SHOW
router.get('/:id', movieController.show)

router.post('/:id/reviews', movieController.storeReview)

module.exports = router