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

    const branch = req.query.branch;
    const foundStudents = students.filter(s => s.branch === branch);
    res.json(foundStudents);
});

app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.json(student);

    const id = req.params.id;
    const arrayIndex = students.findIndex();
});

app.get('students/search', (req, res) => {
    const searcQuery = req.query.name;
    console.log(req.query);
});

app.get('/students/register', (req, res) => {  
    const {id, name, branch} = req.body;
    if(id || name || branch) {
        return res.status(403).json({message: "All fields are required"});
    }
    const createdStudent = {id, name, branch};
    students.push(createdStudent);

    return res.status(200).json({message: "Student registered successfully", student: createdStudent});
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});