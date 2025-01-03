const Address = require('../models/Address')

// Get all addresses for the logged-in user
exports.getAddresses = async (req, res) => {
  const userId = req.user._id
  const addresses = await Address.find({ user: userId })
  res.json(addresses)
}

// Add a new address
exports.addAddress = async (req, res) => {
  const userId = req.user._id
  const { street, city, postalCode, country } = req.body

  const address = new Address({
    user: userId,
    street,
    city,
    postalCode,
    country,
  })

  await address.save()
  res.status(201).json({ message: 'Address added successfully', address })
}

// Update an existing address
exports.updateAddress = async (req, res) => {
  const { id } = req.params
  const { street, city, postalCode, country } = req.body

  const address = await Address.findByIdAndUpdate(
    id,
    { street, city, postalCode, country },
    { new: true }
  )

  res.json({ message: 'Address updated successfully', address })
}
