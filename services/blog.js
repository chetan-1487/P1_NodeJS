import Blog from '../models/blog.js';

export const blogsDetails=async (req)=>{
    let data =await Blog.findAll({});
    return data;
}

export const blogCreate=async (req)=>{
    const { title, description } = req.body;
    let createData=req.body;
    let data;

    if(createData.length>1){
            data = await Blog.bulkCreate({
            title,
            description,
            userId: req.user.id,  
        });   
    }else{
            data = await Blog.create({
            title,
            description,
            userId: req.user.id,  
        });
    }
    return data;
}

export const blogDelete=async (req,res)=>{
    let blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) {
        return res.status(401).json({ error: 'Blog not existed for deletion' });
    }
    await Blog.destroy({
        where:{
            id: req.params.id,
        }
    })
    return req.params.id;
}

export const blogUpdate= async (req,res)=>{
    let blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) {
        return res.status(401).json({ error: 'Blog not existed for updation' });
    }
    newData=req.body;
    updateData= await Blog.update(newData,{
        where:{
            id:req.params.id
        }
    });
    return updateData;
}