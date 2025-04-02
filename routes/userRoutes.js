const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
router.get('/dashboard',userControllers.userDashboard)
router.get('/dashboard/search',userControllers.searchItems)
module.exports = router