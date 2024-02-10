import { PrismaClient } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async addUserPayment(amount: number): Promise<void> {
    try {
      const userPayment = await this.prisma.userPayments.upsert({
        where: { id: 1 },
        update: {
          totalAmount: {
            increment: amount
          },
          updatedAt: new Date()
        },
        create: {
          totalAmount: amount,
          updatedAt: new Date()
        }
      });
      console.log('Total amount after adding payment:', userPayment.totalAmount);
    } catch (error) {
      console.error("Error in addUserPayment:", error);
      throw error; 
    }
  }
}
