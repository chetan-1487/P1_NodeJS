import User from "../models/user.js"
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userDetails=async (req)=>{
    try{
        let data =await User.findAll({
            attributes:{exclude:["password"]},
        });
        return data;
    }catch(err){
        return err;
    }
}

export const getUserDetailById= async (req)=>{
    try{
        let user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return {"msg":"user doesnot exist"}
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
    }catch(err){
        return err;
    }
}

export const deleteUserDetails=async (req)=>{
    try{
        let user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return {"msg":"user doesnot exist"}
        }
        await User.destroy({
            where:{
                id: req.params.id,
            }
        })
        return req.params.id;
    }catch(err){
        return err;
    }
}

export const updateUserDetails= async (req,res)=>{
    try{
        let user = await User.findOne({ where: { id: req.params.id } });
        if (!user) {
            return {"msg":"user doesnot exist"}
        }
        newData=req.body;
        updateData= await User.update(newData,{
            attributes:{exclude:["password"]},
            where:{
                id:req.params.id
            }
        });
        return updateData;
    }catch(err){
        return err;
    }
}


export const registerUser = async (req) => {
  const { UserName, email, password, role } = req.body;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ UserName, email, password: hash, role });
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] }
  });

  return user;
};


export const loginUser = async (req) => {
  const existingToken = req.cookies?.token;
  if (existingToken) {
    try {
      jwt.verify(existingToken, 'secret');
      throw new Error('already_logged_in');
    } catch (err) {
      // continue to login
    }
  }

  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('missing_fields');
  }

  const userDetail = await User.findOne({ where: { email } });
  if (!userDetail || !(await bcrypt.compare(password, userDetail.password))) {
    throw new Error('invalid_credentials');
  }

  const token = jwt.sign({ id: userDetail.id, role: userDetail.role }, 'secret', {
    expiresIn: '30m',
  });

  const { password: _, ...safeUser } = userDetail.toJSON();
  return { token, user: safeUser };
};


export const logoutServices = async (res) =>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: true, // Use true in production (HTTPS)
        sameSite: 'None', // For cross-site cookies
    });
}