import User from "../models/user.js"
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const user_details=async (req)=>{
    let data =await User.findAll({
        attributes:{exclude:["password"]},
    });
    return data;
}

export const get_user_detail_by_id= async (req)=>{
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

export const delete_user_details=async (req)=>{
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

export const update_user_details= async (req,res)=>{
    let user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return res.status(401).json({ error: 'User not existed' });
    }
    new_data=req.body;
    update_data= await User.update(new_data,{
        attributes:{exclude:["password"]},
        where:{
            id:req.params.id
        }
    });
    return update_data;
}


export const register_user = async (req) => {
    const { User_name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ User_name, email, password: hash, role });

    // Fetch user again without password
    const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
    });
    return user;
};


export const login_user = async (req) => {
  const { email, password } = req.body;
  const user_detail = await User.findOne({ where: { email } });
  if (!User || !(await bcrypt.compare(password, user_detail.password))) {
    return ({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user_detail.id, role: user_detail.role }, 'secret', { expiresIn: '30m' });
  console.log(token);
  return token;
}