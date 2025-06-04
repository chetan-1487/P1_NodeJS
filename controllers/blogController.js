var Blog=require("../models/blog")

var getBlogs=async (req,res)=>{
    const data =await Blog.findAll({
        inclu
    });
    res.status(200).json(data);
}

var createBlog=async (req,res)=>{
    const { title, description } = req.body;
    var createData=req.body;

    if(createData.length>1){
        var data = await Blog.bulkCreate({
            title,
            description,
            user_id: req.user.id,  
        });   
    }else{
        var data = await Blog.create({
            title,
            description,
            user_id: req.user.id,  
        });
    }
    res.status(201).json(data);
}

var deleteBlog=async (req,res)=>{
    const blog = await Blog.findOne({ where: { id: req.params.id } });
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

var updateBlog= async (req,res)=>{
    const blog = await Blog.findOne({ where: { id: req.params.id } });
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

module.exports= {
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
};