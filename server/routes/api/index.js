const express = require('express');

const router = express.Router();

router.use('/trigger', require('./trigger'));
router.use('/hue', require('./hue'));
router.use('/pump', require('./water_pump'));

module.exports = router;
