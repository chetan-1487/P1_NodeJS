import { registerUser, loginUser } from '../services/user.js';


export const register= async (req, res) => {

  try {
    let userInfo=await registerUser(req);
    res.status(201).json({ message: 'User registered', userInfo });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const token=await loginUser(req);
    res.json({ token });
  } catch(err) {
    res.status(500).json({error: 'Token failed'});
  }
}