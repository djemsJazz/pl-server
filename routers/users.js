const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();
const { userValidator } = require('./Validators/users');

router.get('/', userValidator, controller.getAll);

router.post('/login', controller.verifyGoogleToken, controller.googleLogin, controller.registerToken);

router.post('/current', controller.verifyToken, controller.getUserById);

router.patch('/editname/:userId', controller.editName);

router.delete('/:userId', controller.deleteUser);

module.exports = router;
