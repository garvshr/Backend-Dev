import express from "express"
import bcrypt from "bcryptjs"
const app = express()

const PORT = 8000

const password = "12345"

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    
    console.log("Hashed Passsword",hash);
    console.log("Salt",salt);

    return hash
}

const verifyPassword = async(pass, hashedPass) => {
    const isMatched = await bcrypt.compare(pass, hashedPass);
    return isMatched;
}

const hash = await hashPassword("123");
const matched = await verifyPassword("123", hash)

console.log(matched);

app.listen(PORT,()=>{
    console.log(`Server running ${PORT}`);
    
})