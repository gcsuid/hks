const express = require('express')        // Import Express framework
const mongoose = require('mongoose')     // Import Mongoose (MongoDB ODM)

const app = express()

app.use(express.json())                  // Middleware to parse JSON body from requests

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/hks")
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err))


// Create a Mongoose model
// 'Users' → collection name (MongoDB will store it as "users")
// The object defines the schema (structure of each document)
const us = mongoose.model('Users', {
    name: String,
    email: String,
    password: String
})


// POST route to create a new user
app.post('/signup', async function(req, res) {
    
        // Extract data from request body
        const username = req.body.username
        const password = req.body.password
        const name = req.body.name

        // Check if a user already exists with the same email
        const existingUser = await us.findOne({ email: username })

        if (existingUser) {
            return res.status(400).send("username exists")
        }

        // Create a new user document (not saved yet)
        const user = new us({
            name: name,
            email: username,
            password: password
        })

        // Save the document to MongoDB
        await user.save()

        // Send success response
        res.json({
            msg: 'user created suc'
        })

    
        
    
})


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000")
})