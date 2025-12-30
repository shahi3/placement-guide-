const express = require('express');
const router = express.Router(); // Use lowercase 'router'

const { loginUser, registerUser } = require('../controller/Auth-controller'); // Ensure correct function names

router.post('/register', registerUser); 
router.post('/login', loginUser);

module.exports = router; // Ensure the router is exported
