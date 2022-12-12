const mongoose=require('mongoose')

const UserSchema=({
  email:String,
  password:String,
})

const UserModel=mongoose.model('users',UserSchema)

module.exports={UserModel}