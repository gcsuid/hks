const express = require('express')

const app = express()

app.get("/", (req,res) => {
    const usern = req.headers.username
    const pw = req.headers.password
    const kid = req.query.Kidneyid;

    if (!(usern === 'ayush' && pw ==='nooo')){
        res.status(400).json({msg:"youre dead dawg"})
    return
        }

    if(kid != 1 || kid != 2){
        res.status(400).json({msg:"youre dead dawg"})}

    

    res.json({msg:"youre dead dawg"

    })


})

app.listen(3015)