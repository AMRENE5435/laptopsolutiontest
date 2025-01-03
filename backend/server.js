const express = require('express')
const mongoose = require('mongoose')
const addressRoutes = require('./routes/addressRoutes')
const authMiddleware = require('./middleware/authMiddleware')

const app = express()

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Routes
app.use('/api/addresses', addressRoutes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
