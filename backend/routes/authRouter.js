const { googleLogin } = require('../controllers/AuthController');

const router = require('express').Router();

router.get('/test', (req,res) =>{
    res.send('test pass')
})
router.get('/google', googleLogin)

module.exports = router