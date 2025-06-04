const express= require("express")
const bodyParser= require("body-parser")
const userCtrl= require("./controllers/userController")
const blogCtrl= require("./controllers/blogController")
const authRoutes=require("./routes/auth_routes");

const { authenticate, authorize } = require("./middlewares/auth_middleware");

app=express()

app.use(bodyParser.json())


app.get("/",(req, res)=>{
    res.end("Hello world")
})

app.get("/user/details", authenticate, userCtrl.getUser)
app.get("/user/:id", authenticate, userCtrl.getUser_Byid)
app.delete("/user/:id", authenticate, authorize('admin'), userCtrl.deleteUser)
app.patch("/user/:id", authenticate, authorize('admin'), userCtrl.updateUser)

app.get("/blogs", authenticate, blogCtrl.getBlogs)
app.post("/blog", authenticate, blogCtrl.createBlog)
app.delete("/blog/:id", authenticate, authorize('admin'), blogCtrl.deleteBlog)
app.patch("/blog/:id", authenticate, authorize('admin'), blogCtrl.updateBlog)

// Register User
app.post('/register',authRoutes.Register);

// Login login
app.post('/login',authRoutes.login);


app.listen(3000,(err)=>{
    console.log("Server is run at: http://localhost:3000")
})