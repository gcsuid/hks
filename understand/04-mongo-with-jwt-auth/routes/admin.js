const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username
    const password = req.body.password

    const existingUser = await Admin.findOne({username})
    if (existingUser){
        return res.status(403).json({msg: "user exists"})

    }

    await Admin.create({
        username,
        password
    })
    res.status(403).json({msg: "admin created"})

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic

    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;