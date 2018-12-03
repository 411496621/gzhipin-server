const express = require("express")
const router = require("./router")
const db = require("./db")
const model = require("./model/UserModel")
const index = express()

;(async ()=>{
   await db
   index.use(router)

})()




index.listen(4000, err=>{
   if(!err) console.log("服务器启动成功 可以访问http://localhost:4000")
   else console.log(err)
})
