const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));




// ================= MODEL =================
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
     charity:String,
     charityPercent: { type:Number, default:10 },
    scores:[
        {
            value:Number,
            date:String
        }
    ]
});

const User = mongoose.model("User",UserSchema);




// ================= SERVER =================
app.listen(5000,()=>{
    console.log("Server running on port 5000");
});




// ================= ROUTES =================

// 👉 Signup
app.post("/signup", async (req,res)=>{
    try{
        const {name,email,password,charity,charityPercent} = req.body;
            console.log(req.body);
            
        const hash = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password:hash,
            charity,
            charityPercent,
            scores:[]
        });

        await user.save();

        res.json({msg:"User Registered"});
    }catch(err){
        console.log(err);
        res.json({msg:"Error", error: err.message});
    }
});


// 👉 Login (IMPORTANT FIX)
app.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.json({msg:"User not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.json({msg:"Wrong password"});

        res.json({
            msg:"Login success",
            userId:user._id

        });
    }catch(err){
        res.json({msg:"Error"});
    }
});


// 👉 Add Score (MAIN LOGIC 🔥)
app.post("/add-score", async (req,res)=>{
    try{
        const {userId,value,date} = req.body;

        const user = await User.findById(userId);

        // latest add
        user.scores.unshift({value,date});

        // keep only 5 scores
        if(user.scores.length > 5){
            user.scores.pop();
        }

        await user.save();

        res.json(user.scores);
    }catch(err){
        res.json({msg:"Error"});
    }
});


// 👉 Get Scores
app.get("/scores/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.json(user.scores);
    }catch(err){
        res.json({msg:"Error"});
    }
});




// 👉 DRAW SYSTEM (Random 5 numbers)
app.get("/draw", (req,res)=>{
    let drawNumbers = [];

    while(drawNumbers.length < 5){
        let num = Math.floor(Math.random()*45) + 1; // 1–45

        if(!drawNumbers.includes(num)){
            drawNumbers.push(num);
        }
    }

    res.json(drawNumbers);
});



app.get("/user/:id", async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
});



// 👉 Get all users (Admin)
app.get("/all-users", async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({msg:"Error"});
    }
});