const express = require('express')
const jvt = require('jsonwebtoken')
const jwtPassword = '123456'


const app = express()

app.use(express.json())

const au = [
    {
        username: "hks@gmail.com",
        password: "123",
        name: 'Ayush' 
    },
    {
        username: "ad@gmail.com",
        password: "12321",
        name: "raman singh"
    }
]


function userExists(username, password){
    const userExists = false;
    for ( let i = 0; i < au.length; i ++){
        if (au[i].username === username && au[i].password === password){
            userExists = true
        }
    }
    return userExists
    // can use find in js

}

app.post('/signup', function(req,res){
    const username = req.body.username
    const password = req.body.password

    if(!userExists(username,password)){
        return res.status(403).json({
            msg: "user doesn't exist in our in memory db",
        })
    }


    var token = jwt.sign({username: username}, "shhhhh")
    return res.json({
        token,
    })
})


app.get("/users", function(req,res){
    const token = req.headers.authorization
    try{
        const decoded = jwt.verify(token, jwtPassword)
        const username = decoded.username

    }
    catch(err){
        return res.status(403).json({
            msg: "invalid token"
        })
    }
})

app.listen(7000)