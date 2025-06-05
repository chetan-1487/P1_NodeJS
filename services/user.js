import User from "../models/user.js"
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userDetails=async (req)=>{
    let data =await User.findAll({
        attributes:{exclude:["password"]},
    });
    return data;
}

export const getUserDetailById= async (req)=>{
    let user = await User.findOne({ where: { id: req.params.id } });
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
    return data;
}

export const deleteUserDetails=async (req)=>{
    let user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res.status(401).json({ error: 'User not existed' });
    }
    await User.destroy({
        where:{
            id: req.params.id,
        }
    })
    return req.params.id;
}

export const updateUserDetails= async (req,res)=>{
    let user = await User.findOne({ where: { id: req.params.id } });
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
    return updateData;
}


export const registerUser = async (req) => {
    const { UserName, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ UserName, email, password: hash, role });

    // Fetch user again without password
    const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
    });
    return user;
};


export const loginUser = async (req) => {
  const { email, password } = req.body;
  const userDetail =await User.findOne({ where: { email } });
  if (!User || !(await bcrypt.compare(password, userDetail.password))) {
    return ({ error: 'Invalid credentials' });
  }
  let token = jwt.sign({ id: userDetail.id, role: userDetail.role }, 'secret', { expiresIn: '30m' });
  return token;
}