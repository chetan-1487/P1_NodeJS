import { registerUser, loginUser, logoutServices } from "../services/user.js";

export const register = async (req, res) => {
  try {
    let userInfo = await registerUser(req);
    res.status(201).json({ message: "User registered", userInfo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token } = await loginUser(req);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    if (err.message === "already_logged_in") {
      return res.status(400).json({ error: "User already logged in" });
    } else if (err.message === "missing_fields") {
      return res.status(400).json({ error: "Email and password are required" });
    } else if (err.message === "invalid_credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.error("Login error:", err);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ error: "Login failed", details: err.message });
    }
  }
};

export const logout = async (req, res) => {
  logoutServices(res);

  res.status(200).json({ message: "Logged out successfully" });
};
