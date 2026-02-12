const express = require('express')
const app = express()
const PORT = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine","ejs");


const students = [
    {id:1,name:"Raj",branch:"CSE"},
    {id:2,name:"Raj",branch:"EC"},
    {id:3,name:"Raj",branch:"CIVIL"},
]

app.get('/',(req,res)=>{
    res.render("form")
})

app.post('/register',(req,res)=>{
    console.log("Form data: ",req.body);
    students.push(req.body)
    res.redirect('/')
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})