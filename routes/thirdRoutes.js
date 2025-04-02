const express = require('express')
const router = express.Router()
const thirdControllers = require('../controllers/thirdControllers')
router.get('/dashboard3',thirdControllers.thirdDashboard)
module.exports = router
