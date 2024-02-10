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
      await this.prisma.$transaction(async (prisma) => {
        let userCount = await prisma.userCount.findFirst();
  
        if (!userCount) {
          userCount = await prisma.userCount.create({
            data: { totalUsers: 1, updatedAt: new Date() }
          });
          console.log('Initial user count record created with 1 user.');
        } else {
          const updatedUserCount = await prisma.userCount.update({
            where: { id: userCount.id },
            data: {
              totalUsers: {
                increment: 1
              },
              updatedAt: new Date()
            }
          });
          console.log(`Total users after adding new user: ${updatedUserCount.totalUsers}`);
        }
      });
    } catch (error) {
      console.error('Error in addNewUser:', error);
      this.logger.error(`Error in addNewUser: ${error}`);
    }
  }
  
}
