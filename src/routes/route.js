const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontrollers');
const upload = require('../middleware/privatemiddleware/fileupload');
const {createToken, verifyToken} = require('../middleware/privatemiddleware/authentication');

router.post('/register',usercontroller.registerUser);

router.post('/login',createToken,usercontroller.loginUser);

router.use(verifyToken);

router.get('/get-all-users', usercontroller.getAllUsers);

router.put('/put-upate', usercontroller.putUpdate);

router.post('/profile-upload', upload.single('profile'), usercontroller.profileUpload)

module.exports = router;