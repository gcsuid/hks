const express = require('express')
const zod = require('zod')

const app = express()

app.use(express.json())

const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    age: zod.number().min(18)
})


app.post('/signup', (req,res) =>{

    const result = signupSchema.safeParse(req.body)

    if (!result.success){
        return res.status(400).json({
            message: "invalid input",
            errors: result.error.issues
        })
    }

    else{
        res.json({
            message: "user's here"
        })
    }

})


app.listen(3001)