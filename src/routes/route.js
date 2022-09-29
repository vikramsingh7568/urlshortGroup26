const express = require('express');
const urlController = require('../controllers/urlController')
const router = express.Router();
const mid = require('../middleware/mid')

router.post('/url/shorten',mid.createMid,  urlController.createUrl);

//router.get('/:urlCode', urlController.getUrl);


module.exports = router;
