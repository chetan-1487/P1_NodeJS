import { register_user, login_user } from '../services/user.js';


export const register = async (req, res) => {

  try {
    let user_info=register_user(req);

    res.status(201).json({ message: 'User registered', user_info });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};


export const login = async (req, res) => {
  const token=login_user(req);
  res.json({ token });
}