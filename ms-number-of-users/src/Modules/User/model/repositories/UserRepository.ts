import { PrismaClient } from '@prisma/client';
import Logger from '../../../Shared/domain/Logger';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';

export class UserRepository {
  private prisma: PrismaClient;
  private readonly logger: Logger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = new WinstonLogger();
  }

  public async addNewUser(): Promise<void> {
    try {
      const userCount = await this.prisma.userCount.findFirst();
      let totalUsers = userCount ? userCount.totalUsers + 1 : 1;

      if (userCount) {
        await this.prisma.userCount.update({
          where: { id: userCount.id },
          data: { totalUsers: totalUsers, updatedAt: new Date() },
        });
      } else {
        await this.prisma.userCount.create({
          data: { totalUsers: totalUsers, updatedAt: new Date() },
        });
      }
      console.log('Total users after adding new user:', totalUsers);
    } catch (error) {
      console.error("Error in addNewUser:", error);
    }
  }

  private async getUsers(): Promise<number> {
    try {
      const usersCount = await this.prisma.userCount.findFirst({
        select: {
          totalUsers: true,
        },
      });
      console.log('usersCount =>', usersCount);
      return usersCount ? usersCount.totalUsers : 0;
    } catch (error) {
      return 0;
    }
  }
}
