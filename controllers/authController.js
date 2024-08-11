const { sql } = require('../config/db');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await new sql.Request()
      .input('UserName', sql.NVarChar, userName)
      .input('Email', sql.NVarChar, email)
      .input('PasswordHash', sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO Users (UserName, Email, PasswordHash) 
        OUTPUT inserted.UserID 
        VALUES (@UserName, @Email, @PasswordHash)
      `);

    res.status(201).send({ message: 'User created successfully', userId: result.recordset[0].UserID });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const result = await new sql.Request()
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    const user = result.recordset[0];
    if (!user || !await bcrypt.compare(password, user.PasswordHash)) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    res.send({ message: 'Login successful', userId: user.UserID });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send(err);
  }
};

module.exports = {
  signup,
  login
};
