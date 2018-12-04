const express = require("express")
const router = require("./router")
const db = require("./db")
const app = express()
// 解析req.body的内容
app.use( express.urlencoded({extended:true}) )

;(async ()=>{
   await db
   app.use(router)

})()




app.listen(4000, err=>{
   if(!err) console.log("服务器启动成功 可以访问http://localhost:4000")
   else console.log(err)
})
