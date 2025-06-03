
var Blog=require("../models/blog")


var getBlogs=async (req,res)=>{
    const data =await Blog.findAll({});
    res.status(200).json(data);
}

var createBlog=async (req,res)=>{
    var createData=req.body;
    if(createData.length>1){
        var data= await Blog.bulkCreate(createData);    
    }else{
        var data= await Blog.create(createData);
    }
    res.status(201).json(data);
}

var deleteBlog=async (req,res)=>{
    await Blog.destroy({
        where:{
            id: req.params.id,
        }
    })
    res.send({"msg":"Data deleted"});
}

var updateBlog= async (req,res)=>{
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