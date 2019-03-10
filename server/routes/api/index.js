const express = require('express');

const router = express.Router();

router.use('/trigger', require('./trigger'));
router.use('/hue', require('./hue'));

module.exports = router;
