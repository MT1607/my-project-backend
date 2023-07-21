import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUniqueUser(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(param: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = param;
    return await this.prisma.user.create({ data });
  }

  async getUser() {
    return this.prisma.user.findMany();
  }
}
