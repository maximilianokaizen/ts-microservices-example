import { PrismaClient } from '@prisma/client';
import { UserInterface } from '../../model/interfaces/UserInterface';
import Logger from '../../../Shared/domain/Logger';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { UsersInterface } from '../interfaces/UsersInterface';
import { OneUserInterface } from '../interfaces/OneUserInterface';

export class UserRepository {
  private prisma: PrismaClient;
  private readonly logger: Logger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = new WinstonLogger();
  }
}
