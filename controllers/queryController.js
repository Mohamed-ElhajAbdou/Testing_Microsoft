// const { sql } = require('../config/db');
// console.log('We are in Query controller')

// const executeQuery = async (req, res) => {
//   console.log(req)
//   const query = req.body.query;
  
//   if (!query) {
//     return res.status(400).send({ error: 'No query provided' });
//   }

//   try {
//     const result = await new sql.Request().query(query);
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send(err);
//   }
// };

// module.exports = {
//   executeQuery
// };


const { executeQuery } = require('../services/dbService');

const executeCustomQuery = async (req, res) => {
  console.log('We are in Query controller');
  console.log('Request received:', req.body);

  const query = req.body.query;
  
  if (!query) {
    console.log('No query provided');
    return res.status(400).send({ error: 'No query provided' });
  }

  try {
    console.log('Executing query:', query);
    const result = await executeQuery(query);
    console.log('Query result:', result);
    res.json(result);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  executeCustomQuery
};
