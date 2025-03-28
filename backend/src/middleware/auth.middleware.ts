import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.accessToken;
  console.log(token, "hello90428908");
  try {
    if (!token) {
      res.status(401).json({ message: "Token is Missing" });
      return;
    }
    const secret: string = process.env.JWT_SECRET || "123";
    const decodedToken = jwt.verify(token, secret) as JwtPayload;

    if (decodedToken?.userId) {
      (req as any).userId = decodedToken?.userId;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
