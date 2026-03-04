
const express = require("express")
const app = express();
var users =[{name:"ay",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json())

// get has query parameters
app.get("/", function(req,res){
    const kidney = users[0].kidneys
    const nk = kidney.length
    let nohk = 0
    for ( let i =0; i < kidney.length; i ++){
        if  ( kidney[i].healthy){
            nohk += 1
        }
        const nouhk = nk - nohk
        res.json({kidney, nk, nohk,nouhk })
    }
})


// psot has body and we've to appraoch that 
app.post("/", (req,res) => {
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({healthy: isHealthy})

    res.json({
        msg : "done"
    })

})

//put
app.put("/", (res,req) => {
    for (let i = 0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({hehe})
})

app.delete("/", (req, res) => {
    let aunkidney = false;
    let healthyCount = 0;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            healthyCount++;
            users[0].kidneys[i].healthy = false;
        }
    }
    res.json({ msg: `Number of healthy kidneys found and made unhealthy: ${healthyCount}` });
})


app.listen(3001)