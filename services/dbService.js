const { sql } = require('../config/db');

const executeQuery = async (query) => {
  try {
    const result = await new sql.Request().query(query);
    return result.recordset;
  } catch (err) {
    throw new Error(`Database query failed: ${err.message}`);
  }
};

module.exports = {
  executeQuery
};
