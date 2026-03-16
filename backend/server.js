import exp from "express"
import {connectToDB} from "./config/db.js"

const app=exp()
app.use(exp.json())


try{
    connectToDB()
    app.listen(process.env.PORT,()=>console.log("server started"))
}
catch(err){
    console.log(err)

}
