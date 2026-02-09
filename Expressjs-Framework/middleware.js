const { log } = require("console");
const express = require("express");
const fs = require("fs/promises");

const app = express();
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});

app.use((req, res, next) => {
  console.log("I am a middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("I am a middleware 2");
  next();
});

const FileauthMiddleware=(req,res,next)=>{
    console.log("I am checking file")
    return res.send("auth failed")
}

app.use((req, res, next) => {
    const token = req.headers["authorization"];
});

const readStudentsFromFile = async () => {
 
    const data = await fs.readFile("./student.json", "utf-8");
    return JSON.parse(data || "[]");
  
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile(
    "./student.json",
    JSON.stringify(records, null, 2)
  );
};

app.get("/students",FileauthMiddleware, async (req, res) => {
  const students = await readStudentsFromFile();
  res.status(200).json(students);
});