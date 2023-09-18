const db=require('../database-model/databasemodel')
require('dotenv').config();
const { createEmployeeSchema, updateEmployeeSchema } = require('../validationschema');
const jwt = require('jsonwebtoken');





const getallEmployees = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM "employeeDatatable"');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Error fetching employees' });
    }
  };

  const addEmployee = async (req, res) => {
    try {
      const { error } = createEmployeeSchema.validate(req.body);
     if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
      const { name, email, department, position, start_date } = req.body; // Assuming the data comes from the request body
  
      // Perform data validation if needed
  
      const query = 'INSERT INTO "employeeDatatable" (name, email, department, position, start_date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [name, email, department, position, start_date];
  
      const result = await db.query(query, values);
  
      res.status(201).json(result.rows[0]); // Return the newly added employee data
    } catch (error) {
      console.error('Error Creating an employee:', error);
      res.status(500).json({ message: 'Error adding an employee' });
    }
  };

  const updateEmployee = async (req, res) => {
    try {
      const { error } = updateEmployeeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
      const { name, department, email, position, start_date } = req.body;
  
      
      const id=req.params.id;
  
      const query = 'UPDATE "employeeDatatable" SET name = $2, department = $3, email = $4, position = $5, start_date = $6 WHERE id = $1 RETURNING *';
      const values = [ id,name, department, email, position, start_date];
  
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json(result.rows[0]); 
    } catch (error) {
      console.error('Error updating an employee:', error);
      res.status(500).json({ message: 'Error updating an employee' });
    }
  };

  const deleteEmployee = async (req, res) => {
    
    try {
      const id =  req.params.id;
     
  
      const query = 'DELETE FROM "employeeDatatable" WHERE id = $1 RETURNING *';
      const values = [id];
      
  
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting an employee:', error);
      res.status(500).json({ message: 'Error deleting an employee' });
    }
  };
  const login=async (req, res) => {
    const { admin, password } = req.body;
    
  
    // Check if the adminId and password are correct (you can implement your authentication logic here)
    if (admin==='admin' && password ==='1234') {
      // Generate your JWT token here (replace 'your-secret-key' with your actual secret key)
      const token = jwt.sign({ admin },process.env.JWT_SECRET, { expiresIn: '1h' });
  
      
      
      res.json({ message: 'Login successful', token });
  
    } else {
      // Return an error response if the credentials are invalid
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  

  module.exports={getallEmployees,addEmployee,updateEmployee,deleteEmployee,login};
