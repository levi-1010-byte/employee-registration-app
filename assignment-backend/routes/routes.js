const express = require('express');
const router = express.Router();
const {getallEmployees,addEmployee,updateEmployee,deleteEmployee, login} = require('../controllers/controllers'); 
const {authenticationMiddleware} =require('../middlewares/authenticationMiddleware');

// Route to fetch all employees
router.post('/login',login);
router.get('/employees', getallEmployees);
router.post('/employees', addEmployee);
router.put('/employees/:id',authenticationMiddleware, updateEmployee); 
router.delete('/employees/:id',authenticationMiddleware, deleteEmployee); 
module.exports = router;