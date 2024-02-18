import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { prismaClient } from "../clients";
import { User } from "@apollo/server/src/plugin/schemaReporting/generated/operations";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }
}

export default JWTService;
