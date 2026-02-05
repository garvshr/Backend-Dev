const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

const filePath = path.join(__dirname, 'students.json');

app.post('/students/register', (req, res) => {
    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({ message: "Name and branch are required" });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error reading student data" });
        }

        const students = JSON.parse(data || '[]');

        const newStudent = {
            id: students.length ? students[students.length - 1].id + 1 : 1,
            name,
            branch
        };

        students.push(newStudent);

        fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error saving student data" });
            }

            res.status(201).json({
                message: "Student registered successfully",
                student: newStudent
            });
        });
    });
});

app.put('/students/update/:id', (req, res) => {

    const userId = parseInt(req.params.id);
    const foundIndex = students.findIndex(student => student.id === userId);

    if (foundIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students[foundIndex] = { ...students[foundIndex], ...req.body };

    const result = {message: "Student updated successfully", students: students};
    return res.status(200).json(result);
});

app.listen(5000, () => {
    console.log('Server running on PORT localhost://5000');
});