
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { UserInterface } from '../../model/interfaces/UserInterface';
import { UserRepository } from '../../model/repositories/UserRepository';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import Logger from '../../../Shared/domain/Logger';
import { Constants } from '../../Shared/constants';
import { CaseUseException } from '../../../Shared/domain/exceptions/CaseUseException';

export class UsersService {
  private readonly userRepository: UserRepository;
  private readonly logger: Logger;
  constructor() {
    this.userRepository = new UserRepository();
    this.logger = new WinstonLogger();
  }
}
