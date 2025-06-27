import express from 'express';
import blog_routes from "./routes/blog.js";
import user_routes from "./routes/user.js";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js';
import cors from 'cors';

const app=express()

const port = process.env.PORT;

// app.use(cors());
app.use(express.json({ limit: "50mb", strict: false }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(user_routes);
app.use(blog_routes);

app.get("/",(req, res)=>{
    res.end("Hello world")
});

app.listen(port,(err)=>{
    console.log('Server is running on http://localhost:3000');
    console.log('Swagger docs at http://localhost:3000/api-docs');
});
