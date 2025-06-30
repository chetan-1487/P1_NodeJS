import {
  getUserDetailById,
  userDetails,
  deleteUserDetails,
  updateUserDetails,
} from "../services/user.js";

export const getUser = async (req, res) => {
  try {
    const data = await userDetails(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const getUserById = async (req, res) => {
  try {
    const data = await getUserDetailById(req);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let id = await deleteUserDetails(req);
    res.send({ msg: `User Data deleted id: ${id}` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    let update_data = await updateUserDetails(req);
    res.status(200).json({ msg: update_data });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
