const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

const filePath = path.join(__dirname, 'students.json');

const readStudentsFromFile = ()=>{
    const results = fs.readFile('./students.json','utf-8',(err,data)=>{
        const students = JSON.parse(data || "[]");
        return students
    })
    
}

const writeStudentsToFile = async(records)=>{
    await fs.writeFile('./students.json',JSON.stringify(records,null,2))
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');   
}

app.get('/students',(req,res)=>{
    fs.readFile('./students.json',(err,data)=>{
        if(err){

        }
        else{

        }
    })
})

app.post('/students/register', (req, res) => {
    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({ message: "Name and branch are required" });
    }

   
    const existingStudents = readStudentsFromFile();
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

app.put("/students/:id",async(req,res)=>{
    try{
    
        const userId = parseInt(req.params.id)
        const {id,...update} = req.body
        const foundIndex = students.findIndex(s => s.id === userId)

        if(foundIndex==-1){
            return res.status(404).send("Student not found")
        }
        

        students[foundIndex] = {...students[foundIndex],...update}

        const result = { message:"Updated sucessfully",students: students}
        return res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        
    }
})


app.listen(5000, () => {
    console.log('Server running on PORT 5000');
});