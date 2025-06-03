const express= require("express")
const bodyParser= require("body-parser")
const User= require("./models/user")
const Blog= require("./models/blog")
const userCtrl= require("./controllers/userController")
const blogCtrl= require("./controllers/blogController")
const authRoutes=require("./routes/auth_routes");

const { authenticate, authorize } = require("./middlewares/auth_middleware");


app=express()

app.use(bodyParser.json())


app.get("/",(req, res)=>{
    res.end("Hello world")
})
// app.get("/user",userCtrl.addUser)

app.get("/user/details", authenticate, userCtrl.getUser)
app.get("/user/:id", authenticate, userCtrl.getUser_Byid)
app.post("/user", authenticate, authorize('admin'), userCtrl.createUser)
app.delete("/user/:id", authenticate, authorize('admin'), userCtrl.deleteUser)
app.patch("/user/:id", authenticate, authorize('admin'), userCtrl.updateUser)


app.get("/blogs", authenticate, blogCtrl.getBlogs)
app.post("/blog", authenticate, blogCtrl.createBlog)
app.delete("/blog/:id", authenticate, authorize('admin'), blogCtrl.deleteBlog)
app.patch("/blog/:id", authenticate, authorize('admin'), blogCtrl.updateBlog)

// User.sync({ force: true });
// Blog.sync({force: true});

app.post('/register',authRoutes.Register);

// Login
app.post('/login',authRoutes.login);


app.listen(3000,(err)=>{
    console.log("Server is run at: http://localhost:3000")
})