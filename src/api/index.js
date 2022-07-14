const express = require('express');
const info = require('./info');
const health = require('./health');
const expand = require('./expand');

const router = express.Router();

router.use('/', info);
router.use('/health', health);
router.use('/expand-url', expand);

module.exports = router;
