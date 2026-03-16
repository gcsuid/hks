const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const app = express()
app.use(express.json())

const JWT_SECRET = "123456"





/* -------------------- DATABASE CONNECTION -------------------- */

mongoose.connect("mongodb://localhost:27017/hks")

.then(() => {
    console.log("MongoDB connected")
})

.catch((err) => {
    console.log("MongoDB connection error:", err)
})





/* -------------------- USER SCHEMA -------------------- */

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String
})

const User = mongoose.model("User", userSchema)





/* -------------------- SIGNUP -------------------- */

app.post("/signup", async function(req,res){

    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    try{

        const existingUser = await User.findOne({
            username: username
        })

        if(existingUser){
            return res.status(403).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            username: username,
            password: hashedPassword,
            name: name
        })

        await user.save()

        res.json({
            message: "User created successfully"
        })

    }
    catch(err){

        res.status(500).json({
            message: "Internal server error"
        })

    }

})





/* -------------------- LOGIN -------------------- */

app.post("/login", async function(req,res){

    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({
        username: username
    })

    if(!user){
        return res.status(403).json({
            message: "User not found"
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        return res.status(403).json({
            message: "Incorrect password"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        JWT_SECRET
    )

    res.json({
        token: token
    })

})





/* -------------------- AUTH MIDDLEWARE -------------------- */

function auth(req,res,next){

    const token = req.headers.authorization

    if(!token){
        return res.status(403).json({
            message: "Token missing"
        })
    }

    try{

        const decoded = jwt.verify(token, JWT_SECRET)

        req.userId = decoded.id

        next()

    }

    catch(err){

        return res.status(403).json({
            message: "Invalid token"
        })

    }

}





/* -------------------- PROTECTED ROUTE -------------------- */

app.get("/users", auth, async function(req,res){

    const users = await User.find({})

    res.json({
        users: users
    })

})





/* -------------------- START SERVER -------------------- */

app.listen(7000, function(){
    console.log("Server running on port 7000")
})