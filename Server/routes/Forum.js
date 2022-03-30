var express = require('express');
var router = express.Router();
const ForumController = require('../controllers/ForumController');


router.get('/all',ForumController.getAll);
router.get('/get/:id',ForumController.findById);
router.get('/delete/:id',ForumController.delete);
router.post('/new',ForumController.add);


module.exports = router;