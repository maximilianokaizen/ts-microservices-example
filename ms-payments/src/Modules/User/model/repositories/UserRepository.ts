import { PrismaClient } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async addUserPayment(amount: number): Promise<void> {
    try {
      await this.prisma.$transaction(async prisma => {
        const existingPayment = await prisma.userPayments.findFirst();
        if (existingPayment) {
          const updatedPayment = await prisma.userPayments.update({
            where: { id: existingPayment.id },
            data: {
              totalAmount: {
                increment: amount
              },
              updatedAt: new Date()
            }
          });
          console.log('Total amount after adding payment:', updatedPayment.totalAmount);
        } else {
          const newPayment = await prisma.userPayments.create({
            data: {
              totalAmount: amount,
              updatedAt: new Date()
            }
          });
          console.log('New payment record created with amount:', newPayment.totalAmount);
        }
      });
    } catch (error) {
      console.error('Error in addUserPayment:', error);
      throw error;
    }
  }
}
