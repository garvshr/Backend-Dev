const express = require('express');
const app = express();
app.use(express.json());

const PORT = 8000;

const students = [
    {id : 1, name: 'Raj', branch: 'CSE'},
    {id : 2, name: 'Ajay', branch: 'ECE'},
    {id : 3, name: 'Yash', branch: 'ME'},
];

app.get('/students', (req, res) => {
    const branch = req.query.branch;
    if (branch) {
        const foundStudents = students.filter(s => s.branch === branch);
        return res.json(foundStudents);
    }
    return res.json(students);
});

app.get('/students/:id', (req, res) => {

    const id = req.params.id;
    const arrayIndex = students.findIndex((s) => s.id == id);
    if(arrayIndex == -1) {
        return res.status(404).json({message: "Student not found"});
    }   

    const foundStudent = students[arrayIndex];
    return res.json(foundStudent);
});

app.get('/students/search', (req, res) => {
    const nameQuery = req.query.name;
    if (!nameQuery) {
        return res.status(400).json({ message: 'Provide ?name= query parameter' });
    }
    const found = students.filter(s => s.name.toLowerCase().includes(nameQuery.toLowerCase()));
    return res.json(found);
});

app.post('/students/register',(req,res)=>{
    const {id,name,branch} = req.body
    if(!id||!name||!branch){
        return res.status(400).json({message:"Cannot give empty field"})
    }
    const arrayIndex = students.findIndex((s)=>s.id==id)
    if(arrayIndex==-1){
        return res.status(404).send("Student nor found")
    }
    const foundStudent = students[arrayIndex] 
    if(foundStudent){
        return res.status(400).send("Already exists")
    }
    const createdStudent = {id: id,name: name,branch: branch}
    // students = {...students,...createdStudent}
    students.push(createdStudent)

    return res.status(200).json({
        message: "Data added",
        createdStudent
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});