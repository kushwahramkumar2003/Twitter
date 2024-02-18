import JWT from "jsonwebtoken";
import { prismaClient } from "../clients";
import { User } from "@apollo/server/src/plugin/schemaReporting/generated/operations";

const JWT_SECRET = "ai8wehsdbvjhabsdjfhbaw";

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
