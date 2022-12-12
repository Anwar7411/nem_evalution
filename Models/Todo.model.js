const { text } = require('express')
const mongoose=require('mongoose')

const TodoSchema=({
  taskname:String,
  status:Boolean,
  tag:String ,
  userid:String
})

const TodoModel=mongoose.model('todos',TodoSchema)

module.exports={TodoModel}