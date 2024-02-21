import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "@apollo/server/src/plugin/schemaReporting/generated/operations";
import { JWTUser } from "../interfaces";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }
  public static decode 
}

export default JWTService;
