import { get_user_detail_by_id, user_details, delete_user_details, update_user_details } from '../services/user.js';


export const get_user=async (req,res)=>{
    const data=user_details(req);
    res.status(200).json(data);
}

export const get_user_by_id= async (req,res)=>{
    const data=get_user_detail_by_id(req);
    res.status(200).json(data);
}

export const delete_user=async (req,res)=>{
    let id=delete_user_details(req);
    res.send({"msg":`User Data deleted id: ${id}`});
}

export const update_user= async (req,res)=>{
    let update_data=update_user_details(req);
    res.status(200).json({"msg":update_data});
}