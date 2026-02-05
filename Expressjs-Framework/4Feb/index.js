import express from "express"

const app = express()

const students = [
    { id: 1, name: 'Raj', branch: 'CSE' },
    { id: 2, name: 'Ajay', branch: 'ECE' },
    { id: 3, name: 'Yash', branch: 'ME' },
];

app.use(express.json());

app.put('/student/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, branch } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (!name && !branch) {
        return res.status(400).json({ message: "Nothing to update" });
    }

    if (name) student.name = name;
    if (branch) student.branch = branch;

    return res.status(200).json({
        message: "Student record updated",
        student
    });
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(user => user.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).send('student not found');
    }

    students.splice(studentIndex, 1);
    res.status(200).send(`Student with ID ${studentId} deleted.`);
});


app.listen(5000, () => {
    console.log(`Server running on PORT 5000`);

})