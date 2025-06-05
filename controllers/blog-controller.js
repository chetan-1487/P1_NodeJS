import { blogsDetails, blogCreate, blogDelete, blogUpdate } from "../services/blog.js";

export const getBlogs=async (req,res)=>{
    let data =await blogsDetails(req);
    res.status(200).json(data);
}

export const createBlog=async (req,res)=>{
    let data=await blogCreate(req);;
    res.status(201).json(data);
}

export const deleteBlog=async (req,res)=>{
    let blog =await blogDelete(req);
    res.send({"msg":`Blog Data deleted for this id: ${req.params.id}`});
}

export const updateBlog= async (req,res)=>{
    let blog =await blogUpdate(req);
    res.status(200).json({"msg":updateData});
}