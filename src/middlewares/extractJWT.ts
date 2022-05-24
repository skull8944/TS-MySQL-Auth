import config from "config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import log from "../utils/log";

const NAMPSPACE = "Auth";
const jwtKey = config.get("jwtKey") as string;

export async function extractJWT (req: Request, res: Response, next: NextFunction) {
  log.info(NAMPSPACE, "Validating Token");

  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, jwtKey, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error
        });
      } else {
        res.locals.jwt = decoded;
        next()
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
}