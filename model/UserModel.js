const mongoose = require("express")
// 获取模式对象
const {Schema} = mongoose
//创建约束对象
const dataSchema = new Schema({

})
// 创建模型对象

module.exports = mongoose.model("users",dataSchema)

