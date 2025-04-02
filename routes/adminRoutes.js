const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/adminControllers')
router.get('/dashboard',adminControllers.adminDashboard)
router.post('/add-items',adminControllers.addItems)
router.get('/dashboard/search',adminControllers.searchItems)
router.post('/update/:id',adminControllers.updateItems)
router.post('/delete/:id',adminControllers.deleteItems)
module.exports = router