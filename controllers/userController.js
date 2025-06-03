
var User=require("../models/user")
const {Op} = require("sequelize");

// const addUser= async (req,res)=>{
//     const jane =await User.build({ User_name: 'Jane', email: 'jane123@gmail.com',role: "admin", password:"jane@123", });
//     console.log(jane instanceof User); // true
//     console.log(jane.name); // "Jane"
//     await jane.save();
//     console.log('Jane was saved to the database!');
//     res.status(200).json(jane.toJSON());
// }

var getUser=async (req,res)=>{
    const data =await User.findAll({
        attributes:{exclude:["password"]},
    });
    res.status(200).json(data);
}

var getUser_Byid= async (req,res)=>{
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

var createUser=async (req,res)=>{
    var createData=req.body;
    if(createData.length>1){
        var data= await User.bulkCreate(createData);    
    }else{
        var data= await User.create(createData);
    }
    res.status(201).json(data);
}

var deleteUser=async (req,res)=>{
    await User.destroy({
        where:{
            id: req.params.id,
        }
    })
    res.send({"msg":"Data deleted"});
}

var updateUser= async (req,res)=>{
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
    createUser,
    deleteUser,
    updateUser,
};