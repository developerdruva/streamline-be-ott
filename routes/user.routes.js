const express = require('express');
const user = require('../controllers/user.controller');
const router = express.Router();

router.post('/login', user.login);
router.post('/register', user.register);
router.post('/emailcheck/:email', user.emailcheck);
router.post('/getuserbyid/:id', user.getUserbyId);
router.post('/addplantouser', user.addPlansToUser);
router.get('/getusers', user.getUsers);
router.delete('/deleteuser/:id', user.deleteUser);

module.exports = router;