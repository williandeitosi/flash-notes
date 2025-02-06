import bcrypt from "bcrypt";
import type { UserType } from "../../../../../packages/auth-schema";
import { db } from "../../../prisma/db";

export class UserService {
  private async findByEmail(email: string) {
    const user = await db.user.findUnique({ where: { email } });
    return !!user;
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
}
