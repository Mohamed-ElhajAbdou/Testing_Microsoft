const express = require('express');
const router = express.Router();
const { executeCustomQuery } = require('../controllers/queryController');

router.post('/Query_DB', executeCustomQuery);

module.exports = router;
