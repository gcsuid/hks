const { required } = require("zod/mini");

const jwt = require("jsonwebtoken")

const value = {
    name: "har",
    accNum: 123123
}
// function to create the function
const token = jwt.sign(value, "secret")

console.log(token)