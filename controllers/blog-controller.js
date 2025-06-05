import { blogsDetails, blogCreate, blogDelete, blogUpdate } from "../services/blog.js";

export const getBlogs=async (req,res)=>{
    try{
        let data =await blogsDetails(req);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({"msg":err})
    }
}

export const createBlog=async (req,res)=>{
    try{
        let data=await blogCreate(req);;
        res.status(201).json(data);
    }catch (err) {
        res.status(500).json({"msg":err})
    }
}

export const deleteBlog=async (req,res)=>{
    try{
        let blog =await blogDelete(req);
        res.send({"msg":`Blog Data deleted for this id: ${req.params.id}`});
    }catch (err){
        res.status(500).json({"msg":err});
    }
}

export const updateBlog= async (req,res)=>{
    try{
        let blog =await blogUpdate(req);
        res.status(200).json({"msg":updateData});
    }catch(err){
        res.status(500).json({"msg":err});
    }
}