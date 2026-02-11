const { log } = require('console')
const express = require('express')
const app = express()
const fs = require('fs')
const PORT = 3000

const fileAuthMiddleware = (req, res, next) => {
  console.log("I am checking");
  return res.send("auth failed")
}
app.use((req, res, next) => {

  const log = `\nRequest at: ${new Date().toLocaleString()}, Method: ${req.method}, URL: ${req.url}`;


  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.log(err);
    }
  })
  next()
})

const readStudentsFromFile = async (req, res) => {
  const data = await fs.readFile('./students.json', 'utf-8')
  return JSON.parse(data || "[]")
}

const writeStudentsToFile = async (records) => {
  await fs.writeFile('./students.json', JSON.stringify(records, null, 2))
}

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: "Token not found" })

  if (token == "secretToken") {
    return res.status(200).json({ message: "Passed" })
  }
  next()

}

app.get('/students', authMiddleware, async (req, res) => {
  const students = await readStudentsFromFile()
  return res.status(200).json(students)
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})