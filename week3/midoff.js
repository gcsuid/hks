const express = require('express')

const app = express()



// only for 14 and above

function isOld(req,res,next){
    const age = req.query.age
    if ( age >= 14){
        next()
    }
    else(
        res.json({
            msg:"sorry bugger"
        })
    )
}


app.use(isOld) // every enfpoint below this uses this.
app.use(function(req,res,next){
    // some function
    // this is highly a global function
})


app.get("/ride1", function(req,res){


    if (isOld(req.query.age)){
        res.json({
        msg: " you're rider 1 "
    })
    }
    else{
        res.json({
            msg: " funny grow up"
        })
    }
    
})


app.use(function(err,req,res,next){
    // use for whenever error
})


app.listen(3001)