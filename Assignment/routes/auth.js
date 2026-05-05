import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req,res)=>{
  const {email,password} = req.body;
  const hash = await bcrypt.hash(password,12);
  const user = await User.create({email,password:hash});
  res.json(user);
});

router.post("/login", async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).send("Invalid");

  const valid = await bcrypt.compare(password,user.password);
  if(!valid) return res.status(400).send("Invalid");

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({token});
});

export default router;
