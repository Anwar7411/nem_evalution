const express=require('express')
const {TodoModel}=require('../Models/Todo.model')

const TodoRoute=express.Router()

TodoRoute.get("/",async(req,res)=>{
    const Todos=await TodoModel.find();
    res.send(Todos)
})

TodoRoute.post("/create",async(req,res)=>{
    const payload=req.body;
    const userid=req.body.userid;
    const data={...payload,userid}
    try{
        const Todos=new TodoModel(data);
        await Todos.save();
        res.send("Todo Addded Successfully")
    }
    catch(err){
        res.send("Error in Posting Todo")
        console.log(err)
    }
})

TodoRoute.patch("/edit/:todoid",async(req,res)=>{
    const payload=req.body
    const Todoid=req.params.todoid;
    const userid=req.body.userid
    const todo=await TodoModel.find({_id:Todoid})
    console.log("userid",userid)
    console.log("todoid",Todoid)
    try{
        if(userid!==todo[0].userid){
            res.send("Your not authorized")
        }else{
            await TodoModel.findByIdAndUpdate({_id:Todoid},payload)
            res.send("Todo Updated Successfully")
        }
    }
    catch(err){
        res.send("Error in updating todos")
    }
})

TodoRoute.delete("/delete/:userid",async (req,res)=>{
    const Todoid=req.params.todoid;
    const userid=req.body.userid
    const todo=await TodoModel.find({"_id":Todoid})
    try{
        if(userid!==todo[0]._id){
            res.send("Your not authorized")
        }else{
            await TodoModel.findByIdAndDelete({"_id":Todoid})
            res.send("Todo deleted Successfully")
        }
    }
    catch(err){
        res.send("Error in deleting todos")
    }
})

module.exports={TodoRoute}
