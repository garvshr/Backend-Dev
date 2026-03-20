const express = require('express');
const app = express();
const PORT = 3000;

const studentRoutes = require('./routes/studentRoute');

app.use('/api/students', studentRoutes);

app.get('/api/students', (req, res) => {
    res.json('Get all students');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});