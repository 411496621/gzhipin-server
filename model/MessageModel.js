const mongoose = require("mongoose")
// 获取模式对象
const {Schema} = mongoose
//创建约束对象
const dataSchema = new Schema({
  message:String,
  from:String,
  to:String,
  createTime:{
    type:Date,
    default:Date.now
  },
  read:{
    type:Boolean,
    default:false
  },
  from_to:String

})
// 创建模型对象

module.exports = mongoose.model("chatMessages",dataSchema)

