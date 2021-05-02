const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin');

router.get('/', adminController.dashboard.index);

module.exports = router;