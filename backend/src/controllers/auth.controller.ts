import { Request, Response, RequestHandler } from "express";
import User from "../models/auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      fullName,
    });
    await user.save();
    res.status(200).json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, userExist?.password);
    if (!checkPassword) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const secret: string = process.env.JWT_SECRET || "123";

    const accessToken = jwt.sign({ userId: userExist?._id }, secret, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.STAGE === "production",
    });
    res.status(200).json({ message: "Logged In Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.send("Logout route");
};
