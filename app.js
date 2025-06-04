import express from 'express';
import blog_routes from "./routes/blog.js"
import user_routes from "./routes/user.js"
import dotenv from 'dotenv';
dotenv.config();

const app=express()

const port = process.env.PORT;

app.use(express.json());

app.use(user_routes);
app.use(blog_routes);

app.get("/",(req, res)=>{
    res.end("Hello world")
});

app.listen(port,(err)=>{
    console.log(`Server is run at: http://localhost:${port}`)
});