const mongoose = require("mongoose")
// 获取模式对象
const {Schema} = mongoose
//创建约束对象
const dataSchema = new Schema({
  username:{
     type:String,
     unique:true,
     required:true
  },
  password:{
     type:String,
     required:true
  },
  type:{
     type:String,
     required:true
  },
  header:String,
  info:String,
  post:String,
  company:String,
  salary:String

})
// 创建模型对象

module.exports = mongoose.model("users",dataSchema)

