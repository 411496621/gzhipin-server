const express = require("express")
const {Router} = express
const router = new Router()
//引入 model对象
const userModel = require("../model/UserModel")
const md5 = require("blueimp-md5")
const cookieParser = require("cookie-parser")
router.use(cookieParser())

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
         const result = await userModel.create({username,password:md5(password),type})
         console.log(result)
         res.cookie("userid",result.id,{maxAge:1000*3600*24*7})
         res.json({
           "code": 0,
           "data": {
             "username": result.username,
             "type": result.type,
             "_id": result.id,
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
router.post("/login",async (req,res)=>{
    const {username,password} = req.body
    console.log(username,password)
    try {
      const user = await userModel.findOne({username,password:md5(password)})
      if(user){ // 可以登录
           console.log(user)
           res.cookie("userid",user.id,{maxAge:1000*3600*24*7})
           res.json({
             "code": 0,
             "data": {
               "username": user.username,
               "type": user.type,
               "_id": user.id,
               "header":user.header,
               "info":user.info,
               "post":user.post,
               "company":user.company,
               "salary":user.salary
             }
           })
      }else{ // 用户名或密码不正确
        console.log(user)
           res.json({
             "code": 1,
             "msg": "用户名或密码错误"
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
router.post("/update",async (req,res)=>{

    const userid = req.cookies.userid
    console.log(userid)
    if(!userid){
      return  res.json({"code": 1,"msg": "请先登陆"})
    }
    const user = req.body // 要完善的信息数据
    userModel.findByIdAndUpdate({_id:userid},{$set:user})
      .then(oldUser=>{
          if(!oldUser){
               res.json({"code": 1,"msg": "请先登陆"})
          }else{
               console.log(oldUser)
               const {_id,type,username}  = oldUser
               const newUser = Object.assign({_id,type,username},user)
               res.json({
                 code:0,
                 data:newUser
               })
          }
      })
      .catch(err=>{
         console.log(err)
         res.json({
           code:2,
           msg:"网络不稳定 请刷新重试"
         })
      })


})

// 获取用户信息的路由(根据cookie中的userid)
router.get('/user', (req, res) => {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  // 如果不存在, 直接返回一个提示信息
  if (!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  // 根据userid查询对应的user
  userModel.findOne({_id: userid}, {_v:0,password:0})
    .then(user => {
      if (user) {
        res.send({code: 0, data: user})
      } else {
        // 通知浏览器删除userid cookie
        res.clearCookie('userid')
        res.send({code: 1, msg: '请先登陆'})
      }
    })
    .catch(error => {
      console.error('获取用户异常', error)
      res.send({code: 1, msg: '获取用户异常, 请重新尝试'})
    })
})

router.get('/userlist', (req, res) => {

  const {type} = req.query
  userModel.find({type}, {__v: 0, password: 0})
    .then(users => {
      res.send({code: 0, data: users})
    })
    .catch(error => {
      console.error('获取用户列表异常', error)
      res.send({code: 1, msg: '获取用户列表异常, 请重新尝试'})
    })
})

module.exports = router
