const express = require('express')
const router = express.Router()
const addressController = require('../controllers/addressController')
const authMiddleware = require('../middleware/authMiddleware')

// Get all addresses for the logged-in user
router.get('/', authMiddleware, addressController.getAddresses)

// Add a new address
router.post('/', authMiddleware, addressController.addAddress)

// Update an existing address
router.put('/:id', authMiddleware, addressController.updateAddress)

module.exports = router
