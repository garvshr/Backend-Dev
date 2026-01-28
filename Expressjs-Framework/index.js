const express = require('express');
const app = express();

const PORT = 8000;

const students = [
    {id : 1, name: 'Raj', branch: 'CSE'},
    {id : 2, name: 'Ajay', branch: 'ECE'},
    {id : 3, name: 'Yash', branch: 'ME'},
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    res.send("")
});

app.get('students/search', (req, res) => {
    const searcQuery = req.query.name;
    console.log(req.query);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});