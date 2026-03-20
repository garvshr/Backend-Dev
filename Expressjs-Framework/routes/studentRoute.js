const express = require('express');
const router = express.Router();
const app = express();

const {getAllStudents} = require('../controllers/studentController');

router.get('/', getAllStudents);

module.exports = router;