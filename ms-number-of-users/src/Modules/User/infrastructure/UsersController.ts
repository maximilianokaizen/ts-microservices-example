import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { HttpResponseCodes } from '../../Shared/HttpResponseCodes';
import { UsersService } from '../application/services/UsersService';
import Logger from '../../Shared/domain/Logger';
import WinstonLogger from '../../Shared/infrastructure/WinstoneLogger';
import { GeneralConstants } from '../../Shared/constants';
import { ControllerError } from '../../Shared/domain/exceptions/ControllerException';

export class UsersController {
  private readonly userService: UsersService;
  private readonly logger: Logger;

  constructor() {
    this.userService = new UsersService();
    this.logger = new WinstonLogger();
  }
}
