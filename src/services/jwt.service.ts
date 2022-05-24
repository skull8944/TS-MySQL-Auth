import jwt from "jsonwebtoken";
import config from "config";
import log from "../utils/log"; 
import IUser from "../interfaces/user.interface";

const NAMESPACE = "Auth";
const serverTokenExpireTime = config.get("serverTokenExpireTime") as number;
const serverTokenSecret = config.get("serverTokenSecret") as string;
const serverTokenIssuer = config.get("serverTokenIssuer") as string

const signJWT = (user: IUser) :string => {
  let timeSinchEpoch = new Date().getTime();
  let expirationTime = timeSinchEpoch + serverTokenExpireTime * 100000;
  let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  log.info(`[${NAMESPACE}]: Attempting to sing token for ${user.username}`);

  const token =  jwt.sign(
    {
      username: user.username
    },
    serverTokenSecret,
    {
      issuer: serverTokenIssuer,
      algorithm: "HS256",
      expiresIn: expirationTimeInSeconds
    }
  );
  
  return token
}

export { signJWT };