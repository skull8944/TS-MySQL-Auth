import { Request, Response, NextFunction } from "express";
import log from "../utils/log";
import bcrypt from "bcrypt";
import { signJWT } from "../services/jwt.service";
import IUser from "../interfaces/user.interface";
import { IMySQLResult } from "../interfaces/result.interface";
import { Connect, Query } from "../db/db";

const NAMESPACE = "User"

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  log.info(`[${NAMESPACE}]: Token validated, user is authorized`);

  return res.status(200).json({
    message: "authorized"
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    let query = `Insert into users(username, password) Values("${username}", "${password}")`;

    const connection = await Connect();
    const result = await Query<IMySQLResult>(connection, query);

    res.status(201).json(result);
  } catch (error: any) {
    log.error(`[${NAMESPACE}]: ${error.message}`)
    res.status(500).json({
      message: error.message,
      error
    })
  }    
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  
  let query = `select * from users where username = "${username}"`;

  try {
    const connection = await Connect();
    const result = await Query<IUser[]>(connection, query);
    console.log(result);
    
    const loginResult = await bcrypt.compare(password, result[0].password);
    if(!loginResult) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }
    const token = signJWT(result[0]);
    res.status(201).json({
      message: "Auth Successful!",
      user: result[0]
    })
  } catch (error: any) {
    log.error(`[${NAMESPACE}]: ${error.message}`)
    
    return res.status(500).json({
      message: error.message,
      error
    });
  }

};

const getAllUsers = async  (req: Request, res: Response, next: NextFunction) => {
  let query = `select _id, username from users`;
  try {
    const connection = await Connect();
    const result = await Query<IUser[]>(connection, query);

    res.status(200).json({
      result,
      count: result.length
    });
  } catch (error: any) {
    res.status(500).json({
      message:error.message,
      error
    });
  }
};

export { validateToken, register, login, getAllUsers };