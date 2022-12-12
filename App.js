const express=require('express')
const jwt=require('jsonwebtoken')
const cors = require("cors")
const { Auth } = require('./middlewares/Auth')
const {UserModel}=require("./Models/User.model")
const {connection}=require('./org/server')
const {TodoRoute}=require('./Routes/TodoRoute.route')

const app=express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))


app.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    const userfind=await UserModel.findOne({email})
    if(!userfind){
        try{
            const userdata=new UserModel({email,password});
            await userdata.save();
            res.send("Signup Sucessfull")
        }
        catch(err){
            res.send("Error in signup");
            console.log(err)
        }
    }else{
        res.send("User Already Exist")
    }

})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const userfind=await UserModel.find({email})
    if(userfind?.length>0 && userfind[0].password==password){
        try{
            const token = jwt.sign({ "userid": userfind[0]._id }, 'login');
            res.send({"message":"Login Success","token": token})
        }
        catch(err){
            res.send("Error in While login")
        }
    }else{
        res.send("Login Failed")
    }
})

app.use(Auth)
app.use("/todos",TodoRoute)

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Conected to DB")
    }
    catch(err){
        console.log("Error in connecting to DB")
        console.log(err)
    }
    console.log("listenting in port 8080")
})

// 
