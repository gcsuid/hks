function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected


    const header = req.headers.authorization
    const auth = header.split(" ")
    const jwtToken = auth[1]
    const decoded = jwt.verify(jwtToken,secret )
    try{
        if (decoded){
            next()
        }
        else{
            return res.status(400).json({msg: 'not working'})
        }

    }
    catch(err){
        return res.status(400).json({msg: "wrong stuff"})

    }

}

module.exports = userMiddleware;