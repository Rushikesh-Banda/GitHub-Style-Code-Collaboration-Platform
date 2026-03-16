import exp from "express"
import { connectToDB } from "./config/db.js"
import testRouter from "./routes/testRoutes.js"

const app = exp()

app.use(exp.json())

app.use('/api/test', testRouter)

try {
    connectToDB()

    app.listen(process.env.PORT, () => console.log("server started"))
}
catch(err) {
    console.log(err)
}