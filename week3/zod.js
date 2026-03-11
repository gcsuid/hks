// zod is ip validation
/*const express = require('express')
const z = require("zod")
const schema = zod.array(zod.number())

const schema1 = zod.object({
    email: zod.string()
    password:zod.string()
    country: zod.literal("IN").or(z.literal("US"))
    kidneys: zod.array(z.number())
})

const app = express()

app.use(express.json())

app.post('/health', (req,res){
    const kidneys = req.body.kidneys
    const response = schema.safeParse(kidneys)
    if (!response.success){
        res.status(411).json({
            msg: "input error"
        })
    }
})

app.listen(3019)*/


const zod = require("zod")

function validateInput(obj){
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)

    })

    const reponse = schema.safeParse(obj)
    console.log(response)

}

validateInput({
    email:"shreyas@gmail.com",
    password: "djdneided"
})