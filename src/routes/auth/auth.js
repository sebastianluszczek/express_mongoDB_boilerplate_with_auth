import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../../models/User";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    const hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = hash;

    const response = await User.create(newUser);
    res.json({
      msg: "User created",
      response
    });
  } catch (err) {
    res.status(400).json({
      msg: "Registration unsuccessful",
      error: err.message
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const response = await User.findOne({ email: req.body.email });

    if (response) {
      const match = await bcrypt.compare(req.body.password, response.password);

      if (match) {
        jwt.sign(
          { response },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: response
            });
          }
        );
      } else {
        res.status(403).json({
          msg: "Invalid email or password"
        });
      }
    } else {
      res.status(403).json({
        msg: "Invalid user"
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Error",
      error: err.message
    });
  }
});

module.exports = authRouter;
