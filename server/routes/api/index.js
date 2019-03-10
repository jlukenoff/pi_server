const express = require('express');
const router = express.Router();

router.use('/trigger', require('./trigger'));

module.exports = router;
