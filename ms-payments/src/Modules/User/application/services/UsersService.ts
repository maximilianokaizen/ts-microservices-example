import { UserRepository } from '../../model/repositories/UserRepository';
import Logger from '../../../Shared/domain/Logger';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import { CaseUseException } from '../../../Shared/domain/exceptions/CaseUseException';

export class UsersService {
  private readonly userRepository: UserRepository;
  private readonly logger: Logger;

  constructor() {
    this.userRepository = new UserRepository();
    this.logger = new WinstonLogger();
  }

  async addUserPayment(amount: number) {
    try {
      return await this.userRepository.addUserPayment(amount);
    } catch (error) {
      this.logger.error(error);
      throw new CaseUseException('Error adding user payment');
    }
  }
}
