const express= required("express")
const app = express()

app.use(express.json())

app.post("/kidney", (req,res) =>{
    const kidneys = req.body.kidneys;


    if (!kidneys){
        res.json({
            msg: "wrong inputs"
        })
    }
    else{
        const kidle = kidneys.length
    res.send("you've" + kidle)

    }
    
})

app.listen(3016)