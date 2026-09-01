import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
       (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,
      [username, email, passwordHash],
    );

    const user = result.rows[0];

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Failed to register user",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const result = await pool.query(
      `SELECT id, username, email, password_hash, created_at
       FROM users
       WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordsMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to log in",
    });
  }
});

export default router;