const express = require("express")
const {Router} = express
const router = new Router()
//引入 model对象
const userModel = require("../model/UserModel")

router.post("/register",async (req,res)=>{
     const {username,password,type} = req.body
     console.log(req.body)
     try {
       const user = await userModel.findOne({username})
       if(user){//用户名已存在
         res.json({
           "code": 1,
           "msg": "此用户已存在"
         })
       }else{ // 添加进数据库中 并且返回响应
         const result = await userModel.create({username,password,type})
         console.log(result)
         res.json({
           "code": 0,
           "data": {
             "username": result.username,
             "type": result.type,
             "_id": result._id,
             "errMsg":""
           }
         })
       }
     }catch (e) {
         console.log(e)
         res.json({
           "code":2,
           "msg": "网络不稳定 请刷新重试"
         })
     }

})



module.exports = router
