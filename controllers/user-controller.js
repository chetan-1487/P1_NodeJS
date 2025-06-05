import { getUserDetailById, userDetails, deleteUserDetails, updateUserDetails } from '../services/user.js';


export const getUser=async (req,res)=>{
    const data=await userDetails(req);
    res.status(200).json(data);
}

export const getUserById= async (req,res)=>{
    const data=await getUserDetailById(req);
    res.status(200).json(data);
}

export const deleteUser=async (req,res)=>{
    let id=await deleteUserDetails(req);
    res.send({"msg":`User Data deleted id: ${id}`});
}

export const updateUser= async (req,res)=>{
    let update_data=await updateUserDetails(req);
    res.status(200).json({"msg":update_data});
}