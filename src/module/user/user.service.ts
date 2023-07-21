import { Prisma } from '@prisma/client';
import { UserRepository } from './user.repositoty';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUniqueUser(email: string) {
    const isContainUser = await this.repository.getUniqueUser(email);
    return isContainUser;
  }

  async createUser(params: Prisma.UserCreateInput) {
    const user = await this.repository.createUser({
      data: {
        ...params,
      },
    });
    return user;
  }

  async getUser() {
    return this.repository.getUser();
  }
}
