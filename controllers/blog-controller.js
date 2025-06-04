import Blog from '../models/blog.js';

export const get_blogs=async (req,res)=>{
    let data =await Blog.findAll({});
    res.status(200).json(data);
}

export const create_blog=async (req,res)=>{
    const { title, description } = req.body;
    let createData=req.body;
    let data;

    if(createData.length>1){
            data = await Blog.bulkCreate({
            title,
            description,
            user_id: req.user.id,  
        });   
    }else{
            data = await Blog.create({
            title,
            description,
            user_id: req.user.id,  
        });
    }
    res.status(201).json(data);
}

export const delete_blog=async (req,res)=>{
    let blog = await Blog.findOne({ where: { id: req.params.id } });
    if (!blog) {
        return res.status(401).json({ error: 'Blog not existed for deletion' });
    }
    await Blog.destroy({
        where:{
            id: req.params.id,
        }
    })
    res.send({"msg":`Blog Data deleted for this id: ${req.params.id}`});
}

export const update_blog= async (req,res)=>{
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
    res.status(200).json({"msg":updateData});
}