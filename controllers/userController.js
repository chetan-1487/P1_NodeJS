var User=require("../models/user")
const {Op} = require("sequelize");

var getUser=async (req,res)=>{
    const data =await User.findAll({
        attributes:{exclude:["password"]},
    });
    res.status(200).json(data);
}

var getUser_Byid= async (req,res)=>{
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res.status(401).json({ error: `User not existed at id: ${id}`});
    }
    const data = await User.findOne({
        attributes:{exclude:["password"]},
        where:{
            id: {
                [Op.eq]: req.params.id,
            },
        }
    })
    res.status(200).json(data);
}

var deleteUser=async (req,res)=>{
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res.status(401).json({ error: 'User not existed' });
    }
    await User.destroy({
        where:{
            id: req.params.id,
        }
    })
    res.send({"msg":`User Data deleted id: ${req.params.id}`});
}

var updateUser= async (req,res)=>{
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res.status(401).json({ error: 'User not existed' });
    }
    newData=req.body;
    updateData= await User.update(newData,{
        attributes:{exclude:["password"]},
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({"msg":updateData});
}

module.exports= {
    getUser,
    getUser_Byid,
    deleteUser,
    updateUser,
};