import express from "express"

const app = express()

const students = [
    {id : 1, name: 'Raj', branch: 'CSE'},
    {id : 2, name: 'Ajay', branch: 'ECE'},
    {id : 3, name: 'Yash', branch: 'ME'},
];

app.put('/student/update/:id',(req,res)=>{
    const id = req.params.id
    const {name,branch} = req.body
    if(!id){
        return res.status(400).json({message:"Empty Id"})
    }
    if(!name || !branch){
        return res.status(400).json({message:"Cannot pass empty fields"})
    }
    if(name){
        students.name = name
    }
    if(branch){
        students.branch = branch
    }
    return res.status(200).json({message:"Student record updated"})
})

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(user => user.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).send('student not found');
  }

  students.splice(studentIndex, 1); 
  res.status(200).send(`Student with ID ${studentId} deleted.`);
});


app.listen(5000,()=>{
    console.log(`Server running on PORT 5000`);
    
})