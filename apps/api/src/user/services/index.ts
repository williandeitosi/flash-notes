import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { LoginType, UserType } from "../../../../../packages/auth-schema";
import { env } from "../../../../../packages/env-config";
import { db } from "../../../prisma/db";

export class UserService {
  private async findByEmail(email: string) {
    return await db.user.findUnique({ where: { email } });
  }

  async createUser({ email, password, name }: UserType) {
    const isExists = await this.findByEmail(email);

    if (isExists) {
      throw new Error("User already exists!");
    }

    const hashPassword = await bcrypt.hash(password, 6);

    const user = await db.user.create({
      data: { email, password: hashPassword, name },
    });

    const { password: _, ...withoutPassword } = user;

    return withoutPassword;
  }

  async loginUser({ email, password }: LoginType) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, env.jwt_secret, { expiresIn: "10h" });

    return { user: payload, token };
  }
}
