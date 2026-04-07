const express = require('express');
const router = express.Router();
const app = express();

const {getAllStudents, createStudent} = require('../controllers/studentController');

router.get('/', getAllStudents);
router.post('/', createStudent);

module.exports = router;